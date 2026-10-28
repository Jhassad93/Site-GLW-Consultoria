import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Ícone para a tela inicial do iPhone (180×180): árvore da GWL (versão simplificada) em Mata sobre Névoa. */
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icone() {
  const svg = await readFile(join(process.cwd(), "public/marca/arvore-mata-pequena.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
        { }
        <img src={src} width={150} height={109} alt="" />
      </div>
    ),
    size,
  );
}
