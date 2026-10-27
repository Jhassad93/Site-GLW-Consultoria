# DESIGN.md — GWL Corretora de Seguros

> Versão 2 · 27/10/2026 · substitui a v1 (salas pastel e canto de folha), considerada infantilizada pelo responsável.
> Base: `BRIEF.md` provisório (v0), `claude/personas.md`, as três referências escolhidas pelo responsável e o protótipo aprovado em 27/10/2026 (artefato "GWL — protótipo da home", Design canvas).
> Fonte da verdade visual do projeto. As skills de design trabalham dentro deste arquivo, nunca o substituem.

## Direção visual
- **Em uma frase:** uma consultoria de saúde sóbria e editorial: fundo neutro claro, superfícies verde-noite, tipografia grande e justa, linhas finas e imagem real ocupando a tela.
- **Por que combina com o público e o tom (BRIEF.md):**
  - **Confiança:** quem decide por um plano (a filha que escolhe pelos pais, o dono de PME) compara corretoras pelo quanto elas parecem sérias. Um visual refinado e calmo transmite método e responsabilidade; o visual lúdico da v1 transmitia o contrário.
  - **Emoção:** o alívio de "ainda bem que eu tenho plano" vem da imagem (pessoas reais, luz natural, momentos tranquilos), não de cores alegres. A interface fica neutra e deixa a imagem falar.
  - **Público 60+:** o refinamento não sacrifica a leitura. Corpo em 18px, contraste AAA no texto, áreas de toque de 48px, "Menu" escrito por extenso e movimento sempre pausável.

## Referências (escolhidas pelo responsável em 27/10/2026)

