import Link from "next/link";
import { guiaDoHospital } from "@/content/guias";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { chamadaFinal, comoFunciona, depoimentos, esteira, hospitais, manifesto, perguntas, placa, tipos, topo } from "@/content/home";
import { perfis, rotas } from "@/content/navegacao";
import { linkWhatsApp } from "@/lib/whatsapp";
import { LinkBotao } from "@/components/gwl/botao";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { TopoCenas, BotaoPausaTopo } from "@/components/gwl/topo-cenas";
import { PlacaDados } from "@/components/gwl/placa-dados";
import { Esteira, NomeOperadora } from "@/components/gwl/esteira";
import { ItemHospital, ListaHospitais } from "@/components/gwl/item-hospital";
import { Carrossel } from "@/components/gwl/carrossel";
import { CardDepoimento, CardPlano, ListaPassos } from "@/components/gwl/cards";
import { Acordeao } from "@/components/gwl/acordeao";
import { ChamadaFinal } from "@/components/gwl/chamada-final";

/**
 * Home (etapa 3). Ordem do DESIGN.md v2: topo com placa, esteira, manifesto, hospitais, tipos de plano,
 * como funciona, depoimentos, perguntas e chamada final. Texto: COPY.md v3 (RASCUNHO), em src/content/home.ts.
 * Página de servidor: só o fundo do topo, a esteira e os carrosséis hidratam no navegador.
 */
