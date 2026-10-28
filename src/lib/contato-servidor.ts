/**
 * Lógica do POST /api/contato (APP_FLOW › Fluxo 2; docs/SCHEMA.md), separada da rota para ser testável.
 * Usada por src/app/api/contato/route.ts (Vercel) e por scripts/testar-contato.mts.
 *
 * Camadas, nesta ordem: método e origem → tamanho → honeypot → validação (Zod) → Turnstile →
 * restrição da prévia → registrar_lead() no Supabase com a service role → aviso por e-mail (Resend).
 * Falha no e-mail não perde o lead: o registro já está no banco, e o erro vai para o log sem dados pessoais.
 *
 * Variáveis (Vercel › Project › Settings › Environment Variables; nunca no código nem com NEXT_PUBLIC_):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TURNSTILE_SECRET_KEY, RESEND_API_KEY, LEAD_NOTIFY_TO, LEAD_NOTIFY_FROM,
 *   ACEITAR_LEADS ("teste" na prévia: só aceita nomes que começam com "TESTE"; "todos" em produção),
 *   TURNSTILE_VERIFY_URL (opcional, só para testes locais).
 * Arquivo só de servidor: nunca importar em componente do navegador.
 */
import { z } from "zod";
import {
  AVISO_PRIVACIDADE_VERSAO,
  MELHOR_HORARIO,
  MENSAGENS,
  PARA_QUEM,
  normalizarTelefone,
  type RespostaContato,
} from "./lead.ts";

export type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_TO?: string;
  LEAD_NOTIFY_FROM?: string;
  ACEITAR_LEADS?: string;
  TURNSTILE_VERIFY_URL?: string;
  SITE_STAGE?: string;
};

/** Agenda trabalho para depois da resposta (na Vercel, `after` do Next). Sem ele, espera o envio. */
type Agendar = (p: Promise<unknown>) => void;

export function lerEnv(origem: Record<string, string | undefined> = process.env): Env {
  return {
    SUPABASE_URL: origem.SUPABASE_URL ?? "",
    SUPABASE_SERVICE_ROLE_KEY: origem.SUPABASE_SERVICE_ROLE_KEY ?? "",
    TURNSTILE_SECRET_KEY: origem.TURNSTILE_SECRET_KEY ?? "",
    RESEND_API_KEY: origem.RESEND_API_KEY,
    LEAD_NOTIFY_TO: origem.LEAD_NOTIFY_TO,
    LEAD_NOTIFY_FROM: origem.LEAD_NOTIFY_FROM,
    ACEITAR_LEADS: origem.ACEITAR_LEADS,
    TURNSTILE_VERIFY_URL: origem.TURNSTILE_VERIFY_URL,
    SITE_STAGE: origem.SITE_STAGE,
  };
}

