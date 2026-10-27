"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { linkWhatsApp, type ContextoWhatsApp } from "@/lib/whatsapp";
import { ROTULO_ACAO_PRINCIPAL } from "@/components/gwl/botao-whatsapp";
import { Seta } from "@/components/gwl/botao";

/**
 * Barra do celular (DESIGN.md v2): pílula escura flutuante a 12px das bordas com a ação principal.
 * Aparece depois que o botão do topo (`[data-cta-principal]`) sai da tela; some enquanto qualquer
 * `[data-oculta-barra]` (chamada final, formulário, rodapé) está visível. Sem botão do topo, usa o cabeçalho.
 * Movimento: translateY + opacity em 200ms; com movimento reduzido, só troca de visibilidade.
 */
export function BarraWhatsApp({ contexto }: { contexto?: ContextoWhatsApp }) {
  const [ctaVisivel, setCtaVisivel] = useState(true);
  const [ocultadores, setOcultadores] = useState(0);
  const [pronto, setPronto] = useState(false);
  // O layout persiste entre páginas: refaz a observação a cada troca de rota.
  const caminho = usePathname();

  useEffect(() => {
    const cta = document.querySelector("[data-cta-principal]") ?? document.querySelector("header");
    const alvos = document.querySelectorAll("[data-oculta-barra]");
    const visiveis = new Set<Element>();

    const obsCta = new IntersectionObserver(([e]) => {
      setCtaVisivel(e.isIntersecting || e.boundingClientRect.top > 0);
      setPronto(true);
    });
    const obsAlvos = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visiveis.add(e.target);
        else visiveis.delete(e.target);
      }
      setOcultadores(visiveis.size);
    });

    if (cta) obsCta.observe(cta);
    alvos.forEach((a) => obsAlvos.observe(a));

    return () => {
      obsCta.disconnect();
      obsAlvos.disconnect();
    };
  }, [caminho]);

  const visivel = pronto && !ctaVisivel && ocultadores === 0;

  return (
    <div
      className={
        "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 md:hidden " +
        "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none " +
        (visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+1rem)] opacity-0")
      }
      aria-hidden={!visivel}
    >
      <a
        href={linkWhatsApp(contexto)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        data-evento="whatsapp_click"
        className="group/botao flex min-h-15 w-full items-center justify-between gap-3 rounded-full bg-noite py-2 pr-2 pl-6 font-medium text-nevoa no-underline"
      >
        {ROTULO_ACAO_PRINCIPAL}
        <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
        <Seta />
      </a>
    </div>
  );
}
