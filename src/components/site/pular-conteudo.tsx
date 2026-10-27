/** Link "pular para o conteúdo": primeiro item do Tab, visível só com foco. */
export function PularConteudo() {
  return (
    <a
      href="#conteudo"
      className="sr-only z-50 rounded-full bg-tinta px-5 py-3 font-bold text-branco no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Pular para o conteúdo
    </a>
  );
}
