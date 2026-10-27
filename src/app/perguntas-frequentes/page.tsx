import type { Metadata } from "next";
import { faq } from "@/content/institucional";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { Acordeao } from "@/components/gwl/acordeao";
import { ChamadaFinal } from "@/components/gwl/chamada-final";
import { JsonLd, dadosPerguntas } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Perguntas frequentes sobre plano de saúde: carência, reajuste e rede",
  description:
    "Respostas diretas sobre carência, doenças preexistentes, reajuste, tipos de plano, coparticipação, rede e portabilidade, com as regras da ANS.",
  alternates: { canonical: "/perguntas-frequentes/" },
};

/** Perguntas frequentes (COPY.md › 5): 14 respostas que abrem pela resposta, agrupadas por tema (R16, R24–R28). */
export default function PerguntasFrequentes() {
  const faqLd = dadosPerguntas(faq.flatMap((g) => g.itens));
  return (
    <>
      {faqLd && <JsonLd dados={faqLd} />}
      <TopoInterno
        caminho={"/perguntas-frequentes/"}
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Perguntas frequentes" }]}
        palavraChave="Dúvidas sobre plano de saúde"
        titulo="Perguntas que todo mundo faz antes de assinar."
        abertura="Respostas curtas, com as regras gerais da ANS. As condições exatas são as do contrato de cada operadora; conferimos com você."
        contexto={{ tipo: "geral" }}
      />
      {faq.map((grupo, i) => (
        <section
          key={grupo.tema}
          aria-labelledby={`t-tema-${i}`}
          className={`${i % 2 === 0 ? "bg-branco" : ""} px-5 py-20 md:px-10 md:py-28`}
        >
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
            <h2 id={`t-tema-${i}`} className="max-w-[16ch] text-h2-cel md:text-h2">
              {grupo.tema}.
            </h2>
            <Acordeao itens={grupo.itens} />
          </div>
        </section>
      ))}
      <ChamadaFinal />
    </>
  );
}
