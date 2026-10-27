"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { linkWhatsApp, type ContextoWhatsApp } from "@/lib/whatsapp";
import { ROTULO_ACAO_PRINCIPAL } from "@/components/gwl/botao-whatsapp";

/**
 * Barra fixa do WhatsApp no celular (DESIGN.md › Celular).
 * Aparece só depois que o CTA principal (`[data-cta-principal]`) sai da tela, para nunca haver dois Mel visíveis.
 * Some enquanto qualquer `[data-oculta-barra]` (formulário, rodapé) está na tela.
 * Página sem CTA principal: usa o cabeçalho como referência (a barra aparece quando ele sai da tela).
 * Movimento: translateY + opacity em 200ms; com reduced motion, só troca de visibilidade.
 */
export function BarraWhatsApp({ contexto }: { contexto?: ContextoWhatsApp }) {
  const [ctaVisivel, setCtaVisivel] = useState(true);
  const [ocultadores, setOcultadores] = useState(0);
  const [pronto, setPronto] = useState(false);
  // O layout persiste entre páginas: refaz a observação a cada troca de rota (cada página tem o seu CTA).
  const caminho = usePathname();

  useEffect(() => {
    const cta = document.querySelector("[data-cta-principal]") ?? document.querySelector("body > header, header");
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
        "fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)] md:hidden bg-mel " +
        "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none " +
        (visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0")
      }
      aria-hidden={!visivel}
    >
      <a
        href={linkWhatsApp(contexto)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        data-evento="whatsapp_click"
        className="flex h-14 w-full items-center justify-center text-corpo font-bold text-tinta no-underline focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-rio"
      >
        {ROTULO_ACAO_PRINCIPAL}
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </a>
    </div>
  );
}
