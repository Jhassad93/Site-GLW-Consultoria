import { linkWhatsApp, type ContextoWhatsApp } from "@/lib/whatsapp";
import { LinkExternoBotao } from "./botao";

/**
 * Ação principal do site: comparar pelo WhatsApp com mensagem pronta do contexto.
 * `data-cta-principal` marca o botão do topo: a barra fixa do celular só aparece depois que ele sai da tela.
 * O rótulo é o mesmo em todo o site (DESIGN.md › Celular); a definição final está na pendência de copy.
 */
export const ROTULO_ACAO_PRINCIPAL = "Comparar planos pelo WhatsApp";

type Props = {
  contexto?: ContextoWhatsApp;
  variante?: "primario" | "secundario" | "secundario-claro";
  principal?: boolean;
  rotulo?: string;
  className?: string;
};

export function BotaoWhatsApp({ contexto, variante = "primario", principal = false, rotulo, className }: Props) {
  return (
    <LinkExternoBotao
      href={linkWhatsApp(contexto)}
      variante={variante}
      className={className}
      data-cta-principal={principal ? "" : undefined}
      data-evento="whatsapp_click"
    >
      {rotulo ?? ROTULO_ACAO_PRINCIPAL}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </LinkExternoBotao>
  );
}
