"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { consentimento, type Consentimento } from "@/components/site/consentimento";

/**
 * GA4 só depois do consentimento (harness R13; checklist de produção, item 17).
 * - Sem aceite, nenhum script do Google é carregado (conferido na aba de rede, etapa 9).
 * - Com aceite: modo de consentimento com analytics_storage concedido e anúncios negados.
 * - Eventos: whatsapp_click (todo link com data-evento="whatsapp_click"), generate_lead (página /obrigado)
 *   e trafego_ia (visita vinda de assistentes de IA, para o grupo de canais do GA4).
 * - Se a pessoa retirar o consentimento, o GA para de coletar e os cookies _ga são apagados.
 */
const ORIGENS_IA = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "gemini.google.com", "claude.ai", "copilot.microsoft.com"];

function assinar(aviso: () => void) {
  window.addEventListener("gwl:consentimento", aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener("gwl:consentimento", aviso);
    window.removeEventListener("storage", aviso);
  };
}

type JanelaGtag = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

function apagarCookiesGa() {
  for (const c of document.cookie.split(";")) {
    const nome = c.split("=")[0].trim();
    if (nome.startsWith("_ga")) {
      document.cookie = `${nome}=; Max-Age=0; path=/; domain=.${location.hostname}`;
      document.cookie = `${nome}=; Max-Age=0; path=/`;
    }
  }
}

export function Analytics({ gaId }: { gaId?: string }) {
  const escolha = useSyncExternalStore<Consentimento | null>(assinar, () => consentimento(), () => null);
  const aceito = Boolean(gaId && escolha?.estatisticas);
  const caminho = usePathname();

  // Consentimento retirado depois de aceito: para a coleta e limpa cookies.
  useEffect(() => {
    const w = window as JanelaGtag;
    if (!aceito && w.gtag) {
      w.gtag("consent", "update", { analytics_storage: "denied" });
      apagarCookiesGa();
    }
  }, [aceito]);

  // Cliques no WhatsApp.
  useEffect(() => {
    if (!aceito) return;
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-evento="whatsapp_click"]');
      if (alvo) sendGAEvent("event", "whatsapp_click", { page_path: location.pathname });
    };
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, [aceito]);

  // Lead gerado e tráfego de IA.
  useEffect(() => {
    if (!aceito) return;
    if (caminho === "/obrigado/") sendGAEvent("event", "generate_lead", { page_path: caminho });
    try {
      const origem = document.referrer ? new URL(document.referrer).hostname : "";
      const ia = ORIGENS_IA.find((d) => origem === d || origem.endsWith(`.${d}`));
      if (ia) sendGAEvent("event", "trafego_ia", { fonte_ia: ia });
    } catch {
      // referrer inválido: ignora
    }
  }, [aceito, caminho]);

  if (!aceito || !gaId) return null;

  return (
    <>
      <Script id="ga-consentimento" strategy="afterInteractive">
        {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}" +
          "gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});"}
      </Script>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}
