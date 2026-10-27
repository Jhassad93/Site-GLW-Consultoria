import type { ReactNode } from "react";

/**
 * Acordeão de perguntas (DESIGN.md › Componentes), com <details>/<summary> nativos:
 * funciona sem JavaScript, é acessível por teclado e o conteúdo fica no HTML do servidor (bom para SEO/IA).
 * Pergunta 20px em negrito; resposta 18px; ícone + e − em Rio. A resposta surge com opacidade
 * em 150ms (globals.css), desligada por prefers-reduced-motion.
 */
type Item = { pergunta: string; resposta: ReactNode };

export function Acordeao({ itens }: { itens: Item[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {itens.map((item) => (
        <details key={item.pergunta} className="group acordeao">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.25rem] leading-snug font-bold marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{item.pergunta}</span>
            <span aria-hidden className="mt-0.5 shrink-0 text-2xl leading-none text-rio">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="max-w-[68ch] pb-6 text-corpo">{item.resposta}</div>
        </details>
      ))}
    </div>
  );
}
