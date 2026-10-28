# Plano de implementação — GWL Corretora de Seguros

Fontes: BRIEF.md (provisório v0) · APP_FLOW.md · DESIGN.md · SCHEMA.md · harness regulatório v2.0.1 (Project: `claude/harness-regulatorio.md`)
Regra: executar uma etapa por vez, marcar [x], resumir, listar o que testar e parar para aprovação. Commit ao fim de cada etapa aprovada (`etapa N: <resumo>`).
Em toda etapa com texto ou interface: rodar o harness antes de pedir aprovação ("Harness: sem alertas" ou a lista de alertas).
Arquitetura de versão final; prévia e produção diferem só por `SITE_STAGE` (Anexo D do harness, 27/10/2026).

> Pacote: site institucional com guias (hipótese do brief v0). 17 rotas do APP_FLOW. Copy-base: `claude/copy-site-rascunho.md` v3 (marcada RASCUNHO).

## Etapa 1 — Setup
- [x] Decidir onde fica o código: pasta local fora do iCloud (o iCloud sincroniza `node_modules` e corrompe builds) e repositório Git; GitHub na conta de João por ora, a transferir ao cliente na entrega
- [x] Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui; `components.json` com os registros de `config/components.json`; biblioteca principal Spell UI
- [x] Exportação estática (`output: "export"`) e formulário por função da Cloudflare (decisão do SCHEMA.md); reportar se algo exigir servidor
- [x] Tokens do DESIGN.md em `globals.css`: 5 cores, tons de superfície, raio de folha, escala tipográfica (corpo 18px)
- [x] Fontes Bricolage Grotesque e Atkinson Hyperlegible Next servidas pelo próprio site (Fontsource, sem chamada ao Google Fonts)
- [x] Configuração `SITE_STAGE` (`preview` | `production`) e arquivo central `src/content/empresa.ts` com os dados da entidade e um marcador `aConfirmar`
- [x] `.env.example` conforme o SCHEMA.md; `.env` no `.gitignore`
- [x] Rodar `scripts/setup-design.sh`; confirmar o Playwright MCP; `/impeccable init` apontando para `docs/`
- Notas da execução (27/10/2026): repositório github.com/Jhassad93/Site-GLW-Consultoria; Next.js 16.4.3 sem `cacheComponents` (incompatível com exportação estática); shadcn preset base-nova com Base UI; scripts `verificar-dados.mts` (bloqueia produção) e `gerar-headers.mts` (`_headers` da Cloudflare com noindex em preview); PRODUCT.md em `docs/` para o Impeccable; verificação visual com Playwright local (o MCP do `.mcp.json` fica para quem abrir o projeto no Claude Code).
- Pronto quando: página em branco roda local e no build estático com as fontes e cores da marca; `SITE_STAGE=preview` mostra a faixa e `production` não

## Etapa 2 — Layout base e componentes (refeita no DESIGN.md v2)
- [x] Cabeçalho em pílula de vidro fosco (links no computador; botão "Menu" escrito no celular), rodapé Noite com a identificação completa (R1) lida de `empresa.ts`, faixa de prévia, link "pular para o conteúdo"
- [x] Barra do celular: pílula escura flutuante; aparece só depois que o botão do topo sai da tela e some na chamada final, no formulário e no rodapé
- [x] Componentes do DESIGN.md v2: botões (escuro, claro, contorno, com seta Broto), placa de dados, esteira com pausa, carrossel sem giro automático, card de tipo de plano, lista de hospitais, passos, depoimento (foto e texto), acordeão, campos com rótulo e erro
- [x] Helper de link do WhatsApp com mensagem pronta por contexto (perfil ou hospital), sem dados de saúde (R14)
- [x] Página 404 personalizada ("qual hospital você quer usar?" e volta à Home)
- [x] `lang="pt-BR"`, HTML semântico, foco de teclado visível, `prefers-reduced-motion` e `prefers-reduced-transparency`
- [x] `noindex` global quando `SITE_STAGE=preview`
- Pronto quando: navegação funciona no teclado; URL inexistente mostra a 404; prints 375/768/1280 sem rolagem horizontal; nenhum dado "a confirmar" aparece como fato
- Notas (27/10/2026): primeira versão feita no DESIGN.md v1 e refeita após a aprovação do v2. Vitrine interna em `/componentes/` (só em preview). Fontes Inter Tight e Inter (Fontsource). Rótulo da ação principal "Comparar planos pelo WhatsApp" segue provisório (pendência de copy). Links do rodapé para páginas das etapas 4 a 9 dão 404 até essas etapas. Imagens entram como blocos descritos até chegarem os arquivos de `docs/IMAGENS.md`.

