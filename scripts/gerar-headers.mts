/**
 * Roda depois do build. Gera out/_headers para a Cloudflare Pages.
 * Na exportação estática o next.config não define cabeçalhos; por isso este arquivo.
 * Em preview, X-Robots-Tag: noindex em todo o site (harness, Anexo D).
 */
import { writeFileSync, existsSync } from "node:fs";

const stage = process.env.SITE_STAGE === "production" ? "production" : "preview";

if (!existsSync("out")) {
  console.error("[gerar-headers] pasta out/ não encontrada; rode o build antes.");
  process.exit(1);
}

const seguranca = [
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  X-Frame-Options: DENY",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
];

const linhas = ["/*", ...seguranca];
if (stage === "preview") linhas.push("  X-Robots-Tag: noindex, nofollow");

// Imagens geradas no build sem extensão (Open Graph e ícone da Apple): tipo explícito.
linhas.push("", "/opengraph-image", "  Content-Type: image/png", "", "/apple-icon", "  Content-Type: image/png");

// Vídeo e pôster do topo: arquivos grandes, trocados raramente (nome muda a cada nova versão).
linhas.push("", "/midia/*", "  Cache-Control: public, max-age=2592000");

writeFileSync("out/_headers", linhas.join("\n") + "\n");
console.log(`[gerar-headers] out/_headers gerado (${stage}).`);
