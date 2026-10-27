/**
 * Testes da função /api/contato com Supabase, Turnstile e Resend simulados (fetch interceptado).
 * Rodar: node scripts/testar-contato.mts   (sai com código 1 se algum caso falhar)
 * Cobre os caminhos do Fluxo 2 do APP_FLOW: origem, tamanho, honeypot, validação, Turnstile, prévia,
 * sucesso, limite (429), falha do banco (500) e falha do e-mail sem perder o lead.
 */
import { onRequestPost, onRequest, type Env } from "../functions/api/contato.ts";

type Simulacao = { turnstile: boolean; supabase: "ok" | "limite" | "erro" | "rede"; resend: "ok" | "erro" };
let sim: Simulacao;
const chamadas: string[] = [];

globalThis.fetch = (async (entrada: string | URL | Request, init?: RequestInit) => {
  const url = String(entrada instanceof Request ? entrada.url : entrada);
  chamadas.push(url);
  const resp = (corpo: unknown, status = 200) =>
    new Response(JSON.stringify(corpo), { status, headers: { "content-type": "application/json" } });
  if (url.includes("turnstile")) return resp({ success: sim.turnstile });
  if (url.includes("/rpc/registrar_lead")) {
    const corpo = JSON.parse(String(init?.body));
    if (!("p_aviso_versao" in corpo)) return resp({ message: "sem versão" }, 400);
    if (sim.supabase === "rede") throw new TypeError("network");
    if (sim.supabase === "limite") return resp({ code: "P0001", message: "limite_envios" }, 400);
    if (sim.supabase === "erro") return resp({ code: "XX000", message: "erro" }, 500);
    return resp("b9f0c3a2-0000-0000-0000-000000000000");
  }
  if (url.includes("api.resend.com")) return sim.resend === "ok" ? resp({ id: "x" }) : resp({ message: "erro" }, 500);
  throw new Error(`fetch inesperado: ${url}`);
}) as typeof fetch;

const env: Env = {
  SUPABASE_URL: "https://exemplo.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "chave-de-teste",
  TURNSTILE_SECRET_KEY: "segredo-de-teste",
  RESEND_API_KEY: "re_teste",
  LEAD_NOTIFY_TO: "equipe@exemplo.com",
  LEAD_NOTIFY_FROM: "Site <site@exemplo.com>",
  ACEITAR_LEADS: "todos",
};

const valido = {
  nome: "Maria Teste",
  telefone: "+55 (11) 98888-7777",
  para_quem: "pais_60_mais",
  hospital_preferido: "Hospital Exemplo",
  melhor_horario: "manha",
  pagina_origem: "/contato/",
  turnstile: "token",
};

function pedido(corpo: unknown, origem = "https://gwl.exemplo") {
  return new Request("https://gwl.exemplo/api/contato", {
    method: "POST",
    headers: { origin: origem, "content-type": "application/json" },
    body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
  });
}

let falhas = 0;
async function caso(nome: string, corpo: unknown, s: Partial<Simulacao>, esperado: { status: number; erro?: string }, e: Env = env, origem?: string) {
  sim = { turnstile: true, supabase: "ok", resend: "ok", ...s };
  chamadas.length = 0;
  const r = await onRequestPost({ request: pedido(corpo, origem), env: e });
  const json = (await r.json()) as { ok: boolean; erro?: string; campos?: Record<string, string> };
  const passou = r.status === esperado.status && (esperado.erro ? json.erro === esperado.erro : json.ok === true);
  if (!passou) falhas++;
  console.log(`${passou ? "OK  " : "FALHA"} ${nome} → ${r.status} ${JSON.stringify(json)}`);
  return { r, json };
}

await caso("1 sucesso (telefone com +55 e máscara)", valido, {}, { status: 200 });
await caso("2 origem de outro site", valido, {}, { status: 403, erro: "bloqueado" }, env, "https://malicioso.exemplo");
await caso("3 corpo grande demais", { ...valido, hospital_preferido: "x".repeat(5000) }, {}, { status: 403, erro: "bloqueado" });
await caso("4 honeypot preenchido", { ...valido, empresa_site: "http://spam" }, {}, { status: 403, erro: "bloqueado" });
const v = await caso("5 campos inválidos", { ...valido, nome: "J", telefone: "123", para_quem: "outro" }, {}, { status: 400, erro: "validacao" });
if (!v.json.campos?.nome || !v.json.campos?.telefone || !v.json.campos?.para_quem) {
  falhas++;
  console.log("FALHA 5b erros por campo ausentes");
} else console.log("OK   5b erros por campo: nome, telefone, para_quem");
await caso("6 sem token do Turnstile", { ...valido, turnstile: "" }, {}, { status: 400, erro: "bloqueado" });
await caso("7 Turnstile recusado", valido, { turnstile: false }, { status: 403, erro: "bloqueado" });
await caso("8 prévia: nome sem TESTE", valido, {}, { status: 403, erro: "previa" }, { ...env, ACEITAR_LEADS: "teste" });
await caso("9 prévia: nome com TESTE", { ...valido, nome: "TESTE Maria" }, {}, { status: 200 }, { ...env, ACEITAR_LEADS: "teste" });
await caso("10 limite de envios", valido, { supabase: "limite" }, { status: 429, erro: "limite" });
await caso("11 erro no banco", valido, { supabase: "erro" }, { status: 500, erro: "falha" });
await caso("12 banco fora do ar", valido, { supabase: "rede" }, { status: 500, erro: "falha" });
await caso("13 e-mail falha, lead gravado", valido, { resend: "erro" }, { status: 200 });
await caso("14 JSON inválido", "{nome:", {}, { status: 400, erro: "bloqueado" });

const get = await onRequest({ request: new Request("https://gwl.exemplo/api/contato"), env });
const okGet = get.status === 405;
if (!okGet) falhas++;
console.log(`${okGet ? "OK  " : "FALHA"} 15 GET → ${get.status}`);

console.log(falhas === 0 ? "\nTodos os casos passaram." : `\n${falhas} caso(s) falharam.`);
process.exit(falhas === 0 ? 0 : 1);
