import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Botões do DESIGN.md › Componentes.
 * - primario: Mel com texto Tinta. SOMENTE a ação principal (comparar pelo WhatsApp).
 * - secundario: contorno Copa sobre fundo claro.
 * - secundario-claro: contorno e texto brancos, dentro da sala Copa.
 * Sem ícone de seta; altura 56px (48px no tamanho compacto).
 */
type Variante = "primario" | "secundario" | "secundario-claro";
type Tamanho = "normal" | "compacto";

const base =
  "inline-flex items-center justify-center rounded-full font-bold no-underline transition-colors duration-150 " +
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rio select-none";

const variantes: Record<Variante, string> = {
  primario: "bg-mel text-tinta hover:bg-mel-hover",
  secundario: "bg-transparent text-copa ring-2 ring-inset ring-copa hover:bg-folha-clara",
  "secundario-claro": "bg-transparent text-branco ring-2 ring-inset ring-branco hover:bg-branco/10",
};

const tamanhos: Record<Tamanho, string> = {
  normal: "min-h-14 px-7 py-3 text-center text-corpo leading-snug",
  compacto: "min-h-12 px-5 py-2 text-center text-base leading-snug",
};

export function classesBotao(variante: Variante = "primario", tamanho: Tamanho = "normal", extra?: string) {
  return cn(base, variantes[variante], tamanhos[tamanho], extra);
}

type LinkBotaoProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
};

/** Botão que navega dentro do site. */
export function LinkBotao({ variante, tamanho, className, ...props }: LinkBotaoProps) {
  return <Link className={classesBotao(variante, tamanho, className)} {...props} />;
}

type LinkExternoBotaoProps = Omit<ComponentProps<"a">, "className"> & {
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
};

/** Botão que sai do site (WhatsApp). Abre em nova aba. */
export function LinkExternoBotao({ variante, tamanho, className, ...props }: LinkExternoBotaoProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classesBotao(variante, tamanho, className)}
      {...props}
    />
  );
}
