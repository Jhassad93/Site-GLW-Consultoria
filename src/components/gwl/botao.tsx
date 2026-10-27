import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botões do DESIGN.md v2 › Componentes.
 * - escuro: Noite com texto Névoa (sobre fundo claro).
 * - claro: Névoa com texto Noite (sobre fundo escuro).
 * - contorno / contorno-claro: pílula de 1px, sem seta (ação secundária).
 * A ação principal leva a seta num círculo Broto (`seta`). Altura 60px (48px no compacto).
 */
export type Variante = "escuro" | "claro" | "contorno" | "contorno-claro";
type Tamanho = "normal" | "compacto";

const base =
  "group/botao inline-flex items-center justify-center gap-3.5 rounded-full font-medium no-underline select-none " +
  "transition-colors duration-200 text-center leading-snug";

const variantes: Record<Variante, string> = {
  escuro: "bg-noite text-nevoa hover:bg-mata",
  claro: "bg-nevoa text-noite hover:bg-branco",
  contorno: "border border-noite/25 text-noite hover:border-noite",
  "contorno-claro": "border border-nevoa/35 text-nevoa hover:border-nevoa",
};

const tamanhos: Record<Tamanho, { sem: string; com: string }> = {
  normal: { sem: "min-h-15 px-7 py-3 text-corpo", com: "min-h-15 py-2 pr-2 pl-7 text-corpo" },
  compacto: { sem: "min-h-12 px-5 py-2 text-base", com: "min-h-12 py-1.5 pr-1.5 pl-5 text-base" },
};

export function classesBotao(variante: Variante = "escuro", tamanho: Tamanho = "normal", seta = false, extra?: string) {
  return cn(base, variantes[variante], seta ? tamanhos[tamanho].com : tamanhos[tamanho].sem, extra);
}

/** Seta no círculo Broto. Desliza 2px na diagonal ao passar o mouse (só transform). */
export function Seta({ tamanho = "normal" }: { tamanho?: Tamanho }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-broto text-noite",
        tamanho === "normal" ? "size-11" : "size-9",
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="transition-transform duration-200 ease-out group-hover/botao:translate-x-0.5 group-hover/botao:-translate-y-0.5"
      >
        <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

type Comum = { variante?: Variante; tamanho?: Tamanho; seta?: boolean; className?: string; children: ReactNode };

/** Botão que navega dentro do site. */
export function LinkBotao({
  variante,
  tamanho,
  seta = false,
  className,
  children,
  ...props
}: Comum & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={classesBotao(variante, tamanho, seta, className)} {...props}>
      {children}
      {seta && <Seta tamanho={tamanho} />}
    </Link>
  );
}

/** Botão que sai do site (WhatsApp). Abre em nova aba e avisa o leitor de tela. */
export function LinkExternoBotao({
  variante,
  tamanho,
  seta = false,
  className,
  children,
  ...props
}: Comum & Omit<ComponentProps<"a">, "className" | "children">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classesBotao(variante, tamanho, seta, className)}
      {...props}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
      {seta && <Seta tamanho={tamanho} />}
    </a>
  );
}

/** Botão circular de seta dos carrosséis (56px, contorno 1px). */
export function BotaoSeta({
  direcao,
  rotulo,
  claro = false,
  ...props
}: { direcao: "anterior" | "proximo"; rotulo: string; claro?: boolean } & Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      className={cn(
        "grid size-14 place-items-center rounded-full border transition-colors duration-200 disabled:opacity-50",
        claro ? "border-nevoa/35 text-nevoa hover:border-nevoa" : "border-noite/25 text-noite hover:border-noite",
      )}
      {...props}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path
          d={direcao === "anterior" ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
