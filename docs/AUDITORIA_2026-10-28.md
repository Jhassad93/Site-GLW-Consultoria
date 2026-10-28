# Auditoria antecipada — 28/10/2026

> Revisão final de design e quarta auditoria do harness (Anexo A), **adiantadas a pedido de João** antes da etapa 13.
> Rodada na prévia local (`SITE_STAGE=preview`, `next start`). Repetir tudo na publicação: os dados do cliente ainda vão mudar o conteúdo.

## 1. Design (Impeccable audit + detector + axe-core)

| # | Dimensão | Nota | Principal achado |
| --- | --- | --- | --- |
| 1 | Acessibilidade | 4 | axe-core (WCAG 2.2 AA + boas práticas) sem violações em 17 páginas × 2 larguras, depois das correções |
| 2 | Desempenho | 3 | Vídeo do topo 2,2 MB (0,9 MB no celular) com pôster; fotos em WebP com versão de celular; PageSpeed real fica para a Vercel |
| 3 | Tokens e tema | 4 | Cores por token; hex só nos blocos provisórios de imagem |
| 4 | Responsivo | 3 | Sem rolagem lateral em 320–1280 px nas 16 páginas; quebras no pior caso (abaixo) |
| 5 | Integridade | 4 | Sistema coerente com o DESIGN.md v2 |
| | **Total** | **18/20** | Excelente |

**Corrigido nesta rodada:** contraste dos cards vizinhos do carrossel (2,98:1 → acima de 4,5:1); nome acessível do logo igual ao texto visível; placeholder de imagem decorativo fora do leitor de tela; dois menus com o mesmo nome ("Planos por perfil"); subtítulo do cabeçalho com contraste 4,2:1 sobre o vídeo; palavras sozinhas na última linha (`text-wrap: pretty`).

**Achados do detector mantidos de propósito:** fonte Inter (DESIGN.md v2), esteira em movimento (aprovada, pausa com mouse/foco/toque), H1 grande na home (aprovado como provisório; revisar com o cliente).

## 2. break-ui (pior caso realista)

Dados extremos em `/componentes#pior-caso` (só prévia), pelas mesmas props dos dados reais.

| # | Gravidade | Campo | Valor | O que acontece | Correção proposta |
| --- | --- | --- | --- | --- | --- |
| 1 | Quebrado | Card de tipo de plano: rótulo | "Microempreendedor individual" | Título e rótulo dividem a linha; o rótulo não encolhe e empurra o card para fora da tela em 320–390 px | Rótulo vai para a linha de baixo quando não couber (`flex-wrap`, título com `min-w-0`) · `src/components/gwl/cards.tsx` |
| 2 | Quebrado | Card de depoimento em texto: citação | Depoimento de ~330 caracteres | Altura fixa (480–500 px): a citação passa do card e cobre o nome do autor | Altura mínima em vez de fixa, ou limite de 240 caracteres no conteúdo · `cards.tsx` |
| 3 | Frágil | Rodapé: e-mail | e-mail longo sem espaço (ex.: `atendimento.planosdesaude@gwlcorretoradeseguros.com.br`) | Pode passar da coluna no celular | `overflow-wrap: anywhere` nos dados do rodapé · `src/components/site/rodape.tsx` |

**Aguentou:** item de hospital com nome de 3 linhas e nota longa (quebra e mantém a seta); nome curto ("HCor", "Jo"); formulário com nome longo (limite de 120 no campo e no servidor) e telefone com "ramal" (erro claro por campo, sem rolagem lateral); cabeçalho em uma linha de 320 a 1280 px.

## 3. Quarta auditoria do harness (Anexo A)

Legenda: **OK** · **Pendente** (depende do cliente; o build de produção já está bloqueado) · **Exceção da prévia** (decisão no Anexo D; bloqueia produção) · **N/A**.

