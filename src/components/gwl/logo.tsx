import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marca provisória: desenho simplificado da árvore + nome, só até chegar o logotipo original em vetor
 * (pendência registrada no DESIGN.md › Prévia visual). Desenho próprio, sem cópia do arquivo do cliente.
 */
export function Logo({ claro = false, className }: { claro?: boolean; className?: string }) {
  const cor = claro ? "text-branco" : "text-copa";
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 no-underline", cor, className)}
      aria-label="GWL Corretora de Seguros, página inicial"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden focusable="false">
        <circle cx="22" cy="17" r="13" fill="#6E9F2A" />
        <circle cx="15" cy="15" r="7" fill="#2C5A34" opacity=".55" />
        <circle cx="29" cy="14" r="6" fill="#90C030" />
        <rect x="20.5" y="24" width="3" height="11" rx="1.5" fill="#6B4A1E" />
        <path d="M5 36c8 4 26 4 34 0" stroke="#3B5687" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-heading text-[1.375rem] leading-none font-bold">
        GWL
        <span className="mt-1 block font-sans text-[0.8125rem] font-bold tracking-[0.02em]">Corretora de Seguros</span>
      </span>
    </Link>
  );
}