## Etapa 3 — Home
- [x] Seções na ordem do DESIGN.md v2: topo com placa de dados, esteira de operadoras, manifesto, hospitais, tipos de plano (carrossel), como funciona, depoimentos (marcados até autorização), perguntas, chamada final
- [x] Texto da copy v3; trechos `[A CONFIRMAR]` renderizados como "a confirmar" em preview e bloqueando o build em production
- [x] Topo com as cenas IMG-01 e IMG-02 (geradas por IA, `docs/IMAGENS.md`) ou blocos descritos até chegarem; vídeo VID-01 opcional
- [x] `/impeccable critique` na home e `review-animations` no acordeão; corrigir o que contrariar o DESIGN.md
- [x] Prints com Playwright em 375, 768 e 1280px
- [x] Harness na home (R1, R4, R21, R24, R27, R28 e léxico)
- Pronto quando: home completa no desktop e no celular, prints conferidos, harness sem alertas 🔴 (base do marco "demonstração")
- Notas (27/10/2026): imagens ainda como blocos descritos (aguardam `docs/IMAGENS.md`). Critique do Impeccable (revisão de design + detector) aplicada: notas informativas a 16px, menu do celular sólido com botão do WhatsApp, carrossel abre no primeiro card, vizinhos a 60%, atalhos de hospital dizem que abrem o WhatsApp, perfis duplicados removidos. Review de animações: sublinhado de navegação só em aparelho com mouse. Pendências de conteúdo registradas em `src/content/home.ts` bloqueiam o build de produção (16 no total).

## Etapa 4 — Páginas por perfil
- [x] Modelo comum: topo da persona, dores e o que a GWL explica, perguntas da persona, chamada para o WhatsApp com mensagem pronta do perfil
- [x] `/planos-de-saude-60-mais`, `/planos-de-saude-familia`, `/planos-de-saude-empresas`, `/planos-de-saude-mei`, `/trocar-de-plano`
- [x] Atenção especial: R24 e R25 (60+ e família), R26 (MEI: regras de 6 meses de CNPJ, sem incentivo a MEI de fachada), R27 (empresas), portabilidade marcada "a conferir" até checar a norma da ANS (trocar)
- [x] Prints e critique
- Pronto quando: as cinco páginas completas, cada uma com uma palavra-chave principal no título e no H1, harness sem alertas 🔴
- Notas (27/10/2026): botão principal com o rótulo único "Falar com a GWL" e mensagem pronta do perfil. Palavra-chave como primeira linha do H1. Critique aplicada: rótulos "O que preocupa / O que explicamos", atalhos de hospital em 60+, família e trocar, par "Quando não faz sentido" no MEI, "Não é o seu caso?" alinhado, bloco de imagem fora da árvore de acessibilidade. Portabilidade e pós-venda seguem "a confirmar" (bloqueiam produção).

## Etapa 5 — Guias
- [x] `/guias` (índice), modelo de guia por hospital e por bairro gerados a partir de um arquivo de dados com **data de referência obrigatória** (o build falha sem data; R28)
- [x] Um exemplo de cada: um hospital da zona norte e Santana, com conteúdo marcado "a validar com a GWL"
- [x] Atalhos de hospital da home ligados aos guias existentes; "Outro hospital" abre o WhatsApp
- Pronto quando: os guias renderizam no build estático, a data aparece em toda menção de rede e o caminho "hospital sem guia" leva ao WhatsApp
- Notas (27/10/2026): dados em `src/content/guias.ts`. A trava do R28 roda antes de todo build (testada: rede sem data → build falha). O guia do São Camilo Santana está no estado "em validação": sem nenhuma linha de rede até a GWL conferir com as operadoras (nada inventado). Detector do Impeccable nas três páginas: só os falsos positivos já conhecidos (fios finos, marca decorativa do rodapé, fonte Inter, keyframes globais da esteira).

## Etapa 6 — Perguntas frequentes, Operadoras, Sobre e Contato
- [x] `/perguntas-frequentes` com as 14 perguntas (cada resposta abre pela resposta), pergunta 10 de portabilidade marcada até a conferência da norma
- [x] `/operadoras` com a lista em texto, sem logos (R3, R7), "lista a confirmar" em preview
- [x] `/sobre` com equipe e história "a confirmar" (R9, R19)
- [x] `/contato` com WhatsApp, formulário (ligado na etapa 8), endereço e horário (R17)
- Pronto quando: as quatro páginas completas e ligadas no menu e no rodapé; harness sem alertas 🔴
- Notas (27/10/2026): conteúdo em `src/content/institucional.ts`. FAQ com as 14 perguntas em 4 temas; portabilidade e taxa "a confirmar". Operadoras: lista lida de `empresa.ts`, estado "em validação" e declaração de participações pendente (R3). Sobre: história e equipe só na prévia, como espaço marcado (R9, R19). Contato: canais, formulário do SCHEMA (botão desativado até a etapa 8) e canais oficiais de reclamação (R17). Rodapé com Operadoras, Perguntas e Contato. Detector: só os falsos positivos conhecidos.

