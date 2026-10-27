import type { MetadataRoute } from "next";
import { SITE_URL, isPreview } from "@/config/site";

/**
 * robots.txt (checklist SEO/IA, item 13).
 * Política aprovada por João em 27/10/2026: liberar todos os robôs, inclusive os de IA de treino, de busca e de
 * visita a pedido do usuário (tabela de robôs conferida em fontes oficiais na mesma data; ver docs/BRIEF.md).
 * Na prévia, tudo bloqueado até a publicação oficial (harness, Anexo D).
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/obrigado/", "/componentes/"] }],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
