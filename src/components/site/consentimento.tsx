"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { rotas } from "@/content/navegacao";
import { cn } from "@/lib/utils";

/**
 * Consentimento de cookies (harness R13; checklist de produção, item 17; LGPD art. 7º, I e art. 8º).
 * - Banner com Aceitar e Recusar com o mesmo destaque, mais Preferências.
 * - Nada de estatísticas antes do aceite: o carregador do GA4 (etapa 10) só lê `consentimento().estatisticas`
 *   e escuta o evento "gwl:consentimento".
 * - A escolha fica no localStorage (não é cookie) e pode ser mudada pelo link "Preferências de cookies".
 */
export type Consentimento = { estatisticas: boolean; versao: string; em: string };

const CHAVE = "gwl-consentimento";
const VERSAO = "2026-10-27";
const EVENTO = "gwl:consentimento";
const ABRIR = "gwl:abrir-preferencias";

function ler(): Consentimento | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const c = JSON.parse(bruto) as Consentimento;
    return c.versao === VERSAO ? c : null;
  } catch {
    return null;
  }
}

let cache: Consentimento | null | undefined;
function instantaneo(): Consentimento | null {
  if (cache === undefined) cache = ler();
  return cache;
}

function assinar(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO, aviso);
    window.removeEventListener("storage", aviso);
  };
}

/** Lido pelo carregador de analytics (etapa 10). */
export function consentimento(): Consentimento | null {
  return typeof window === "undefined" ? null : instantaneo();
}

function salvar(estatisticas: boolean) {
  const c: Consentimento = { estatisticas, versao: VERSAO, em: new Date().toISOString() };
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(c));
  } catch {
    // navegador sem armazenamento: vale só para esta visita
  }
  cache = c;
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: c }));
}

/** Link "Preferências de cookies" (rodapé e política de privacidade). */
export function BotaoPreferenciasCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={cn("cursor-pointer text-left", className)} onClick={() => window.dispatchEvent(new Event(ABRIR))}>
      Preferências de cookies
    </button>
  );
}

const botao =
  "inline-flex min-h-12 flex-1 items-center justify-center rounded-full px-5 text-base font-medium transition-colors duration-200 sm:flex-none";

export function BannerConsentimento() {
  const escolha = useSyncExternalStore<Consentimento | null | undefined>(assinar, instantaneo, () => undefined);
  const [preferencias, setPreferencias] = useState(false);
  const [estatisticas, setEstatisticas] = useState(false);
  const idTitulo = useId();
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const abrir = () => {
      setEstatisticas(instantaneo()?.estatisticas ?? false);
      setPreferencias(true);
    };
    window.addEventListener(ABRIR, abrir);
    return () => window.removeEventListener(ABRIR, abrir);
  }, []);

  useEffect(() => {
    if (preferencias) painel.current?.querySelector<HTMLElement>("input, button")?.focus();
  }, [preferencias]);

  // undefined = ainda no servidor ou hidratando: não renderiza nada para não piscar.
  if (escolha === undefined) return null;
  if (escolha !== null && !preferencias) return null;

  const decidir = (valor: boolean) => {
    salvar(valor);
    setPreferencias(false);
  };

  return (
    <div
      ref={painel}
      role="dialog"
      aria-modal="false"
      aria-labelledby={idTitulo}
      data-oculta-barra
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-[44rem] rounded-3xl border border-fio bg-branco p-5 text-noite shadow-[0_10px_40px_rgb(15_26_18/0.14)] md:bottom-5 md:p-7"
    >
      <h2 id={idTitulo} className="font-heading text-[1.375rem] leading-tight tracking-titulo">
        {preferencias ? "Preferências de cookies" : "Cookies e privacidade"}
      </h2>
      {preferencias ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-start justify-between gap-4 border-t border-fio pt-4">
            <span>
              <span className="block font-medium">Necessários</span>
              <span className="block text-nota text-musgo">Guardam esta escolha e protegem o formulário contra robôs. Sempre ativos.</span>
            </span>
            <span className="shrink-0 text-nota text-musgo">Sempre ativos</span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-fio pt-4">
            <span>
              <span className="block font-medium">Estatísticas de visita</span>
              <span className="block text-nota text-musgo">Google Analytics, para entender quais páginas ajudam mais.</span>
            </span>
            <input
              type="checkbox"
              checked={estatisticas}
              onChange={(e) => setEstatisticas(e.target.checked)}
              className="mt-1 size-6 shrink-0 accent-noite"
            />
          </label>
          <div className="flex flex-wrap gap-2 border-t border-fio pt-4">
            <button type="button" onClick={() => decidir(estatisticas)} className={cn(botao, "bg-noite text-nevoa hover:bg-mata")}>
              Salvar escolha
            </button>
            <button type="button" onClick={() => setPreferencias(false)} className={cn(botao, "border border-noite/25 hover:border-noite")}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-3 text-nota text-grafite">
            Usamos cookies de estatística só se você aceitar. Os necessários funcionam sempre. Veja a{" "}
            <Link href={rotas.privacidade}>política de privacidade</Link>.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => decidir(true)} className={cn(botao, "bg-noite text-nevoa hover:bg-mata")}>
              Aceitar
            </button>
            <button type="button" onClick={() => decidir(false)} className={cn(botao, "bg-noite text-nevoa hover:bg-mata")}>
              Recusar
            </button>
            <button
              type="button"
              onClick={() => {
                setEstatisticas(false);
                setPreferencias(true);
              }}
              className={cn(botao, "border border-noite/25 hover:border-noite")}
            >
              Preferências
            </button>
          </div>
        </>
      )}
    </div>
  );
}
