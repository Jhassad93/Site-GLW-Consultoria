import Link from "next/link";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * Item de hospital (DESIGN.md v2): linha com fio fino, nome em Inter Tight 28px, nota de data (R28) e círculo com seta.
 * Com guia publicado, leva ao guia; sem guia, abre o WhatsApp com o nome do hospital (APP_FLOW, Fluxo 1).
 */
type Props = { hospital: string; nota: string; hrefGuia?: string; outro?: boolean };

const classes = "group/item flex items-center justify-between gap-6 py-6 text-noite no-underline md:py-7";

function Conteudo({ hospital, nota }: { hospital: string; nota: string }) {
  return (
    <>
      <span>
        <span className="block font-heading text-2xl leading-tight tracking-titulo md:text-h3">{hospital}</span>
        <span className="mt-1.5 block text-nota text-musgo">{nota}</span>
      </span>
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-full border border-noite/20 transition-colors duration-200 group-hover/item:border-noite group-hover/item:bg-noite group-hover/item:text-nevoa"
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </span>
    </>
  );
}

export function ItemHospital({ hospital, nota, hrefGuia, outro = false }: Props) {
  return (
    <li className="border-b border-fio">
      {hrefGuia ? (
        <Link href={hrefGuia} className={classes}>
          <Conteudo hospital={hospital} nota={nota} />
        </Link>
      ) : (
        <a
          href={linkWhatsApp(outro ? { tipo: "outro-hospital" } : { tipo: "hospital", hospital })}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          data-evento="whatsapp_click"
        >
          <Conteudo hospital={hospital} nota={nota} />
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </a>
      )}
    </li>
  );
}

export function ListaHospitais({ children }: { children: React.ReactNode }) {
  return <ul className="m-0 list-none border-t border-fio p-0">{children}</ul>;
}
