import type { Metadata } from "next";
import { rotas } from "@/content/navegacao";
import { obrigado } from "@/content/institucional";
import { LinkBotao } from "@/components/gwl/botao";

export const metadata: Metadata = {
  title: "Recebemos seu pedido",
  robots: { index: false, follow: true },
};

/** Obrigado (APP_FLOW › Fluxo 2): noindex, sem beco sem saída (Home e FAQ). Evento generate_lead entra na etapa 10. */
export default function Obrigado() {
  return (
    <section aria-labelledby="titulo-obrigado" className="mx-auto w-full max-w-[1200px] px-5 pt-40 pb-32 md:px-10 md:pt-48">
      <p className="text-[0.9375rem] text-musgo">Pedido de contato</p>
      <h1 id="titulo-obrigado" className="mt-6 max-w-[16ch] text-h1-cel md:text-h1">
        Recebemos!
      </h1>
      <p className="mt-7 max-w-[46ch] text-sub text-grafite">{obrigado.texto}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <LinkBotao href={rotas.perguntas} variante="escuro" seta>
          Ver como funciona a carência
        </LinkBotao>
        <LinkBotao href={rotas.home} variante="contorno">
          Voltar ao início
        </LinkBotao>
      </div>
    </section>
  );
}
