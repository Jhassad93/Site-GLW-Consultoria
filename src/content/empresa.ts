/**
 * Dados da entidade, num único lugar (BRIEF.md › Entidade; harness R1, R3, R19).
 * Todo dado que o cliente ainda não confirmou fica com `confirmado: false`.
 * Em preview ele aparece como "a confirmar"; em production o build falha.
 * Fontes públicas consultadas em 27/10/2026 (ver claude/diagnostico-presenca-atual.md).
 */
export type Dado<T> = {
  valor: T;
  confirmado: boolean;
  fonte?: string;
};

const aConfirmar = <T>(valor: T, fonte?: string): Dado<T> => ({ valor, confirmado: false, fonte });
const confirmado = <T>(valor: T, fonte?: string): Dado<T> => ({ valor, confirmado: true, fonte });

export const empresa = {
  nomeFantasia: confirmado("GWL Corretora de Seguros", "site, Instagram e CNPJ"),
  razaoSocial: aConfirmar("GWL Corretora de Seguros Ltda", "cnpja.com"),
  cnpj: aConfirmar("41.131.963/0001-01", "cnpja.com"),
  registroSusep: aConfirmar<string | null>(null),
  responsavelTecnico: aConfirmar<{ nome: string; registroSusep: string } | null>(null),
  endereco: aConfirmar(
    {
      logradouro: "Rua Salete, 251, 2º andar",
      bairro: "Santana",
      cidade: "São Paulo",
      uf: "SP",
      cep: "02016-001",
    },
    "cnpja.com e Google Business",
  ),
  telefone: aConfirmar<string | null>(null),
  // Número publicado no site antigo; há três números em uso (site, Instagram, Google). Só dígitos, com 55.
  whatsapp: aConfirmar("5511992793092", "site antigo gwlcorretora.com.br; divergente do Instagram e do Google"),
  email: aConfirmar<string | null>(null),
  horarioAtendimento: aConfirmar<string | null>(null),
  operadoras: aConfirmar<string[]>([], "a lista do site antigo depende de confirmação e autorização (R3, R7)"),
  instagram: confirmado("https://www.instagram.com/gwl.corretoradeseguros/"),
} as const;

export type Empresa = typeof empresa;

/** Texto exibido no lugar de um dado não confirmado (preview). */
export const A_CONFIRMAR = "a confirmar";

/** Lista os campos ainda não confirmados (usado pelo verificador de build). */
export function camposNaoConfirmados(): string[] {
  return Object.entries(empresa)
    .filter(([, dado]) => !dado.confirmado)
    .map(([campo]) => campo);
}
