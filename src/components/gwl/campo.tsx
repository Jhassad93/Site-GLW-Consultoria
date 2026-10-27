import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Campos de formulário (DESIGN.md › Componentes): rótulo sempre visível acima (nunca só placeholder),
 * 18px, altura 52px, raio 12px. Erro: borda Rio 2px e mensagem em Tinta logo abaixo (sem vermelho).
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
    "mt-2 block h-[52px] w-full rounded-xl border bg-branco px-4 text-corpo text-tinta",
    "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-rio",
    erro ? "border-2 border-rio" : "border-border",
  );

function Rotulo({ id, rotulo, opcional }: Pick<Base, "id" | "rotulo" | "opcional">) {
  return (
    <label htmlFor={id} className="block font-bold">
      {rotulo}
      {opcional && <span className="font-normal text-texto-2"> (opcional)</span>}
    </label>
  );
}

function Ajuda({ id, dica, erro }: Pick<Base, "id" | "dica" | "erro">) {
  return (
    <>
      {dica && (
        <p id={`${id}-dica`} className="mt-1.5 text-legenda text-texto-2">
          {dica}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="mt-1.5 flex gap-2 text-legenda font-bold text-tinta">
          <span aria-hidden className="text-rio">●</span>
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
