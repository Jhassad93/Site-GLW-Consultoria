-- Migração 2: agenda diária da retenção LGPD (docs/SCHEMA.md › Retenção).
-- Só roda no Supabase, onde a extensão pg_cron existe. 06:00 UTC = 03:00 em Brasília.
create extension if not exists pg_cron;

select cron.unschedule(jobid) from cron.job where jobname = 'gwl-retencao-leads';
select cron.schedule('gwl-retencao-leads', '0 6 * * *', $$select public.aplicar_retencao()$$);
