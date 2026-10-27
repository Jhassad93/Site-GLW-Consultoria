"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { isPreview } from "@/config/site";

/**
 * Fundo do topo (DESIGN.md v2 › Movimento 1): cenas que se alternam a cada 7s com troca de opacidade em 1,2s
 * e leve aproximação (scale 1 → 1,06), só transform e opacity. Botão de pausar ao lado do botão principal
 * (WCAG 2.2.2), via `BotaoPausaTopo`. Com movimento reduzido, a troca automática não acontece.
 * Sem arquivo de imagem, a cena é um bloco em tom escuro; a descrição só aparece na prévia.
 * O gradiente Noite (0 → 92%) de baixo para cima garante o contraste do título sobre qualquer imagem.
 */
type Cena = { id: string; src?: string; alt: string; descricao: string };

const Contexto = createContext<{ pausado: boolean; alternar: () => void; varias: boolean } | null>(null);

const tons = ["#2a3b2e", "#3a4436", "#24332a"];

export function TopoCenas({ cenas, children }: { cenas: readonly Cena[]; children: ReactNode }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const varias = cenas.length > 1;

  useEffect(() => {
    if (!varias || pausado) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!reduzido.matches && document.visibilityState === "visible") setAtual((a) => (a + 1) % cenas.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [varias, pausado, cenas.length]);

  return (
    <Contexto.Provider value={{ pausado, alternar: () => setPausado((p) => !p), varias }}>
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {cenas.map((c, i) => (
          <div
            key={c.id}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
            style={{ opacity: i === atual ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 transition-transform duration-[8000ms] ease-out motion-reduce:transition-none"
              style={{ transform: i === atual && !pausado ? "scale(1.06)" : "scale(1)", background: tons[i % tons.length] }}
            >
              {c.src && (
                // eslint-disable-next-line @next/next/no-img-element -- export estático
                <img src={c.src} alt="" className="size-full object-cover" fetchPriority={i === 0 ? "high" : "low"} />
              )}
            </div>
            {!c.src && isPreview && (
              <p className="absolute top-32 right-10 m-0 hidden max-w-72 text-right text-legenda text-nevoa/75 md:block">
                {c.descricao}
              </p>
            )}
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-b from-noite/0 to-noite/92" />
      </div>
      {children}
    </Contexto.Provider>
  );
}

export function BotaoPausaTopo() {
  const ctx = useContext(Contexto);
  if (!ctx || !ctx.varias) return null;
  return (
    <button
      type="button"
      onClick={ctx.alternar}
      aria-pressed={ctx.pausado}
      aria-label={ctx.pausado ? "Retomar a troca de imagens do topo" : "Pausar a troca de imagens do topo"}
      className="grid size-15 shrink-0 place-items-center rounded-full border border-nevoa/35 text-nevoa transition-colors duration-200 hover:border-nevoa"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path d={ctx.pausado ? "M3 1.5v11l9-5.5z" : "M3 2h3v10H3zM8 2h3v10H8z"} fill="currentColor" />
      </svg>
    </button>
  );
}
