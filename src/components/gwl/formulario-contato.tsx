"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { CampoSelecao, CampoTexto } from "./campo";
import { classesBotao, Seta } from "./botao";
import { linkWhatsApp } from "@/lib/whatsapp";
import { validarLead, type CampoLead, type DadosLead, type RespostaContato } from "@/lib/lead";

/**
 * Formulário "Prefiro que me liguem" (APP_FLOW › Fluxo 2; SCHEMA.md; harness R12, R25).
 * Estados: erro por campo com dados mantidos → carregando (botão desabilitado) → /obrigado,
 * ou falha com "tentar de novo" e WhatsApp, ou bloqueio genérico com WhatsApp. Honeypot e Turnstile contra robôs.
 */
type Opcao = { valor: string; rotulo: string };

const MENSAGEM_GERAL: Record<"bloqueado" | "limite" | "previa" | "falha", string> = {
  falha: "Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp.",
  bloqueado: "Não conseguimos enviar por aqui. Fale com a GWL pelo WhatsApp.",
  limite: "Não conseguimos enviar por aqui. Fale com a GWL pelo WhatsApp.",
  previa: "Esta é uma versão de prévia: o formulário só aceita envios de teste da equipe. Fale com a GWL pelo WhatsApp.",
};

declare global {
  interface Window {
    turnstile?: { reset: (id?: string) => void };
  }
}

export function FormularioContato({
  paraQuem,
  horarios,
  aviso,
  siteKeyTurnstile,
}: {
  paraQuem: readonly Opcao[];
  horarios: readonly Opcao[];
  aviso: React.ReactNode;
  siteKeyTurnstile?: string;
}) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [erros, setErros] = useState<Partial<Record<CampoLead, string>>>({});
  const [estado, setEstado] = useState<"pronto" | "enviando" | "falha" | "bloqueado" | "limite" | "previa">("pronto");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dados: DadosLead = {
      nome: String(f.get("nome") ?? ""),
      telefone: String(f.get("telefone") ?? ""),
      para_quem: String(f.get("para_quem") ?? ""),
      hospital_preferido: String(f.get("hospital_preferido") ?? ""),
      melhor_horario: String(f.get("melhor_horario") || "qualquer"),
    };
    const encontrados = validarLead(dados);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) {
      const primeiro = Object.keys(encontrados)[0];
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      setEstado("pronto");
      return;
    }

    setEstado("enviando");
    const params = new URLSearchParams(window.location.search);
    try {
      const r = await fetch("/api/contato/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...dados,
          pagina_origem: window.location.pathname,
          utm_source: params.get("utm_source") ?? "",
          utm_medium: params.get("utm_medium") ?? "",
          utm_campaign: params.get("utm_campaign") ?? "",
          turnstile: String(f.get("cf-turnstile-response") ?? ""),
          empresa_site: String(f.get("empresa_site") ?? ""),
        }),
      });
      const resposta = (await r.json().catch(() => ({ ok: false, erro: "falha" }))) as RespostaContato;
      if (resposta.ok) {
        router.push("/obrigado/");
        return;
      }
      window.turnstile?.reset();
      if (resposta.erro === "validacao") {
        setErros(resposta.campos);
        setEstado("pronto");
      } else {
        setEstado(resposta.erro);
      }
    } catch {
      window.turnstile?.reset();
      setEstado("falha");
    }
  }

  const mensagem = estado === "pronto" || estado === "enviando" ? null : MENSAGEM_GERAL[estado];

  return (
    <form ref={form} onSubmit={enviar} noValidate aria-describedby={mensagem ? "form-mensagem" : undefined} className="space-y-6">
      {siteKeyTurnstile && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      )}

      <CampoTexto id="nome" rotulo="Seu nome" autoComplete="name" maxLength={120} erro={erros.nome} />
      <CampoTexto
        id="telefone"
        rotulo="Telefone ou WhatsApp com DDD"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dica="Exemplo: (11) 91234-5678"
        erro={erros.telefone}
      />
      <CampoSelecao id="para_quem" rotulo="Para quem é o plano" opcoes={paraQuem} erro={erros.para_quem} />
      <CampoTexto
        id="hospital_preferido"
        rotulo="Hospital que você quer usar"
        opcional
        maxLength={120}
        dica="Só o nome do hospital. Não informe doenças, tratamentos ou dados de outras pessoas."
        erro={erros.hospital_preferido}
      />
      <CampoSelecao
        id="melhor_horario"
        rotulo="Melhor horário para ligarmos"
        opcoes={horarios}
        erro={erros.melhor_horario}
        required={false}
        defaultValue="qualquer"
      />

      {/* Honeypot: invisível para pessoas, fora do Tab e do leitor de tela */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="empresa_site">Não preencha este campo</label>
        <input id="empresa_site" name="empresa_site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {siteKeyTurnstile && <div className="cf-turnstile" data-sitekey={siteKeyTurnstile} data-language="pt-BR" data-size="flexible" />}

      <div className="space-y-4 border-t border-fio pt-6">
        <p className="m-0 text-nota text-musgo">{aviso}</p>
        <button type="submit" disabled={estado === "enviando"} aria-busy={estado === "enviando"} className={classesBotao("escuro", "normal", true)}>
          {estado === "enviando" ? "Enviando…" : estado === "falha" ? "Tentar de novo" : "Quero receber o contato"}
          <Seta />
        </button>
        <div aria-live="polite" id="form-mensagem">
          {mensagem && (
            <p className="m-0 flex flex-wrap items-baseline gap-x-2 rounded-xl border-2 border-noite bg-branco px-4 py-3 font-medium">
              {mensagem}{" "}
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" data-evento="whatsapp_click">
                Falar com a GWL<span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
              </a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
