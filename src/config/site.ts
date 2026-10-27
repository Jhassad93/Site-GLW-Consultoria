/**
 * Estágio de publicação (decisão de 27/10/2026, harness, Anexo D).
 * O código é o mesmo da versão final; só a configuração muda:
 * - "preview": faixa de prévia, dados não confirmados aparecem como "a confirmar", noindex.
 * - "production": sem faixa, indexável; o build falha se restar algum dado não confirmado
 *   (scripts/verificar-dados.mts).
 * Lido no build (exportação estática). Padrão seguro: preview.
 */
export type SiteStage = "preview" | "production";

const raw = process.env.SITE_STAGE;

export const SITE_STAGE: SiteStage = raw === "production" ? "production" : "preview";

export const isPreview = SITE_STAGE === "preview";

export const SITE_URL = process.env.SITE_URL ?? "https://gwlcorretora.com.br";
