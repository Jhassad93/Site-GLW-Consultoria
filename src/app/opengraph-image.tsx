import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Imagem de compartilhamento padrão (1200×630), no visual do DESIGN.md v2. Gerada no build. */
export const dynamic = "force-static";
export const alt = "GWL Corretora de Seguros: planos de saúde e odontológicos em Santana, São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagem() {
  const fontes = join(process.cwd(), "node_modules/@fontsource");
  const [titulo, corpo] = await Promise.all([
    readFile(join(fontes, "inter-tight/files/inter-tight-latin-500-normal.woff")),
    readFile(join(fontes, "inter/files/inter-latin-400-normal.woff")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F1A12",
          color: "#F3F2EE",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontFamily: "Inter Tight", fontSize: 44, letterSpacing: "-0.04em" }}>GWL</span>
          <span style={{ fontSize: 22, color: "rgba(243,242,238,0.75)" }}>Corretora de Seguros</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={{ fontFamily: "Inter Tight", fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: 900 }}>
            Primeiro o hospital. Depois o plano.
          </span>
          <span style={{ fontSize: 28, color: "rgba(243,242,238,0.8)" }}>
            Planos de saúde e odontológicos · Santana, zona norte de São Paulo
          </span>
        </div>
        <div style={{ display: "flex", width: 56, height: 56, borderRadius: 999, background: "#C9E27A" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: titulo, weight: 500, style: "normal" },
        { name: "Inter", data: corpo, weight: 400, style: "normal" },
      ],
    },
  );
}
