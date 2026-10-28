# Contas, publicação e operação

> Versão oficial do método de contas e publicação (etapas 6 e 11 do playbook). A ficha 16 da biblioteca traz a comparação de hospedagens e os links de referência.
> Preços e limites de serviços mudam: confira as páginas oficiais antes de cada proposta.

## 1. Contas no nome do cliente (onboarding)

O cliente cria cada conta com o e-mail dele e convida você. **Nunca peça a senha dele.**

- [ ] Domínio no Registro.br, no CNPJ do cliente, com você como contato técnico
- [ ] Vercel (hospedagem), você como membro do time. **Plano Pro em produção:** o plano Hobby é só para uso pessoal e não comercial (confira os termos atuais da Vercel)
- [ ] Cloudflare (DNS e Turnstile), você como membro
- [ ] GitHub: repositório criado a partir deste template na conta do cliente (ou na sua, para transferir na entrega)
- [ ] Google Analytics 4, Search Console e Perfil da Empresa no Google, você como administrador
- [ ] Supabase e serviço de e-mail (só se houver formulário com banco)
- [ ] API de IA com limite mensal de gasto (só no pacote com IA)

## 2. Como publicar na Vercel (padrão deste projeto desde 28/10/2026)

| Item | Configuração |
| --- | --- |
| Projeto | Vercel › Add New › Project › importar o repositório do GitHub. Framework: Next.js (detectado). Build: `npm run build` (roda antes o `verificar-dados`). Node 22 ou superior. |
| Páginas | Geradas no build (HTML pronto). Só `/api/contato` roda como função da Vercel. |
| Variáveis | Project › Settings › Environment Variables (lista em `docs/SCHEMA.md`). Segredos nunca no código nem com `NEXT_PUBLIC_`. |
| Prévia | Endereço `.vercel.app`, `SITE_STAGE=preview` (faixa, "a confirmar", `noindex` por cabeçalho e robots), `ACEITAR_LEADS=teste`. |
| Cabeçalhos | Definidos no `next.config.ts`: segurança, HSTS, `X-Robots-Tag` na prévia e cache de `/midia/`. |
| Limite de envios | Regra de limite por IP no Vercel Firewall em `/api/contato` (conferir disponibilidade no plano), além do Turnstile e do limite por telefone no banco. |

## 3. Passo a passo da publicação

1. Apontar o domínio para os servidores DNS da Cloudflare (painel do Registro.br).
2. Na Vercel, adicionar o domínio ao projeto; na Cloudflare, criar os registros que a Vercel indicar em modo **somente DNS** (nuvem cinza: com o proxy ligado, certificado e cache das duas brigam). HTTPS sempre e redirecionar www e sem www para uma única versão (na Vercel).
3. Robôs de IA: com o DNS em modo somente DNS, o bloqueio de robôs da Cloudflare não atua; a política do BRIEF.md vale pelo `robots.txt` do site. Se um dia o proxy for ligado, conferir esse bloqueio (prompt "Verificar robôs de IA", `docs/PROMPTS.md`).
4. Configurar o e-mail do formulário: registros SPF, DKIM e DMARC no DNS.
5. Rodar os três checklists (`checklists/`) no endereço final e obter o aceite de publicação.

## 4. Analytics e operação

| Item | Ferramenta | Configuração |
| --- | --- | --- |
| Analytics | GA4 (conta do cliente) | `@next/third-parties`, carregado só após consentimento, com o modo de consentimento ligado ao banner de cookies |
| Conversões | GA4 | Envio de formulário, clique no WhatsApp e visita à página de obrigado |
| Tráfego de IA | GA4 | Grupo de canais para chatgpt.com, perplexity.ai, gemini.google.com, claude.ai e copilot.microsoft.com |
| Busca | Search Console e Bing Webmaster Tools | Verificar pelo DNS, enviar o sitemap, vincular o Search Console ao GA4 |
| Site fora do ar | Monitor de disponibilidade gratuito (ex.: UptimeRobot, Better Stack) | Checagem a cada 5 minutos, alerta para você |
| Erros | Monitor de erros gratuito (ex.: Sentry) ou logs da Vercel | Alerta em erro de formulário ou de página |
| Backup | Repositório Git + exportação do banco | Exportar a tabela de leads todo mês no plano de manutenção |

## Cuidados

- O plano Hobby da Vercel não permite uso comercial: site de cliente em produção vai no plano Pro, em nome do cliente (confira preços e termos atuais).
- Sem banner que bloqueie o GA4 antes do aceite, o site descumpre a LGPD.
- Contas no nome do cliente evitam disputa no fim da relação, mas ele precisa manter um cartão ativo nas contas pagas.
