/** Faixa fixa no topo, só em SITE_STAGE=preview (DESIGN.md › Componentes). */
export function FaixaPreview() {
  return (
    <div
      role="note"
      className="bg-mel-claro px-4 py-2 text-center text-legenda text-tinta"
    >
      Versão de prévia: conteúdo em validação com a GWL.
    </div>
  );
}
