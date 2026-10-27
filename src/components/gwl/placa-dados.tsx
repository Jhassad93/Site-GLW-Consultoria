/**
 * Placa de dados do topo (DESIGN.md v2): vidro escuro, três linhas com fio, rótulo à esquerda e valor à direita.
 * Só dados confirmados ou marcados "a confirmar" (R1, R9); números de prova só com fonte.
 */
type Linha = { rotulo: string; valor: string; nota?: string };

export function PlacaDados({ linhas }: { linhas: readonly Linha[] }) {
  return (
    <dl className="vidro-escuro m-0 rounded-3xl px-7 py-1 text-nevoa">
      {linhas.map((l) => (
        <div
          key={l.rotulo}
          className="flex items-baseline justify-between gap-4 border-b border-fio-escuro py-5 last:border-0"
        >
          <dt className="text-nota text-nevoa/70">{l.rotulo}</dt>
          <dd className="m-0 text-right">
            <span className="block font-heading text-2xl leading-tight tracking-titulo md:text-h3">{l.valor}</span>
            {l.nota && <span className="block text-legenda text-nevoa/70">{l.nota}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
