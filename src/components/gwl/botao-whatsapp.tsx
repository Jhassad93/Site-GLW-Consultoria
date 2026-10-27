import { linkWhatsApp, type ContextoWhatsApp } from "@/lib/whatsapp";
import { LinkExternoBotao } from "./botao";

/**
 * Ação principal do site: comparar pelo WhatsApp com mensagem pronta do contexto.
 * `fundo` escolhe a versão: clara sobre fundo escuro, escura sobre fundo claro (DESIGN.md v2).
 * `principal` marca o botão do topo: a barra do celular só aparece depois que ele sai da tela.
 * O rótulo é o mesmo em todo o site: "Falar com a GWL" (decidido por João em 27/10/2026).
 * O leitor de tela ouve também "pelo WhatsApp", porque o rótulo visível não diz o canal.
 */
export const ROTULO_ACAO_PRINCIPAL = "Falar com a GWL";

type Props = {
  contexto?: ContextoWhatsApp;
  fundo?: "claro" | "escuro";
  principal?: boolean;
  rotulo?: string;
  tamanho?: "normal" | "compacto";
  className?: string;
};

export function BotaoWhatsApp({ contexto, fundo = "claro", principal = false, rotulo, tamanho, className }: Props) {
  return (
    <LinkExternoBotao
      href={linkWhatsApp(contexto)}
      variante={fundo === "escuro" ? "claro" : "escuro"}
      tamanho={tamanho}
      seta
      className={className}
      data-cta-principal={principal ? "" : undefined}
      data-evento="whatsapp_click"
    >
      {rotulo ?? ROTULO_ACAO_PRINCIPAL}
      <span className="sr-only"> pelo WhatsApp</span>
    </LinkExternoBotao>
  );
}
