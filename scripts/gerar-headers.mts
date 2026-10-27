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

writeFileSync("out/_headers", linhas.join("\n") + "\n");
console.log(`[gerar-headers] out/_headers gerado (${stage}).`);
