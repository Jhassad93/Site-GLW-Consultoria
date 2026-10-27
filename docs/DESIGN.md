# DESIGN.md — GWL Corretora de Seguros

> Versão 1 · 27/10/2026 · base: `BRIEF.md` provisório (v0), `claude/personas.md` e identidade atual da GWL. Pendente de aprovação.
> Fonte da verdade visual do projeto. As skills de design trabalham dentro deste arquivo, nunca o substituem.

## Direção visual
- **Em uma frase:** uma clínica de bairro arejada e iluminada: salas de cor sólida, verde da copa da árvore da GWL, luz de mel nos botões e letra grande e legível para quem lê com calma.
- **Por que combina com o público e o tom (BRIEF.md):**
  - **Público:** a persona prioritária é a filha de 45 a 58 anos que decide pelos pais com 60+, e muitos visitantes são esses próprios pais. Daí letra grande, contraste alto, poucos elementos por tela e nada de efeitos.
  - **Emoção:** a mensagem é o alívio de "ainda bem que eu tenho plano", com tom claro, próximo e honesto. Daí cores calmas e solares, nenhuma estética de pronto-socorro (vermelho, sirene, azul hospitalar frio) e nenhum excesso corporativo.
  - **Marca:** a identidade existente (árvore, verdes, arco azul) é preservada e amadurecida. O cliente reconhece a própria marca.

