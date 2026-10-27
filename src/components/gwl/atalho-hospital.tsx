import Link from "next/link";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * Atalho de hospital (DESIGN.md › Componentes): botão largo branco sobre a sala Copa.
 * Com guia publicado, leva ao guia; sem guia, abre o WhatsApp com o nome do hospital (APP_FLOW, Fluxo 1).
 * `nota` mostra a data de referência da rede (harness R28).
 */
type Props = {
  hospital: string;
  nota: string;
  hrefGuia?: string;
};

const classes =
  "flex min-h-14 w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-4 rounded-2xl bg-branco px-5 py-4 text-left font-bold " +
  "text-tinta no-underline transition-colors duration-150 hover:bg-folha-clara " +
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mel";

export function AtalhoHospital({ hospital, nota, hrefGuia }: Props) {
  const conteudo = (
    <>
      <span>{hospital}</span>
      <span className="shrink-0 text-legenda font-normal text-texto-2">{nota}</span>
    </>
  );

  if (hrefGuia) {
    return (
      <Link href={hrefGuia} className={classes}>
        {conteudo}
      </Link>
    );
  }

  return (
    <a
      href={linkWhatsApp({ tipo: "hospital", hospital })}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      data-evento="whatsapp_click"
    >
      {conteudo}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
