import Link from "next/link";
import { guiaDoHospital } from "@/content/guias";
import type { Metadata } from "next";
import { paginasPerfil, ordemPerfis, type ConteudoPerfil, type PerfilId } from "@/content/perfis";
import { perfis, rotas } from "@/content/navegacao";
import { isPreview } from "@/config/site";
import { BotaoWhatsApp } from "@/components/gwl/botao-whatsapp";
import { LinkBotao } from "@/components/gwl/botao";
import { Acordeao } from "@/components/gwl/acordeao";
import { ChamadaFinal } from "@/components/gwl/chamada-final";
import { JsonLd, dadosPerguntas, dadosServico, dadosTrilha } from "@/components/seo/json-ld";
import { ItemHospital, ListaHospitais } from "@/components/gwl/item-hospital";
import { hospitais } from "@/content/home";

/**
 * Modelo comum das páginas por perfil (IMPLEMENTATION_PLAN › Etapa 4; DESIGN.md v2):
 * topo escuro com H1 da palavra-chave e imagem, "o que preocupa × o que explicamos" em lista com fios,
 * perguntas da persona, outros perfis e chamada final com a mensagem pronta do perfil (R14: sem dado de saúde).
 */
export function metadataPerfil(id: PerfilId): Metadata {
  const p = paginasPerfil[id];
  return {
    title: p.tituloPagina,
    description: p.descricao,
    alternates: { canonical: p.rota },
  };
}

function Topo({ p }: { p: ConteudoPerfil }) {
  return (
    <section aria-labelledby="titulo-perfil" className="escuro bg-noite text-nevoa">
      <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-5 pt-32 pb-14 md:px-10 md:pt-44 md:pb-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <nav aria-label="Você está em" className="mb-6 text-nota text-nevoa/70">
            <Link href={rotas.home} className="link-nav text-nevoa/80">
              Início
            </Link>{" "}
            <span aria-hidden>/</span> <span aria-current="page">{p.sobretitulo.split(" · ")[0]}</span>
          </nav>
          <h1 id="titulo-perfil">
            <span className="mb-4 block font-sans text-sub font-medium tracking-normal text-nevoa/75">{p.palavraChave}</span>
            <span className="block text-h1-cel md:max-w-[18ch] md:text-[4rem] md:leading-[1.04]">{p.h1}</span>
          </h1>
          <p className="mt-6 max-w-[50ch] text-sub text-pretty text-nevoa/85">{p.abertura}</p>
          <div className="mt-8">
            <BotaoWhatsApp fundo="escuro" principal contexto={{ tipo: "perfil", perfil: p.id }} />
          </div>
          <p className="mt-5 max-w-[52ch] text-nota text-nevoa/75">Valores, rede e aceitação são definidos pela operadora.</p>
        </div>
        {p.imagem ? (
          <div aria-hidden className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl bg-[#3a4436] lg:block">
            {isPreview && <span className="absolute bottom-4 left-5 text-legenda text-nevoa/80">{p.imagem.descricao}</span>}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Pares({ p }: { p: ConteudoPerfil }) {
  return (
    <section aria-labelledby="t-pares" className="bg-branco px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <h2 id="t-pares" className="max-w-[20ch] text-h2-cel md:text-h2">
          O que costuma preocupar, e o que explicamos antes.
        </h2>
        <ul className="mt-12 list-none border-t border-fio p-0 md:mt-16">
          {p.pares.map((par) => (
            <li
              key={par.titulo}
              className="grid gap-4 border-b border-fio py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:py-10"
            >
              <h3 className="text-2xl leading-tight md:text-h3">{par.titulo}</h3>
              <p className="m-0 text-pretty text-musgo">
                <span className="mb-1 block text-nota font-medium text-musgo">O que preocupa</span>
                {par.preocupacao}
              </p>
              <p className="m-0 text-pretty text-grafite">
                <span className="mb-1 block text-nota font-medium text-musgo">O que explicamos</span>
                {par.resposta}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Atalhos de hospital nas páginas em que o hospital é o critério nº 1 (60+, família, trocar). */
function Hospitais() {
  return (
    <section aria-labelledby="t-hospitais" className="px-5 pt-20 md:px-10 md:pt-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
        <div>
          <h2 id="t-hospitais" className="text-h2-cel md:text-h2">{hospitais.titulo}</h2>
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
  );
}

function Perguntas({ p }: { p: ConteudoPerfil }) {
  return (
    <section aria-labelledby="t-perguntas" className="px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
        <div>
          <h2 id="t-perguntas" className="text-h2-cel md:text-h2">
            Perguntas de quem está no seu lugar.
          </h2>
          <Link href={rotas.perguntas} className="link-nav mt-6 inline-block font-medium">
            Ver todas as perguntas <span aria-hidden>→</span>
          </Link>
        </div>
        <Acordeao itens={p.perguntas} />
      </div>
    </section>
  );
}

function OutrosPerfis({ atual }: { atual: PerfilId }) {
  const outros = ordemPerfis.filter((id) => id !== atual);
  const rotulo = (id: PerfilId) => perfis.find((x) => x.href === paginasPerfil[id].rota)?.rotulo ?? id;
  return (
    <nav aria-label="Outros perfis" className="px-5 pb-20 md:px-10 md:pb-24">
      <div className="mx-auto max-w-[1200px] border-t border-fio pt-10">
      <p className="text-nota text-musgo">Não é o seu caso?</p>
      <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
        {outros.map((id) => (
          <li key={id}>
            <LinkBotao href={paginasPerfil[id].rota} variante="contorno" tamanho="compacto">
              {rotulo(id)}
            </LinkBotao>
          </li>
        ))}
      </ul>
      </div>
    </nav>
  );
}

export function PaginaPerfil({ id }: { id: PerfilId }) {
  const p = paginasPerfil[id];
  const faqLd = dadosPerguntas(p.perguntas);
  return (
    <>
      <JsonLd dados={dadosServico(p.tituloPagina, p.descricao, p.rota)} />
      <JsonLd dados={dadosTrilha([{ rotulo: "Início", href: rotas.home }, { rotulo: p.sobretitulo.split(" · ")[0] }], p.rota)} />
      {faqLd && <JsonLd dados={faqLd} />}
      <Topo p={p} />
      <Pares p={p} />
      {p.hospitais && <Hospitais />}
      <Perguntas p={p} />
      <OutrosPerfis atual={id} />
      <ChamadaFinal contexto={{ tipo: "perfil", perfil: id }} />
    </>
  );
}
