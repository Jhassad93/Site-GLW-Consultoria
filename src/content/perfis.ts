/**
 * Conteúdo das páginas por perfil (etapa 4). RASCUNHO, pendente de revisão do responsável técnico.
 * Fontes: docs/COPY.md v3 › 4 (H1 e abertura), docs/PERSONAS.md (dores e dúvidas), docs/COPY.md › 5 (respostas).
 * Harness conferido: R4, R16, R23–R29 (ver comentários por trecho). Sem imports com "@/" (lido pelo script de build).
 */
import { pendente } from "./pendencias.ts";

export type PerfilId = "pais-60-mais" | "familia" | "empresa" | "mei" | "trocar";

export type ConteudoPerfil = {
  id: PerfilId;
  rota: string;
  /** <title> com a palavra-chave principal (APP_FLOW › Páginas). */
  tituloPagina: string;
  descricao: string;
  sobretitulo: string;
  /** Palavra-chave principal, exibida como primeira linha do H1 (IMPLEMENTATION_PLAN › Etapa 4). */
  palavraChave: string;
  h1: string;
  abertura: string;
  imagem?: { id: string; descricao: string; src?: string; srcSet?: string };
  pares: { titulo: string; preocupacao: string; resposta: string }[];
  /** Mostra os atalhos de hospital (personas para quem o hospital é o critério nº 1). */
  hospitais?: boolean;
  perguntas: { pergunta: string; resposta: string }[];
};

const posVenda = (texto: string) => pendente("pos-venda", texto, "Escopo do pós-venda (COPY.md › Como funciona)");

const carenciaGeral =
  "As regras de carência valem para qualquer idade: até 24 horas para urgência e emergência, até 300 dias para parto e até 180 dias para os demais casos. Algumas operadoras oferecem prazos menores; mostramos isso na comparação.";

const doencaPreexistente =
  "Depende do que for informado na declaração de saúde. Para doenças preexistentes declaradas, a operadora pode aplicar cobertura parcial temporária de até 24 meses, que alcança só cirurgias, leitos de alta tecnologia e procedimentos de alta complexidade ligados a essa doença. Consultas e exames seguem cobertos. Declare tudo: omitir pode levar à suspensão ou ao cancelamento do plano.";

