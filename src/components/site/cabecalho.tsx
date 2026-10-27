import Link from "next/link";
import { menuPrincipal } from "@/content/navegacao";
import { Logo } from "@/components/gwl/logo";
import { MenuCelular } from "./menu-celular";

/**
 * Cabeçalho: marca, menu no desktop e botão "Menu" no celular.
 * Sem botão Mel aqui: o único Mel visível no topo é o CTA principal da página (DESIGN.md › Cores).
 */
export function Cabecalho() {
  return (
    <header className="relative border-b border-border bg-branco">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
        <Logo />
        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {menuPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-12 items-center rounded-lg px-3 whitespace-nowrap font-bold text-tinta no-underline hover:text-copa hover:underline"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MenuCelular />
      </div>
    </header>
  );
}
