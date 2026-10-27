"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { menuPrincipal } from "@/content/navegacao";

/**
 * Menu do celular (DESIGN.md › Celular): botão "Menu" escrito por extenso.
 * Painel em disclosure (não modal): Esc fecha e devolve o foco ao botão; clicar num link fecha.
 * Abre sem animação de entrada longa: 150ms de opacidade, desligada por prefers-reduced-motion.
 */
export function MenuCelular() {
  const [aberto, setAberto] = useState(false);
  const idPainel = useId();
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        aria-expanded={aberto}
        aria-controls={idPainel}
        onClick={() => setAberto((v) => !v)}
        className="inline-flex h-12 min-w-12 items-center gap-2 rounded-full px-4 font-bold text-copa ring-2 ring-inset ring-copa focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rio"
      >
        <span aria-hidden className="flex w-4 flex-col gap-[3px]">
          <span className="h-0.5 rounded bg-current" />
          <span className="h-0.5 rounded bg-current" />
          <span className="h-0.5 rounded bg-current" />
        </span>
        {aberto ? "Fechar" : "Menu"}
      </button>

      <nav
        id={idPainel}
        aria-label="Menu principal"
        hidden={!aberto}
        className="absolute inset-x-0 top-full z-40 border-b border-border bg-branco px-4 pb-6 motion-safe:animate-[aparecer_150ms_ease-out]"
      >
        <ul className="flex flex-col">
          {menuPrincipal.map((item) => (
            <li key={item.href} className="border-b border-border last:border-0">
              <Link
                href={item.href}
                onClick={() => setAberto(false)}
                className="flex min-h-14 items-center text-[1.25rem] font-bold text-tinta no-underline"
              >
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
