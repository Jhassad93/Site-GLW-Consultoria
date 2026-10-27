import Link from "next/link";
import { empresa, A_CONFIRMAR } from "@/content/empresa";
import { exibir, formatarTelefone } from "@/lib/dados";
import { linksExternos, perfis, rotas } from "@/content/navegacao";
import { Logo } from "@/components/gwl/logo";

/**
 * Rodapé em sala Copa (DESIGN.md › Componentes): identificação completa em linhas separadas (harness R1, R19).
 * Dados não confirmados aparecem com "(a confirmar)", nunca como fato. `data-oculta-barra` esconde a barra do WhatsApp.
 */
export function Rodape() {
  const { endereco, responsavelTecnico, registroSusep, whatsapp, telefone, email, horarioAtendimento } = empresa;
  const end = endereco.valor;
  const textoEndereco = `${end.logradouro}, ${end.bairro}, ${end.cidade}/${end.uf}, CEP ${end.cep}`;
  const marca = (confirmado: boolean) => (confirmado ? "" : ` (${A_CONFIRMAR})`);

  const linhasIdentificacao = [
    ["Razão social", exibir(empresa.razaoSocial)],
    ["CNPJ", exibir(empresa.cnpj)],
    ["Registro SUSEP", exibir(registroSusep)],
    [
      "Responsável técnico",
      responsavelTecnico.valor
        ? `${responsavelTecnico.valor.nome}, SUSEP ${responsavelTecnico.valor.registroSusep}${marca(responsavelTecnico.confirmado)}`
        : A_CONFIRMAR,
    ],
    ["Endereço", `${textoEndereco}${marca(endereco.confirmado)}`],
  ] as const;

  const linhasContato = [
    ["WhatsApp", `${formatarTelefone(whatsapp.valor)}${marca(whatsapp.confirmado)}`],
    ["Telefone", telefone.valor ? `${formatarTelefone(telefone.valor)}${marca(telefone.confirmado)}` : A_CONFIRMAR],
    ["E-mail", exibir(email)],
    ["Horário", exibir(horarioAtendimento)],
  ] as const;

  return (
    <footer data-oculta-barra className="mt-auto bg-copa text-branco [&_a]:text-branco">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <Logo claro />
          <p className="mt-5 max-w-sm">
            Corretora de planos de saúde e odontológicos em Santana, zona norte de São Paulo.
          </p>
          <dl className="mt-8 space-y-3 text-[1rem]">
            {linhasIdentificacao.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="font-bold">{rotulo}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-corpo font-bold">Atendimento</h2>
          <dl className="mt-4 space-y-3 text-[1rem]">
            {linhasContato.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="font-bold">{rotulo}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[1rem]">
            <a href={empresa.instagram.valor} target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-sans text-corpo font-bold">Planos por perfil</h2>
          <ul className="mt-4 space-y-2 text-[1rem]">
            {perfis.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.rotulo}</Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-sans text-corpo font-bold">Institucional</h2>
          <ul className="mt-4 space-y-2 text-[1rem]">
            <li><Link href={rotas.sobre}>Sobre a GWL</Link></li>
            <li><Link href={rotas.contato}>Contato</Link></li>
            <li><Link href={rotas.privacidade}>Política de privacidade</Link></li>
            <li><Link href={rotas.termos}>Termos de uso</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-branco/20">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-[1rem] md:px-8">
          <p>
            A GWL é uma corretora: intermediamos a contratação. Os planos são das operadoras, registradas na ANS.{" "}
            <a href={linksExternos.ans} target="_blank" rel="noopener noreferrer">
              Site da ANS<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
          <p>
            Confira o registro de qualquer corretor na{" "}
            <a href={linksExternos.consultaSusep} target="_blank" rel="noopener noreferrer">
              consulta oficial da SUSEP<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
          <p>© {new Date().getFullYear()} {empresa.nomeFantasia.valor}</p>
        </div>
      </div>
    </footer>
  );
}
