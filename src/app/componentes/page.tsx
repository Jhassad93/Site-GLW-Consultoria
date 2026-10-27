import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPreview } from "@/config/site";
import { LinkBotao } from "@/components/gwl/botao";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { Acordeao } from "@/components/gwl/acordeao";
import { CampoSelecao, CampoTexto } from "@/components/gwl/campo";
import { ItemHospital, ListaHospitais } from "@/components/gwl/item-hospital";
import { PlacaDados } from "@/components/gwl/placa-dados";
import { Esteira, NomeOperadora } from "@/components/gwl/esteira";
import { Carrossel } from "@/components/gwl/carrossel";
import { CardDepoimento, CardPlano, ListaPassos } from "@/components/gwl/cards";
import { rotas } from "@/content/navegacao";
import { empresa, A_CONFIRMAR } from "@/content/empresa";

export const metadata: Metadata = { title: "Vitrine de componentes", robots: { index: false, follow: false } };

/**
 * Vitrine interna dos componentes do DESIGN.md v2. Só existe em preview; em production vira 404.
 * Os textos marcados entre colchetes são de teste de layout e não vão para páginas públicas.
 */
const planos = [
  { titulo: "Individual ou familiar", rotulo: "Pessoa física", cena: "Imagem IMG-04 · mãe e filha à mesa" },
  { titulo: "Coletivo por adesão", rotulo: "Entidade de classe", cena: "Imagem IMG-05 · profissional no estúdio" },
  { titulo: "Empresarial", rotulo: "Empresas e PMEs", cena: "Imagem IMG-06 · equipe pequena" },
] as const;