export const paginasPerfil: Record<PerfilId, ConteudoPerfil> = {
  "pais-60-mais": {
    id: "pais-60-mais",
    rota: "/planos-de-saude-60-mais/",
    tituloPagina: "Plano de saúde para idosos na zona norte de SP",
    descricao:
      "Plano de saúde para seus pais com 60 anos ou mais, comparado pela rede onde eles já se tratam. Explicamos reajuste, carência e doenças preexistentes antes da escolha.",
    sobretitulo: "Planos para 60+ · zona norte de São Paulo",
    palavraChave: "Plano de saúde para idosos",
    h1: "Plano de saúde para seus pais, com a rede onde eles se tratam.",
    abertura:
      "Depois dos 60, o plano mais barato hoje pode não ser o mais sustentável amanhã. Comparamos opções pela rede e explicamos o reajuste de cada tipo de contrato antes da escolha.",
    imagem: { id: "IMG-09", descricao: "Imagem IMG-09 · pai de 70 anos caminhando no parque com a filha", src: "/midia/imagens/img-09-640.webp", srcSet: "/midia/imagens/img-09-640.webp 640w, /midia/imagens/img-09-1024.webp 1024w" },
    hospitais: true,
    pares: [
      {
        titulo: "O hospital deles",
        preocupacao: "Eles já se tratam num hospital e não querem trocar.",
        // R28: rede varia por produto e muda.
        resposta: "Começamos por ele: conferimos quais planos incluem esse hospital na rede atual, com a data da consulta.",
      },
      {
        titulo: "O preço com a idade",
        preocupacao: "O preço sobe muito depois dos 60, e é difícil entender por quê.",
        resposta:
          "Mostramos como o preço é definido por faixa etária, conforme o contrato e as regras da ANS, e quanto cada opção custa hoje para a idade deles.",
      },
      {
        titulo: "O reajuste nos próximos anos",
        preocupacao: "Medo de um reajuste que obrigue a cancelar o plano depois.",
        // R27: sem promessa sobre reajuste.
        resposta:
          "Explicamos a diferença entre o reajuste do individual, que tem teto anual definido pela ANS, e o dos coletivos, que segue o contrato. Assim vocês escolhem pensando nos próximos anos, não só no primeiro boleto.",
      },
      {
        titulo: "As doenças que eles já têm",
        preocupacao: "Pressão alta, diabetes: será que o plano cobre?",
        // R24 e R25: CPT sem minimizar; nunca sugerir omissão.
        resposta:
          "Explicamos a declaração de saúde e a cobertura parcial temporária, que dura no máximo 24 meses e só alcança alguns procedimentos ligados à doença declarada. Declarar tudo protege o contrato.",
      },
    ],
    perguntas: [
      { pergunta: "Plano de saúde para idoso tem carência?", resposta: `Sim. ${carenciaGeral}` },
      {
        pergunta: "Meu pai tem mais de 70 anos. Ainda consegue contratar?",
        resposta:
          "Sim. A lei dos planos de saúde proíbe impedir alguém de contratar por causa da idade. O preço considera a faixa etária, e a operadora pede a declaração de saúde, como para qualquer pessoa.",
      },
      { pergunta: "A doença que ele já tem vai ser coberta?", resposta: doencaPreexistente },
      {
        pergunta: "Individual ou coletivo: qual reajusta menos?",
        resposta:
          "Não dá para garantir qual vai reajustar menos. No individual, o reajuste anual tem teto definido pela ANS; nos coletivos, segue o contrato e não tem esse teto. Os dois também mudam por faixa etária, conforme o contrato. Mostramos as regras de cada opção antes da escolha.",
      },
      {
        pergunta: "Posso ter ajuda para preencher a declaração de saúde?",
        resposta: "Sim. Você tem direito a preencher a declaração com orientação de um médico da rede da operadora, sem custo.",
      },
    ],
  },

  familia: {
    id: "familia",
    rota: "/planos-de-saude-familia/",
    tituloPagina: "Plano de saúde familiar em Santana e zona norte",
    descricao:
      "Plano de saúde para a família perto de casa: pediatria, pronto-socorro e maternidade na zona norte de SP, com carência de parto e coparticipação explicadas antes.",
    sobretitulo: "Planos para a família · Santana e zona norte",
    palavraChave: "Plano de saúde familiar",
    h1: "Plano de saúde para a família, perto de casa.",
    abertura:
      "Pediatria, pronto-socorro e maternidade na zona norte: começamos pelos lugares que vocês já usam. Explicamos carência de parto, coparticipação e acomodação sem pressa.",
    imagem: { id: "IMG-10", descricao: "Imagem IMG-10 · pai com o filho nos ombros numa feira de bairro", src: "/midia/imagens/img-10-640.webp", srcSet: "/midia/imagens/img-10-640.webp 640w, /midia/imagens/img-10-1024.webp 1024w" },
    hospitais: true,
    pares: [
      {
        titulo: "Pronto-socorro e maternidade",
        preocupacao: "Pronto-socorro lotado ou longe de casa.",
        resposta:
          "Começamos pelos hospitais, pronto-socorros e maternidades que vocês já usam na zona norte e conferimos quais planos os incluem hoje.",
      },
      {
        titulo: "Carência de parto",
        preocupacao: "Vocês planejam um filho e ouviram que a carência é longa.",
        // R24: prazo máximo e condição de redução.
        resposta:
          "A carência máxima para parto é de 300 dias. Explicamos isso antes, e, se alguma operadora oferecer prazo menor, mostramos as condições por escrito.",
      },
      {
        titulo: "Coparticipação",
        preocupacao: "Não sabem se a coparticipação compensa.",
        resposta:
          "Simulamos com o uso real da família: para quem vai pouco ao médico, a mensalidade menor costuma compensar; com acompanhamento frequente, pode sair mais caro.",
      },
      {
        titulo: "Acomodação e abrangência",
        preocupacao: "Enfermaria ou apartamento? Regional ou nacional?",
        resposta: "Explicamos a acomodação e a abrangência de cada opção e quanto cada escolha muda no preço.",
      },
    ],
    perguntas: [
      {
        pergunta: "Quanto tempo de carência para parto?",
        resposta:
          "Até 300 dias para parto a termo. Se a família entrar por um plano da empresa com 30 ou mais participantes, quem entra em até 30 dias da contratação não cumpre carência.",
      },
      {
        pergunta: "O bebê recém-nascido entra no plano?",
        resposta:
          "Quando o plano inclui obstetrícia, o recém-nascido filho do titular tem cobertura nos primeiros 30 dias após o parto e pode ser inscrito sem carência se a inclusão for feita em até 30 dias do nascimento. Conferimos as regras do contrato escolhido.",
      },
      {
        pergunta: "Coparticipação vale a pena?",
        resposta:
          "Costuma compensar para quem usa pouco o plano, porque a mensalidade é menor e você paga uma parte de cada consulta ou exame. Para quem faz acompanhamento frequente, pode sair mais caro. Simulamos com o seu uso.",
      },
      {
        pergunta: "Plano só ambulatorial serve para a família?",
        resposta:
          "O ambulatorial cobre consultas e exames, mas não cobre internação. Para famílias com crianças pequenas ou que planejam uma gravidez, costuma ser importante ter segmentação hospitalar com obstetrícia. Explicamos cada segmentação antes da escolha.",
      },
      {
        pergunta: "Vale contratar o odontológico junto?",
        resposta: "Pode ser contratado junto ou separado. Comparamos as duas formas e o que cada uma inclui para as crianças e os adultos.",
      },
    ],
  },

  empresa: {
    id: "empresa",
    rota: "/planos-de-saude-empresas/",
    tituloPagina: "Plano de saúde empresarial na zona norte de SP",
    descricao:
      "Plano de saúde para a equipe da sua empresa, com corretora do bairro. Explicamos o reajuste do contrato empresarial, carências e vidas antes da proposta.",
    sobretitulo: "Planos empresariais · pequenas e médias empresas da zona norte",
    palavraChave: "Plano de saúde empresarial",
    h1: "Plano de saúde para a sua equipe, com quem está no bairro.",
    abertura: `Ajudamos a escolher o plano da empresa e explicamos antes como funciona o reajuste anual do contrato empresarial. ${posVenda(
      "Seguimos junto nas inclusões, exclusões e dúvidas da equipe.",
    )}`,
    pares: [
      {
        titulo: "Reajuste do contrato",
        preocupacao: "O reajuste anual é imprevisível.",
        // R27: explicar sem prometer.
        resposta:
          "O reajuste do plano empresarial segue o contrato e, em muitos casos, considera o uso do plano pelo grupo. Explicamos como ele é calculado antes da assinatura, para não haver surpresa na regra.",
      },
      {
        titulo: "Número de vidas",
        preocupacao: "Não sabe com quantas pessoas pode contratar.",
        resposta: "O mínimo de vidas varia por operadora e produto. Conferimos as regras de cada opção para o tamanho da sua empresa.",
      },
      {
        titulo: "Rede para a equipe",
        preocupacao: "Funcionário reclamando de rede ou de autorização.",
        resposta: "Comparamos a rede pensando onde a equipe mora e trabalha, não só no preço por vida.",
      },
      {
        titulo: "Depois da venda",
        preocupacao: "Corretor que só aparece na hora de vender.",
        resposta: posVenda("Seguimos com você nas inclusões, exclusões e na carta de reajuste."),
      },
    ],
    perguntas: [
      {
        pergunta: "Funcionário tem carência no plano empresarial?",
        // R24: carência zero só com a condição.
        resposta:
          "Depende do tamanho do grupo. Em planos empresariais com 30 ou mais participantes, quem entra em até 30 dias da contratação ou da admissão não cumpre carência. Com menos participantes, a operadora pode aplicar carência, dentro dos limites da lei.",
      },
      {
        pergunta: "Posso incluir os sócios e as famílias?",
        resposta:
          "Sócios e funcionários com vínculo com a empresa podem ser incluídos, e os dependentes conforme as regras do contrato. Conferimos quem pode entrar em cada opção.",
      },
      {
        pergunta: "Como funciona o reajuste do plano empresarial?",
        resposta:
          "Há o reajuste anual, que segue o contrato e não tem o teto definido pela ANS para os planos individuais, e o reajuste por faixa etária, previsto no contrato. Mostramos as regras de cada opção antes da proposta.",
      },
      {
        pergunta: "Coparticipação reduz o custo da empresa?",
        resposta:
          "Reduz a mensalidade, e cada consulta ou exame tem uma parte paga pelo usuário ou pela empresa, conforme o contrato. Simulamos com o perfil de uso da equipe.",
      },
    ],
  },

  mei: {
    id: "mei",
    rota: "/planos-de-saude-mei/",
    tituloPagina: "Plano de saúde para MEI e autônomos em São Paulo",
    descricao:
      "Plano de saúde pelo CNPJ para MEI: quando faz sentido e quando não. Regras de 6 meses de CNPJ, reajuste e cancelamento explicados, com comparação com o individual e a adesão.",
    sobretitulo: "MEI e autônomos · plano pelo CNPJ",
    palavraChave: "Plano de saúde para MEI",
    h1: "Plano de saúde pelo CNPJ: quando faz sentido e quando não.",
    abertura:
      "O plano empresarial pode ser uma opção para MEI com CNPJ ativo há pelo menos 6 meses, mas tem regras próprias de reajuste e cancelamento. Comparamos com o individual e com a adesão para você decidir com clareza.",
    pares: [
      {
        titulo: "É confiável?",
        preocupacao: "Ofertas de plano pelo CNPJ que parecem boas demais.",
        // R26: nunca incentivar MEI de fachada.
        resposta:
          "O plano empresarial para empresário individual existe e é regulado pela ANS. O problema são ofertas que escondem as regras ou sugerem abrir um CNPJ só para pagar menos. Isso a GWL não faz.",
      },
      {
        titulo: "Meu CNPJ serve?",
        preocupacao: "Não sabe se o seu MEI pode contratar.",
        resposta: "O CNPJ precisa estar ativo e regular há pelo menos 6 meses, com comprovação na contratação e todos os anos.",
      },
      {
        titulo: "Cancelamento e reajuste",
        preocupacao: "Medo de o plano ser cancelado ou de um reajuste alto.",
        resposta:
          "No contrato coletivo, o reajuste e as regras de cancelamento seguem o contrato, sem o teto anual do individual. Explicamos essas cláusulas antes de comparar preços.",
      },
      {
        titulo: "Comparação honesta",
        preocupacao: "Promessas de economia sem explicação.",
        // R4 e R9: nada de percentual sem fonte.
        resposta:
          "Comparamos o plano pelo CNPJ com o individual e com a adesão pela sua profissão, com as regras de cada um lado a lado, e não só o preço.",
      },
      {
        titulo: "Quando não faz sentido",
        preocupacao: "Ter certeza de que o plano pelo CNPJ é mesmo para você.",
        // R26: critérios só a partir das regras já citadas.
        resposta:
          "Se o CNPJ tem menos de 6 meses ou não corresponde a uma atividade real, ou se você prefere o teto anual de reajuste e as regras de cancelamento do individual, o individual ou a adesão tendem a ser melhores. Dizemos isso com franqueza.",
      },
    ],
    perguntas: [
      {
        pergunta: "MEI pode contratar plano empresarial?",
        resposta:
          "Pode, se o CNPJ estiver ativo e regular há pelo menos 6 meses, com comprovação na contratação e todos os anos. É um contrato coletivo, com regras próprias de reajuste e cancelamento. Comparamos com o individual antes de você decidir.",
      },
      {
        pergunta: "Vale abrir um MEI só para ter plano de saúde?",
        resposta:
          "Não recomendamos. O plano pelo CNPJ é para quem já tem uma atividade real, com CNPJ regular há pelo menos 6 meses. Se esse não é o seu caso, comparamos o individual e a adesão.",
      },
      {
        pergunta: "A operadora pode cancelar o plano?",
        resposta:
          "No contrato coletivo, as regras de cancelamento seguem o contrato. É diferente do individual, em que a operadora só pode cancelar por fraude ou falta de pagamento. Mostramos essas cláusulas antes da assinatura.",
      },
      {
        pergunta: "Posso incluir a minha família?",
        resposta: "Em geral, sim, como dependentes, conforme as regras do contrato e da operadora. Conferimos quem pode entrar em cada opção.",
      },
      {
        pergunta: "A adesão pela minha profissão é melhor?",
        resposta:
          "Depende. A adesão exige vínculo real com uma entidade de classe ou profissional e também segue as regras do contrato coletivo. Comparamos as três opções para o seu caso.",
      },
    ],
  },

  trocar: {
    id: "trocar",
    rota: "/trocar-de-plano/",
    tituloPagina: "Trocar de plano de saúde e portabilidade de carências",
    descricao:
      "Quer trocar de plano de saúde? Antes, analisamos seu contrato, sua rede e as carências que você já cumpriu, e explicamos a portabilidade de carências.",
    sobretitulo: "Trocar de plano · portabilidade de carências",
    palavraChave: "Portabilidade de plano de saúde",
    h1: "Quer trocar de plano? Primeiro, vamos olhar o seu.",
    abertura:
      "Antes de propor qualquer troca, analisamos seu contrato, sua rede e as carências que você já cumpriu. Às vezes trocar compensa; às vezes, não.",
    hospitais: true,
    pares: [
      {
        titulo: "Carências já cumpridas",
        preocupacao: "Medo de recomeçar as carências do zero.",
        resposta: pendente(
          "portabilidade",
          "Em muitos casos, a portabilidade de carências permite trocar sem cumprir carência de novo, quando os requisitos da ANS são atendidos.",
          "Requisitos da portabilidade conferidos na norma vigente da ANS (COPY.md, FAQ 10)",
        ),
      },
      {
        titulo: "Reajuste alto",
        preocupacao: "A carta de reajuste chegou e o valor assustou.",
        resposta: "Conferimos o tipo do seu contrato e a regra de reajuste que vale para ele, e comparamos com outras opções.",
      },
      {
        titulo: "O hospital saiu da rede",
        preocupacao: "O hospital preferido deixou de atender pelo seu plano.",
        resposta: "Comparamos planos que incluem o hospital que você quer manter, com a rede atual conferida na operadora.",
      },
      {
        titulo: "Quem já tem uma condição de saúde",
        preocupacao: "Medo de que uma doença atual vire problema na troca.",
        // R12/R25: nenhum dado de saúde no site.
        resposta:
          "Explicamos no atendimento individual as regras da ANS para portabilidade e doenças preexistentes. O site não pede nenhuma informação de saúde.",
      },
    ],
    perguntas: [
      {
        pergunta: "Posso trocar de plano sem cumprir carência de novo?",
        resposta: pendente(
          "portabilidade",
          "Em muitos casos, sim, pela portabilidade de carências, que a ANS permite quando há tempo mínimo de permanência, pagamentos em dia e um plano compatível. Analisamos o seu caso.",
        ),
      },
      {
        pergunta: "O que é portabilidade de carências?",
        resposta: pendente(
          "portabilidade",
          "É a troca de plano aproveitando as carências já cumpridas, sem precisar cumpri-las de novo, quando os requisitos da ANS são atendidos.",
        ),
      },
      {
        pergunta: "Meu reajuste foi abusivo?",
        resposta:
          "Podemos explicar a regra de reajuste que vale para o seu tipo de contrato. Se você achar que houve erro, pode reclamar na operadora e na ANS, pelo site gov.br/ans ou pelo Disque ANS.",
      },
      {
        pergunta: "Existe plano com o mesmo hospital e preço menor?",
        resposta:
          "Pode existir, mas depende da idade, do tipo de contrato e da rede. Comparamos com a mesma rede antes de recomendar qualquer troca, e às vezes a recomendação é ficar.",
      },
    ],
  },
};

export const ordemPerfis: PerfilId[] = ["pais-60-mais", "familia", "empresa", "mei", "trocar"];
