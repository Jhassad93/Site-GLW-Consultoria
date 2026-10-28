"use client";

import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { BotaoSeta } from "./botao";
import { cn } from "@/lib/utils";

/**
 * Carrossel (DESIGN.md v2 › Movimento 3), nunca gira sozinho. Desde 28/10/2026 (pedido de João) também anda com o
 * gesto da pessoa: arrastar no celular, rolagem lateral do trackpad, arrastar com o mouse e setas do teclado
 * (com foco na faixa). Rolagem nativa com encaixe (scroll-snap); as setas levam ao card anterior ou seguinte.
 * - `centralizado`: o card em foco fica a 100% e os vizinhos a 60% de opacidade e 94% de escala (tipos de plano).
 * - sem `centralizado`: todos com opacidade cheia (depoimentos).
 * A posição é anunciada em aria-live. O cabeçalho (título à esquerda, setas à direita) vem como `titulo`.
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

/** Margem lateral alinhada ao conteúdo da página (1200px de largura útil, mínimo 20px). */
const MARGEM = "max(1.25rem, calc((100% - 1200px) / 2))";

export function Carrossel({ titulo, rotuloItem, larguraCard, centralizado = false, inicial = 0, children }: Props) {
  const itens = Children.toArray(children);
  const total = itens.length;
  const [atual, setAtual] = useState(Math.min(inicial, total - 1));
  const id = useId();
  const faixa = useRef<HTMLUListElement>(null);
  const arraste = useRef<{ x: number; inicio: number; moveu: boolean } | null>(null);

  const posicaoDo = useCallback((i: number) => {
    const el = faixa.current;
    const li = el?.children[i] as HTMLElement | undefined;
    if (!el || !li) return 0;
    // paddingLeft vem resolvido em px (o scroll-padding pode vir como expressão max()).
    return li.offsetLeft - (parseFloat(getComputedStyle(el).paddingLeft) || 0);
  }, []);

  const irPara = useCallback(
    (i: number) => {
      const el = faixa.current;
      if (!el) return;
      const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: posicaoDo(i), behavior: reduzido ? "auto" : "smooth" });
    },
    [posicaoDo],
  );

  // Card em foco = o mais próximo da margem esquerda, atualizado durante a rolagem.
  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        let melhor = 0;
        let menor = Infinity;
        for (let i = 0; i < el.children.length; i++) {
          const d = Math.abs(posicaoDo(i) - el.scrollLeft);
          if (d < menor) {
            menor = d;
            melhor = i;
          }
        }
        // No fim da faixa, o último card pode não alcançar a margem: considera o último.
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) melhor = el.children.length - 1;
        setAtual(melhor);
      });
    };
    el.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      el.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [posicaoDo]);

  useEffect(() => {
    if (inicial > 0) faixa.current?.scrollTo({ left: posicaoDo(inicial) });
  }, [inicial, posicaoDo]);

  const mover = (delta: number) => {
    const alvo = centralizado ? (atual + delta + total) % total : Math.max(0, Math.min(total - 1, atual + delta));
    irPara(alvo);
  };

  // Arrastar com o mouse (toque e trackpad já rolam nativamente).
  const aoApertar = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !faixa.current) return;
    arraste.current = { x: e.clientX, inicio: faixa.current.scrollLeft, moveu: false };
  };
  const aoMover = (e: React.PointerEvent<HTMLUListElement>) => {
    const a = arraste.current;
    const el = faixa.current;
    if (!a || !el) return;
    const dx = e.clientX - a.x;
    if (!a.moveu && Math.abs(dx) > 6) {
      a.moveu = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    }
    if (a.moveu) el.scrollLeft = a.inicio - dx;
  };
  const aoSoltar = () => {
    const a = arraste.current;
    const el = faixa.current;
    arraste.current = null;
    if (!a?.moveu || !el) return;
    el.style.cursor = "";
    // Encaixa no card mais próximo e só depois devolve o encaixe nativo.
    let melhor = 0;
    let menor = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs(posicaoDo(i) - el.scrollLeft);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    }
    irPara(melhor);
    window.setTimeout(() => {
      el.style.scrollSnapType = "";
    }, 450);
    // Um arraste não vale como clique nos links dos cards.
    const bloquear = (ev: MouseEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
    el.addEventListener("click", bloquear, { capture: true, once: true });
    window.setTimeout(() => el.removeEventListener("click", bloquear, { capture: true }), 0);
  };

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
      <ul
        id={id}
        ref={faixa}
        tabIndex={0}
        aria-label={`${rotuloItem}s: arraste para o lado ou use as setas`}
        onPointerDown={aoApertar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        className="sem-barra relative m-0 mt-12 flex cursor-grab list-none snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain p-0 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noite md:mt-16"
        style={{ paddingInline: MARGEM, scrollPaddingInline: MARGEM }}
      >
        {itens.map((item, i) => {
          const ativo = i === atual;
          return (
            <li
              key={i}
              aria-roledescription="item"
              aria-label={`${i + 1} de ${total}`}
              className={cn(
                "shrink-0 basis-(--card) snap-start select-none transition-[opacity,transform] duration-[450ms] ease-saida motion-reduce:transition-none [&_img]:pointer-events-none",
                centralizado && !ativo && "scale-[0.94] opacity-60",
              )}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
