import Link from "next/link";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { isPreview } from "@/config/site";

/**
 * Home provisória da etapa 2: só o topo com o CTA principal, para testar a barra do WhatsApp.
 * A home definitiva (copy v3, seções do DESIGN.md) entra na etapa 3.
 */
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <p className="font-bold text-copa">Planos de saúde e odonto em Santana</p>
      <h1 className="mt-4 max-w-[18ch] text-[2.375rem] leading-[1.08] md:text-h1-home">
        Site em construção
      </h1>
      <p className="mt-6 max-w-[60ch] text-sub">
        A página inicial completa entra na próxima etapa. Enquanto isso, fale com a GWL pelo WhatsApp.
      </p>
      <div className="mt-10">
        <BotaoWhatsApp principal />
      </div>
      {isPreview && (
        <p className="mt-16 text-texto-2">
          Equipe: veja a <Link href="/componentes/">vitrine de componentes</Link>.
        </p>
      )}
      {/* espaço para testar a barra fixa ao rolar */}
      <div aria-hidden className="h-[120vh]" />
    </div>
  );
}
