import type { Metadata } from "next";
import Link from "next/link";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { contato as c } from "@/content/institucional";
import { exibir, formatarTelefone } from "@/lib/dados";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { CampoSelecao, CampoTexto } from "@/components/gwl/campo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a GWL Corretora de Seguros pelo WhatsApp, por telefone ou em Santana, zona norte de São Paulo, ou peça para ligarmos para você.",
  alternates: { canonical: "/contato/" },
};

/**
 * Contato (APP_FLOW › Fluxo 3; harness R12, R17, R25). O formulário segue o SCHEMA.md (sem dado de saúde, CPF ou
 * de terceiros). O envio é ligado na etapa 8 (Cloudflare Function + Supabase); até lá o botão fica desativado.
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
          <form aria-labelledby="t-form" className="space-y-6" noValidate>
            <CampoTexto id="nome" rotulo="Seu nome" autoComplete="name" minLength={2} maxLength={120} />
            <CampoTexto
              id="telefone"
              rotulo="Telefone ou WhatsApp com DDD"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dica="Exemplo: (11) 91234-5678"
            />
            <CampoSelecao id="para_quem" rotulo="Para quem é o plano" opcoes={c.formulario.paraQuem} />
            <CampoTexto
              id="hospital_preferido"
              rotulo="Hospital que você quer usar"
              opcional
              maxLength={120}
              dica="Só o nome do hospital. Não informe doenças, tratamentos ou dados de outras pessoas."
            />
            <CampoSelecao id="melhor_horario" rotulo="Melhor horário para ligarmos" opcoes={c.formulario.horarios} />
            <div className="space-y-4 border-t border-fio pt-6">
              <p className="m-0 text-nota text-musgo">
                Usamos estes dados só para retornar o seu contato sobre planos de saúde. Veja a{" "}
                <Link href={rotas.privacidade}>política de privacidade</Link>.
              </p>
              <button
                type="submit"
                disabled
                className="inline-flex min-h-15 items-center rounded-full bg-noite px-7 text-corpo font-medium text-nevoa disabled:opacity-50"
              >
                Quero receber o contato
              </button>
              <p className="m-0 text-nota text-musgo">Envio do formulário em ativação. Enquanto isso, fale com a GWL pelo WhatsApp.</p>
            </div>
          </form>
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
