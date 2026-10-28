import type { ReactNode } from "react";

/**
 * Cards do DESIGN.md v2 › Componentes: tipo de plano, passo e depoimento.
 * Imagens: enquanto não há arquivo (docs/IMAGENS.md), um bloco em tom escuro com a descrição da cena.
 */

type Imagem = { src?: string; srcSet?: string; alt: string; descricao: string };

function BlocoImagem({ imagem, className }: { imagem: Imagem; className: string }) {
  if (imagem.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- export estático; WebP em 2 larguras gerado à mão
      <img
        src={imagem.src}
        srcSet={imagem.srcSet}
        sizes="(min-width: 768px) 560px, 300px"
        width={720}
        height={411}
        alt={imagem.alt}
        loading="lazy"
        decoding="async"
        className={`${className} object-cover`}
      />
    );
  }
  return (
    <div
      {...(imagem.alt ? { role: "img", "aria-label": imagem.alt } : { "aria-hidden": true })}
      className={`${className} relative bg-[#4a5a4b]`}
    >
      <span className="absolute right-4 bottom-3.5 left-4 w-fit rounded-md bg-noite/80 px-2 py-1 text-legenda text-nevoa">
        {imagem.descricao}
      </span>
    </div>
  );
}

/** Card de tipo de plano: dois blocos brancos empilhados (imagem + título; "Em resumo" + link). */
export function CardPlano({
  titulo,
  rotulo,
  imagem,
  resumo,
  acao,
}: {
  titulo: string;
  rotulo: string;
  imagem: Imagem;
  resumo: string;
  acao: ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col gap-2.5">
      <div className="rounded-[1.25rem] bg-branco p-3">
        <BlocoImagem imagem={imagem} className="h-56 w-full rounded-xl md:h-80" />
        {/* Rótulo longo desce para a linha de baixo em vez de empurrar o card (break-ui, 28/10/2026). */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-2 pt-4.5 pb-2">
          <h3 className="min-w-0 text-2xl leading-tight md:text-h3">{titulo}</h3>
          <span className="shrink-0 text-nota text-musgo">{rotulo}</span>
        </div>
      </div>
      <div className="rounded-[1.25rem] bg-branco px-5 py-5.5">
        <p className="m-0 text-nota text-musgo">Em resumo</p>
        <p className="mt-1.5 mb-0 text-[1.0625rem] text-pretty">{resumo}</p>
        <div className="mt-3.5">{acao}</div>
      </div>
    </article>
  );
}

/** Lista de passos com fio fino (como funciona). Números em Cinza (texto grande). */
export function ListaPassos({ passos }: { passos: readonly { titulo: string; texto: ReactNode }[] }) {
  return (
    <ol className="m-0 list-none border-t border-fio p-0">
      {passos.map((p, i) => (
        <li key={p.titulo} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-fio py-7 md:grid-cols-[4rem_minmax(0,1fr)]">
          <span aria-hidden className="font-heading text-2xl tracking-titulo text-cinza tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="block font-heading text-2xl leading-tight tracking-titulo md:text-[1.625rem]">{p.titulo}</span>
            <span className="mt-2 block text-grafite">{p.texto}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Depoimento: alterna foto (citação sobre gradiente Noite) e texto (fundo Mata). Só real e autorizado (R9). */
export function CardDepoimento({
  citacao,
  autor,
  iniciais,
  foto,
  ilustrativo = false,
}: {
  citacao: string;
  autor: string;
  iniciais?: string;
  foto?: Imagem;
  /** Depoimento fictício (só na prévia): troca o selo "Cliente GWL" e marca a foto como gerada por IA. */
  ilustrativo?: boolean;
}) {
  if (foto) {
    return (
      <figure className="relative m-0 flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl md:min-h-[31.25rem]">
        <BlocoImagem imagem={foto} className="absolute inset-0 size-full" />
        {ilustrativo && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-noite/75 px-3 py-1.5 text-legenda text-nevoa">
            Fictício · imagem gerada por IA
          </span>
        )}
        <div aria-hidden className="absolute inset-x-0 top-2/5 bottom-0 bg-linear-to-b from-noite/0 to-noite/85" />
        <figcaption className="relative p-7 text-nevoa">
          <blockquote className="m-0 font-heading text-2xl leading-tight tracking-titulo">{citacao}</blockquote>
          <span className="mt-3.5 block text-nota text-nevoa/75">{autor}</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="escuro m-0 flex min-h-[30rem] flex-col justify-between gap-8 rounded-3xl bg-mata p-8 text-nevoa md:min-h-[31.25rem] md:p-9">
      <span className="text-legenda tracking-[0.06em] text-broto">{ilustrativo ? "DEPOIMENTO FICTÍCIO" : "CLIENTE GWL"}</span>
      <blockquote className="m-0 font-heading text-[1.625rem] leading-tight tracking-titulo md:text-[1.875rem]">
        {citacao}
      </blockquote>
      <figcaption className="flex items-center gap-3.5 border-t border-fio-escuro pt-5">
        {iniciais && (
          <span aria-hidden className="grid size-11 place-items-center rounded-full bg-broto text-nota font-medium text-noite">
            {iniciais}
          </span>
        )}
        <span className="text-[0.9375rem]">{autor}</span>
      </figcaption>
    </figure>
  );
}
