-- Migração 1: tabela de leads, RLS e funções (docs/SCHEMA.md, aprovado em 27/10/2026).
-- Harness R12/R25: sem dados de saúde, documentos ou dados de terceiros.
-- Aplicar no projeto Supabase de desenvolvimento (etapa 7) e, na etapa 11, no de produção (conta do cliente).

-- GWL Corretora de Seguros — esquema do banco (Supabase/Postgres)
-- Versão 1 · 27/10/2026 · ver docs/SCHEMA.md
-- Regra: nenhum acesso direto à tabela pelo navegador. O formulário chega pela
-- função da Cloudflare (/api/contato), que valida, confere o Turnstile e chama
-- public.registrar_lead() com a chave secreta (service role), guardada só na Cloudflare.

-- 1. Tipos fechados (evitam texto livre com dado sensível)
create type public.para_quem as enum (
  'eu', 'familia', 'pais_60_mais', 'empresa', 'mei_autonomo', 'trocar_plano'
);
create type public.melhor_horario as enum ('manha', 'tarde', 'noite', 'qualquer');
create type public.status_lead as enum (
  'novo', 'em_atendimento', 'proposta_enviada', 'convertido', 'sem_interesse', 'descartado'
);

-- 2. Tabela de contatos recebidos pelo site
create table public.leads (
  id                        uuid primary key default gen_random_uuid(),
  criado_em                 timestamptz not null default now(),
  atualizado_em             timestamptz not null default now(),
  nome                      text,
  telefone                  text,
  para_quem                 public.para_quem not null,
  hospital_preferido        text,
  melhor_horario            public.melhor_horario not null default 'qualquer',
  pagina_origem             text not null,
  utm_source                text,
  utm_medium                text,
  utm_campaign              text,
  aviso_privacidade_versao  text not null,
  status                    public.status_lead not null default 'novo',
  contatado_em              timestamptz,
  anonimizado_em            timestamptz,
  constraint nome_valido check (
    anonimizado_em is not null or char_length(btrim(nome)) between 2 and 120
  ),
  constraint telefone_valido check (
    anonimizado_em is not null or telefone ~ '^[1-9][0-9]{9,10}$'   -- DDD + número, só dígitos
  ),
  constraint hospital_curto check (hospital_preferido is null or char_length(hospital_preferido) <= 120),
  constraint origem_curta check (char_length(pagina_origem) <= 200),
  constraint utm_curtas check (
    coalesce(char_length(utm_source), 0) <= 100
    and coalesce(char_length(utm_medium), 0) <= 100
    and coalesce(char_length(utm_campaign), 0) <= 100
  ),
  constraint anonimizado_sem_dados check (
    anonimizado_em is null or (nome is null and telefone is null and hospital_preferido is null)
  )
);

comment on table public.leads is
  'Pedidos de contato do site. Sem dados de saúde, documentos ou dados de terceiros (harness R12/R25). Retenção: ver aplicar_retencao().';

create index leads_telefone_criado_idx on public.leads (telefone, criado_em);
create index leads_status_idx on public.leads (status, criado_em);

-- 3. Mantém atualizado_em e contatado_em
create function public.tocar_lead() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.atualizado_em := now();
  if new.status <> 'novo' and old.status = 'novo' and new.contatado_em is null then
    new.contatado_em := now();
  end if;
  return new;
end $$;

create trigger leads_tocar before update on public.leads
for each row execute function public.tocar_lead();

-- 4. RLS: ligado e sem nenhuma política para anon/authenticated
--    (ninguém lê nem escreve pela API pública; o service role ignora RLS por definição)
alter table public.leads enable row level security;
alter table public.leads force row level security;
revoke all on public.leads from anon, authenticated;
grant select, insert, update, delete on public.leads to service_role;  -- painel e rotinas internas

-- 5. Função única de entrada, chamada só pela função da Cloudflare
create function public.registrar_lead(
  p_nome text,
  p_telefone text,
  p_para_quem public.para_quem,
  p_hospital text,
  p_melhor_horario public.melhor_horario,
  p_pagina_origem text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_aviso_versao text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_tel text := regexp_replace(coalesce(p_telefone, ''), '\D', '', 'g');
  v_id uuid;
begin
  -- normaliza +55
  if char_length(v_tel) in (12, 13) and left(v_tel, 2) = '55' then
    v_tel := substr(v_tel, 3);
  end if;

  -- limite: no máximo 3 pedidos por telefone em 24 horas
  if (select count(*) from public.leads
      where telefone = v_tel and criado_em > now() - interval '24 hours') >= 3 then
    raise exception 'limite_envios' using errcode = 'P0001';
  end if;

  insert into public.leads (
    nome, telefone, para_quem, hospital_preferido, melhor_horario,
    pagina_origem, utm_source, utm_medium, utm_campaign, aviso_privacidade_versao
  ) values (
    btrim(p_nome), v_tel, p_para_quem, nullif(btrim(p_hospital), ''), coalesce(p_melhor_horario, 'qualquer'),
    p_pagina_origem, nullif(p_utm_source, ''), nullif(p_utm_medium, ''), nullif(p_utm_campaign, ''), p_aviso_versao
  ) returning id into v_id;

  return v_id;
end $$;

revoke all on function public.registrar_lead(text, text, public.para_quem, text, public.melhor_horario, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.registrar_lead(text, text, public.para_quem, text, public.melhor_horario, text, text, text, text, text) to service_role;

-- 6. Retenção LGPD (executada diariamente pelo pg_cron)
--    a) pedidos sem conversão: excluídos 12 meses após a última atualização
--    b) convertidos: anonimizados 24 meses após a última atualização (mantém só métricas)
create function public.aplicar_retencao() returns table (excluidos int, anonimizados int)
language plpgsql security definer set search_path = '' as $$
declare
  v_exc int; v_anon int;
begin
  delete from public.leads
   where status <> 'convertido'
     and atualizado_em < now() - interval '12 months';
  get diagnostics v_exc = row_count;

  update public.leads
     set nome = null, telefone = null, hospital_preferido = null,
         utm_source = null, utm_medium = null, utm_campaign = null,
         anonimizado_em = now()
   where status = 'convertido'
     and anonimizado_em is null
     and atualizado_em < now() - interval '24 months';
  get diagnostics v_anon = row_count;

  return query select v_exc, v_anon;
end $$;

revoke all on function public.aplicar_retencao() from public, anon, authenticated;
grant execute on function public.aplicar_retencao() to service_role;


-- Função de gatilho também fechada para a API pública (não é chamada diretamente)
revoke all on function public.tocar_lead() from public, anon, authenticated;
