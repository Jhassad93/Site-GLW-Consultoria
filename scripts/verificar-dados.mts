/**
 * Roda antes do build (npm run build).
 * Em SITE_STAGE=production, falha se algum dado da empresa não estiver confirmado.
 * Em preview, só lista as pendências.
 */
import { camposNaoConfirmados } from "../src/content/empresa.ts";

const stage = process.env.SITE_STAGE === "production" ? "production" : "preview";
const pendentes = camposNaoConfirmados();

if (pendentes.length === 0) {
  console.log(`[verificar-dados] ${stage}: todos os dados da empresa estão confirmados.`);
} else if (stage === "production") {
  console.error(
    `[verificar-dados] Build de produção bloqueado. Dados não confirmados: ${pendentes.join(", ")}.\n` +
      "Confirme com o cliente e marque como confirmado em src/content/empresa.ts.",
  );
  process.exit(1);
} else {
  console.log(`[verificar-dados] preview: ${pendentes.length} dado(s) "a confirmar": ${pendentes.join(", ")}.`);
}