| # | Item | Resultado | Onde foi verificado |
| --- | --- | --- | --- |
| A1 | "Corretora de Seguros" visível | OK | Cabeçalho (≥640 px), rodapé de todas as páginas, títulos |
| A2 | Rodapé com razão social, CNPJ, endereço, telefone e e-mail | Pendente | `rodape.tsx`: dados "(a confirmar)"; telefone e e-mail faltam (F1, F2, F14) |
| A3 | Código SUSEP e responsável técnico com link oficial | Pendente | Link para a consulta SUSEP presente; códigos "a confirmar" (F3, F4) |
| A4 | Nada apresenta a GWL como seguradora | OK | Busca do léxico proibido em `src/` sem ocorrências |
| A5 | Lista de seguradoras/operadoras publicada | Exceção da prévia | `/operadoras` com lista de demonstração (F7, F15) |
| A6 | Participações de 10% ou mais | Pendente | Pendência `participacoes` (F8) |
| A7 | Remuneração antes da proposta (contratação online) | N/A | Sem contratação online |
| A8 | Sem promessas de aprovação, preço, prazo ou cobertura | OK | Busca do léxico; "o plano mais barato hoje pode não ser o mais sustentável" é alerta, não promessa |
| A9 | Cotação marcada como estimativa | N/A | Sem simulador ou cotação no site |
| A10 | CTA não promete contratação | OK | "Falar com a GWL", "Quero receber o contato" |
| A11 | Produtos de entidades autorizadas; PPM | N/A | Só saúde e odonto; nenhuma PPM citada |
| A12 | Logos com autorização arquivada | Exceção da prévia | 10 logos de demonstração (Anexo D, 28/10); produção mostra nomes |
| A13 | Sem logo da SUSEP/ANS como selo | OK | Nenhuma imagem de SUSEP ou ANS |
| A14 | Depoimentos autorizados; números com fonte | Exceção da prévia | Depoimentos fictícios rotulados; único número (46%) com fonte Datafolha/Abramge 2023 |
| A15 | Acessórios não obrigatórios | OK | Odonto "sozinho ou junto com o plano de saúde" |
| A16 | Formulário sem dado de saúde, documento ou terceiros | OK | `/contato`: nome, telefone, para quem, hospital (com aviso para não informar doença), horário |
| A17 | Nenhum rastreador antes do consentimento | OK | Nenhuma requisição externa antes do aceite (home e contato) |
| A18 | Chatbot se identifica | N/A | Sem chatbot; WhatsApp com atendimento humano |
| A19 | Páginas de saúde/odonto conferidas | OK | Ver A25–A35 |
| A20 | Termos explicados; carência e exclusões citadas | OK | FAQ e páginas de perfil (carência, CPT, reajuste, coparticipação) |
| A21 | Canais de atendimento e reclamação | OK | `/contato` com consumidor.gov.br; WhatsApp e endereço (dados a confirmar) |
| A22 | Equipe só como corretor se habilitada | Pendente | `/sobre` sem equipe ainda (F10) |
| A23 | Linha de base há menos de 90 dias | OK | Conferida em 27/10/2026; reverificar antes de publicar (R20) |
| A24 | Textos aprovados pelo responsável técnico | Pendente | Todo o texto é RASCUNHO |
| A25 | Nada de "plano GWL" ou "nossa rede" | OK | Busca do léxico |
| A26 | "Corretora de Seguros" compatível com registro SUSEP | Pendente | F3 / E9 |
| A27 | Produtos citados com registro ANS e nome registrado | OK | O site não cita produtos por nome |
| A28 | Sem tabela ou preço | OK | Nenhum "R$" no conteúdo |
| A29 | Carência como máximo legal; "carência zero" com condição | OK | FAQ e perfis: 24 h / 300 dias / 180 dias como máximos; isenção só com a condição (30+ vidas, 30 dias) |
| A30 | Nada sobre omitir doença | OK | FAQ: "Declare tudo" |
| A31 | Tipos explicados com reajuste e rescisão; sem MEI de fachada | OK | Cards de tipos e FAQ; MEI com 6 meses de CNPJ |
| A32 | Nenhuma promessa sobre reajuste | OK | Busca do léxico |
| A33 | Sem "cobertura completa"; hospitais com condição e data | OK | Atalhos de hospital remetem ao WhatsApp; guias com "rede conferida em [data]" |
| A34 | MPS antes da proposta; nenhuma taxa sem base | OK / Pendente | "Como funciona" cita o manual da ANS antes da proposta; taxa a confirmar (pendência `taxa`) |
| A35 | Link da ANS e canal do consumidor no FAQ ou rodapé | Parcial | Link da ANS no rodapé; Disque ANS só na página "Trocar de plano". Proposta: incluir "Disque ANS 0800 701 9656" no rodapé |

**Resumo:** 20 OK, 4 N/A, 3 exceções da prévia (logos, lista de operadoras, depoimentos), 7 pendentes do cliente e 1 parcial (A35).