export default function Home() {
  const { registroSusep, endereco, operadoras } = empresa;
  const nomesOperadoras = operadoras.valor.length > 0 ? operadoras.valor : esteira.exemplos;

  return (
    <>
      {/* Topo */}
      <section aria-labelledby="titulo-home" className="escuro relative flex min-h-[min(46rem,calc(100svh-2.25rem))] items-end overflow-hidden bg-noite text-nevoa md:min-h-[min(57.5rem,calc(100svh-2.25rem))]">
        <TopoCenas cenas={topo.cenas} video={topo.video}>
          <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-32 pb-12 md:px-10 md:pb-14">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="mb-6 text-[0.9375rem] text-nevoa/75">
                  <span className="md:hidden">{topo.sobretituloCurto}</span>
                  <span className="hidden md:inline">{topo.sobretitulo}</span>
                </p>
                <h1 id="titulo-home" className="max-w-[15ch] text-h1-cel md:max-w-[19ch] md:text-h1">
                  {topo.titulo}
                </h1>
                <p className="mt-6 max-w-[50ch] text-sub text-nevoa/85">{topo.subtitulo}</p>
                <div className="mt-8 flex items-center gap-3">
                  <BotaoWhatsApp fundo="escuro" principal />
                  <BotaoPausaTopo />
                </div>
                <p className="mt-6 text-corpo text-nevoa/85">
                  {topo.atalho60.texto}{" "}
                  <Link href={rotas.pais60} className="font-medium text-nevoa">
                    {topo.atalho60.link} <span aria-hidden>→</span>
                  </Link>
                </p>
                <p className="mt-4 max-w-[52ch] text-nota text-nevoa/80">{topo.nota}</p>
              </div>
              <PlacaDados
                linhas={[
                  {
                    rotulo: "Registro SUSEP",
                    valor: registroSusep.valor ?? "[nº]",
                    nota: registroSusep.confirmado ? undefined : A_CONFIRMAR,
                  },
                  { rotulo: "Atuação", valor: placa.atuacao, nota: A_CONFIRMAR },
                  {
                    rotulo: "Atendimento",
                    valor: `${endereco.valor.bairro}, ${endereco.valor.uf}`,
                    nota: endereco.confirmado ? undefined : A_CONFIRMAR,
                  },
                ]}
              />
            </div>
          </div>
        </TopoCenas>
      </section>

      {/* Esteira de operadoras (R3, R7) */}
      <Esteira
        titulo={esteira.titulo}
        itens={nomesOperadoras.map((nome) => <NomeOperadora key={nome} nome={nome} />)}
        nota={operadoras.confirmado ? undefined : esteira.nota}
      />

      {/* Manifesto */}
      <section aria-labelledby="t-manifesto" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-8 text-[0.9375rem] text-musgo">{manifesto.rotulo}</p>
          <h2 id="t-manifesto" className="max-w-[28ch] text-manifesto-cel md:text-manifesto">
            {manifesto.frase} <span className="text-cinza">{manifesto.complemento}</span>
          </h2>
          <p className="mt-6 text-nota text-musgo">{manifesto.fonte}</p>
        </div>
      </section>

      {/* Hospitais */}
      <section id="hospital" aria-labelledby="t-hospital" className="bg-branco px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-hospital" className="text-h2-cel md:text-h2">{hospitais.titulo}</h2>
            <p className="mt-6 max-w-[40ch] text-pretty text-grafite">{hospitais.texto}</p>
            <p className="mt-6 max-w-[44ch] text-nota text-musgo">{hospitais.nota}</p>
          </div>
          <div>
            <ListaHospitais>
              {hospitais.lista.map((h) => (
                <ItemHospital
                  key={h.nome}
                  hospital={h.nome}
                  nota={guiaDoHospital(h.nome) ? "Ver o guia deste hospital" : h.nota}
                  hrefGuia={guiaDoHospital(h.nome)}
                />
              ))}
              <ItemHospital hospital="Outro hospital" nota="Diga qual pelo WhatsApp e conferimos para você" outro />
            </ListaHospitais>
            <p className="mt-4 text-legenda text-musgo">{hospitais.avisoLista}</p>
          </div>
        </div>
      </section>

      {/* Tipos de plano */}
      <section id="tipos" aria-labelledby="t-tipos" className="overflow-hidden bg-pedra py-20 md:py-32">
        <Carrossel
          titulo={
            <>
              <h2 id="t-tipos" className="max-w-[18ch] text-h2-cel md:text-h2">{tipos.titulo}</h2>
              <p className="mt-4 max-w-[52ch] text-pretty text-grafite">{tipos.texto}</p>
            </>
          }
          rotuloItem="Tipo de plano"
          larguraCard="plano"
          centralizado
        >
          {tipos.itens.map((t) => (
            <CardPlano
              key={t.titulo}
              titulo={t.titulo}
              rotulo={t.rotulo}
              imagem={{ alt: "", descricao: t.imagem.descricao, src: t.imagem.src, srcSet: t.imagem.srcSet }}
              resumo={t.resumo}
              acao={
                t.acao.href ? (
                  <Link href={t.acao.href} className="font-medium">
                    {t.acao.rotulo} <span aria-hidden>→</span>
                  </Link>
                ) : (
                  <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="font-medium" data-evento="whatsapp_click">
                    {t.acao.rotulo} <span aria-hidden>↗</span>
                    <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                  </a>
                )
              }
            />
          ))}
        </Carrossel>
        <nav aria-label="Planos por perfil" className="mx-auto mt-14 max-w-[1280px] px-5 md:px-10">
          <p className="text-nota text-musgo">{tipos.perfis}</p>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {perfis.filter((p) => p.href === rotas.pais60 || p.href === rotas.trocar).map((p) => (
              <li key={p.href}>
                <LinkBotao href={p.href} variante="contorno" tamanho="compacto">
                  {p.rotulo}
                </LinkBotao>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" aria-labelledby="t-como" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-como" className="text-h2-cel md:text-h2">{comoFunciona.titulo}</h2>
            <p className="mt-6 max-w-[38ch] text-grafite">{comoFunciona.texto}</p>
          </div>
          <ListaPassos passos={comoFunciona.passos} />
        </div>
      </section>

      {/* Depoimentos (R9: só reais e autorizados) */}
      <section aria-label="Depoimentos" className="overflow-hidden bg-branco py-20 md:py-32">
        <Carrossel
          titulo={
            <>
              <h2 className="max-w-[20ch] text-h2-cel md:text-h2">{depoimentos.titulo}</h2>
              <p className="mt-4 text-nota text-musgo">{depoimentos.aviso}</p>
            </>
          }
          rotuloItem="Depoimento"
          larguraCard="depoimento"
        >
          {depoimentos.itens.map((d, i) => (
            <CardDepoimento
              key={i}
              citacao={d.citacao}
              autor={d.autor}
              iniciais={"iniciais" in d ? d.iniciais : undefined}
              foto={"foto" in d && d.foto ? { alt: "", descricao: d.foto } : undefined}
            />
          ))}
        </Carrossel>
      </section>

      {/* Perguntas */}
      <section id="perguntas" aria-labelledby="t-perguntas" className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-perguntas" className="text-h2-cel md:text-h2">{perguntas.titulo}</h2>
            <Link href={rotas.perguntas} className="link-nav mt-6 inline-block font-medium">
              {perguntas.link} <span aria-hidden>→</span>
            </Link>
          </div>
          <Acordeao itens={perguntas.itens} />
        </div>
      </section>

      <ChamadaFinal titulo={chamadaFinal.titulo} />
    </>
  );
}
