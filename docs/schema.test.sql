\set ON_ERROR_STOP off
\echo '== 1. service_role registra lead válido (com +55 e máscara)'
set role service_role;
select public.registrar_lead('Maria Teste','+55 (11) 98888-7777','pais_60_mais','Hospital Exemplo','manha','/planos-de-saude-60-mais',null,null,null,'2026-10-27') is not null as ok;
select nome, telefone, para_quem, status from public.leads;

\echo '== 2. anon NÃO lê a tabela (esperado: erro de permissão)'
set role anon;
select count(*) from public.leads;
\echo '== 3. anon NÃO insere direto (esperado: erro)'
insert into public.leads (nome,telefone,para_quem,pagina_origem,aviso_privacidade_versao) values ('X','11999999999','eu','/','v1');
\echo '== 4. anon NÃO chama a função (esperado: erro)'
select public.registrar_lead('Robo','11977776666','eu',null,'qualquer','/',null,null,null,'v1');
\echo '== 5. authenticated NÃO lê (esperado: erro)'
set role authenticated;
select count(*) from public.leads;

\echo '== 6. validação: telefone inválido (esperado: erro de constraint)'
set role service_role;
select public.registrar_lead('João','123','eu',null,'qualquer','/',null,null,null,'v1');
\echo '== 7. validação: nome de 1 letra (esperado: erro)'
select public.registrar_lead('J','11966665555','eu',null,'qualquer','/',null,null,null,'v1');
\echo '== 8. limite: 4º envio do mesmo telefone em 24h (esperado: limite_envios no último)'
select public.registrar_lead('Maria Teste','11988887777','pais_60_mais',null,'manha','/',null,null,null,'v1');
select public.registrar_lead('Maria Teste','11988887777','pais_60_mais',null,'manha','/',null,null,null,'v1');
select public.registrar_lead('Maria Teste','11988887777','pais_60_mais',null,'manha','/',null,null,null,'v1');

\echo '== 9. status muda → contatado_em preenchido'
reset role;
update public.leads set status='em_atendimento' where id=(select id from public.leads order by criado_em limit 1);
select status, contatado_em is not null as contatado from public.leads order by criado_em limit 1;

\echo '== 10. retenção: lead antigo não convertido some; convertido antigo é anonimizado'
alter table public.leads disable trigger leads_tocar;
insert into public.leads (nome,telefone,para_quem,pagina_origem,aviso_privacidade_versao,status,atualizado_em)
 values ('Antigo','11911112222','eu','/','v1','sem_interesse', now()-interval '13 months'),
        ('Cliente','11933334444','familia','/','v1','convertido', now()-interval '25 months');
alter table public.leads enable trigger leads_tocar;
set role service_role;
select * from public.aplicar_retencao();
reset role;
select coalesce(nome,'(anonimizado)') as nome, status, anonimizado_em is not null as anon from public.leads where status in ('convertido','sem_interesse');
