import Link from "next/link";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { isPreview } from "@/config/site";

/**
 * Home provisória da etapa 2: só um topo escuro com o botão principal, para testar o cabeçalho de vidro
 * e a barra do celular. A home definitiva (DESIGN.md v2 e copy v3) entra na etapa 3.
 */
export default function Home() {
  return (
    <>
      <section className="escuro flex min-h-[44rem] items-end bg-noite text-nevoa">
        <div className="mx-auto w-full max-w-[1280px] px-5 pt-36 pb-16 md:px-10">
          <p className="mb-6 text-[0.9375rem] text-nevoa/75">Planos de saúde e odontológicos · Santana, zona norte de São Paulo</p>
          <h1 className="max-w-[15ch] text-h1-cel md:text-h1">Site em construção.</h1>
          <p className="mt-7 max-w-[40ch] text-sub text-nevoa/85">
            A página inicial completa entra na próxima etapa. Enquanto isso, fale com a GWL pelo WhatsApp.
          </p>
          <div className="mt-10">
            <BotaoWhatsApp fundo="escuro" principal />
          </div>
        </div>
      </section>
      {isPreview && (
        <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-10">
          <p className="text-musgo">
            Equipe: veja a <Link href="/componentes/">vitrine de componentes</Link>.
          </p>
          {/* espaço para testar a barra do celular ao rolar */}
          <div aria-hidden className="h-[100vh]" />
        </section>
      )}
    </>
  );
}
