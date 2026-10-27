import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { rotas } from "@/content/navegacao";
import { guiasBairros, guiasHospitais, rotaGuiaBairro, rotaGuiaHospital } from "@/content/guias";

/** sitemap.xml (checklist SEO/IA, item 8). Fora: /componentes (só prévia) e /obrigado (noindex). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const caminhos = [
    rotas.home,
    rotas.pais60,
    rotas.familia,
    rotas.empresas,
    rotas.mei,
    rotas.trocar,
    rotas.guias,
    ...guiasHospitais.map((g) => rotaGuiaHospital(g.slug)),
    ...guiasBairros.map((b) => rotaGuiaBairro(b.slug)),
    rotas.operadoras,
    rotas.perguntas,
    rotas.sobre,
    rotas.contato,
    rotas.privacidade,
    rotas.termos,
  ];
  const agora = new Date();
  return caminhos.map((c) => ({
    url: new URL(c, SITE_URL).toString(),
    lastModified: agora,
    changeFrequency: "monthly",
    priority: c === "/" ? 1 : 0.7,
  }));
}
