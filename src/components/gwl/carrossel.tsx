"use client";

import { Children, useId, useState, type ReactNode } from "react";
import { BotaoSeta } from "./botao";
import { cn } from "@/lib/utils";

/**
 * Carrossel (DESIGN.md v2 › Movimento 3): desliza 450ms ao clicar nas setas e nunca gira sozinho.
 * - `centralizado`: card ativo no centro, vizinhos a 40% de opacidade e 92% de escala (tipos de plano).
 * - sem `centralizado`: alinhado à esquerda, todos com opacidade cheia (depoimentos).
 * Cards fora de foco ficam `inert` (fora do Tab e do leitor de tela). A posição é anunciada em aria-live.
 * O cabeçalho (título à esquerda, setas à direita) vem como `titulo`.
 */
type Props = {
  titulo: ReactNode;
  rotuloItem: string;
  larguraCard: "plano" | "depoimento";
  centralizado?: boolean;
  inicial?: number;
  children: ReactNode;
};

const larguras = {
  plano: "[--card:18.75rem] md:[--card:35rem]",
  depoimento: "[--card:18.75rem] md:[--card:27.5rem]",
};

export function Carrossel({ titulo, rotuloItem, larguraCard, centralizado = false, inicial = 0, children }: Props) {
  const itens = Children.toArray(children);
  const total = itens.length;
  const [atual, setAtual] = useState(Math.min(inicial, total - 1));
  const id = useId();

  const mover = (delta: number) =>
    setAtual((a) => (centralizado ? (a + delta + total) % total : Math.max(0, Math.min(total - 1, a + delta))));

  const deslocamento = centralizado
    ? `translateX(calc(50% - var(--card) / 2 - ${atual} * (var(--card) + 1.5rem)))`
    : `translateX(calc(-${atual} * (var(--card) + 1.5rem)))`;

  return (
    <div className={larguras[larguraCard]}>
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-8 px-5 md:px-10">
        <div>{titulo}</div>
        <div className="flex items-center gap-2">
          <BotaoSeta
            direcao="anterior"
            rotulo={`${rotuloItem} anterior`}
            aria-controls={id}
            onClick={() => mover(-1)}
            disabled={!centralizado && atual === 0}
          />
          <span aria-live="polite" className="min-w-16 text-center text-nota text-musgo tabular-nums">
            {String(atual + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <BotaoSeta
            direcao="proximo"
            rotulo={`Próximo: ${rotuloItem.toLowerCase()}`}
            aria-controls={id}
            onClick={() => mover(1)}
            disabled={!centralizado && atual === total - 1}
          />
        </div>
      </div>
      <div className={cn("mt-12 overflow-hidden md:mt-16", !centralizado && "mx-auto max-w-[1280px] px-5 md:px-10")}>
        <ul
          id={id}
          className="m-0 flex list-none gap-6 p-0 transition-transform duration-[450ms] ease-saida motion-reduce:transition-none"
          style={{ transform: deslocamento }}
        >
          {itens.map((item, i) => {
            const ativo = i === atual;
            return (
              <li
                key={i}
                inert={centralizado ? !ativo : undefined}
                aria-roledescription="item"
                aria-label={`${i + 1} de ${total}`}
                className={cn(
                  "shrink-0 basis-(--card) transition-[opacity,transform] duration-[450ms] ease-saida motion-reduce:transition-none",
                  centralizado && !ativo && "scale-[0.92] opacity-40",
                )}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
