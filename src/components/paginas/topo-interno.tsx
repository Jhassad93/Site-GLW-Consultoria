import Link from "next/link";
import type { ReactNode } from "react";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import type { ContextoWhatsApp } from "@/lib/whatsapp";

/**
 * Topo das páginas internas (DESIGN.md v2): fundo Noite, trilha de navegação, palavra-chave como primeira
 * linha do H1, abertura e o botão principal com a mensagem pronta do contexto.
 */
type Trilha = { rotulo: string; href?: string }[];

export function TopoInterno({
  trilha,
  palavraChave,
  titulo,
  abertura,
  contexto,
  aviso,
  lateral,
}: {
  trilha: Trilha;
  palavraChave?: string;
  titulo: string;
  abertura: ReactNode;
  contexto?: ContextoWhatsApp;
  aviso?: string;
  lateral?: ReactNode;
}) {
  return (
    <section aria-labelledby="titulo-pagina" className="escuro bg-noite text-nevoa">
      <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-5 pt-32 pb-14 md:px-10 md:pt-44 md:pb-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <nav aria-label="Você está em" className="mb-6 text-nota text-nevoa/70">
            <ol className="m-0 flex list-none flex-wrap gap-x-2 p-0">
              {trilha.map((t, i) => (
                <li key={t.rotulo} className="flex gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {t.href ? (
                    <Link href={t.href} className="link-nav text-nevoa/80">
                      {t.rotulo}
                    </Link>
                  ) : (
                    <span aria-current="page">{t.rotulo}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 id="titulo-pagina">
            {palavraChave && (
              <span className="mb-4 block font-sans text-sub font-medium tracking-normal text-nevoa/75">{palavraChave}</span>
            )}
            <span className="block text-h1-cel md:max-w-[18ch] md:text-[4rem] md:leading-[1.04]">{titulo}</span>
          </h1>
          <div className="mt-6 max-w-[50ch] text-sub text-pretty text-nevoa/85">{abertura}</div>
          {contexto && (
            <div className="mt-8">
              <BotaoWhatsApp fundo="escuro" principal contexto={contexto} />
            </div>
          )}
          {aviso && <p className="mt-5 max-w-[52ch] text-nota text-nevoa/75">{aviso}</p>}
        </div>
        {lateral}
      </div>
    </section>
  );
}
