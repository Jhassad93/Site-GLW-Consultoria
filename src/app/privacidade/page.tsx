import type { Metadata } from "next";
import Link from "next/link";
import { empresa } from "@/content/empresa";
import { encarregado, VERSAO_POLITICA } from "@/content/legal";
import { exibir } from "@/lib/dados";
import { rotas } from "@/content/navegacao";
import { TopoInterno } from "@/components/paginas/topo-interno";
import { BotaoPreferenciasCookies } from "@/components/site/consentimento";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a GWL Corretora de Seguros trata os dados pessoais recebidos pelo site, conforme a LGPD.",
  alternates: { canonical: "/privacidade/" },
};

/**
 * Política de privacidade (LGPD, arts. 6º, 7º, 9º, 18, 33 e 41; harness R12, R13; SCHEMA.md).
 * RASCUNHO jurídico: revisar com João e com o cliente antes de publicar (pendência "revisao-juridica").
 */
const secoes: { titulo: string; corpo: React.ReactNode }[] = [
  {
    titulo: "Quem trata os seus dados",
    corpo: (
      <p>
        A controladora é a {exibir(empresa.razaoSocial)}, CNPJ {exibir(empresa.cnpj)}, com sede em {empresa.endereco.valor.logradouro},{" "}
        {empresa.endereco.valor.bairro}, {empresa.endereco.valor.cidade}/{empresa.endereco.valor.uf}. Encarregado pelo tratamento de dados
        pessoais: {encarregado}.
      </p>
    ),
  },
  {
    titulo: "Que dados recebemos e para quê",
    corpo: (
      <>
        <p>
          <strong>Formulário “Prefiro que me liguem”:</strong> nome, telefone, para quem é o plano (categoria), hospital de preferência
          (opcional) e melhor horário. Também registramos a página de origem, a campanha de origem (quando houver) e a versão deste aviso.
          Finalidade: retornar o seu contato e apresentar opções de planos de saúde e odontológicos.
        </p>
        <p>
          <strong>Não pedimos dados de saúde, documentos (como CPF ou RG) nem dados de outras pessoas no site.</strong> Essas informações,
          quando necessárias para uma proposta, são tratadas só no atendimento individual e nos formulários da própria operadora.
        </p>
        <p>
          <strong>WhatsApp:</strong> os botões abrem uma conversa no WhatsApp com uma mensagem pronta que indica apenas o assunto (perfil ou
          hospital). O site não grava essa conversa. No WhatsApp, valem também os termos e a política da Meta.
        </p>
        <p>
          <strong>Estatísticas de visita:</strong> só com o seu consentimento, usamos o Google Analytics para medir visitas e cliques, sem
          identificar você pelo nome.
        </p>
      </>
    ),
  },
  {
    titulo: "Base legal",
    corpo: (
      <p>
        O formulário é tratado para atender ao seu pedido de contato, como procedimento preliminar a um possível contrato (LGPD, art. 7º,
        V). As estatísticas de visita dependem do seu consentimento (LGPD, art. 7º, I), que você pode retirar a qualquer momento.
      </p>
    ),
  },
  {
    titulo: "Com quem compartilhamos",
    corpo: (
      <>
        <p>Usamos fornecedores que tratam dados em nosso nome, só para operar o site:</p>
        <ul>
          <li>Cloudflare: hospedagem do site, envio do formulário e proteção contra robôs (Turnstile).</li>
          <li>Supabase: banco de dados onde ficam os pedidos de contato.</li>
          <li>Resend: envio do e-mail que avisa a equipe sobre um novo pedido.</li>
          <li>Google: estatísticas de visita, só com o seu consentimento.</li>
        </ul>
        <p>
          Alguns desses fornecedores podem tratar dados fora do Brasil. Nesses casos, a transferência segue as hipóteses da LGPD (art. 33).
          Não vendemos dados pessoais. Operadoras de planos de saúde só recebem os seus dados se você decidir seguir com uma proposta.
        </p>
      </>
    ),
  },
  {
    titulo: "Por quanto tempo guardamos",
    corpo: (
      <p>
        Pedidos de contato que não viraram contrato são excluídos 12 meses depois da última atualização. Pedidos que viraram contrato são
        anonimizados 24 meses depois da última atualização, e ficam só números agregados. A exclusão e a anonimização são automáticas.
      </p>
    ),
  },
  {
    titulo: "Segurança",
    corpo: (
      <p>
        Os pedidos de contato não podem ser lidos pelo navegador nem por quem acessa o site: só a equipe da GWL os vê, num painel protegido.
        As chaves de acesso ficam guardadas como segredo nos servidores, nunca no código do site.
      </p>
    ),
  },
  {
    titulo: "Seus direitos",
    corpo: (
      <>
        <p>
          Você pode pedir a confirmação de que tratamos seus dados, o acesso a eles, a correção, a anonimização, o bloqueio ou a exclusão, a
          portabilidade, informações sobre compartilhamento e a revogação do consentimento (LGPD, art. 18).
        </p>
        <p>
          Faça o pedido pelo canal do encarregado: {encarregado}. Se não ficar satisfeito, você pode reclamar à Autoridade Nacional de
          Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },
  {
    titulo: "Cookies e armazenamento no navegador",
    corpo: (
      <>
        <ul>
          <li>
            <strong>Necessários:</strong> a sua escolha sobre cookies fica guardada no próprio navegador; na página de contato, a proteção
            contra robôs da Cloudflare (Turnstile) pode usar dados técnicos do navegador.
          </li>
          <li>
            <strong>Estatísticas (opcionais):</strong> cookies do Google Analytics (como <code>_ga</code>), só depois do seu aceite.
          </li>
        </ul>
        <p>
          <BotaoPreferenciasCookies className="font-medium underline underline-offset-4" />
        </p>
      </>
    ),
  },
];

export default function Privacidade() {
  return (
    <>
      <TopoInterno
        trilha={[{ rotulo: "Início", href: rotas.home }, { rotulo: "Política de privacidade" }]}
        titulo="Política de privacidade."
        abertura={<>Como tratamos os dados que você nos envia pelo site. Versão de {VERSAO_POLITICA}.</>}
      />
      <article className="bg-branco px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          {secoes.map((s, i) => (
            <section
              key={s.titulo}
              aria-labelledby={`p-${i}`}
              className="grid gap-4 border-t border-fio py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16"
            >
              <h2 id={`p-${i}`} className="text-2xl leading-tight md:text-h3">
                {s.titulo}
              </h2>
              <div className="max-w-[68ch] space-y-4 text-grafite [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">{s.corpo}</div>
            </section>
          ))}
          <p className="border-t border-fio pt-8 text-nota text-musgo">
            Veja também os <Link href={rotas.termos}>termos de uso</Link>.
          </p>
        </div>
      </article>
    </>
  );
}