## Etapa 7 — Banco de dados
- [x] Projeto Supabase de **desenvolvimento** (conta de João); o de produção é criado na conta do cliente na etapa 11
- [x] Aplicar `SCHEMA.md` como migração versionada no repositório; agendar `aplicar_retencao()` no pg_cron
- [x] Repetir `docs/schema.test.sql` e testar pela API REST com as chaves reais: leitura, inserção e chamada da função com a chave anon bloqueadas
- [x] Security Advisor do Supabase sem alertas
- Pronto quando: inserção pela função com service role funciona e todo acesso público é bloqueado
- Notas (27/10/2026): projeto `gwl-corretora-dev` criado pelo conector do Supabase (região São Paulo). Três migrações em `supabase/migrations/` (a 3ª, política restritiva explícita, zerou o aviso INFO do advisor). Testes pela API REST feitos do navegador (o ambiente de nuvem não alcança o Supabase): tudo bloqueado para a chave pública. Testes com service_role via SQL, desfeitos ao fim. A chave service_role não passou pelo chat: vai direto para as variáveis da Cloudflare na etapa 8.

## Etapa 8 — Formulário (função da Cloudflare até 28/10/2026; hoje rota da Vercel)
- [x] Formulário "Prefiro que me liguem" com campos do SCHEMA.md, aviso de privacidade junto do botão, honeypot e Turnstile
- [x] Função `/api/contato`: validação Zod, verificação do Turnstile, chamada de `registrar_lead()`, respostas 400, 403, 429 e 500 com mensagens da copy
- [x] E-mail de aviso via Resend; falha no e-mail não perde o lead (registro em log)
- [x] Estados: erro por campo com dados mantidos, carregando, falha com "tentar de novo" e WhatsApp, redirecionamento para `/obrigado` (noindex, com próximos passos)
- [ ] Regra de limite por IP (agora no Vercel Firewall; feita na etapa 11)
- Pronto quando: todos os caminhos do Fluxo 2 do APP_FLOW foram testados de ponta a ponta no ambiente de prévia
- Notas (27/10/2026): função em `functions/api/contato.ts`, regras compartilhadas em `src/lib/lead.ts`. Testes: `npm run test:contato` (15 casos com serviços simulados) e ponta a ponta no navegador com o simulador da Cloudflare (wrangler pages dev) e Supabase/Turnstile simulados: erros por campo com dados mantidos, prévia restrita a "TESTE", falha com "Tentar de novo", limite, sucesso para `/obrigado` (noindex). Na prévia, `ACEITAR_LEADS=teste` (Anexo D). **Fica para a etapa 11 (deploy):** regra de limite por IP na Cloudflare, chaves reais do Turnstile, Supabase e Resend nas variáveis da Cloudflare, e a repetição dos testes no endereço de prévia. Prazo de retorno da página de obrigado "a confirmar".

## Etapa 9 — Páginas legais e cookies
- [x] `/privacidade`: dados coletados, finalidade, base legal (art. 7º, V, a validar), operadores (Cloudflare, Supabase, Resend, Google), retenção (12 e 24 meses), direitos do titular, encarregado "a confirmar"
- [x] `/termos`: papel da corretora (não é operadora), sem promessa de preço, rede ou aceitação
- [x] Banner de cookies com Aceitar, Recusar e Preferências; link "Preferências de cookies" no rodapé; nada de analytics antes do aceite (R13)
- Pronto quando: textos revisados juridicamente (João e cliente) e nenhum script de terceiros carrega antes do aceite (conferido na aba de rede)
- Notas (27/10/2026): textos de `/privacidade` e `/termos` são RASCUNHO jurídico; a revisão por João e pelo cliente e o encarregado (DPO) seguem como pendências que bloqueiam a produção. Banner com Aceitar e Recusar com o mesmo destaque, Preferências e link no rodapé; escolha no localStorage, com evento `gwl:consentimento` para o GA4 da etapa 10. Conferido no navegador: nenhuma requisição a domínio de terceiros antes do aceite (home, perfil, privacidade e termos).

