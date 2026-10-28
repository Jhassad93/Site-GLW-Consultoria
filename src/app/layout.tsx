import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, isPreview } from "@/config/site";
import { inter, interTight } from "@/fonts";
import { PularConteudo } from "@/components/site/pular-conteudo";
import { Cabecalho } from "@/components/site/cabecalho";
import { Rodape } from "@/components/site/rodape";
import { BarraWhatsApp } from "@/components/site/barra-whatsapp";
import { BannerConsentimento } from "@/components/site/consentimento";
import { JsonLd, dadosOrganizacao } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GWL Corretora de Seguros — planos de saúde e odontológicos em Santana, SP",
    template: "%s | GWL Corretora de Seguros",
  },
  description:
    "Corretora de planos de saúde e odontológicos em Santana, zona norte de São Paulo. Comparamos planos de várias operadoras e explicamos carência, reajuste e tipo de contrato antes de você assinar.",
  // Prévia nunca é indexada (harness, Anexo D). Reforçado por X-Robots-Tag em out/_headers.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GWL Corretora de Seguros",
  },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${interTight.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd dados={dadosOrganizacao()} />
        <PularConteudo />
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Rodape />
        <BarraWhatsApp />
        <BannerConsentimento />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