## Estilo-base
- **Referência:** [Refero Styles — "Chat for impact" (turn.io): *forest-green clinic with pastel rooms*](https://styles.refero.design/style/18975f37-2e5d-47ca-9367-8b201d20390d). É uma marca de saúde que usa o WhatsApp como canal, como a GWL.
- **O que herdamos da linguagem:**
  - superfícies sólidas de cor como "salas" que separam as seções;
  - sistema plano, sem sombras;
  - um único botão de ação de alto contraste;
  - cantos arredondados generosos.
- **O que não herdamos (identidade de terceiros):** nome, logo, a combinação verde-floresta com coral e o lilás de fundo. A fonte DM Sans também fica de fora, trocada por fontes escolhidas para o público 60+.
- **Paleta:** derivada do logotipo e do site atual da GWL (amostrados em 27/10/2026: verde #2C5A34, verde-folha #5D8726 a #90C030, azul do arco #405783). Validada com cálculo de contraste WCAG. *O kit indica o Realtime Colors para exportar o tema shadcn; a exportação fica para a etapa 1 do plano, com estes valores.*

## Cores

| Papel | Nome | Valor | Uso |
| --- | --- | --- | --- |
| Texto | Tinta | `#17301C` | Corpo e títulos em fundos claros. Verde quase preto, mais quente que o preto puro. |
| Fundo | Branco | `#FFFFFF` | Página e cards. |
| Primária | Mel | `#F2B33D` | **Somente** o botão de ação principal (Comparar pelo WhatsApp) e a barra fixa no celular. Texto do botão sempre em Tinta. |
| Secundária | Copa | `#2C5A34` | Cor da marca: seção "Comece pelo hospital", rodapé, títulos de destaque, botão secundário (contorno). |
| Destaque | Rio | `#3B5687` | Links, ícones informativos e foco de teclado, vindo do arco azul do logo. |

**Tons de superfície (variações das cores acima, não cores novas):** Folha clara `#EAF3DC` · Rio claro `#E3EAF5` · Mel claro `#FDF1D6`. São as "salas": cada seção usa no máximo uma.
**Apoio gráfico (nunca texto):** Folha `#6E9F2A`, só em ilustrações e no detalhe da folha.
**Texto secundário:** `#4A5A4D` (legendas e notas de rodapé).

**Contraste conferido (WCAG):**

| Par | Razão | Resultado |
| --- | --- | --- |
| Tinta sobre Branco | 14,2:1 | AAA |
| Tinta sobre Mel (botão) | 7,7:1 | AAA |
| Tinta sobre Folha clara / Rio claro / Mel claro | 12,4 / 11,8 / 12,7:1 | AAA |
| Branco sobre Copa | 8,0:1 | AAA |
| Copa sobre Branco | 8,0:1 | AAA |
| Rio sobre Branco (links) | 7,3:1 | AAA |
| Texto secundário sobre Branco | 7,3:1 | AAA |
| Mel sobre Copa | 4,3:1 | Só superfície ou texto ≥ 24px (botão mel dentro da sala Copa: OK, contraste de componente ≥ 3:1) |
| Folha sobre Branco | 3,2:1 | **Proibido para texto**; só gráfico |

Regras:
- 5 cores, cada uma sempre no mesmo papel.
- **Mel nunca decora.** Se aparece, é para clicar.
- Nada de cor fora desta tabela.
- Não existe vermelho na interface. Erros de formulário usam Tinta com ícone e borda Rio, e a mensagem diz o que corrigir.
- Sem modo escuro na v1.

## Tipografia
- **Títulos:** **Bricolage Grotesque**, pesos 600 e 700. Grotesca de traço humano, levemente irregular, que parece escrita por gente e não por um banco. Dá personalidade aos títulos grandes sem ficar formal.
- **Corpo e interface:** **Atkinson Hyperlegible Next**, pesos 400 e 700. Criada pelo Braille Institute para leitura com baixa visão, com letras que não se confundem (I/l/1, O/0, rn/m). É a escolha certa para o público 60+ e funciona para todos.
- **Escala:** Terça maior (1,25) a partir de **18px** de corpo:
  - 14,4 legenda mínima
  - 18 corpo
  - 22,5 subtítulo
  - 28 H3
  - 35 H2
  - 44 H1 interno
  - 56 H1 da home no desktop
- **No celular:** corpo 18px (não diminui); H1 da home 36 a 40px; H2 28px.
- **Regras:**
  - Duas famílias com papéis distintos.
  - Entrelinha de 1,6 no corpo e de 1,1 a 1,15 nos títulos.
  - Linhas de no máximo 68 caracteres.
  - Títulos em caixa normal (frase), nunca CAIXA ALTA; sem rótulos acima dos títulos.
  - Nunca destacar uma palavra do título com outra cor ou itálico.
  - Pesos finos (abaixo de 400) proibidos.
  - Licença: SIL Open Font License (registrar no `LICENCAS.md`).

## Imagens
- **Origem:**
  - **Versão final:** fotos reais feitas em Santana (equipe da GWL atendendo, fachada, rua, famílias e casais 60+ que sejam clientes reais com autorização). Proposta: uma sessão de fotos curta `[A CONFIRMAR com o cliente]`.
  - **Demonstração:** ilustrações próprias em traço simples (folhas, árvore, mapa estilizado da zona norte), claramente provisórias. **Sem fotos de pessoas reais e sem banco de imagens.**
- **Estilo:** luz natural de manhã, cores quentes e realistas, pessoas em momentos tranquilos (saindo de uma consulta, em casa, no comércio). Enquadramento à altura dos olhos, sem pose de anúncio. Nada de estetoscópio em primeiro plano, médica de jaleco sorrindo para a câmera, maca, ambulância ou UTI.
- **Hospitais:** citados só em texto. Sem logos nem fotos de fachadas de hospitais (marcas de terceiros; R7 e R28 do harness).
- **Operadoras:** em texto até haver autorização de uso de marca (R7).
- **Direito de uso:** cada imagem registrada em `docs/LICENCAS.md`.
- **Nunca:** fotos genéricas de banco de imagens (a Health Plus usa uma médica de banco e é justamente o que nos diferencia).

## Elemento-assinatura (o único gesto ousado)
- **O canto de folha:** os cantos superior esquerdo e inferior direito são bem arredondados e os outros dois quase retos (`border-radius: 32px 6px 32px 6px`), lembrando a folha da árvore do logo. É usado **só** em três lugares:
  1. A moldura da imagem do topo.
  2. O painel "Comece pelo hospital".
  3. Os cartões de perfil.
- Todo o resto usa cantos simples e discretos.

## Celular
Decisões próprias, não o desktop encolhido:
- **Ordem da home:**
  1. Título.
  2. Botão.
  3. "Comece pelo hospital", que sobe para logo depois do topo, porque é o atalho mais útil.
  4. Perfis.
  5. Explicações.
  6. Como funciona.
  7. Provas.
  8. Perguntas.
  9. Contato.
- **Barra fixa inferior** em Mel, ocupando a largura toda, 56px de altura.
  - **Só aparece depois que o botão principal do topo sai da tela**, para nunca haver dois botões Mel visíveis ao mesmo tempo.
  - Some quando o formulário ou o rodapé estão na tela.
  - O texto da barra é **o mesmo do botão principal do topo**. A ação tem um nome só no site inteiro; a definição final fica para a pendência de copy.
- **Sobretítulo no celular:** versão curta de uma linha ("Planos de saúde e odonto em Santana"). O texto completo fica no desktop.
- **Título:** 36 a 40px, no máximo 4 linhas; o subtítulo fica inteiro visível na primeira tela, junto com o botão.
- **Menu:** botão "Menu" escrito por extenso (não só o ícone de três linhas), porque o público 60+ reconhece melhor a palavra.
- **Atalhos de hospital:** lista vertical de botões grandes (não carrossel horizontal), com no mínimo 48px de altura cada.
- **Imagens:** recorte vertical 4:5 no topo; ilustrações menores que no desktop.
- **Áreas de toque:** mínimo de 48 × 48px; espaço de 12px entre itens clicáveis.
- **Perguntas frequentes:** em acordeão, com a pergunta inteira visível (sem cortar com "…").

## Espaçamento e forma
- **Largura máxima:** 1200px para a página e 68 caracteres para o texto corrido.
- **Unidade base:** 4px. Espaço entre elementos de 8 a 16px; padding de card de 24 a 32px.
- **Espaço entre seções:** 96px no desktop e 64px no celular. As "salas" de cor vão de ponta a ponta da tela.
- **Raio de borda:**
  - folha `32px 6px 32px 6px` (só os três usos acima);
  - cards 16px;
  - botões 999px (pílula);
  - campos 12px.
- **Sombras:** nenhuma. A hierarquia vem da cor das salas e do tamanho do texto.
- **Bordas:** 1px Tinta a 15% só em campos de formulário e no acordeão.
- **Movimento:** um único momento, a abertura do acordeão das perguntas e do painel de hospital (200ms, só `transform` e `opacity`). Nenhuma animação de entrada de seção. `prefers-reduced-motion` desliga tudo.

## Componentes
- **Biblioteca principal:** **Spell UI** (o kit indica para site sóbrio e institucional) sobre shadcn/ui. Lacunas: Uiverse só para elementos pontuais, adaptados a este arquivo.
- **Botão primário:** fundo Mel, texto Tinta 700, 18px, pílula, altura 56px, sem ícone de seta. Ao passar o mouse, Mel escurece 8%; foco com anel Rio de 3px.
- **Botão secundário:** contorno de 2px em Copa, texto Copa, pílula. Em sala Copa: contorno e texto brancos.
- **Link:** Rio, sempre sublinhado (o público 60+ precisa ver o que é clicável).
- **Card de perfil:** fundo de uma sala clara, canto de folha, título 22,5px; o card inteiro é clicável.
- **Atalho de hospital:** botão largo branco sobre a sala Copa, com o nome do hospital em Tinta e a nota "rede conferida em [data]" em texto secundário.
- **Acordeão de perguntas:** pergunta 20px em negrito; resposta 18px; ícone + e − em Rio.
- **Campos de formulário:** rótulo visível acima do campo (nunca só placeholder), 18px, altura 52px; erro com borda Rio de 2px e mensagem em Tinta logo abaixo.
- **Faixa de demonstração:** fundo Mel claro, texto Tinta 14,4px, fixa no topo: "Versão de demonstração — conteúdo em validação com a GWL."
- **Rodapé:** sala Copa com texto branco e identificação completa em linhas separadas (sem juntar dados com pontos no meio).

## Faça
- Comece cada seção por uma frase que a pessoa entenda sem rolar.
- Use uma "sala" de cor por seção, alternando com o branco.
- Mantenha o corpo em 18px em todas as telas.
- Mostre a data de referência sempre que citar rede ou hospital.
- Use números de passo só em "Como funciona", que é de fato uma sequência.
- Teste cada tela em 375, 768 e 1280px e com zoom de 200%.

## Prévia visual
- **Arquivos:** `design-desktop.png` e `design-mobile.png`, gerados em 27/10/2026 a partir de uma página de prévia com estes tokens. Conferidos a 1280px e 375px, sem rolagem horizontal.
- **Logotipo:** a prévia usa um desenho simplificado só para teste de cor. **O site usa o logotipo original da GWL.** Pendência: obter o arquivo em vetor (SVG ou PDF) e, se necessário, uma versão para fundo escuro (rodapé em Copa).

## Não faça
- Não use Mel em nada que não seja botão de ação.
- Não use vermelho, sirene, ambulância ou imagens de urgência.
- Não use sombras, gradientes decorativos ou fundo creme "editorial".
- Não use o canto de folha fora dos três lugares definidos.
- Não use logos de operadoras, hospitais, SUSEP ou ANS como selo.
- Não use CAIXA ALTA em rótulos, nem setas "→" em botões e links.
- Não use texto menor que 14,4px nem cinza-claro sobre branco.
- Não use carrosséis automáticos.