export default function Componentes() {
  if (!isPreview) notFound();

  return (
    <>
      <header className="mx-auto max-w-[1200px] px-5 pt-40 pb-16 md:px-10">
        <p className="text-[0.9375rem] text-musgo">Uso interno da equipe · DESIGN.md v2</p>
        <h1 className="mt-6 text-h2-cel md:text-h2">Vitrine de componentes.</h1>
      </header>

      <section aria-labelledby="t-botoes" className="mx-auto max-w-[1200px] space-y-8 px-5 pb-24 md:px-10">
        <h2 id="t-botoes" className="text-h3">Botões</h2>
        <div className="flex flex-wrap items-center gap-3">
          <BotaoWhatsApp />
          <LinkBotao href={rotas.sobre} variante="contorno">Botão de contorno</LinkBotao>
          <LinkBotao href={rotas.sobre} variante="escuro" tamanho="compacto" seta>Compacto</LinkBotao>
          <a href={rotas.perguntas}>Link em texto corrido</a>
        </div>
        <div className="escuro flex flex-wrap items-center gap-3 rounded-[2rem] bg-noite p-8 md:p-12">
          <BotaoWhatsApp fundo="escuro" />
          <LinkBotao href={rotas.sobre} variante="contorno-claro">Contorno no escuro</LinkBotao>
        </div>
      </section>

      <section aria-labelledby="t-placa" className="escuro bg-noite px-5 py-20 text-nevoa md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.6fr_1fr] md:items-end">
          <h2 id="t-placa" className="text-h2-cel md:text-h2">Placa de dados do topo.</h2>
          <PlacaDados
            linhas={[
              { rotulo: "Registro SUSEP", valor: empresa.registroSusep.valor ?? "[nº]", nota: A_CONFIRMAR },
              { rotulo: "Atuação", valor: "só saúde e odonto", nota: A_CONFIRMAR },
              { rotulo: "Atendimento", valor: "Santana, SP", nota: A_CONFIRMAR },
            ]}
          />
        </div>
      </section>

      <Esteira
        titulo="Comparamos planos de operadoras registradas na ANS"
        itens={Array.from({ length: 8 }, (_, i) => <NomeOperadora key={i} nome={`[Operadora ${i + 1}]`} />)}
        nota="Lista e logos em validação com a GWL e as operadoras."
      />

      <section aria-labelledby="t-manifesto" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-8 text-[0.9375rem] text-musgo">Manifesto</p>
          <h2 id="t-manifesto" className="max-w-[28ch] text-manifesto-cel md:text-manifesto">
            Frase principal em Noite. <span className="text-cinza">Segunda frase atenuada em Cinza, só em texto grande.</span>
          </h2>
        </div>
      </section>

      <section aria-labelledby="t-listas" className="bg-branco px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <h2 id="t-listas" className="text-h2-cel md:text-h2">Listas com fios finos.</h2>
          <div className="space-y-16">
            <ListaHospitais>
              <ItemHospital hospital="[Hospital de teste A]" nota="Rede conferida em [mês/ano]" />
              <ItemHospital hospital="[Hospital de teste B, nome longo para quebrar no celular]" nota="Rede conferida em [mês/ano]" />
              <ItemHospital hospital="Outro hospital" nota="Diga qual e conferimos para você" outro />
            </ListaHospitais>
            <ListaPassos
              passos={[
                { titulo: "Conversa", texto: "[Texto de teste do passo um.]" },
                { titulo: "Comparação por escrito", texto: "[Texto de teste do passo dois.]" },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-label="Carrossel de tipos de plano" className="overflow-hidden bg-pedra py-24 md:py-32">
        <Carrossel
          titulo={<h2 className="max-w-[18ch] text-h2-cel md:text-h2">Carrossel centralizado.</h2>}
          rotuloItem="Tipo de plano"
          larguraCard="plano"
          centralizado
          inicial={1}
        >
          {planos.map((p) => (
            <CardPlano
              key={p.titulo}
              titulo={p.titulo}
              rotulo={p.rotulo}
              imagem={{ alt: "", descricao: p.cena }}
              resumo="[Resumo de teste com duas linhas para conferir a altura do card.]"
              acao={<a href="#" className="font-medium">[Ação de teste] ↗</a>}
            />
          ))}
        </Carrossel>
      </section>

      <section aria-label="Carrossel de depoimentos" className="overflow-hidden bg-branco py-24 md:py-32">
        <Carrossel
          titulo={<h2 className="max-w-[20ch] text-h2-cel md:text-h2">Depoimentos alternados.</h2>}
          rotuloItem="Depoimento"
          larguraCard="depoimento"
        >
          <CardDepoimento
            citacao="“[Depoimento real, com autorização por escrito]”"
            autor="[Nome do cliente], [bairro]"
            foto={{ alt: "", descricao: "Foto do cliente, autorizada (IMG-12)" }}
          />
          <CardDepoimento citacao="“[Depoimento real em texto]”" autor="[Nome do cliente]" iniciais="AB" />
          <CardDepoimento
            citacao="“[Depoimento real, com autorização por escrito]”"
            autor="[Nome do cliente]"
            foto={{ alt: "", descricao: "Foto do cliente, autorizada (IMG-12)" }}
          />
        </Carrossel>
      </section>

      <section aria-labelledby="t-faq" className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <h2 id="t-faq" className="text-h2-cel md:text-h2">Acordeão.</h2>
          <Acordeao
            itens={[
              { pergunta: "[Pergunta de teste com texto mais longo para ver a quebra de linha?]", resposta: "[Resposta de teste.]" },
              { pergunta: "[Segunda pergunta de teste?]", resposta: "[Outra resposta de teste.]" },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="t-campos" className="bg-branco px-5 py-24 md:px-10" data-oculta-barra>
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <h2 id="t-campos" className="text-h2-cel md:text-h2">Campos.</h2>
          <form className="space-y-6" action="#" aria-label="Formulário de teste (não envia)">
            <CampoTexto id="nome" rotulo="Seu nome" autoComplete="given-name" />
            <CampoTexto id="telefone" rotulo="WhatsApp com DDD" type="tel" inputMode="tel" autoComplete="tel" erro="Confira o número: faltam dígitos." defaultValue="11 9999" />
            <CampoSelecao id="perfil" rotulo="Para quem é o plano" opcoes={[{ valor: "familia", rotulo: "Família" }, { valor: "empresa", rotulo: "Empresa" }]} />
            <CampoTexto id="hospital" rotulo="Hospital que você quer usar" opcional dica="Só o nome do hospital. Não informe doenças ou tratamentos." />
          </form>
        </div>
      </section>
    </>
  );
}
