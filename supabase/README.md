# Banco de dados (Supabase)

Migrações versionadas, aplicadas em ordem:

1. `migrations/20261027000100_leads.sql` — tabela `leads`, tipos fechados, RLS forçado sem políticas públicas,
   `registrar_lead()` (só `service_role`), `aplicar_retencao()` e gatilho de datas.
2. `migrations/20261027000200_retencao_cron.sql` — agenda diária da retenção LGPD no `pg_cron` (só no Supabase).

Testes de acesso e regras: `docs/schema.test.sql` (rodado em Postgres 16 local em 27/10/2026: anon e authenticated
bloqueados em leitura, inserção e chamada da função; validações, limite de 3 envios/24h e retenção funcionando).

Projetos:
- **Desenvolvimento:** conta de João (etapa 7).
- **Produção:** conta do cliente, criado na etapa 11, antes de qualquer lead real (harness, Anexo D).

Segredos (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) ficam só nas variáveis da Cloudflare e no `.env` local, nunca no código.
