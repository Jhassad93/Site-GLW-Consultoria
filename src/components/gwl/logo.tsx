import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marca: árvore da GWL (redesenho vetorial do logotipo original, aprovado por João em 28/10/2026) + "GWL" em
 * Inter Tight + "Corretora de Seguros" (expressão exigida pelo harness R1). Árvore em cor única: Mata no claro,
 * Névoa no escuro (uso no site a confirmar com o cliente). Tudo numa linha só: nada quebra em 2 ou 3 linhas.
 */
export function Logo({ claro = false, className }: { claro?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap no-underline",
        claro ? "text-nevoa" : "text-noite",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático da marca */}
      <img
        src={claro ? "/marca/arvore-nevoa.svg" : "/marca/arvore-mata.svg"}
        alt=""
        width={44}
        height={32}
        className="h-8 w-auto"
      />
      <span className="font-heading text-2xl leading-none font-semibold tracking-marca">GWL</span>
      {/* Visualmente some no celular estreito e entre 1024 e 1279px (onde entra o menu completo), mas segue no nome
          acessível do link; a expressão também fica visível no rodapé (R1). */}
      <span
        className={cn(
          "sr-only text-legenda leading-none sm:not-sr-only lg:sr-only xl:not-sr-only",
          claro ? "text-nevoa/80" : "text-grafite",
        )}
      >
        {" "}Corretora de Seguros
      </span>
      <span className="sr-only">, página inicial</span>
    </Link>
  );
}
