import type { NextConfig } from "next";

/**
 * Hospedagem na Vercel (decisão de João em 28/10/2026; docs/PUBLICACAO.md). DNS e Turnstile ficam na Cloudflare.
 * As páginas de conteúdo continuam geradas no build (HTML pronto); só /api/contato roda no servidor.
 * Cabeçalhos: segurança em todo o site, noindex na prévia (harness, Anexo D) e cache das mídias.
 */
const ehPrevia = process.env.SITE_STAGE !== "production";

const seguranca = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: ehPrevia ? [...seguranca, { key: "X-Robots-Tag", value: "noindex, nofollow" }] : seguranca,
      },
      // Vídeo, fotos e logos: arquivos grandes, trocados raramente (o nome muda a cada nova versão).
      { source: "/midia/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
