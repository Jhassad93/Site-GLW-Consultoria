import type { Metadata } from "next";
import { LinkBotao } from "@/components/gwl/botao";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { rotas } from "@/content/navegacao";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/** 404 (APP_FLOW › Estados): volta ao começo pelo hospital, sem beco sem saída. */
export default function NaoEncontrada() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 pt-40 pb-32 md:px-10 md:pt-48">
      <p className="text-[0.9375rem] text-musgo">Erro 404 · página não encontrada</p>
      <h1 className="mt-6 max-w-[18ch] text-h1-cel md:text-h1">Esta página não existe. Qual hospital você quer usar?</h1>
      <p className="mt-7 max-w-[44ch] text-sub text-grafite">
        Diga o hospital pelo WhatsApp e mostramos quais planos incluem ele. Ou volte à página inicial.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <BotaoWhatsApp contexto={{ tipo: "outro-hospital" }} principal />
        <LinkBotao href={rotas.home} variante="contorno">
          Ir para a página inicial
        </LinkBotao>
      </div>
    </section>
  );
}
