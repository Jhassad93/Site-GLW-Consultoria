import { empresa } from "@/content/empresa";
import { MARCA_A_CONFIRMAR } from "@/content/pendencias";
import { SITE_URL } from "@/config/site";

/**
 * Dados estruturados (checklist SEO/IA, item 7; Anexo F do harness: InsuranceAgency com legalName, taxID e
 * identifier SUSEP). Regra: só entram dados **confirmados**; nada "a confirmar" vai para o JSON-LD.
 */
export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapa aspas; "<" é trocado para não fechar a tag script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}

const url = (caminho: string) => new URL(caminho, SITE_URL).toString();
const ID_ORGANIZACAO = url("/#organizacao");

export function dadosOrganizacao() {
  const e = empresa;
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": ID_ORGANIZACAO,
    name: e.nomeFantasia.valor,
    url: url("/"),
    description:
      "Corretora de planos de saúde e odontológicos em Santana, zona norte de São Paulo. Compara planos de operadoras registradas na ANS.",
    areaServed: { "@type": "City", name: "São Paulo" },
    sameAs: [e.instagram.valor],
  };
  if (e.razaoSocial.confirmado) org.legalName = e.razaoSocial.valor;
  if (e.cnpj.confirmado) org.taxID = e.cnpj.valor;
  if (e.registroSusep.confirmado && e.registroSusep.valor)
    org.identifier = { "@type": "PropertyValue", propertyID: "SUSEP", value: e.registroSusep.valor };
  if (e.endereco.confirmado)
    org.address = {
      "@type": "PostalAddress",
      streetAddress: e.endereco.valor.logradouro,
      addressLocality: e.endereco.valor.cidade,
      addressRegion: e.endereco.valor.uf,
      postalCode: e.endereco.valor.cep,
      addressCountry: "BR",
    };
  if (e.telefone.confirmado && e.telefone.valor) org.telephone = `+55${e.telefone.valor.replace(/\D/g, "")}`;
  if (e.email.confirmado && e.email.valor) org.email = e.email.valor;
  return org;
}

export function dadosTrilha(trilha: { rotulo: string; href?: string }[], atual: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.rotulo,
      item: url(t.href ?? atual),
    })),
  };
}

/** FAQPage só com respostas sem pendência (nada "a confirmar"). */
export function dadosPerguntas(itens: readonly { pergunta: string; resposta: string }[]) {
  const confirmados = itens.filter((i) => !i.resposta.includes(MARCA_A_CONFIRMAR));
  if (confirmados.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: confirmados.map((i) => ({
      "@type": "Question",
      name: i.pergunta,
      acceptedAnswer: { "@type": "Answer", text: i.resposta },
    })),
  };
}

export function dadosServico(nome: string, descricao: string, caminho: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nome,
    description: descricao,
    serviceType: "Corretagem de planos de saúde",
    url: url(caminho),
    provider: { "@id": ID_ORGANIZACAO },
    areaServed: { "@type": "City", name: "São Paulo" },
  };
}
