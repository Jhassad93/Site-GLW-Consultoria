/**
 * Dados variáveis das páginas legais (etapa 9). Os textos ficam nas páginas; aqui ficam as pendências que
 * bloqueiam a produção. RASCUNHO jurídico: revisar com João e com o cliente antes de publicar.
 * Sem imports com "@/" (lido pelo script de build).
 */
import { pendente, registrarPendencia } from "./pendencias.ts";

export const VERSAO_POLITICA = "27 de outubro de 2026";
export const VERSAO_TERMOS = "27 de outubro de 2026";

export const encarregado = pendente(
  "encarregado",
  "[Nome do encarregado e e-mail do canal do titular]",
  "Encarregado (DPO) e canal do titular na política de privacidade (LGPD, art. 41; checklist de produção, item 15)",
);

registrarPendencia("revisao-juridica", "Revisão jurídica da política de privacidade, dos termos de uso e da base legal (LGPD, art. 7º, V)");
