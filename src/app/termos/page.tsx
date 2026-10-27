import type { Metadata } from "next";
import Link from "next/link";
import { empresa } from "@/content/empresa";
import { VERSAO_TERMOS } from "@/content/legal";
import { exibir } from "@/lib/dados";
import { linksExternos, rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições de uso do site da GWL Corretora de Seguros e o papel da corretora na contratação de planos de saúde.",
  alternates: { canonical: "/termos/" },
};

/**
 * Termos de uso (harness R2, R4, R5, R16, R21, R23, R28). RASCUNHO jurídico: revisar antes de publicar.
 */
const secoes: { titulo: string; corpo: React.ReactNode }[] = [
  {
    titulo: "Quem somos",
    corpo: (
      <p>
        Este site é da {exibir(empresa.razaoSocial)}, CNPJ {exibir(empresa.cnpj)}, corretora de seguros com registro na SUSEP nº{" "}
        {exibir(empresa.registroSusep)}. Confira o registro na{" "}
        <a href={linksExternos.consultaSusep} target="_blank" rel="noopener noreferrer">
          consulta oficial da SUSEP<span className="sr-only"> (abre em nova aba)</span>
        </a>
        .
      </p>
    ),
  },
  {
    titulo: "O papel da corretora",
    corpo: (
      <p>
        A GWL é corretora: intermediamos a contratação, comparamos opções, orientamos e acompanhamos. Não somos operadora de planos de saúde
        nem administradora de benefícios. Cobertura, rede, preço, carência, reajuste e aceitação são definidos pela operadora, conforme o
        contrato e as regras da ANS.
      </p>
    ),
  },
  {
    titulo: "Informações do site",
    corpo: (
      <>
        <p>
          O conteúdo do site é informativo e geral. Não é uma proposta, não garante preço, rede, cobertura ou aceitação, e não substitui a
          leitura do contrato e dos documentos da operadora, como o Manual de Orientação para Contratação de Planos de Saúde.
        </p>
        <p>
          A rede de hospitais muda com o tempo e varia por produto. Quando o site cita um hospital, mostra a data em que a rede foi
          conferida. Confirme sempre a rede atual antes de contratar.
        </p>
      </>
    ),
  },
  {
    titulo: "Pedidos de contato e WhatsApp",
    corpo: (
      <p>
        Enviar o formulário ou uma mensagem pelo WhatsApp não contrata nenhum plano: é um pedido de contato. A simulação de preço é feita
        no atendimento individual, para o seu perfil. Não informe dados de saúde nem documentos pelo site.
      </p>
    ),
  },
  {
    titulo: "Marcas e conteúdo",
    corpo: (
      <p>
        Nomes e marcas de operadoras pertencem aos seus titulares e só aparecem para identificar com quem trabalhamos. Os textos do site
        são da GWL e não podem ser copiados para fins comerciais sem autorização.
      </p>
    ),
  },
  {
    titulo: "Privacidade e legislação",
    corpo: (
      <p>
        O tratamento de dados pessoais segue a nossa <Link href={rotas.privacidade}>política de privacidade</Link>. Estes termos seguem a
        legislação brasileira, inclusive o Código de Defesa do Consumidor.
      </p>
    ),
  },
];

export default function Termos() {
  return (
    <>
      <TopoInterno
        caminho={"/termos/"}
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Termos de uso" }]}
        titulo="Termos de uso."
        abertura={<>Condições de uso do site. Versão de {VERSAO_TERMOS}.</>}
      />
      <article className="bg-branco px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          {secoes.map((s, i) => (
            <section
              key={s.titulo}
              aria-labelledby={`t-${i}`}
              className="grid gap-4 border-t border-fio py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16"
            >
              <h2 id={`t-${i}`} className="text-2xl leading-tight md:text-h3">
                {s.titulo}
              </h2>
              <div className="max-w-[68ch] space-y-4 text-grafite">{s.corpo}</div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
