import type { Metadata } from "next";
import { guiasBairros, guiasHospitais, rotaGuiaBairro, rotaGuiaHospital } from "@/content/guias";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { ItemHospital, ListaHospitais } from "@/components/gwl/item-hospital";
import { ChamadaFinal } from "@/components/gwl/chamada-final";

export const metadata: Metadata = {
  title: "Guias de planos de saúde por hospital e bairro na zona norte",
  description:
    "Guias para escolher plano de saúde na zona norte de São Paulo a partir do hospital que você usa ou do bairro onde mora, com data de referência da rede.",
  alternates: { canonical: "/guias/" },
};

/** Índice de guias (APP_FLOW › Páginas). */
export default function Guias() {
  return (
    <>
      <TopoInterno
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Guias" }]}
        palavraChave="Planos de saúde por hospital na zona norte"
        titulo="Guias para escolher pelo hospital e pelo bairro."
        abertura="Primeiro o hospital, depois o plano. Cada guia mostra a data em que a rede foi conferida."
        contexto={{ tipo: "outro-hospital" }}
      />

      <section aria-labelledby="t-por-hospital" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-por-hospital" className="text-h2-cel md:text-h2">Por hospital.</h2>
          <ListaHospitais>
            {guiasHospitais.map((g) => (
              <ItemHospital
                key={g.slug}
                hospital={g.nome}
                nota={g.validado ? "Ver o guia" : "Ver o guia (em validação)"}
                hrefGuia={rotaGuiaHospital(g.slug)}
              />
            ))}
            <ItemHospital hospital="Outro hospital" nota="Diga qual pelo WhatsApp e conferimos para você" outro />
          </ListaHospitais>
        </div>
      </section>

      <section aria-labelledby="t-por-bairro" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-por-bairro" className="text-h2-cel md:text-h2">Por bairro.</h2>
          <ListaHospitais>
            {guiasBairros.map((b) => (
              <ItemHospital
                key={b.slug}
                hospital={b.nome}
                nota={b.validado ? "Ver o guia" : "Ver o guia (em validação)"}
                hrefGuia={rotaGuiaBairro(b.slug)}
              />
            ))}
          </ListaHospitais>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
