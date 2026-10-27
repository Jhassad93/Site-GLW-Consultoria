import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Card de perfil (DESIGN.md › Componentes): sala clara, canto de folha, card inteiro clicável.
 * O canto de folha é um dos três usos permitidos do elemento-assinatura.
 */
type Sala = "folha" | "rio" | "mel";

const salas: Record<Sala, string> = {
  folha: "bg-folha-clara",
  rio: "bg-rio-claro",
  mel: "bg-mel-claro",
};

type Props = {
  titulo: string;
  texto: string;
  href: string;
  acao: string;
  sala?: Sala;
};

export function CardPerfil({ titulo, texto, href, acao, sala = "folha" }: Props) {
  return (
    <article
      className={cn(
        "group relative flex min-h-56 flex-col justify-between rounded-folha p-7 md:p-8",
        "focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-rio",
        salas[sala],
      )}
    >
      <div>
        <h3 className="text-[1.40625rem] leading-tight font-semibold">{titulo}</h3>
        <p className="mt-3 text-[1.0625rem]">{texto}</p>
      </div>
      <Link
        href={href}
        className="mt-6 font-bold text-rio underline underline-offset-4 outline-none after:absolute after:inset-0 after:content-['']"
      >
        {acao}
      </Link>
    </article>
  );
}
