import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/600.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/atkinson-hyperlegible-next/400.css";
import "@fontsource/atkinson-hyperlegible-next/700.css";
import "./globals.css";
import { SITE_URL, isPreview } from "@/config/site";
import { FaixaPreview } from "@/components/faixa-preview";
import { PularConteudo } from "@/components/site/pular-conteudo";
import { Cabecalho } from "@/components/site/cabecalho";
import { Rodape } from "@/components/site/rodape";
import { BarraWhatsApp } from "@/components/site/barra-whatsapp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GWL Corretora de Seguros — planos de saúde e odontológicos em Santana, SP",
    template: "%s | GWL Corretora de Seguros",
  },
  description:
    "Corretora de planos de saúde e odontológicos em Santana, zona norte de São Paulo. Comparamos planos de várias operadoras e explicamos carência, reajuste e tipo de contrato antes de você assinar.",
  // Prévia nunca é indexada (harness, Anexo D). Reforçado por X-Robots-Tag em out/_headers.
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-dvh flex-col">
        <PularConteudo />
        {isPreview && <FaixaPreview />}
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Rodape />
        <BarraWhatsApp />
      </body>
    </html>
  );
}
