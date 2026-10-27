"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { menuPrincipal } from "@/content/navegacao";
import { linkWhatsApp } from "@/lib/whatsapp";
import { Logo } from "@/components/gwl/logo";
import { LinkExternoBotao } from "@/components/gwl/botao";

/**
 * Cabeçalho (DESIGN.md v2): pílula de vidro fosco fixa a 16px do topo.
 * Computador: links de texto + botão escuro "Falar com a GWL". Celular: botão "Menu" escrito, que abre um
 * painel de vidro (disclosure, não modal): Esc fecha e devolve o foco; clicar num link fecha.
 * O componente é cliente só pelo estado do menu; o HTML dos links sai no servidor.
 */
export function Cabecalho() {
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
    <header className="sticky top-4 z-50 h-0 px-3 md:px-4">
      <div className="vidro relative mx-auto flex min-h-15 max-w-[1200px] items-center justify-between gap-4 rounded-full py-1.5 pr-1.5 pl-6">
        <Logo />

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-7 p-0 text-base">
            {menuPrincipal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-nav text-noite">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LinkExternoBotao
          href={linkWhatsApp()}
          variante="escuro"
          tamanho="compacto"
          seta
          className="hidden lg:inline-flex"
          data-evento="whatsapp_click"
        >
          Falar com a GWL
        </LinkExternoBotao>

        <button
          ref={botao}
          type="button"
          aria-expanded={aberto}
          aria-controls={idPainel}
          onClick={() => setAberto((v) => !v)}
          className="inline-flex min-h-12 items-center rounded-full bg-noite px-5 text-base font-medium text-nevoa lg:hidden"
        >
          {aberto ? "Fechar" : "Menu"}
        </button>

        <nav
          id={idPainel}
          aria-label="Menu principal"
          hidden={!aberto}
          className="vidro absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-[1.75rem] px-6 py-3 lg:hidden"
        >
          <ul className="m-0 list-none p-0">
            {menuPrincipal.map((item) => (
              <li key={item.href} className="border-b border-fio last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-14 items-center font-heading text-[1.625rem] tracking-titulo text-noite no-underline"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
