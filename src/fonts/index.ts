import localFont from "next/font/local";

/**
 * Fontes do DESIGN.md v2 servidas pelo next/font (pré-carregamento e fallback ajustado, sem salto de layout).
 * Arquivos: subconjunto latino do Fontsource (SIL OFL 1.1; ver docs/LICENCAS.md), que cobre o português.
 */
export const inter = localFont({
  src: [
    { path: "./inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--fonte-inter",
  display: "swap",
});

export const interTight = localFont({
  src: [
    { path: "./inter-tight-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./inter-tight-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--fonte-inter-tight",
  display: "swap",
});
