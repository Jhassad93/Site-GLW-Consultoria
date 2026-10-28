# Banco de dados (Supabase)

Migrações versionadas, aplicadas em ordem:

1. `migrations/20261027000100_leads.sql` — tabela `leads`, tipos fechados, RLS forçado sem políticas públicas,
   `registrar_lead()` (só `service_role`), `aplicar_retencao()` e gatilho de datas.
2. `migrations/20261027000200_retencao_cron.sql` — agenda diária da retenção LGPD no `pg_cron` (só no Supabase).
3. `migrations/20261027000300_leads_politica_negar_publico.sql` — política restritiva que nega tudo à API pública (deixa a regra explícita).

Testes de acesso e regras: `docs/schema.test.sql` (rodado em Postgres 16 local em 27/10/2026: anon e authenticated
bloqueados em leitura, inserção e chamada da função; validações, limite de 3 envios/24h e retenção funcionando).

Projetos:
- **Desenvolvimento:** `gwl-corretora-dev` (região sa-east-1, São Paulo), conta de João, criado em 27/10/2026. Migrações 1–3 aplicadas; Security e Performance Advisor sem alertas; testes pela API pública com a chave publicável: leitura, inserção, alteração, exclusão e chamada das funções bloqueadas (401); testes com `service_role` (inserção, normalização do +55, validações, limite de 3/24h, `contatado_em`, retenção e cron) aprovados e desfeitos (tabela vazia).
- **Produção:** conta do cliente, criado na etapa 11, antes de qualquer lead real (harness, Anexo D).

Segredos (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) ficam só nas variáveis de ambiente da Vercel e no `.env` local, nunca no código.
