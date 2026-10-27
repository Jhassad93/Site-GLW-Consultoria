import type { ReactNode } from "react";

/**
 * Perguntas em acordeão (DESIGN.md v2 › Componentes), com <details>/<summary> nativos:
 * funciona sem JavaScript, é acessível por teclado e o conteúdo fica no HTML do servidor (SEO/IA).
 * Pergunta em Inter Tight 24px; "+" num círculo de contorno que gira 45° ao abrir (globals.css).
 */
type Item = { pergunta: string; resposta: ReactNode };

export function Acordeao({ itens }: { itens: readonly Item[] }) {
  return (
    <div className="border-t border-fio">
      {itens.map((item) => (
        <details key={item.pergunta} className="acordeao border-b border-fio">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-heading text-[1.375rem] leading-tight tracking-titulo md:text-2xl">{item.pergunta}</span>
            <span
              aria-hidden
              className="acordeao-icone grid size-10 shrink-0 place-items-center rounded-full border border-noite/20 transition-transform duration-200 ease-out"
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </summary>
          <div className="max-w-[62ch] pr-0 pb-7 text-grafite md:pr-16">{item.resposta}</div>
        </details>
      ))}
    </div>
  );
}