/** IP do visitante para o Turnstile: Vercel (x-real-ip, x-forwarded-for) ou Cloudflare com proxy. */
function ipDoVisitante(request: Request): string | null {
  const h = request.headers;
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

const TAMANHO_MAXIMO = 4096;

const esquema = z.object({
  nome: z.string().trim().min(2, MENSAGENS.nome).max(120, MENSAGENS.nome),
  telefone: z
    .string()
    .transform(normalizarTelefone)
    .pipe(z.string().regex(/^[1-9][0-9]{9,10}$/, MENSAGENS.telefone)),
  para_quem: z.enum(PARA_QUEM, { error: MENSAGENS.para_quem }),
  hospital_preferido: z.string().trim().max(120, MENSAGENS.hospital_preferido).optional().default(""),
  melhor_horario: z.enum(MELHOR_HORARIO, { error: MENSAGENS.melhor_horario }).optional().default("qualquer"),
  pagina_origem: z
    .string()
    .max(200)
    .regex(/^\/[^\s]*$/)
    .optional()
    .default("/contato/"),
  utm_source: z.string().max(100).optional().default(""),
  utm_medium: z.string().max(100).optional().default(""),
  utm_campaign: z.string().max(100).optional().default(""),
  turnstile: z.string().min(1).max(2048),
  empresa_site: z.string().optional().default(""), // honeypot: pessoas não preenchem
});

function json(corpo: RespostaContato, status: number): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function origemPermitida(request: Request): boolean {
  const origem = request.headers.get("origin");
  if (!origem) return false;
  try {
    return new URL(origem).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function turnstileValido(token: string, ip: string | null, env: Env): Promise<{ ok: boolean; codigos: string[] }> {
  const corpo = new FormData();
  corpo.append("secret", env.TURNSTILE_SECRET_KEY);
  corpo.append("response", token);
  if (ip) corpo.append("remoteip", ip);
  const url = env.TURNSTILE_VERIFY_URL || "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  try {
    const r = await fetch(url, { method: "POST", body: corpo, signal: AbortSignal.timeout(8000) });
    const dados = (await r.json()) as { success?: boolean; "error-codes"?: string[] };
    const codigos = dados["error-codes"] ?? [];
    // Códigos da Cloudflare (ex.: invalid-input-secret) vão para o log, sem dado pessoal.
    if (dados.success !== true) console.error(`[contato] Turnstile recusou: ${codigos.join(",") || "sem código"}`);
    return { ok: dados.success === true, codigos };
  } catch {
    console.error("[contato] Turnstile inacessível");
    return { ok: false, codigos: ["rede"] };
  }
}

const rotuloParaQuem: Record<string, string> = {
  eu: "Para a própria pessoa",
  familia: "Família",
  pais_60_mais: "Pais (60+)",
  empresa: "Empresa",
  mei_autonomo: "MEI ou autônomo",
  trocar_plano: "Quer trocar de plano",
};

async function avisarPorEmail(lead: z.infer<typeof esquema>, env: Env): Promise<void> {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFY_TO || !env.LEAD_NOTIFY_FROM) {
    console.error("[contato] aviso por e-mail não configurado; lead gravado no banco");
    return;
  }
  const linhas = [
    `Nome: ${lead.nome}`,
    `Telefone: ${lead.telefone}`,
    `Para quem: ${rotuloParaQuem[lead.para_quem]}`,
    `Hospital: ${lead.hospital_preferido || "não informado"}`,
    `Melhor horário: ${lead.melhor_horario}`,
    `Página: ${lead.pagina_origem}`,
  ];
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: env.LEAD_NOTIFY_FROM,
        to: env.LEAD_NOTIFY_TO.split(",").map((s) => s.trim()),
        subject: "Novo pedido de contato pelo site",
        text: `${linhas.join("\n")}\n\nO pedido também está no painel do Supabase (tabela leads).`,
      }),
    });
    if (!r.ok) console.error(`[contato] e-mail de aviso falhou (status ${r.status}); lead gravado no banco`);
  } catch {
    console.error("[contato] e-mail de aviso falhou (rede); lead gravado no banco");
  }
}

export async function processarContato(request: Request, env: Env, agendar?: Agendar): Promise<Response> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.TURNSTILE_SECRET_KEY) {
    console.error("[contato] variáveis de ambiente do servidor ausentes");
    return json({ ok: false, erro: "falha", ...diag(env, "config:variaveis-ausentes") }, 500);
  }
  if (!origemPermitida(request)) return json({ ok: false, erro: "bloqueado" }, 403);

  const texto = await request.text();
  if (texto.length > TAMANHO_MAXIMO) return json({ ok: false, erro: "bloqueado" }, 403);

  let bruto: unknown;
  try {
    bruto = JSON.parse(texto);
  } catch {
    return json({ ok: false, erro: "bloqueado" }, 400);
  }

  // Honeypot antes da validação: robôs recebem a mesma resposta genérica de bloqueio.
  if (typeof bruto === "object" && bruto && "empresa_site" in bruto && (bruto as { empresa_site?: unknown }).empresa_site) {
    return json({ ok: false, erro: "bloqueado" }, 403);
  }

  const analise = esquema.safeParse(bruto);
  if (!analise.success) {
    const campos: Record<string, string> = {};
    for (const problema of analise.error.issues) {
      const campo = String(problema.path[0] ?? "");
      if (campo in MENSAGENS && !campos[campo]) campos[campo] = problema.message;
    }
    if (Object.keys(campos).length === 0) return json({ ok: false, erro: "bloqueado" }, 400);
    return json({ ok: false, erro: "validacao", campos }, 400);
  }
  const lead = analise.data;

  const verificacao = await turnstileValido(lead.turnstile, ipDoVisitante(request), env);
  if (!verificacao.ok) {
    // Na prévia, o motivo técnico volta na resposta para diagnosticar a configuração; em produção, nunca.
    return json({ ok: false, erro: "bloqueado", ...diag(env, `turnstile:${verificacao.codigos.join(",")}`) }, 403);
  }

  // Prévia (harness, Anexo D): só envios de teste da equipe.
  if (env.ACEITAR_LEADS !== "todos" && !lead.nome.toUpperCase().startsWith("TESTE")) {
    return json({ ok: false, erro: "previa" }, 403);
  }

  let r: Response;
  try {
    r = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/registrar_lead`, {
      method: "POST",
      // Chave secreta nova (sb_secret_…) vai só no apikey; a service_role antiga (JWT, "eyJ…") também no Authorization.
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        ...(env.SUPABASE_SERVICE_ROLE_KEY.startsWith("eyJ") ? { authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` } : {}),
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        p_nome: lead.nome,
        p_telefone: lead.telefone,
        p_para_quem: lead.para_quem,
        p_hospital: lead.hospital_preferido,
        p_melhor_horario: lead.melhor_horario,
        p_pagina_origem: lead.pagina_origem,
        p_utm_source: lead.utm_source,
        p_utm_medium: lead.utm_medium,
        p_utm_campaign: lead.utm_campaign,
        p_aviso_versao: AVISO_PRIVACIDADE_VERSAO,
      }),
    });
  } catch (e) {
    const motivo = e instanceof Error && e.name === "TimeoutError" ? "tempo-esgotado" : "rede";
    console.error(`[contato] Supabase inacessível (${motivo})`);
    return json({ ok: false, erro: "falha", ...diag(env, `supabase:${motivo}`) }, 500);
  }

  if (!r.ok) {
    const erro = (await r.json().catch(() => ({}))) as { message?: string; code?: string };
    if (erro.message === "limite_envios") return json({ ok: false, erro: "limite" }, 429);
    console.error(`[contato] registrar_lead falhou (status ${r.status}, código ${erro.code ?? "?"})`);
    return json({ ok: false, erro: "falha", ...diag(env, `supabase:${r.status}:${erro.code ?? "?"}`) }, 500);
  }

  const envio = avisarPorEmail(lead, env);
  if (agendar) agendar(envio);
  else await envio;

  return json({ ok: true }, 200);
}

