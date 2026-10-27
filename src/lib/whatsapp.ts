import { empresa } from "@/content/empresa";

/**
 * Link do WhatsApp com mensagem pronta por contexto (APP_FLOW, Fluxo 2).
 * Harness R14/R25: a mensagem leva só o contexto (perfil ou hospital), nunca dado de saúde.
 */
export type ContextoWhatsApp =
  | { tipo: "geral" }
  | { tipo: "perfil"; perfil: Perfil }
  | { tipo: "hospital"; hospital: string }
  | { tipo: "outro-hospital" };

export type Perfil = "pais-60-mais" | "familia" | "empresa" | "mei" | "trocar";

const textoPerfil: Record<Perfil, string> = {
  "pais-60-mais": "para meus pais (60+)",
  familia: "para minha família",
  empresa: "para minha empresa",
  mei: "como MEI ou autônomo",
  trocar: "porque quero trocar de plano",
};

export function mensagemWhatsApp(contexto: ContextoWhatsApp): string {
  switch (contexto.tipo) {
    case "perfil":
      return `Olá! Vim pelo site e quero comparar planos de saúde ${textoPerfil[contexto.perfil]}.`;
    case "hospital":
      return `Olá! Vim pelo site e quero um plano que inclua o ${contexto.hospital}. Pode me ajudar a comparar?`;
    case "outro-hospital":
      return "Olá! Vim pelo site e quero comparar planos a partir do hospital que eu uso. O hospital é: ";
    default:
      return "Olá! Vim pelo site e quero comparar planos de saúde.";
  }
}

export function linkWhatsApp(contexto: ContextoWhatsApp = { tipo: "geral" }): string {
  const numero = empresa.whatsapp.valor;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagemWhatsApp(contexto))}`;
}