## Etapa 10 — SEO, IA e analytics
- [x] Title e description por página, Open Graph, favicons a partir do logo, sitemap.xml, canonical, alt text
- [x] JSON-LD: `InsuranceAgency` (legalName, taxID, identifier SUSEP, endereço) em todas as páginas, `FAQPage`, `BreadcrumbList` e `Service` onde couber; só com dados confirmados em production
- [x] Verificar os nomes atuais dos robôs de IA (prompt do PROMPTS.md), aprovar a tabela e só então gerar `robots.txt` e `llms.txt`
- [x] GA4 com modo de consentimento; eventos `whatsapp_click` e `generate_lead`; grupo de canais de tráfego de IA
- Pronto quando: Lighthouse acima de 90 em SEO e acessibilidade e PageSpeed acima de 90 no celular, nas páginas principais
- Notas (27/10/2026): JSON-LD só com dados confirmados (hoje: nome, site, Instagram, área). Tabela de robôs em `docs/ROBOS_IA.md`, aprovada; política "liberar todos" (decisão de João, a confirmar com o cliente). `robots.txt` e `llms.txt` gerados no build: na prévia, robots bloqueia tudo. GA4 só após aceite, com modo de consentimento; o grupo de canais "IA" é configurado no painel do GA4 com as origens do evento `trafego_ia`. Lighthouse local no celular: acessibilidade e boas práticas 100; desempenho 91–92 nas internas e 77–89 na home (variação da máquina local); SEO limitado só pelo noindex da prévia. **Repetir no PageSpeed após o deploy (etapa 11)** e desligar o bloqueio de robôs de IA da Cloudflare.

## Etapa 11 — Prévia para o cliente (marco "demonstração")
- [x] Adaptação para a Vercel (decisão de João, 28/10/2026): sem exportação estática; `/api/contato` como rota do Next (`src/app/api/contato/route.ts`, lógica em `src/lib/contato-servidor.ts`); cabeçalhos no `next.config.ts`; saem `functions/`, `gerar-headers.mts` e o wrangler. Testes: 16 casos (`npm run test:contato`) e rota testada com `next start` e serviços simulados
- [ ] Deploy na Vercel em endereço `.vercel.app`, `SITE_STAGE=preview`, `noindex`, formulário restrito a testes da equipe; chaves reais (Supabase, Turnstile, Resend) nas variáveis da Vercel; limite por IP no Vercel Firewall; repetir os testes do formulário e o PageSpeed na prévia
- [ ] Rodada completa de prints e `/impeccable audit` na prévia
- [ ] Roteiro de apresentação: pitch (`claude/argumentos-pitch.md`) mais a navegação da prévia e as perguntas do briefing
- Pronto quando: link da prévia funcionando no celular e no computador, sem nenhum dado não confirmado apresentado como fato

## Etapa 12 — Ajustes pós-briefing
- [ ] Transformar o BRIEF.md v0 em v1 com as respostas do cliente (F1–F17) e atualizar personas, copy e guias
- [ ] Substituir todos os "a confirmar" por dados confirmados; logo em vetor; fotos reais com autorização; lista de operadoras e autorizações de marca (R7)
- [ ] Revisar as pendências de copy (H1 da home, nome da ação principal, taxa, pós-venda) e a portabilidade
- Pronto quando: o build em `production` passa sem nenhum marcador `aConfirmar` restante

## Etapa 13 — Publicação
- [ ] Contas no nome do cliente (Vercel Pro, Cloudflare, Supabase de produção, Resend, GA4, Search Console, Google Business) conforme `PUBLICACAO.md`; migração do banco para a conta do cliente
- [ ] `/impeccable polish` e `/impeccable audit`; `npx impeccable detect` sem achados críticos; `break-ui` com dados extremos (nomes longos, telefones inválidos, hospitais com nomes grandes)
- [ ] Auditoria contra `checklists/producao.md`, `checklists/seguranca.md`, `checklists/seo-ia.md` e a **quarta auditoria do harness (Anexo A)**
- [ ] Reverificação da linha de base regulatória (R20), incluindo a Res. CNSP 493/2026 e as pendências E2, E5, E7 e E9
- [ ] `docs/LICENCAS.md` completo
- [ ] Domínio escolhido (um só), DNS na Cloudflare em modo somente DNS apontando para a Vercel, HTTPS forçado, redirecionamento do domínio secundário, SPF, DKIM e DMARC do e-mail, robôs de IA conferidos
- [ ] Ficha do Google Business corrigida (categoria e dados iguais ao site); Search Console e Bing com sitemap enviado
- [ ] `SITE_STAGE=production`
- Pronto quando: todos os itens aplicáveis dos três checklists e da quarta auditoria estão OK no site publicado
