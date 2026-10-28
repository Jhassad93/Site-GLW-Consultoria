# Product

<!-- impeccable:product-schema 1 -->

> Registro de produto para as skills de design (Impeccable). **Não é fonte da verdade:** resume `docs/BRIEF.md` (provisório v0), `docs/PERSONAS.md`, `docs/CONCORRENTES.md` e as decisões aprovadas pelo responsável (João) em 27/10/2026. Em conflito, os arquivos de `docs/` vencem (CLAUDE.md). O visual está em `docs/DESIGN.md` (único DESIGN.md do projeto).
> Itens marcados **(hipótese)** vêm do brief provisório e ainda serão confirmados pelo cliente no briefing.

## Platform

web

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui, hospedado na Vercel, com DNS e Turnstile na Cloudflare; páginas geradas no build e formulário pela rota `/api/contato` + Supabase (SCHEMA.md).

## Users
- Pessoas da zona norte de São Paulo escolhendo plano de saúde ou odontológico **(hipótese, proto-personas)**:
  - filha ou filho de 45 a 58 anos decidindo pelos pais com 60+ (prioritária);
  - família jovem (pediatria, maternidade);
  - dono de pequeno negócio (plano empresarial);
  - MEI ou autônomo;
  - quem quer trocar de plano.
- Situação comum: medo de escolher errado e descobrir tarde que o hospital não atende, que a carência é longa ou que o reajuste não cabe.

## Product Purpose
Site da GWL Corretora de Seguros, corretora especializada só em planos de saúde e odontológicos, em Santana (SP). Objetivo: levar o visitante a iniciar a comparação de planos pelo WhatsApp (ação principal, **hipótese**) ou pedir contato pelo formulário.

## Positioning
"Primeiro o hospital. Depois o plano.": a comparação começa pelo hospital em que a pessoa confia, e carência, reajuste e tipo de contrato são explicados antes de assinar. Nenhum concorrente local combina presença no bairro, explicação honesta e um site rápido e identificado (`docs/CONCORRENTES.md`).

## Operating Context
- Atendimento humano pelo WhatsApp e presencial em Santana.
- A GWL é corretora: não é operadora nem administradora; preço, rede e aceitação são da operadora.
- Setor regulado pela SUSEP (corretora) e pela ANS (planos).

## Capabilities and Constraints
- Sem simulador, tabelas de preço, contratação online ou área do cliente.
- Formulário mínimo, sem dados de saúde.
- **Harness regulatório obrigatório** (`docs/HARNESS_REGULATORIO.md`). Proibido:
  - prometer cobertura, preço, aprovação ou reajuste;
  - usar "carência zero" sem a condição que a garante;
  - incentivar MEI de fachada;
  - usar logos de operadoras, hospitais, SUSEP ou ANS sem autorização.
- Dados não confirmados ficam em `src/content/empresa.ts` e aparecem como "a confirmar" na prévia; o build de produção falha enquanto houver algum.

## Brand Commitments
- Nome GWL Corretora de Seguros.
- Logotipo de árvore verde com arco azul (arquivo vetorial pendente).
- Tom de voz **(hipótese)**: claro, próximo, honesto.

## Evidence on Hand
- Ainda **não há** depoimentos autorizados, fotos autorizadas, números confirmados (clientes, anos de mercado) nem lista de operadoras confirmada. Não inventar nenhum desses.
- Avaliações públicas no Google: 4,5 com 6 avaliações (27/10/2026), uso só com autorização dos autores.

## Product Principles
1. Explicar antes de vender: toda página reduz a incerteza do visitante.
2. O hospital é o ponto de partida da conversa.
3. Honestidade regulatória é diferencial, não restrição.
4. Legível para quem tem 60+: letra grande, contraste alto, poucos elementos por tela.

## Accessibility & Inclusion
WCAG AA no mínimo (DESIGN.md mira AAA no texto); corpo de 18px em todas as telas; alvos de toque de 48px; links sublinhados; `prefers-reduced-motion`; público com muitos usuários 60+ (Lei 13.146/2015, art. 63).
