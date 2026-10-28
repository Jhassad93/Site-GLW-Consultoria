import type { Metadata } from "next";
import { empresa } from "@/content/empresa";
import { operadorasPagina as o } from "@/content/institucional";
import { linksExternos, rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { ChamadaFinal } from "@/components/gwl/chamada-final";
import { LogoOperadora } from "@/components/gwl/esteira";
import { esteira } from "@/content/home";
import { isPreview } from "@/config/site";

export const metadata: Metadata = {
  title: "Operadoras com que trabalhamos",
  description:
    "Lista das operadoras de planos de saúde e odontológicos para as quais a GWL Corretora de Seguros atua, registradas na ANS.",
  alternates: { canonical: "/operadoras/" },
};

/**
 * Operadoras (harness R3: lista obrigatória no site; R7: sem logos até haver autorização).
 * Lista lida de `empresa.operadoras`; enquanto não confirmada, mostra o estado "em validação".
 */
export default function Operadoras() {
  const lista = empresa.operadoras.valor;
  return (
    <>
      <TopoInterno
        caminho={"/operadoras/"}
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Operadoras" }]}
        palavraChave={o.palavraChave}
        titulo={o.titulo}
        abertura={o.abertura}
        contexto={{ tipo: "geral" }}
      />
      <section aria-labelledby="t-lista" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-lista" className="text-h2-cel md:text-h2">A lista.</h2>
            <p className="mt-6 max-w-[44ch] text-nota text-musgo">
              {o.ans}{" "}
              <a href={linksExternos.ans} target="_blank" rel="noopener noreferrer">
                Site da ANS<span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
          </div>
          {lista.length > 0 ? (
            <ul className="m-0 list-none border-t border-fio p-0">
              {lista.map((nome) => (
                <li key={nome} className="border-b border-fio py-6 font-heading text-2xl tracking-titulo md:text-h3">
                  {nome}
                </li>
              ))}
            </ul>
          ) : isPreview ? (
            // Prévia: demonstração com grandes operadoras (decisão de João, 28/10/2026). Em produção, nunca (R3, R7).
            <div>
              <ul className="m-0 grid list-none grid-cols-1 border-t border-fio p-0 sm:grid-cols-2">
                {esteira.logosDemonstracao.map((l) => (
                  <li key={l.arquivo} className="flex min-h-28 flex-col justify-center gap-3 border-b border-fio py-6 sm:pr-6">
                    <span className="flex h-12 items-center">
                      <LogoOperadora nome={l.nome} arquivo={l.arquivo} altura={l.altura} />
                    </span>
                    <span aria-hidden className="text-nota text-musgo">{l.nome}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[52ch] text-nota text-musgo">
                Demonstração: lista e logos em validação com a GWL e as operadoras. A lista oficial entra aqui assim que a GWL
                confirmar com quais operadoras atua.
              </p>
            </div>
          ) : (
            <div className="border-t border-fio pt-8">
              <p className="m-0 font-heading text-2xl leading-tight tracking-titulo md:text-h3">{o.listaVazia}</p>
              <p className="mt-4 max-w-[52ch] text-grafite">
                A lista oficial entra aqui assim que a GWL confirmar com quais operadoras atua.
              </p>
            </div>
          )}
        </div>
      </section>
      <section aria-labelledby="t-participacoes" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-participacoes" className="text-h2-cel md:text-h2">Transparência.</h2>
          <div className="space-y-5 text-grafite">
            <p className="m-0">{o.participacoes}</p>
            <p className="m-0">
              Somos corretora: não somos operadora nem administradora de benefícios. A sua remuneração, quando houver contratação, é
              informada formalmente antes da assinatura.
            </p>
          </div>
        </div>
      </section>
      <ChamadaFinal />
    </>
  );
}
