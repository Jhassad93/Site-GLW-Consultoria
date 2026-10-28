/**
 * Estágio de publicação (decisão de 27/10/2026, harness, Anexo D).
 * O código é o mesmo da versão final; só a configuração muda:
 * - "preview": dados não confirmados aparecem como "a confirmar", noindex (a faixa de prévia saiu em 28/10/2026).
 * - "production": sem faixa, indexável; o build falha se restar algum dado não confirmado
 *   (scripts/verificar-dados.mts).
 * Lido no build (na Vercel, variável de ambiente do projeto). Padrão seguro: preview.
 */
export type SiteStage = "preview" | "production";

const raw = process.env.SITE_STAGE;

export const SITE_STAGE: SiteStage = raw === "production" ? "production" : "preview";

export const isPreview = SITE_STAGE === "preview";

// Na prévia da Vercel sem SITE_URL definido, usa o endereço .vercel.app do projeto.
const urlVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;
export const SITE_URL = process.env.SITE_URL ?? urlVercel ?? "https://gwlcorretora.com.br";
