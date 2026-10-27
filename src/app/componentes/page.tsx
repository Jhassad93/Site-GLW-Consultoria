import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPreview } from "@/config/site";
import { LinkBotao } from "@/components/gwl/botao";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { CardPerfil } from "@/components/gwl/card-perfil";
import { AtalhoHospital } from "@/components/gwl/atalho-hospital";
import { Acordeao } from "@/components/gwl/acordeao";
import { CampoSelecao, CampoTexto } from "@/components/gwl/campo";
import { rotas } from "@/content/navegacao";

export const metadata: Metadata = { title: "Vitrine de componentes", robots: { index: false, follow: false } };

/**
 * Vitrine interna dos componentes da etapa 2. Só existe em preview; em production vira 404.
 * Os textos aqui são de teste de layout e não vão para páginas públicas.
 */
export default function Componentes() {
  if (!isPreview) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-20 px-4 py-16 md:px-8">
      <header>
        <p className="font-bold text-copa">Uso interno da equipe</p>
        <h1 className="mt-3 text-h2 md:text-h1">Vitrine de componentes</h1>
      </header>

      <section aria-labelledby="t-botoes" className="space-y-6">
        <h2 id="t-botoes" className="text-h3">Botões e link</h2>
        <div className="flex flex-wrap items-center gap-4">
          <BotaoWhatsApp />
          <LinkBotao href={rotas.sobre} variante="secundario">Conhecer a GWL</LinkBotao>
          <a href={rotas.perguntas}>Link sublinhado em Rio</a>
        </div>
        <div className="flex flex-wrap gap-4 rounded-folha bg-copa p-8">
          <LinkBotao href={rotas.guias} variante="secundario-claro">Botão secundário na sala Copa</LinkBotao>
        </div>
      </section>

      <section aria-labelledby="t-perfis" className="space-y-6">
        <h2 id="t-perfis" className="text-h3">Cards de perfil</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <CardPerfil titulo="Para meus pais (60+)" texto="Texto de teste de layout com duas linhas para conferir a altura do card." href={rotas.pais60} acao="Ver planos 60+" sala="folha" />
          <CardPerfil titulo="Para a família" texto="Texto de teste de layout." href={rotas.familia} acao="Ver planos para família" sala="rio" />
          <CardPerfil titulo="Para minha empresa" texto="Texto de teste de layout." href={rotas.empresas} acao="Ver planos empresariais" sala="mel" />
        </div>
      </section>

      <section aria-labelledby="t-hospital" className="space-y-6 rounded-folha bg-copa p-6 text-branco md:p-10">
        <h2 id="t-hospital" className="text-h3">Atalhos de hospital</h2>
        <div className="grid max-w-xl gap-3">
          <AtalhoHospital hospital="Hospital de teste A" nota="rede de out/2026" />
          <AtalhoHospital hospital="Hospital de teste B, nome longo para quebrar linha no celular" nota="rede de out/2026" />
        </div>
      </section>

      <section aria-labelledby="t-acordeao" className="max-w-3xl space-y-6">
        <h2 id="t-acordeao" className="text-h3">Acordeão</h2>
        <Acordeao
          itens={[
            { pergunta: "Pergunta de teste com texto mais longo para ver a quebra de linha?", resposta: "Resposta de teste de layout." },
            { pergunta: "Segunda pergunta de teste?", resposta: "Outra resposta de teste." },
          ]}
        />
      </section>

      <section aria-labelledby="t-campos" className="max-w-xl space-y-6" data-oculta-barra>
        <h2 id="t-campos" className="text-h3">Campos de formulário</h2>
        <form className="space-y-6" action="#" aria-label="Formulário de teste (não envia)">
          <CampoTexto id="nome" rotulo="Seu nome" autoComplete="given-name" />
          <CampoTexto id="telefone" rotulo="WhatsApp com DDD" type="tel" inputMode="tel" autoComplete="tel" erro="Confira o número: faltam dígitos." defaultValue="11 9999" />
          <CampoSelecao id="perfil" rotulo="Para quem é o plano" opcoes={[{ valor: "familia", rotulo: "Família" }, { valor: "empresa", rotulo: "Empresa" }]} />
          <CampoTexto id="hospital" rotulo="Hospital que você quer usar" opcional dica="Só o nome do hospital. Não informe doenças ou tratamentos." />
        </form>
      </section>
    </div>
  );
}
