/** Rotas do APP_FLOW.md. Menu principal e rodapé. */
export const rotas = {
  home: "/",
  pais60: "/planos-de-saude-60-mais/",
  familia: "/planos-de-saude-familia/",
  empresas: "/planos-de-saude-empresas/",
  mei: "/planos-de-saude-mei/",
  trocar: "/trocar-de-plano/",
  guias: "/guias/",
  operadoras: "/operadoras/",
  perguntas: "/perguntas-frequentes/",
  sobre: "/sobre/",
  contato: "/contato/",
  privacidade: "/privacidade/",
  termos: "/termos/",
} as const;

/** Menu do cabeçalho (DESIGN.md v2 › Componentes › Cabeçalho). */
export const menuPrincipal = [
  { rotulo: "Hospitais", href: "/#hospital" },
  { rotulo: "Tipos de plano", href: "/#tipos" },
  { rotulo: "Como funciona", href: "/#como-funciona" },
  { rotulo: "Perguntas", href: rotas.perguntas },
  { rotulo: "Sobre", href: rotas.sobre },
] as const;

export const perfis = [
  { rotulo: "Planos para 60+", href: rotas.pais60 },
  { rotulo: "Planos para a família", href: rotas.familia },
  { rotulo: "Planos para empresas", href: rotas.empresas },
  { rotulo: "MEI e autônomos", href: rotas.mei },
  { rotulo: "Trocar de plano", href: rotas.trocar },
] as const;

export const linksExternos = {
  ans: "https://www.gov.br/ans/pt-br",
  // Serviço oficial "Consultar corretores" (gov.br), conferido em 27/10/2026
  consultaSusep: "https://www.gov.br/pt-br/servicos/consultar-corretores-susep",
} as const;
