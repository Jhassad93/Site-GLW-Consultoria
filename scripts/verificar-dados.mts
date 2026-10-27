/**
 * Roda antes do build (npm run build).
 * Em SITE_STAGE=production, falha se algum dado da empresa ou trecho de conteúdo não estiver confirmado.
 * Em preview, só lista as pendências.
 */
import { camposNaoConfirmados } from "../src/content/empresa.ts";
import { pendenciasDeConteudo } from "../src/content/pendencias.ts";
// Conteúdos que registram pendências ao serem carregados:
import "../src/content/home.ts";

const stage = process.env.SITE_STAGE === "production" ? "production" : "preview";
const dados = camposNaoConfirmados();
const conteudo = pendenciasDeConteudo();
const total = dados.length + conteudo.length;

const lista = [
  ...dados.map((d) => `  - dado da empresa: ${d}`),
  ...conteudo.map((c) => `  - conteúdo [${c.id}]: ${c.motivo}`),
].join("\n");

if (total === 0) {
  console.log(`[verificar-dados] ${stage}: nenhum dado ou conteúdo "a confirmar".`);
} else if (stage === "production") {
  console.error(
    `[verificar-dados] Build de produção bloqueado: ${total} pendência(s).\n${lista}\n` +
      "Confirme com o cliente e atualize src/content/empresa.ts e os arquivos de conteúdo.",
  );
  process.exit(1);
} else {
  console.log(`[verificar-dados] preview: ${total} pendência(s) "a confirmar":\n${lista}`);
}
