import type { Metadata } from "next";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { sobre } from "@/content/institucional";
import { exibir } from "@/lib/dados";
import { linksExternos, rotas } from "@/content/navegacao";
import { isPreview } from "@/config/site";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { ListaPassos } from "@/components/gwl/cards";
import { ChamadaFinal } from "@/components/gwl/chamada-final";

export const metadata: Metadata = {
  title: "Sobre a GWL, corretora de planos de saúde em Santana",
  description:
    "A GWL Corretora de Seguros, em Santana, zona norte de São Paulo, compara planos de saúde e odontológicos começando pelo hospital e explicando tudo antes de assinar.",
  alternates: { canonical: "/sobre/" },
};

/** Sobre (COPY.md › 4; harness R9 e R19): história e equipe só com dados reais e autorizados. */
export default function Sobre() {
  const rt = empresa.responsavelTecnico;
  const identificacao = [
    ["Razão social", exibir(empresa.razaoSocial)],
    ["CNPJ", exibir(empresa.cnpj)],
    ["Registro SUSEP", exibir(empresa.registroSusep)],
    ["Responsável técnico", rt.valor ? `${rt.valor.nome}, SUSEP ${rt.valor.registroSusep}${rt.confirmado ? "" : ` (${A_CONFIRMAR})`}` : A_CONFIRMAR],
  ] as const;

  return (
    <>
      <TopoInterno
        caminho={"/sobre/"}
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Sobre" }]}
        palavraChave={sobre.palavraChave}
        titulo={sobre.titulo}
        abertura={sobre.abertura}
        contexto={{ tipo: "geral" }}
      />

      {isPreview && (
        <section aria-labelledby="t-historia" className="bg-branco px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
            <h2 id="t-historia" className="text-h2-cel md:text-h2">Nossa história.</h2>
            <div className="space-y-4">
              <p className="m-0 text-grafite">{sobre.historia}</p>
              <p className="m-0 text-nota text-musgo">História, equipe e fotos em validação com a GWL.</p>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="t-jeito" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-jeito" className="text-h2-cel md:text-h2">Nosso jeito de trabalhar.</h2>
          <ListaPassos passos={sobre.principios} />
        </div>
      </section>

      {isPreview && (
        <section aria-labelledby="t-equipe" className="bg-branco px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
            <h2 id="t-equipe" className="text-h2-cel md:text-h2">Quem atende.</h2>
            <p className="m-0 text-grafite">{sobre.equipe}</p>
          </div>
        </section>
      )}

      <section aria-labelledby="t-identificacao" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-identificacao" className="text-h2-cel md:text-h2">Identificação.</h2>
            <p className="mt-6 max-w-[44ch] text-nota text-musgo">
              Confira o registro de qualquer corretor na{" "}
              <a href={linksExternos.consultaSusep} target="_blank" rel="noopener noreferrer">
                consulta oficial da SUSEP<span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
          </div>
          <dl className="m-0 border-t border-fio">
            {identificacao.map(([rotulo, valor]) => (
              <div key={rotulo} className="grid gap-1 border-b border-fio py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-nota text-musgo">{rotulo}</dt>
                <dd className="m-0">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
