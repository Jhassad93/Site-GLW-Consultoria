import Link from "next/link";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { exibir, formatarTelefone } from "@/lib/dados";
import { linksExternos, perfis, rotas } from "@/content/navegacao";
import { BotaoPreferenciasCookies } from "./consentimento";

/**
 * Rodapé (DESIGN.md v2): fundo Noite, "GWL" enorme em Mata (decorativo), identificação completa em colunas
 * (harness R1, R19, R30). Dados não confirmados aparecem com "(a confirmar)", nunca como fato.
 * `data-oculta-barra` esconde a barra do celular.
 */
export function Rodape() {
  const { endereco, responsavelTecnico, registroSusep, whatsapp, telefone, email, horarioAtendimento } = empresa;
  const end = endereco.valor;
  const marca = (confirmado: boolean) => (confirmado ? "" : ` (${A_CONFIRMAR})`);

  return (
    <footer data-oculta-barra className="escuro bg-noite px-5 pt-20 pb-28 text-nevoa md:px-10 md:pt-24 [&_a]:text-nevoa">
      <div className="mx-auto max-w-[1200px]">
        <p
          aria-hidden
          className="m-0 font-heading text-[5.5rem] leading-[0.9] font-medium tracking-marca text-mata md:text-[7.5rem]"
        >
          GWL
        </p>

        <div className="mt-12 grid gap-10 border-t border-fio-escuro pt-8 text-[0.9375rem] text-nevoa/80 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-sans text-[0.9375rem] font-medium tracking-normal text-nevoa">
              {empresa.nomeFantasia.valor}
            </h2>
            <dl className="mt-3 space-y-1.5">
              <div><dt className="sr-only">Razão social</dt><dd className="m-0">{exibir(empresa.razaoSocial)}</dd></div>
              <div><dt className="inline">CNPJ </dt><dd className="m-0 inline">{exibir(empresa.cnpj)}</dd></div>
              <div><dt className="inline">Registro SUSEP: </dt><dd className="m-0 inline">{exibir(registroSusep)}</dd></div>
              <div>
                <dt className="inline">Responsável técnico: </dt>
                <dd className="m-0 inline">
                  {responsavelTecnico.valor
                    ? `${responsavelTecnico.valor.nome}, SUSEP ${responsavelTecnico.valor.registroSusep}${marca(responsavelTecnico.confirmado)}`
                    : A_CONFIRMAR}
                </dd>
              </div>
            </dl>
            <p className="mt-3">
              <a href={linksExternos.consultaSusep} target="_blank" rel="noopener noreferrer">
                Consultar registro na SUSEP<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-sans text-[0.9375rem] font-medium tracking-normal text-nevoa">Atendimento</h2>
            <address className="mt-3 not-italic">
              {end.logradouro}
              <br />
              {end.bairro}, {end.cidade}/{end.uf}
              <br />
              CEP {end.cep}
              {marca(endereco.confirmado)}
            </address>
            <dl className="mt-3 space-y-1.5">
              <div><dt className="inline">WhatsApp: </dt><dd className="m-0 inline">{formatarTelefone(whatsapp.valor)}{marca(whatsapp.confirmado)}</dd></div>
              <div><dt className="inline">Telefone: </dt><dd className="m-0 inline">{telefone.valor ? `${formatarTelefone(telefone.valor)}${marca(telefone.confirmado)}` : A_CONFIRMAR}</dd></div>
              <div><dt className="inline">E-mail: </dt><dd className="m-0 inline">{exibir(email)}</dd></div>
              <div><dt className="inline">Horário: </dt><dd className="m-0 inline">{exibir(horarioAtendimento)}</dd></div>
            </dl>
          </div>

          <nav aria-label="Planos por perfil">
            <h2 className="font-sans text-[0.9375rem] font-medium tracking-normal text-nevoa">Planos por perfil</h2>
            <ul className="mt-3 list-none space-y-1.5 p-0">
              {perfis.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="link-nav">{p.rotulo}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-[0.9375rem] font-medium tracking-normal text-nevoa">Regulação e privacidade</h2>
            <p className="mt-3">
              A GWL é uma corretora: intermediamos a contratação. Os planos são das operadoras, registradas na{" "}
              <a href={linksExternos.ans} target="_blank" rel="noopener noreferrer">
                ANS<span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
            <ul className="mt-3 list-none space-y-1.5 p-0">
              <li><Link href={rotas.sobre} className="link-nav">Sobre a GWL</Link></li>
              <li><Link href={rotas.guias} className="link-nav">Guias por hospital e bairro</Link></li>
              <li><Link href={rotas.operadoras} className="link-nav">Operadoras com que trabalhamos</Link></li>
              <li><Link href={rotas.perguntas} className="link-nav">Perguntas frequentes</Link></li>
              <li><Link href={rotas.contato} className="link-nav">Contato</Link></li>
              <li><Link href={rotas.privacidade} className="link-nav">Política de privacidade</Link></li>
              <li><Link href={rotas.termos} className="link-nav">Termos de uso</Link></li>
              <li><BotaoPreferenciasCookies className="link-nav text-nevoa" /></li>
              <li>
                <a href={empresa.instagram.valor} target="_blank" rel="noopener noreferrer" className="link-nav">
                  Instagram<span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-legenda text-nevoa/70">© {new Date().getFullYear()} {empresa.nomeFantasia.valor}</p>
      </div>
    </footer>
  );
}
