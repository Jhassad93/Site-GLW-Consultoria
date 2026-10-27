import { SITE_URL } from "@/config/site";
import { empresa } from "@/content/empresa";
import { paginasPerfil, ordemPerfis } from "@/content/perfis";
import { guiasHospitais, rotaGuiaHospital } from "@/content/guias";
import { rotas } from "@/content/navegacao";

/**
 * /llms.txt (checklist SEO/IA, item 16): resumo do site e links principais para assistentes de IA.
 * Só fatos confirmados; dados "a confirmar" ficam de fora (harness R9; regra do JSON-LD).
 */
export const dynamic = "force-static";

const url = (c: string) => new URL(c, SITE_URL).toString();

export function GET() {
  const e = empresa;
  const fatos = [
    `- Nome: ${e.nomeFantasia.valor}`,
    e.razaoSocial.confirmado ? `- Razão social: ${e.razaoSocial.valor}` : null,
    e.cnpj.confirmado ? `- CNPJ: ${e.cnpj.valor}` : null,
    e.registroSusep.confirmado && e.registroSusep.valor ? `- Registro SUSEP: ${e.registroSusep.valor}` : null,
    e.endereco.confirmado ? `- Endereço: ${e.endereco.valor.logradouro}, ${e.endereco.valor.bairro}, ${e.endereco.valor.cidade}/${e.endereco.valor.uf}` : null,
    `- Instagram: ${e.instagram.valor}`,
  ].filter(Boolean);

  const texto = `# ${e.nomeFantasia.valor}

> Corretora de planos de saúde e odontológicos em Santana, zona norte de São Paulo. Compara planos de operadoras registradas na ANS começando pelo hospital em que a pessoa confia e explica carência, reajuste, tipo de contrato e rede antes da assinatura. A GWL é corretora: não é operadora; preço, rede e aceitação são definidos pela operadora.

${fatos.join("\n")}

## Planos por perfil
${ordemPerfis.map((id) => `- [${paginasPerfil[id].tituloPagina}](${url(paginasPerfil[id].rota)}): ${paginasPerfil[id].descricao}`).join("\n")}

## Guias
- [Guias por hospital e bairro](${url(rotas.guias)})
${guiasHospitais.map((g) => `- [Planos de saúde que incluem o ${g.nome}](${url(rotaGuiaHospital(g.slug))})`).join("\n")}

## Informações
- [Perguntas frequentes sobre plano de saúde](${url(rotas.perguntas)}): carência, doenças preexistentes, reajuste, tipos de plano, coparticipação e rede, com as regras gerais da ANS
- [Operadoras com que trabalhamos](${url(rotas.operadoras)})
- [Sobre a GWL](${url(rotas.sobre)})
- [Contato](${url(rotas.contato)})
`;
  return new Response(texto, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
