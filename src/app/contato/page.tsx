import type { Metadata } from "next";
import Link from "next/link";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { contato as c } from "@/content/institucional";
import { exibir, formatarTelefone } from "@/lib/dados";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { FormularioContato } from "@/components/gwl/formulario-contato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a GWL Corretora de Seguros pelo WhatsApp, por telefone ou em Santana, zona norte de São Paulo, ou peça para ligarmos para você.",
  alternates: { canonical: "/contato/" },
};

/**
 * Contato (APP_FLOW › Fluxo 3; harness R12, R17, R25). O formulário segue o SCHEMA.md (sem dado de saúde, CPF ou
 * de terceiros). O envio vai para a função da Cloudflare /api/contato (functions/api/contato.ts).
 */
export default function Contato() {
  const { whatsapp, telefone, email, horarioAtendimento, endereco } = empresa;
  const end = endereco.valor;
  const marca = (ok: boolean) => (ok ? "" : ` (${A_CONFIRMAR})`);
  const canais = [
    ["WhatsApp", `${formatarTelefone(whatsapp.valor)}${marca(whatsapp.confirmado)}`],
    ["Telefone", telefone.valor ? `${formatarTelefone(telefone.valor)}${marca(telefone.confirmado)}` : A_CONFIRMAR],
    ["E-mail", exibir(email)],
    ["Horário", exibir(horarioAtendimento)],
    ["Endereço", `${end.logradouro}, ${end.bairro}, ${end.cidade}/${end.uf}, CEP ${end.cep}${marca(endereco.confirmado)}`],
  ] as const;

  return (
    <>
      <TopoInterno
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Contato" }]}
        palavraChave={c.palavraChave}
        titulo={c.titulo}
        abertura={c.abertura}
        contexto={{ tipo: "geral" }}
      />

      <section aria-labelledby="t-canais" className="bg-branco px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-canais" className="text-h2-cel md:text-h2">Canais de atendimento.</h2>
          <dl className="m-0 border-t border-fio">
            {canais.map(([rotulo, valor]) => (
              <div key={rotulo} className="grid gap-1 border-b border-fio py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-nota text-musgo">{rotulo}</dt>
                <dd className="m-0">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="formulario" aria-labelledby="t-form" data-oculta-barra className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <div>
            <h2 id="t-form" className="text-h2-cel md:text-h2">{c.formulario.titulo}</h2>
            <p className="mt-6 max-w-[40ch] text-grafite">{c.formulario.texto}</p>
          </div>
          <FormularioContato
            paraQuem={c.formulario.paraQuem}
            horarios={c.formulario.horarios}
            siteKeyTurnstile={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined}
            aviso={
              <>
                Usamos estes dados só para retornar o seu contato sobre planos de saúde. Não pedimos dados de saúde aqui. Veja a{" "}
                <Link href={rotas.privacidade}>política de privacidade</Link>.
              </>
            }
          />
        </div>
      </section>

      <section aria-labelledby="t-externos" className="bg-branco px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-20">
          <h2 id="t-externos" className="text-h2-cel md:text-h2">Reclamações e canais oficiais.</h2>
          <ul className="m-0 list-none border-t border-fio p-0">
            {c.canaisExternos.map((x) => (
              <li key={x.titulo} className="border-b border-fio py-6">
                <span className="block font-heading text-2xl leading-tight tracking-titulo">{x.titulo}</span>
                <span className="mt-2 block text-grafite">
                  {x.texto}{" "}
                  <a href={x.link.href} target="_blank" rel="noopener noreferrer">
                    {x.link.rotulo}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
