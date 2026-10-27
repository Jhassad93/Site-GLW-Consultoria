/**
 * Registro de trechos de conteúdo ainda não confirmados com o cliente (os `[A CONFIRMAR]` da copy).
 * - Em preview, o texto sai com "(a confirmar)" no fim.
 * - Em production, `scripts/verificar-dados.mts` lista o registro e bloqueia o build se houver algum.
 * Sem imports com "@/": este arquivo também é lido pelo script de build (Node puro).
 */
const registro = new Map<string, string>();

export const MARCA_A_CONFIRMAR = "(a confirmar)";

/** Registra a pendência `id` e devolve o texto marcado para a prévia. */
export function pendente(id: string, texto: string, motivo = texto): string {
  registro.set(id, motivo);
  return `${texto} ${MARCA_A_CONFIRMAR}`;
}

/** Registra uma pendência sem texto visível (ex.: lista inteira ou seção que depende de autorização). */
export function registrarPendencia(id: string, motivo: string): void {
  registro.set(id, motivo);
}

export function pendenciasDeConteudo(): { id: string; motivo: string }[] {
  return [...registro].map(([id, motivo]) => ({ id, motivo }));
}
