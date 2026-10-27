import { A_CONFIRMAR, type Dado } from "@/content/empresa";

/**
 * Texto de um dado da empresa para exibição.
 * Não confirmado: valor seguido de "(a confirmar)", ou só "a confirmar" quando ainda não há valor.
 * Em production o build já falha antes de chegar aqui (scripts/verificar-dados.mts).
 */
export function exibir(dado: Dado<string | null>): string {
  if (dado.confirmado && dado.valor) return dado.valor;
  return dado.valor ? `${dado.valor} (${A_CONFIRMAR})` : A_CONFIRMAR;
}

export function formatarTelefone(digitos: string): string {
  const d = digitos.replace(/\D/g, "").replace(/^55/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digitos;
}
