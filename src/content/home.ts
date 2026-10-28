/**
 * Conteúdo da home. Fonte: docs/COPY.md v3 (RASCUNHO, pendente de revisão do responsável técnico)
 * e docs/DESIGN.md v2 (ordem das seções). Harness conferido: R1, R4, R9, R21, R24–R29.
 * Sem imports com "@/": este arquivo também é lido por scripts/verificar-dados.mts.
 */
import { pendente, registrarPendencia } from "./pendencias.ts";

export const topo = {
  sobretitulo: "Planos de saúde e odontológicos · Santana, zona norte de São Paulo",
  sobretituloCurto: "Planos de saúde e odonto em Santana",
  // Sinal para a persona prioritária (filha ou filho que decide pelos pais), pedido por João em 27/10/2026.
  atalho60: { texto: "Escolhendo pelos seus pais?", link: "Veja planos para 60+" },
  // H1 v3 aprovado provisoriamente; pendência de copy aberta para melhorar (COPY.md › Pendências).
  titulo: "Para o dia em que você vai pensar: “ainda bem que eu tenho plano”.",
  subtitulo:
    "Esse dia começa numa boa escolha: o hospital em que você confia na rede, uma carência que cabe no seu momento e uma mensalidade que você consegue manter. Comparamos as opções e explicamos tudo antes de você assinar.",
  // R29: "sem custo" só se for verdade para toda a jornada.
  nota: `${pendente("sem-custo", "Atendimento sem custo para você.", "Atendimento sem custo para toda a jornada (R29)")} Valores, rede e aceitação são definidos pela operadora.`,
  // VID-01 (IA, só ambiente; docs/IMAGENS.md e LICENCAS.md). Com vídeo, as cenas abaixo ficam de reserva.
  video: {
    id: "VID-01",
    desktop: "/midia/topo/vid-01-1600.mp4",
    posterDesktop: "/midia/topo/vid-01-poster-1600.webp",
    celular: "/midia/topo/vid-01-720x900.mp4",
    posterCelular: "/midia/topo/vid-01-poster-720x900.webp",
  },
  cenas: [
    { id: "IMG-01", src: undefined as string | undefined, alt: "", descricao: "Cena IMG-01 · casal 60+ saindo tranquilo de uma consulta, luz da manhã" },
    { id: "IMG-02", src: undefined as string | undefined, alt: "", descricao: "Cena IMG-02 · família em casa, fim de tarde" },
  ],
} as const;

registrarPendencia("atuacao", "Ramos que a GWL comercializa (F6)");
export const placa = { atuacao: "só saúde e odonto" };

registrarPendencia("operadoras", "Lista de operadoras com que a GWL trabalha (F7, F15) e autorização de marca (F12)");
export const esteira = {
  titulo: "Comparamos planos de operadoras registradas na ANS",
  nota: "Lista e logos em validação com a GWL e as operadoras.",
  exemplos: Array.from({ length: 8 }, (_, i) => `[Operadora ${i + 1}]`),
};

export const manifesto = {
  rotulo: "Por que uma corretora",
  frase: "Quase metade de quem tem plano não leu o contrato antes de assinar.",
  complemento: "Nós lemos com você: carência, reajuste, tipo de contrato e rede, por escrito, antes da assinatura.",
  fonte: "46% não leram ou só passaram os olhos no contrato. Fonte: pesquisa Datafolha/Abramge, 2023.",
};

registrarPendencia("hospitais", "Hospitais dos atalhos validados com a GWL");
export const hospitais = {
  titulo: "Comece pelo hospital em que você confia.",
  texto:
    "Aquele perto de casa, onde seu filho nasceu ou onde seus pais já se tratam. Diga qual é, e mostramos quais planos incluem esse lugar e o que muda entre eles.",
  // R28: rede varia por produto e muda com o tempo.
  nota: "A rede de cada plano muda com o tempo e varia por produto. Conferimos a rede atual na operadora antes de você decidir.",
  lista: [
    { nome: "Hospital São Camilo Santana", nota: "Perguntar pelo WhatsApp quais planos incluem" },
    { nome: "Hospital Nipo-Brasileiro", nota: "Perguntar pelo WhatsApp quais planos incluem" },
  ],
  avisoLista: "Lista de hospitais em validação com a GWL.",
};

