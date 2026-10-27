import { ImageResponse } from "next/og";

/** Ícone para a tela inicial do iPhone (180×180), provisório até o logotipo original em vetor. */
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icone() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0F1A12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
          <path d="M44.5 23.5A14 14 0 1 0 46 38H33" fill="none" stroke="#F3F2EE" strokeWidth="6" strokeLinecap="round" />
          <circle cx="47" cy="17" r="4" fill="#C9E27A" />
        </svg>
      </div>
    ),
    size,
  );
}