| Referência | O que adotamos | O que não adotamos |
| --- | --- | --- |
| [Institute of Health](https://www.instituteofhealth.com/) | Topo em tela cheia com vídeo, título grande no canto inferior esquerdo e painel de dados em vidro à direita. Carrossel horizontal com card central em destaque e resumo embaixo. | Giro automático do carrossel; números de prova sem fonte confirmada. |
| [Until](https://www.untillabs.com/) | Cabeçalho em pílula de vidro fosco flutuante, fixo no topo. | Menu escondido atrás de ícone no computador; vidro transparente demais (10%) para o público 60+. |
| [Hona](https://www.hona.com/) | Esteira de marcas logo abaixo do topo. Depoimentos em cards grandes alternando foto e texto. Card escuro gigante de chamada final. Botão em pílula com seta num círculo de acento. | Esteira sem botão de pausar. |

Nome, logo, fontes proprietárias (Lay Grotesk) e imagens dessas marcas não são usados.

## Cores

| Papel | Nome | Valor | Uso |
| --- | --- | --- | --- |
| Texto e superfície escura | Noite | `#0F1A12` | Todo texto em fundo claro; fundo do topo, da chamada final e do rodapé; botão escuro. |
| Fundo | Névoa | `#F3F2EE` | Fundo padrão das seções; texto e botão claro sobre Noite. |
| Cartão | Branco | `#FFFFFF` | Cards, seções alternadas, esteira. |
| Seção de destaque | Pedra | `#E6E5E0` | Uma seção por página (o carrossel de tipos de plano). |
| Marca | Mata | `#1F3D27` | Cards de depoimento em texto; o verde da GWL, aprofundado. |
| Acento | Broto | `#C9E27A` | **Somente** o círculo da seta nos botões de ação, o selo "Cliente GWL" e o anel de foco em fundo escuro. Nunca texto sobre fundo claro, nunca área grande. |
| Texto secundário | Musgo | `#4F5751` | Legendas, notas, rótulos. |
| Texto de apoio | Grafite | `#2E3830` | Parágrafos de apoio sob títulos. |
| Texto atenuado | Cinza | `#6E756F` | **Só texto grande (≥ 24px)**: a segunda frase do manifesto, numeração dos passos, nomes na esteira. |

**Contraste conferido (WCAG, calculado em 27/10/2026):**

| Par | Razão | Resultado |
| --- | --- | --- |
| Noite sobre Névoa / Branco / Pedra | 15,9 / 17,8 / 14,2 | AAA |
| Névoa sobre Noite | 15,9 | AAA |
| Névoa sobre Mata | 10,7 | AAA |
| Noite sobre Broto (círculo da seta, selo) | 12,4 | AAA |
| Broto sobre Noite / Mata | 12,4 / 8,3 | AAA |
| Musgo sobre Névoa / Branco / Pedra | 6,7 / 7,5 / 5,9 | AA (AAA a partir de 18,66px negrito ou 24px) |
| Grafite sobre Névoa | 10,9 | AAA |
| Névoa a 70% sobre Noite (legendas no escuro) | 8,3 | AAA |
| Cinza sobre Névoa / Branco | 4,2 / 4,7 | **Só texto ≥ 24px** (exige 3:1) |

Regras:
- Interface quase monocromática: Noite, Névoa e Branco fazem 90% da página. A cor vem da fotografia.
- Broto é tempero: no máximo um elemento de Broto por botão; nunca preenche seção.
- Sem vermelho na interface. Erros de formulário: borda Noite de 2px, ícone e mensagem que diz o que corrigir.
- Sem modo escuro na v1 (as seções escuras fazem parte do layout, não são tema).

## Tipografia
- **Títulos:** **Inter Tight**, peso 500 (600 só no logotipo provisório), espaçamento entre letras de −0,035em (−0,05em no "GWL" do rodapé). Grotesca neutra e justa, a mesma família visual das referências, livre (SIL OFL).
- **Corpo e interface:** **Inter**, pesos 400 e 500. Alta legibilidade em tela, algarismos tabulares para numeração.
- **Escala (desktop → celular):**
  - legenda 13–15px (mínimo 13px, só em notas e legendas de imagem)
  - corpo 18px (não diminui no celular)
  - subtítulo 20px
  - H3 24–28px
  - H2 48 → 32px
  - manifesto 44 → 30px
  - H1 da home 76 → 42px
  - título da chamada final 80 → 44px
- **Regras:**
  - Entrelinha 1,55 no corpo; 1,0 a 1,15 nos títulos.
  - Linhas de no máximo 68 caracteres no texto corrido.
  - Títulos em caixa normal (frase), terminados em ponto final nos H2 de seção, como nas referências.
  - Uma única ênfase permitida: a segunda frase do manifesto em Cinza. Nada de itálico ou cor de destaque em palavra solta.
  - Rótulo em caixa alta só no selo "CLIENTE GWL" (13px, espaçamento +0,06em).
  - Licença: SIL Open Font License (registrar no `LICENCAS.md`).

## Imagens e vídeo
- **Papel:** a imagem é o principal portador de emoção. Topo, tipos de plano e depoimentos dependem dela.
- **Estilo:** luz natural, tons quentes e dessaturados, enquadramento à altura dos olhos, pessoas em momentos tranquilos (saindo de uma consulta, em casa, no trabalho, no comércio do bairro). Sem pose de anúncio.
- **Topo:** vídeo em loop de 15 a 20 segundos, sem som, comprimido (alvo ≤ 2 MB no celular), com imagem estática (poster) enquanto carrega. Gradiente Noite de baixo para cima (0 → 92%) para garantir o contraste do título.
- **Origem (decidido em 27/10/2026, harness Anexo D):** logos das operadoras baixados do site oficial de cada uma; fotos entregues pelo cliente (equipe, escritório, clientes com autorização); imagens de ambiente geradas por IA a partir dos prompts de `docs/IMAGENS.md`. Imagem gerada por IA **nunca** representa cliente, equipe, depoimento, hospital ou lugar identificável.
- **Hospitais:** citados só em texto, sem logos ou fachadas (R7, R28).
- **Operadoras:** logos monocromáticos (Cinza, uniformizados em altura) na esteira, só das operadoras confirmadas pela GWL (R3). Na prévia, marcados "em validação"; em produção, só com autorização escrita (R7). Sem autorização, nome em texto.
- **Nunca:** estetoscópio em primeiro plano, médica de jaleco sorrindo para a câmera, maca, ambulância, UTI.
- **Direito de uso:** cada imagem e vídeo registrado em `docs/LICENCAS.md`.

## Movimento
Três movimentos, todos com `prefers-reduced-motion` (param ou viram estáticos) e só `transform` e `opacity`:
1. **Topo:** vídeo em loop (ou troca suave de cenas em 1,2s). Botão de pausar visível ao lado do botão principal (WCAG 2.2.2).
2. **Esteira de operadoras:** desliza continuamente (uma volta em 45s), pausa ao passar o mouse ou com foco de teclado, botão "Pausar" visível. Com movimento reduzido vira faixa parada e rolável.
3. **Carrosséis (tipos de plano, depoimentos):** deslizam 450ms com curva `cubic-bezier(.22,1,.36,1)` ao clicar nas setas. **Nunca giram sozinhos.**

Microinterações: sublinhado que cresce da esquerda nos links de navegação (200ms); ícone "+" gira 45° ao abrir pergunta (200ms). Nenhuma animação de entrada de seção.

## Layout e forma
- **Largura:** conteúdo até 1200px (1280 no topo e nos carrosséis); margem lateral 40px no desktop, 20px no celular.
- **Ritmo vertical:** 128px entre seções no desktop, 80px no celular.
- **Composição recorrente:** duas colunas (título à esquerda, lista ou conteúdo à direita, proporção 1 : 1,2) para hospitais, como funciona e perguntas.
- **Listas com linhas finas:** 1px de Noite a 14% separa itens (hospitais, passos, perguntas). É o principal recurso de organização no lugar de caixas coloridas.
- **Raios:** 999px em botões e pílulas; 20–24px em cards; 32px no card da chamada final; 12px em imagens dentro de cards.
- **Sombras:** só no cabeçalho de vidro (`0 10px 30px` Noite a 6%). Nenhuma outra.
- **Bordas:** 1px Noite a 14–25% em listas, botões de contorno e setas.

## Componentes
- **Cabeçalho:** pílula de vidro fosco (Névoa a 72%, desfoque 24px, borda branca a 55%), fixa a 16px do topo, largura até 1200px. Logo à esquerda; no computador, links de texto (Hospitais, Tipos de plano, Como funciona, Perguntas, Sobre) e o botão escuro "Falar com a GWL"; no celular, botão escuro escrito "Menu" que abre um painel de vidro com os links em 26px. Sem suporte a desfoque ou com transparência reduzida: fundo Névoa sólido.
- **Botão principal:** pílula de 60px, texto 18px peso 500, com a seta num círculo Broto de 44px à direita. Claro (Névoa) sobre fundo escuro; escuro (Noite) sobre fundo claro. Rótulo da ação: "Comparar planos pelo WhatsApp" `[pendência de copy]`.
- **Botão secundário:** pílula de contorno 1px, sem seta.
- **Botão de seta (carrosséis):** círculo de 56px com contorno 1px e chevron de 1,6px.
- **Link em texto corrido:** sempre sublinhado (o público 60+ precisa ver o que é clicável). Links de navegação: sublinhado só ao passar o mouse, porque o contexto já indica que são clicáveis.
- **Placa de dados do topo:** vidro escuro (branco a 8%, desfoque 24px), raio 24px, três linhas separadas por fio: rótulo à esquerda, valor em Inter Tight 28px à direita. Só dados confirmados (R1, R9); números de prova só com fonte.
- **Esteira:** fundo Branco, fios em cima e embaixo, nomes em Inter Tight 26px Cinza, máscara de esmaecimento nas bordas, botão "Pausar".
- **Card de tipo de plano:** dois blocos brancos empilhados: imagem (320px) com título e rótulo; "Em resumo" com texto e link. O card central fica em 100%; os vizinhos em 40% de opacidade e 92% de escala.
- **Item de hospital:** linha com nome em Inter Tight 28px, nota "Rede conferida em [data]" (R28) e círculo com seta.
- **Passo (como funciona):** número 01–04 em Cinza, título 26px e texto de apoio.
- **Depoimento:** card de 500px de altura; alterna **foto** (citação em Névoa sobre gradiente Noite) e **texto** (fundo Mata, selo "CLIENTE GWL" em Broto, citação 30px, iniciais em círculo Broto). Só com depoimento real e autorização escrita.
- **Pergunta (acordeão):** `<details>` nativo; pergunta em Inter Tight 24px, ícone "+" num círculo de contorno.
- **Chamada final:** card Noite com raio 32px, título de 80px, fio, assinatura "Primeiro o hospital. Depois o plano." e os dois botões.
- **Rodapé:** fundo Noite, "GWL" em 120px na cor Mata (decorativo, `aria-hidden`), identificação completa em colunas (R1, R19): razão social, CNPJ, SUSEP, responsável técnico, endereço, ANS, privacidade e termos.
- **Barra do celular:** pílula escura flutuante a 12px das bordas, com o botão principal. Aparece quando o botão do topo sai da tela e some quando a chamada final ou o rodapé entram.
- **Faixa de prévia:** fina, no topo, texto 14px: "Versão de prévia: conteúdo em validação com a GWL." (só em `SITE_STAGE=preview`).

## Celular
- Mesma ordem do desktop: topo, esteira, manifesto, hospitais, tipos de plano, como funciona, depoimentos, perguntas, chamada final.
- Duas colunas viram uma; o título vem antes da lista.
- Carrosséis com cards de 300px e setas acima.
- Topo com recorte vertical do vídeo; título até 5 linhas; botão principal visível na primeira tela.
- Áreas de toque mínimas de 48 × 48px; corpo 18px.

## Faça
- Deixe espaço: seções com 128px de respiro e poucos elementos por tela.
- Organize com fios finos, não com caixas coloridas.
- Use a fotografia para dar calor; mantenha a interface neutra.
- Mostre a data de referência sempre que citar rede ou hospital.
- Teste cada tela em 375, 768 e 1280px e com zoom de 200%.

## Não faça
- Não volte aos pastéis, ao canto de folha, a ilustrações infantis ou a ícones decorativos.
- Não use Broto em texto sobre fundo claro nem em áreas grandes.
- Não use números, prêmios ou depoimentos sem fonte e autorização.
- Não faça carrossel que gira sozinho nem animação contínua sem botão de pausar.
- Não use vermelho, sirene, ambulância ou imagens de urgência.

## Prévia visual
- **Protótipo:** artefato "GWL — protótipo da home" (Design canvas, 27/10/2026), quadros "Home — computador" e "Home — celular". Os arquivos `design-desktop.png` e `design-mobile.png` são da v1 e ficam obsoletos.
- **Logotipo:** o protótipo usa o nome "GWL" em Inter Tight como marca provisória. **O site usa o logotipo original da GWL**, redesenhado ou simplificado se o cliente aprovar. Pendência: arquivo em vetor e versão para fundo escuro.
