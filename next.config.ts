import type { NextConfig } from "next";

/**
 * Exportação estática para Cloudflare Pages (SCHEMA.md / PUBLICACAO.md).
 * O formulário é atendido por uma função da Cloudflare (functions/api/contato), não pelo Next.
 * Cabeçalhos (noindex da prévia, segurança) vão em out/_headers, gerado por scripts/gerar-headers.mts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // cacheComponents/partialPrefetching (PPR) não são compatíveis com output: "export".
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
