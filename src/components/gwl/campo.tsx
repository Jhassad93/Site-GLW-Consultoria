import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Campos de formulário (DESIGN.md v2): rótulo sempre visível acima (nunca só placeholder),
 * 18px, altura 56px, raio 12px, borda Noite a 25%. Erro: borda Noite 2px, ícone e mensagem que diz o que corrigir
 * (sem vermelho).
 */
type Base = {
  id: string;
  rotulo: string;
  dica?: ReactNode;
  erro?: string;
  opcional?: boolean;
};

const classeControle = (erro?: string) =>
  cn(
    "mt-2 block h-14 w-full rounded-xl bg-branco px-4 text-corpo text-noite transition-colors duration-200",
    "hover:border-noite/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-noite",
    erro ? "border-2 border-noite" : "border border-noite/25",
  );

function Rotulo({ id, rotulo, opcional }: Pick<Base, "id" | "rotulo" | "opcional">) {
  return (
    <label htmlFor={id} className="block font-medium">
      {rotulo}
      {opcional && <span className="font-normal text-musgo"> (opcional)</span>}
    </label>
  );
}

function Ajuda({ id, dica, erro }: Pick<Base, "id" | "dica" | "erro">) {
  return (
    <>
      {dica && (
        <p id={`${id}-dica`} className="mt-2 text-nota text-musgo">
          {dica}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="mt-2 flex items-start gap-2 text-nota font-medium text-noite">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="mt-0.5 shrink-0">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4.5M8 11v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {erro}
        </p>
      )}
    </>
  );
}

function descrito(id: string, dica?: ReactNode, erro?: string) {
  return [dica ? `${id}-dica` : null, erro ? `${id}-erro` : null].filter(Boolean).join(" ") || undefined;
}

export function CampoTexto({ id, rotulo, dica, erro, opcional, ...input }: Base & ComponentProps<"input">) {
  return (
    <div>
      <Rotulo id={id} rotulo={rotulo} opcional={opcional} />
      <input
        id={id}
        name={id}
        className={classeControle(erro)}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descrito(id, dica, erro)}
        required={!opcional}
        {...input}
      />
      <Ajuda id={id} dica={dica} erro={erro} />
    </div>
  );
}

type Opcao = { valor: string; rotulo: string };

export function CampoSelecao({
  id,
  rotulo,
  dica,
  erro,
  opcional,
  opcoes,
  ...select
}: Base & ComponentProps<"select"> & { opcoes: readonly Opcao[] }) {
  return (
    <div>
      <Rotulo id={id} rotulo={rotulo} opcional={opcional} />
      <select
        id={id}
        name={id}
        className={classeControle(erro)}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descrito(id, dica, erro)}
        required={!opcional}
        defaultValue=""
        {...select}
      >
        <option value="" disabled>
          Escolha uma opção
        </option>
        {opcoes.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.rotulo}
          </option>
        ))}
      </select>
      <Ajuda id={id} dica={dica} erro={erro} />
    </div>
  );
}
