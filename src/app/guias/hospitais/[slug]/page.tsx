import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guiasHospitais, guiasBairros, formatarData, rotaGuiaBairro } from "@/content/guias";
import { rotas } from "@/content/navegacao";
import { linkWhatsApp } from "@/lib/whatsapp";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { ListaPassos } from "@/components/gwl/cards";
import { Acordeao } from "@/components/gwl/acordeao";
import { ChamadaFinal } from "@/components/gwl/chamada-final";

/**
 * Guia por hospital (APP_FLOW › Fluxo 1; harness R22 e R28): rede só com operadora, produto e data de referência.
 * Sem rede validada, mostra o estado "em validação" e leva ao WhatsApp com o nome do hospital.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return guiasHospitais.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/hospitais/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = guiasHospitais.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: `Planos de saúde que incluem o ${g.nome}`,
    description: `Quais planos de saúde incluem o ${g.nome} na rede, com operadora, produto e data de referência. Confira o que muda entre eles antes de contratar.`,
    alternates: { canonical: `/guias/hospitais/${g.slug}/` },
  };
}

export default async function GuiaHospital({ params }: PageProps<"/guias/hospitais/[slug]">) {
  const { slug } = await params;
  const g = guiasHospitais.find((x) => x.slug === slug);
  if (!g) notFound();
  const bairro = guiasBairros.find((b) => b.slug === g.bairro);

  return (
    <>
      <TopoInterno
        caminho={`/guias/hospitais/${g.slug}/`}
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Guias", href: rotas.guias }, { rotulo: g.nome }]}
        palavraChave={g.palavraChave}
        titulo={`Planos de saúde que incluem o ${g.nome}.`}
        abertura="Operadoras e produtos que tinham este hospital na rede na data indicada, com o que muda entre eles. Confirme a rede atualizada antes de contratar."
        contexto={{ tipo: "hospital", hospital: g.nome }}
        aviso={g.validado ? undefined : "Conteúdo deste guia em validação com a GWL."}
      />

      {/* Rede conferida (R28) */}
      <section aria-labelledby="t-rede" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-rede" className="text-h2-cel md:text-h2">Rede conferida.</h2>
            <p className="mt-6 max-w-[44ch] text-nota text-musgo">
              A rede varia por produto e muda com o tempo. Cada linha mostra a data em que conferimos na operadora.
            </p>
          </div>
          {g.rede.length > 0 ? (
            <ul className="m-0 list-none border-t border-fio p-0">
              {g.rede.map((r) => (
                <li key={`${r.operadora}-${r.produto}`} className="grid gap-2 border-b border-fio py-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
                  <span>
                    <span className="block font-heading text-2xl leading-tight tracking-titulo">{r.operadora}</span>
                    <span className="mt-1 block text-grafite">
                      {r.produto} · {r.atendimentos}
                    </span>
                  </span>
                  <span className="text-nota text-musgo md:text-right">
                    Rede conferida em {formatarData(r.dataReferencia)}
                    <span className="block">{r.fonte}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-t border-fio pt-8">
              <p className="m-0 font-heading text-2xl leading-tight tracking-titulo md:text-h3">
                Estamos conferindo com as operadoras quais produtos incluem este hospital.
              </p>
              <p className="mt-4 max-w-[52ch] text-grafite">
                Enquanto a lista não é publicada, peça pelo WhatsApp: enviamos as opções com a rede atual e a data da consulta.
              </p>
              <a
                href={linkWhatsApp({ tipo: "hospital", hospital: g.nome })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block font-medium"
                data-evento="whatsapp_click"
              >
                Pedir a lista pelo WhatsApp <span aria-hidden>↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Como conferir (R16, R28) */}
      <section aria-labelledby="t-conferir" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-conferir" className="text-h2-cel md:text-h2">
            Antes de escolher um plano por este hospital.
          </h2>
          <ListaPassos
            passos={[
              {
                titulo: "Confira o produto exato",
                texto: "A mesma operadora tem produtos com redes diferentes. O que vale é o nome do produto no contrato.",
              },
              {
                titulo: "Veja o que o hospital atende pelo plano",
                texto: "Pronto-socorro, internação e maternidade podem estar incluídos em um produto e não em outro.",
              },
              {
                titulo: "Considere a carência",
                texto: "Até 24 horas para urgência e emergência, até 300 dias para parto e até 180 dias para os demais casos, salvo prazos menores oferecidos pela operadora.",
              },
              {
                titulo: "Confirme na operadora antes de assinar",
                texto: "A rede muda com o tempo. Conferimos a rede atual com você, e você também pode consultar a operadora.",
              },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="t-perguntas" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-perguntas" className="text-h2-cel md:text-h2">Perguntas sobre rede.</h2>
            {bairro && (
              <p className="mt-6 text-grafite">
                Mora na região? Veja o <Link href={rotaGuiaBairro(bairro.slug)}>guia de {bairro.nome}</Link>.
              </p>
            )}
          </div>
          <Acordeao
            itens={[
              {
                pergunta: "Como sei se o hospital que eu quero está no plano?",
                resposta:
                  "A rede varia por operadora e por linha de produto e muda com o tempo. Conferimos a rede atual do produto exato antes de você assinar.",
              },
              {
                pergunta: "Se o hospital sair da rede depois que eu contratar, o que acontece?",
                resposta:
                  "A operadora pode alterar a rede seguindo as regras da ANS. Se isso acontecer, explicamos as alternativas, inclusive a troca de plano, quando fizer sentido.",
              },
            ]}
          />
        </div>
      </section>

      <ChamadaFinal contexto={{ tipo: "hospital", hospital: g.nome }} />
    </>
  );
}
