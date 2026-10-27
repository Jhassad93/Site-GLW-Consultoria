import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marca provisória: "GWL" em Inter Tight + "Corretora de Seguros" (a expressão exigida pelo harness R1 fica visível).
 * Substituir pelo logotipo original da GWL em vetor quando chegar (DESIGN.md v2 › Prévia visual).
 */
export function Logo({ claro = false, className }: { claro?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-2.5 no-underline",
        claro ? "text-nevoa" : "text-noite",
        className,
      )}
      aria-label="GWL Corretora de Seguros, página inicial"
    >
      <span className="font-heading text-2xl leading-none font-semibold tracking-marca">GWL</span>
      <span className={cn("text-legenda leading-none", claro ? "text-nevoa/75" : "text-musgo")}>
        Corretora de Seguros
      </span>
    </Link>
  );
}
