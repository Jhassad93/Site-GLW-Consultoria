import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guiasBairros, rotaGuiaHospital } from "@/content/guias";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { ItemHospital, ListaHospitais } from "@/components/gwl/item-hospital";
import { ListaPassos } from "@/components/gwl/cards";
import { ChamadaFinal } from "@/components/gwl/chamada-final";

/** Guia por bairro (APP_FLOW › Fluxo 1). Hospitais com guia levam ao guia; sem guia, ao WhatsApp (R28). */
export const dynamicParams = false;

export function generateStaticParams() {
  return guiasBairros.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/bairros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = guiasBairros.find((x) => x.slug === slug);
  if (!b) return {};
  return {
    title: `${b.palavraChave}, zona norte de SP`,
    description: `${b.palavraChave}: hospitais e pronto-socorros da região e como escolher um plano que os inclua, com data de referência da rede.`,
    alternates: { canonical: `/guias/bairros/${b.slug}/` },
  };
}

export default async function GuiaBairro({ params }: PageProps<"/guias/bairros/[slug]">) {
  const { slug } = await params;
  const b = guiasBairros.find((x) => x.slug === slug);
  if (!b) notFound();

  return (
    <>
      <TopoInterno
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Guias", href: rotas.guias }, { rotulo: b.nome }]}
        palavraChave={b.palavraChave}
        titulo={`Plano de saúde para quem mora em ${b.nome}.`}
        abertura={b.abertura}
        contexto={{ tipo: "geral" }}
        aviso={b.validado ? undefined : "Conteúdo deste guia em validação com a GWL."}
      />

      <section aria-labelledby="t-hospitais" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-hospitais" className="text-h2-cel md:text-h2">Hospitais da região.</h2>
            <p className="mt-6 max-w-[44ch] text-nota text-musgo">
              A rede de cada plano muda com o tempo e varia por produto. Os guias mostram a data em que conferimos.
            </p>
          </div>
          <div>
            <ListaHospitais>
              {b.hospitais.map((h) => (
                <ItemHospital
                  key={h.nome}
                  hospital={h.nome}
                  nota={h.slugGuia ? "Ver o guia deste hospital" : "Perguntar pelo WhatsApp quais planos incluem"}
                  hrefGuia={h.slugGuia ? rotaGuiaHospital(h.slugGuia) : undefined}
                />
              ))}
              <ItemHospital hospital="Outro hospital" nota="Diga qual pelo WhatsApp e conferimos para você" outro />
            </ListaHospitais>
            <p className="mt-4 text-legenda text-musgo">Lista de hospitais em validação com a GWL.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="t-dicas" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-dicas" className="text-h2-cel md:text-h2">Como escolher morando em {b.nome}.</h2>
          <ListaPassos passos={b.dicas} />
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
