/**
 * Dados dos guias (etapa 5). RASCUNHO, conteúdo a validar com a GWL.
 * Regra do harness R28: toda menção de rede leva operadora, produto e **data de referência**.
 * `validarGuias()` roda antes de todo build (scripts/verificar-dados.mts): sem data válida, o build falha
 * em qualquer estágio, não só em produção.
 * Sem imports com "@/" (lido pelo script de build).
 */
import { registrarPendencia } from "./pendencias.ts";

/** Uma linha de rede: só entra quando conferida na operadora, com data (AAAA-MM-DD) e fonte. */
export type LinhaRede = {
  operadora: string;
  produto: string; // nome do produto como registrado na ANS (R22)
  atendimentos: string; // o que o produto inclui neste hospital (ex.: "pronto-socorro e internação")
  dataReferencia: string; // AAAA-MM-DD
  fonte: string; // onde foi conferido (ex.: "rede online da operadora")
};

export type GuiaHospital = {
  slug: string;
  nome: string;
  bairro: string;
  palavraChave: string;
  /** Rede conferida. Vazia enquanto a GWL não validar: a página mostra o estado "em validação". */
  rede: LinhaRede[];
  validado: boolean;
};

export type GuiaBairro = {
  slug: string;
  nome: string;
  palavraChave: string;
  abertura: string;
  /** Slugs de guias de hospital da região e nomes sem guia. */
  hospitais: { nome: string; slugGuia?: string }[];
  dicas: { titulo: string; texto: string }[];
  validado: boolean;
};

export const guiasHospitais: GuiaHospital[] = [
  {
    slug: "hospital-sao-camilo-santana",
    nome: "Hospital São Camilo Santana",
    bairro: "santana",
    palavraChave: "Plano de saúde que atende o Hospital São Camilo Santana",
    rede: [],
    validado: false,
  },
];

export const guiasBairros: GuiaBairro[] = [
  {
    slug: "santana",
    nome: "Santana",
    palavraChave: "Plano de saúde em Santana",
    abertura:
      "Os hospitais da região e como escolher um plano que os inclua. Comece pelos lugares da sua rotina; a rede de cada guia vem com a data em que foi conferida.",
    hospitais: [
      { nome: "Hospital São Camilo Santana", slugGuia: "hospital-sao-camilo-santana" },
      { nome: "Hospital Nipo-Brasileiro" },
    ],
    dicas: [
      {
        titulo: "Comece pelos lugares da rotina",
        texto: "Liste o pronto-socorro mais perto de casa, o hospital onde a família já se trata e o laboratório que vocês usam. A comparação parte deles.",
      },
      {
        titulo: "Pense no caminho, não só no endereço",
        texto: "Para quem trabalha em outra região, vale incluir um hospital perto do trabalho. Um plano de abrangência regional pode bastar; se a família viaja ou se trata fora, o nacional pode fazer sentido.",
      },
      {
        titulo: "Confira o produto exato",
        texto: "A mesma operadora tem produtos com redes diferentes, e a rede muda com o tempo. Sempre conferimos a rede atual do produto antes de você decidir.",
      },
    ],
    validado: false,
  },
];

export const rotaGuiaHospital = (slug: string) => `/guias/hospitais/${slug}/`;
export const rotaGuiaBairro = (slug: string) => `/guias/bairros/${slug}/`;

/** Data AAAA-MM-DD → "27/10/2026". */
export function formatarData(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/** Erros que impedem qualquer build (R28: rede sem data, operadora ou produto). */
export function validarGuias(): string[] {
  const erros: string[] = [];
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  for (const g of guiasHospitais) {
    g.rede.forEach((r, i) => {
      if (!iso.test(r.dataReferencia) || Number.isNaN(Date.parse(r.dataReferencia)))
        erros.push(`guia ${g.slug}, rede[${i}]: data de referência ausente ou inválida`);
      if (!r.operadora || !r.produto) erros.push(`guia ${g.slug}, rede[${i}]: operadora e produto são obrigatórios`);
      if (!r.fonte) erros.push(`guia ${g.slug}, rede[${i}]: fonte da conferência é obrigatória`);
    });
  }
  for (const b of guiasBairros) {
    for (const h of b.hospitais) {
      if (h.slugGuia && !guiasHospitais.some((g) => g.slug === h.slugGuia))
        erros.push(`guia de bairro ${b.slug}: guia de hospital "${h.slugGuia}" não existe`);
    }
  }
  return erros;
}

for (const g of guiasHospitais) if (!g.validado) registrarPendencia(`guia-${g.slug}`, `Guia do ${g.nome}: rede e conteúdo a validar com a GWL (R28)`);
for (const b of guiasBairros) if (!b.validado) registrarPendencia(`guia-bairro-${b.slug}`, `Guia de ${b.nome}: conteúdo a validar com a GWL`);

/** Rota do guia de um hospital pelo nome, se existir (atalhos da home e das páginas de perfil). */
export function guiaDoHospital(nome: string): string | undefined {
  const g = guiasHospitais.find((x) => x.nome === nome);
  return g ? rotaGuiaHospital(g.slug) : undefined;
}