export const tipos = {
  titulo: "Cada tipo de plano tem regras próprias.",
  texto: "Preço, reajuste e cancelamento mudam conforme o tipo de contrato. Veja o resumo de cada um.",
  itens: [
    {
      titulo: "Individual ou familiar",
      rotulo: "Pessoa física",
      imagem: { id: "IMG-04", descricao: "Imagem IMG-04 · mãe e filha à mesa da cozinha" },
      resumo:
        "Contratado direto por você, para você e sua família. O reajuste anual tem teto definido pela ANS, e a operadora só pode cancelar por fraude ou falta de pagamento.",
      acao: { rotulo: "Ver planos para a família", href: "/planos-de-saude-familia/" },
    },
    {
      titulo: "Coletivo por adesão",
      rotulo: "Entidade de classe",
      imagem: { id: "IMG-05", descricao: "Imagem IMG-05 · profissional no estúdio" },
      resumo:
        "Pelo vínculo com uma entidade de classe ou profissional. O reajuste e as regras de cancelamento seguem o contrato coletivo.",
      acao: { rotulo: "Ver se você pode aderir", whatsapp: true },
    },
    {
      titulo: "Empresarial",
      rotulo: "Empresas",
      imagem: { id: "IMG-06", descricao: "Imagem IMG-06 · equipe pequena em reunião" },
      resumo:
        "Contratado pela empresa para sócios e funcionários com vínculo. O reajuste e o cancelamento seguem o contrato empresarial.",
      acao: { rotulo: "Ver planos empresariais", href: "/planos-de-saude-empresas/" },
    },
    {
      titulo: "MEI e autônomo",
      rotulo: "CNPJ",
      imagem: { id: "IMG-07", descricao: "Imagem IMG-07 · padaria de bairro de manhã" },
      // R26: regra dos 6 meses, sem incentivo a MEI de fachada.
      resumo:
        "Pelo CNPJ ativo e regular há pelo menos 6 meses, comprovado na contratação e todo ano. Comparamos com o individual antes de você decidir.",
      acao: { rotulo: "Entender as opções", href: "/planos-de-saude-mei/" },
    },
    {
      titulo: "Odontológico",
      rotulo: "Saúde bucal",
      imagem: { id: "IMG-08", descricao: "Imagem IMG-08 · avó e neto escovando os dentes" },
      resumo: "Plano só para a saúde bucal, contratado sozinho ou junto com o plano de saúde, com carência e cobertura próprias.",
      acao: { rotulo: "Comparar planos odontológicos", whatsapp: true },
    },
  ],
  perfis: "Também por perfil:",
};

export const comoFunciona = {
  titulo: "Escolha com calma, com alguém do seu lado.",
  texto: "Você recebe a comparação por escrito e decide sem pressa.",
  passos: [
    { titulo: "Conversa", texto: "Você conta quem vai usar o plano, onde quer ser atendido e quanto pode investir." },
    { titulo: "Comparação por escrito", texto: "Enviamos as opções lado a lado, com rede, carência, reajuste e coparticipação." },
    {
      titulo: "Você decide sem pressa",
      texto: "Tire as dúvidas antes de assinar. Você recebe o manual da ANS para contratação antes da proposta.",
    },
    {
      titulo: "Contratação e declaração de saúde",
      texto:
        "Ajudamos com a documentação. A declaração de saúde é sua e deve ser completa, e você pode pedir orientação de um médico da operadora, sem custo.",
    },
    {
      titulo: "Depois da contratação",
      texto: pendente(
        "pos-venda",
        "Seguimos com você para dúvidas, inclusões e a carta de reajuste.",
        "Escopo do pós-venda (COPY.md › Como funciona)",
      ),
    },
  ],
};

registrarPendencia("depoimentos", "Depoimentos reais com autorização escrita (R9)");
export const depoimentos = {
  titulo: "Quem chegou com dúvida e saiu sabendo o que assinou.",
  aviso: "Depoimentos e fotos reais, com autorização por escrito: em validação.",
  itens: [
    { citacao: "“[Trecho de depoimento real, com autorização por escrito]”", autor: "[Nome do cliente], [bairro]", foto: "Foto do cliente, autorizada (IMG-12)" },
    { citacao: "“[Depoimento real sobre entender carência e reajuste antes de assinar]”", autor: "[Nome do cliente], cliente desde [ano]", iniciais: "AB" },
    { citacao: "“[Trecho de depoimento real, com autorização por escrito]”", autor: "[Nome do cliente], [bairro]", foto: "Foto do cliente, autorizada (IMG-12)" },
    { citacao: "“[Depoimento real de empresa cliente, com autorização]”", autor: "[Nome], [empresa]", iniciais: "CD" },
  ],
};

export const perguntas = {
  titulo: "Perguntas frequentes.",
  link: "Ver todas as perguntas",
  // Uma por persona; respostas genéricas que remetem à operadora (R16, R24–R28).
  itens: [
    {
      pergunta: "Plano de saúde para idoso tem carência?",
      resposta:
        "Sim. As regras de carência valem para qualquer idade: até 24 horas para urgência e emergência, até 300 dias para parto e até 180 dias para os demais casos. Algumas operadoras oferecem prazos menores; mostramos isso na comparação.",
    },
    {
      pergunta: "Como sei se o hospital que eu quero está no plano?",
      resposta:
        "A rede varia por operadora e por linha de produto e muda com o tempo. Conferimos a rede atual do produto exato antes de você assinar.",
    },
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
      pergunta: "A doença que eu já tenho vai ser coberta?",
      resposta:
        "Depende do que for informado na declaração de saúde. Para doenças preexistentes declaradas, a operadora pode aplicar cobertura parcial temporária de até 24 meses, que alcança só cirurgias, leitos de alta tecnologia e procedimentos de alta complexidade ligados a essa doença. Consultas e exames seguem cobertos. Declare tudo: omitir pode levar à suspensão ou ao cancelamento do plano.",
    },
    {
      pergunta: "Quanto custa um plano de saúde?",
      resposta:
        "Depende da idade de cada pessoa, da operadora, do tipo de contrato, da região, da acomodação e da coparticipação. Por isso não publicamos tabela: fazemos a simulação para o seu perfil.",
    },
  ],
};

export const chamadaFinal = {
  titulo: "Para quando precisar, escolha hoje com calma.",
  assinatura: "Primeiro o hospital. Depois o plano.",
  secundario: "Prefiro que me liguem",
};
