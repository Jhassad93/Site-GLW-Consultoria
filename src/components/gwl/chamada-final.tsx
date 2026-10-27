import { LinkBotao } from "./botao";
import { BotaoWhatsApp } from "./botao-whatsapp";
import { rotas } from "@/content/navegacao";
import type { ContextoWhatsApp } from "@/lib/whatsapp";

/**
 * Chamada final (DESIGN.md v2): card Noite, raio 32px, título grande, fio, assinatura e os dois botões.
 * `data-oculta-barra` esconde a barra do celular enquanto o card está na tela.
 */
type Props = {
  titulo?: string;
  contexto?: ContextoWhatsApp;
};

export const ASSINATURA = "Primeiro o hospital. Depois o plano.";

export function ChamadaFinal({ titulo = "Para quando precisar, escolha hoje com calma.", contexto }: Props) {
  return (
    <section aria-labelledby="t-final" data-oculta-barra className="px-5 pb-20 md:px-10 md:pb-32">
      <div className="escuro mx-auto max-w-[1200px] rounded-[2rem] bg-noite px-6 py-16 text-nevoa md:px-16 md:py-22">
        <h2 id="t-final" className="max-w-[14ch] text-final-cel md:text-final">
          {titulo}
        </h2>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-fio-escuro pt-8 md:mt-14">
          <p className="m-0 text-sub text-nevoa/80">{ASSINATURA}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkBotao href={rotas.contato} variante="contorno-claro">
              Prefiro que me liguem
            </LinkBotao>
            <BotaoWhatsApp fundo="escuro" contexto={contexto} />
          </div>
        </div>
      </div>
    </section>
  );
}
