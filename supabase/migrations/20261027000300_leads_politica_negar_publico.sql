-- Migração 3: torna explícita a regra do SCHEMA.md — a API pública (anon e authenticated) não lê nem escreve em leads.
-- Política restritiva que nega tudo; o service_role continua passando (bypassrls).
-- Também zera o aviso INFO "rls_enabled_no_policy" do Security Advisor.
create policy leads_negar_api_publica on public.leads
  as restrictive for all to anon, authenticated
  using (false) with check (false);
