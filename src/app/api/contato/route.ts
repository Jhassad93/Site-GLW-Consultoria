import { after } from "next/server";
import { diagnosticoConfig, lerEnv, metodoNaoPermitido, processarContato } from "@/lib/contato-servidor";

/**
 * POST /api/contato na Vercel (função Node). A lógica e as camadas de proteção estão em
 * src/lib/contato-servidor.ts; o e-mail de aviso sai depois da resposta (`after`).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request): Promise<Response> {
  return processarContato(request, lerEnv(), (envio) => after(envio));
}

export function GET(request: Request): Response | Promise<Response> {
  if (new URL(request.url).searchParams.get("diagnostico") === "1") return diagnosticoConfig(lerEnv());
  return metodoNaoPermitido();
}
