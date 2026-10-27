/**
 * Conteúdo de Perguntas frequentes, Operadoras, Sobre e Contato (etapa 6). RASCUNHO, a revisar pelo responsável técnico.
 * Fontes: docs/COPY.md v3 (seções 3.7, 3.9, 4 e 5). Harness: R3, R9, R16, R17, R19, R24–R30.
 * Sem imports com "@/" (lido pelo script de build).
 */
import { pendente, registrarPendencia } from "./pendencias.ts";

export type Pergunta = { pergunta: string; resposta: string };

/** As 14 perguntas da COPY.md › 5, cada resposta abrindo pela resposta (AEO/GEO), agrupadas por tema. */
export const faq: { tema: string; itens: Pergunta[] }[] = [
  {
    tema: "Carência, cobertura e declaração de saúde",
    itens: [
      {
        pergunta: "Plano de saúde para idoso tem carência?",
        resposta:
          "Sim. As regras de carência valem para qualquer idade: até 24 horas para urgência e emergência, até 300 dias para parto e até 180 dias para os demais casos. Algumas operadoras oferecem prazos menores; mostramos isso na comparação.",
      },
      {
        pergunta: "Quanto tempo de carência para parto?",
        resposta:
          "Até 300 dias para parto a termo. Em planos empresariais com 30 ou mais participantes, quem entra em até 30 dias da contratação não cumpre carência.",
      },
      {
        pergunta: "A doença que eu (ou meu pai) já tenho vai ser coberta?",
        resposta:
          "Depende do que for informado na declaração de saúde. Para doenças preexistentes declaradas, a operadora pode aplicar cobertura parcial temporária de até 24 meses, que alcança só cirurgias, leitos de alta tecnologia e procedimentos de alta complexidade ligados a essa doença. Consultas e exames seguem cobertos. Declare tudo: omitir pode levar à suspensão ou ao cancelamento do plano.",
      },
      {
        pergunta: "Posso ter ajuda para preencher a declaração de saúde?",
        resposta: "Sim. Você tem direito a preencher a declaração com orientação de um médico da rede da operadora, sem custo.",
      },
    ],
  },
  {
    tema: "Tipos de plano e reajuste",
    itens: [
      {
        pergunta: "Individual, empresarial ou adesão: qual a diferença?",
        resposta:
          "No individual ou familiar, o reajuste anual tem teto definido pela ANS e a operadora só pode cancelar em casos de fraude ou falta de pagamento. No empresarial, é preciso vínculo com a empresa contratante. Na adesão, é preciso vínculo com uma entidade de classe ou profissional. Nos dois coletivos, o reajuste e as regras de cancelamento seguem o contrato.",
      },
      {
        pergunta: "MEI pode contratar plano empresarial?",
        resposta:
          "Pode, se o CNPJ estiver ativo e regular há pelo menos 6 meses, com comprovação na contratação e todos os anos. É um contrato coletivo, com regras próprias de reajuste e cancelamento. Comparamos com o individual antes de você decidir.",
      },
      {
        pergunta: "Como funciona o reajuste do plano?",
        resposta:
          "Há dois tipos: o anual (no individual, com teto da ANS; nos coletivos, conforme o contrato) e o por mudança de faixa etária, previsto no contrato e nas regras da ANS. Mostramos as regras de cada opção antes da escolha.",
      },
      {
        pergunta: "Coparticipação vale a pena?",
        resposta:
          "Costuma compensar para quem usa pouco o plano, porque a mensalidade é menor e você paga uma parte de cada consulta ou exame. Para quem faz acompanhamento frequente, pode sair mais caro. Simulamos com o seu uso.",
      },
      {
        pergunta: "Posso trocar de plano sem cumprir carência de novo?",
        resposta: pendente(
          "portabilidade",
          "Em muitos casos, sim, pela portabilidade de carências, que a ANS permite quando há tempo mínimo de permanência, pagamentos em dia e um plano compatível. Analisamos o seu caso.",
          "Requisitos da portabilidade conferidos na norma vigente da ANS (COPY.md, FAQ 10)",
        ),
      },
    ],
  },
  {
    tema: "Rede e preço",
    itens: [
      {
        pergunta: "Como sei se o hospital que eu quero está no plano?",
        resposta:
          "A rede varia por operadora e por linha de produto e muda com o tempo. Conferimos a rede atual do produto exato antes de você assinar.",
      },
      {
        pergunta: "Quanto custa um plano de saúde?",
        resposta:
          "Depende da idade de cada pessoa, da operadora, do tipo de contrato, da região, da acomodação e da coparticipação. Por isso não publicamos tabela: fazemos a simulação para o seu perfil.",
      },
    ],
  },
  {
    tema: "Sobre a GWL",
    itens: [
      {
        pergunta: "A GWL cobra alguma taxa?",
        // R3 e R29: só afirmar "sem taxa" se for verdade para toda a jornada; a comissão é informada antes da contratação.
        resposta: pendente(
          "taxa",
          "Não. Nossa remuneração é paga pela operadora, e informamos a comissão formalmente antes da contratação.",
          "Se a GWL cobra alguma taxa do cliente (R3, R29)",
        ),
      },
      {
        pergunta: "A GWL é a operadora do plano?",
        resposta:
          "Não. Somos uma corretora: comparamos, orientamos e acompanhamos. Quem define cobertura, rede, aceitação e preço é a operadora.",
      },
      {
        pergunta: "Como confiro se a corretora é registrada?",
        resposta:
          "Pelo número de registro na SUSEP, na consulta oficial de corretores do governo federal, e pelo CNPJ, na Receita Federal. Os dois números estão no rodapé de todas as páginas.",
      },
    ],
  },
];