/** Na prévia, o motivo técnico de uma recusa volta na resposta para diagnosticar a configuração; em produção, nunca. */
function diag(env: Env, motivo: string): { diagnostico?: string } {
  return env.SITE_STAGE === "production" ? {} : { diagnostico: motivo };
}

/** Qualquer método além de POST. */
export function metodoNaoPermitido(): Response {
  return new Response(null, { status: 405, headers: { allow: "POST" } });
}

/**
 * Só na prévia: GET /api/contato/?diagnostico=1 mostra QUAIS variáveis estão preenchidas (nunca os valores)
 * e o endereço do Supabase, para conferir a configuração da Vercel. Em produção, 405 como qualquer GET.
 */
export async function diagnosticoConfig(env: Env): Promise<Response> {
  if (env.SITE_STAGE === "production") return metodoNaoPermitido();
  let supabase: string;
  try {
    const u = new URL(env.SUPABASE_URL);
    const r = await fetch(`${u.origin}/rest/v1/`, {
      headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY },
      signal: AbortSignal.timeout(6000),
    });
    supabase = `${u.host} respondeu ${r.status}`;
  } catch (e) {
    supabase = env.SUPABASE_URL ? `erro: ${e instanceof Error ? e.name : "desconhecido"}` : "vazio";
  }
  const preenchida = (v?: string) => Boolean(v && v.trim());
  return new Response(
    JSON.stringify({
      SITE_STAGE: env.SITE_STAGE ?? null,
      ACEITAR_LEADS: env.ACEITAR_LEADS ?? null,
      SUPABASE_URL: supabase,
      SUPABASE_SERVICE_ROLE_KEY: preenchida(env.SUPABASE_SERVICE_ROLE_KEY)
        ? env.SUPABASE_SERVICE_ROLE_KEY.startsWith("sb_secret_") ? "preenchida (sb_secret_)" : env.SUPABASE_SERVICE_ROLE_KEY.startsWith("eyJ") ? "preenchida (JWT antiga)" : "preenchida (formato inesperado)"
        : "vazia",
      TURNSTILE_SECRET_KEY: preenchida(env.TURNSTILE_SECRET_KEY) ? "preenchida" : "vazia",
      RESEND_API_KEY: preenchida(env.RESEND_API_KEY) ? "preenchida" : "vazia",
      LEAD_NOTIFY_FROM: preenchida(env.LEAD_NOTIFY_FROM) ? "preenchido" : "vazio",
      LEAD_NOTIFY_TO: preenchida(env.LEAD_NOTIFY_TO) ? "preenchido" : "vazio",
    }, null, 2),
    { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } },
  );
}
