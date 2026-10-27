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
    <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-8 md:py-28">
      <p className="font-bold text-copa">Página não encontrada</p>
      <h1 className="mt-4 text-[2.25rem] leading-[1.1] md:text-h1">
        Esta página não existe. Mas a pergunta que importa continua: qual hospital você quer usar?
      </h1>
      <p className="mt-6 max-w-[60ch]">
        Diga o hospital pelo WhatsApp e a GWL mostra quais planos incluem ele. Ou volte à página inicial.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <BotaoWhatsApp contexto={{ tipo: "outro-hospital" }} principal />
        <LinkBotao href={rotas.home} variante="secundario">
          Ir para a página inicial
        </LinkBotao>
      </div>
    </div>
  );
}