registrarPendencia("participacoes", "Declaração sobre participações societárias de 10% ou mais com operadoras ou seguradoras (R3, F8)");
export const operadorasPagina = {
  palavraChave: "Operadoras de planos de saúde",
  titulo: "Operadoras com que trabalhamos.",
  abertura:
    "Comparamos planos de várias operadoras registradas na ANS. A lista abaixo é a das operadoras para as quais a GWL atua hoje.",
  listaVazia: "Lista de operadoras em validação com a GWL.",
  participacoes: pendente(
    "participacoes",
    "A GWL não tem participação societária em operadoras nem operadoras têm participação na GWL.",
  ),
  ans: "Planos de saúde são regulados pela ANS. No site da ANS você consulta o registro de cada operadora e de cada produto.",
};

registrarPendencia("sobre-historia", "História real da GWL, anos de atuação e número de clientes (R9)");
registrarPendencia("sobre-equipe", "Equipe: nomes, funções, quem é corretor habilitado e autorizações de imagem (R19)");
export const sobre = {
  palavraChave: "Corretora de planos de saúde em Santana",
  titulo: "Uma corretora de Santana que só cuida de planos de saúde.",
  abertura:
    "Nosso jeito de trabalhar: primeiro o hospital, depois o plano, e tudo explicado antes de assinar.",
  historia: "[História da GWL, contada pela equipe: como começou, há quanto tempo atende e quem são os clientes.]",
  principios: [
    { titulo: "Primeiro o hospital", texto: "A comparação começa pelos lugares em que você e sua família já confiam na zona norte." },
    {
      titulo: "Explicado antes de assinado",
      texto: "Carência, reajuste, tipo de contrato e rede vão por escrito antes da assinatura, em linguagem simples.",
    },
    { titulo: "Honestidade sobre o que não controlamos", texto: "Preço, rede e aceitação são da operadora. Dizemos isso com clareza e nunca prometemos o que não depende de nós." },
  ],
  equipe: "[Equipe da GWL: nome, função e registro de quem é corretor habilitado, com fotos autorizadas.]",
};

export const contato = {
  palavraChave: "Contato da GWL Corretora de Seguros",
  titulo: "Fale com a GWL do jeito que preferir.",
  abertura: "Pelo WhatsApp, por telefone ou pessoalmente em Santana. Se preferir, deixe seu número e ligamos para você.",
  formulario: {
    titulo: "Prefiro que me liguem.",
    texto: "Só o necessário para retornar o contato. Não informe doenças, tratamentos ou documentos.",
    paraQuem: [
      { valor: "eu", rotulo: "Para mim" },
      { valor: "familia", rotulo: "Para a minha família" },
      { valor: "pais_60_mais", rotulo: "Para meus pais (60+)" },
      { valor: "empresa", rotulo: "Para a minha empresa" },
      { valor: "mei_autonomo", rotulo: "Sou MEI ou autônomo" },
      { valor: "trocar_plano", rotulo: "Quero trocar de plano" },
    ],
    horarios: [
      { valor: "qualquer", rotulo: "Qualquer horário" },
      { valor: "manha", rotulo: "Manhã" },
      { valor: "tarde", rotulo: "Tarde" },
      { valor: "noite", rotulo: "Noite" },
    ],
  },
  // R17: canais de reclamação externos.
  canaisExternos: [
    { titulo: "Sobre o seu plano", texto: "Fale primeiro com a operadora. Se não resolver, registre na ANS.", link: { rotulo: "Site da ANS", href: "https://www.gov.br/ans/pt-br" } },
    { titulo: "Sobre o atendimento de um corretor", texto: "A SUSEP fiscaliza os corretores de seguros.", link: { rotulo: "Consultar corretores na SUSEP", href: "https://www.gov.br/pt-br/servicos/consultar-corretores-susep" } },
    { titulo: "Como consumidor", texto: "Você também pode registrar uma reclamação na plataforma oficial do governo.", link: { rotulo: "consumidor.gov.br", href: "https://www.consumidor.gov.br/" } },
  ],
};

export const obrigado = {
  texto: pendente(
    "prazo-retorno",
    "Vamos falar com você em até 1 dia útil, em horário comercial.",
    "Prazo de retorno do formulário (COPY.md › Microcopy)",
  ),
};
