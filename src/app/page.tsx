import { empresa, A_CONFIRMAR } from "@/content/empresa";

/**
 * Etapa 1 (setup): página mínima para conferir fontes, cores e o estágio de publicação.
 * A home definitiva entra na etapa 3 (docs/IMPLEMENTATION_PLAN.md).
 */
export default function Home() {
  const cnpj = empresa.cnpj.confirmado ? empresa.cnpj.valor : `${empresa.cnpj.valor} (${A_CONFIRMAR})`;

  return (
    <main id="conteudo" className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-16 md:px-6">
      <p className="font-bold text-copa">{empresa.nomeFantasia.valor}</p>
      <h1 className="mt-4 max-w-[15ch] text-h1 md:text-h1-home">Site em construção</h1>
      <p className="mt-6 max-w-[68ch] text-sub">
        Esta página confere a base visual do projeto: Bricolage Grotesque nos títulos, Atkinson Hyperlegible Next no
        texto, corpo em 18px e as cinco cores do DESIGN.md.
      </p>

      <ul className="mt-10 grid max-w-[900px] grid-cols-2 gap-4 sm:grid-cols-5" aria-label="Cores da marca">
        <li className="flex h-28 items-end rounded-lg bg-tinta p-3 text-legenda text-branco">Tinta</li>
        <li className="flex h-28 items-end rounded-lg border p-3 text-legenda">Branco</li>
        <li className="flex h-28 items-end rounded-lg bg-mel p-3 text-legenda text-tinta">Mel</li>
        <li className="flex h-28 items-end rounded-lg bg-copa p-3 text-legenda text-branco">Copa</li>
        <li className="flex h-28 items-end rounded-lg bg-rio p-3 text-legenda text-branco">Rio</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <span className="inline-flex h-14 items-center rounded-full bg-mel px-7 font-bold text-tinta">
          Botão primário
        </span>
        <span className="inline-flex h-14 items-center rounded-full px-7 font-bold text-copa ring-2 ring-copa ring-inset">
          Botão secundário
        </span>
      </div>

      <p className="mt-10 text-legenda text-texto-2">CNPJ {cnpj}</p>
    </main>
  );
}
