"use client";

import { useState, type ReactNode } from "react";

/**
 * Esteira de operadoras (DESIGN.md v2 › Movimento 2): uma volta em 45s, pausa com mouse ou foco,
 * botão "Pausar" visível (WCAG 2.2.2). Com movimento reduzido vira faixa parada e rolável (globals.css).
 * A lista é duplicada para emendar sem costura; a cópia fica escondida do leitor de tela.
 */
type Props = { titulo: string; itens: readonly ReactNode[]; nota?: string };

export function Esteira({ titulo, itens, nota }: Props) {
  const [pausada, setPausada] = useState(false);

  return (
    <section aria-label={titulo} className="border-b border-fio bg-branco py-12 md:py-14">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 md:px-10">
        <h2 className="font-sans text-corpo font-medium tracking-normal text-musgo">{titulo}</h2>
        <button
          type="button"
          onClick={() => setPausada((v) => !v)}
          aria-pressed={pausada}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-noite/20 px-4 text-nota transition-colors duration-200 hover:border-noite"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
            <path d={pausada ? "M3 1.5v11l9-5.5z" : "M3 2h3v10H3zM8 2h3v10H8z"} fill="currentColor" />
          </svg>
          {pausada ? "Retomar" : "Pausar"}
        </button>
      </div>
      <div className="esteira mt-8" data-pausada={pausada ? "" : undefined}>
        <div className="esteira-janela">
          <ul className="esteira-faixa m-0 flex w-max list-none p-0">
            {itens.map((item, i) => (
              <li key={`a${i}`} className="flex h-16 shrink-0 items-center px-10 md:px-12">
                {item}
              </li>
            ))}
            {itens.map((item, i) => (
              <li key={`b${i}`} aria-hidden className="flex h-16 shrink-0 items-center px-10 md:px-12">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {nota && <p className="mx-auto mt-6 max-w-[1280px] px-5 text-legenda text-musgo md:px-10">{nota}</p>}
    </section>
  );
}

/** Nome da operadora em texto (até haver logo autorizado). Inter Tight 26px em Cinza (texto grande, 4,7:1). */
export function NomeOperadora({ nome }: { nome: string }) {
  return <span className="font-heading text-[1.625rem] tracking-titulo whitespace-nowrap text-cinza">{nome}</span>;
}

/**
 * Logo de operadora (DESIGN.md v2 › Imagens): monocromático em Cinza, altura ajustada por logo para equilibrar o peso
 * visual. O arquivo tem 96px de altura (nítido até 2x). O nome vai no alt para o leitor de tela.
 */
export function LogoOperadora({ nome, arquivo, altura }: { nome: string; arquivo: string; altura: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- export estático
    <img
      src={`/midia/operadoras/${arquivo}.png`}
      alt={nome}
      height={altura}
      decoding="async"
      className="w-auto max-w-none select-none"
      style={{ height: altura }}
    />
  );
}
