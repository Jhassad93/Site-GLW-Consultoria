/**
 * Regras do formulário "Prefiro que me liguem", compartilhadas entre o navegador e a função /api/contato.
 * Espelham as restrições do banco (docs/SCHEMA.md). Harness R12/R25: nada de saúde, documento ou dado de terceiros.
 * Sem imports com "@/" e sem dependências: a lógica do servidor (src/lib/contato-servidor.ts) e os testes importam este arquivo.
 */
export const PARA_QUEM = ["eu", "familia", "pais_60_mais", "empresa", "mei_autonomo", "trocar_plano"] as const;
export const MELHOR_HORARIO = ["qualquer", "manha", "tarde", "noite"] as const;
export type ParaQuem = (typeof PARA_QUEM)[number];
export type MelhorHorario = (typeof MELHOR_HORARIO)[number];

/** Versão do aviso de privacidade exibido junto do botão (gravada em leads.aviso_privacidade_versao). */
export const AVISO_PRIVACIDADE_VERSAO = "2026-10-27";

export type DadosLead = {
  nome: string;
  telefone: string;
  para_quem: string;
  hospital_preferido?: string;
  melhor_horario?: string;
};

export type CampoLead = keyof DadosLead;

export const MENSAGENS: Record<CampoLead, string> = {
  nome: "Escreva seu nome, com pelo menos 2 letras.",
  telefone: "Confira o número: DDD e telefone, como (11) 91234-5678.",
  para_quem: "Escolha para quem é o plano.",
  hospital_preferido: "Use até 120 caracteres, só com o nome do hospital.",
  melhor_horario: "Escolha um horário da lista.",
};

/** Só dígitos, sem o 55 do Brasil. Mesmo critério de registrar_lead(). */
export function normalizarTelefone(valor: string): string {
  let d = valor.replace(/\D/g, "");
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) d = d.slice(2);
  return d;
}

/** Valida e devolve os erros por campo (vazio = válido). */
export function validarLead(d: DadosLead): Partial<Record<CampoLead, string>> {
  const erros: Partial<Record<CampoLead, string>> = {};
  const nome = (d.nome ?? "").trim();
  if (nome.length < 2 || nome.length > 120) erros.nome = MENSAGENS.nome;
  if (!/^[1-9][0-9]{9,10}$/.test(normalizarTelefone(d.telefone ?? ""))) erros.telefone = MENSAGENS.telefone;
  if (!(PARA_QUEM as readonly string[]).includes(d.para_quem)) erros.para_quem = MENSAGENS.para_quem;
  if ((d.hospital_preferido ?? "").trim().length > 120) erros.hospital_preferido = MENSAGENS.hospital_preferido;
  if (d.melhor_horario && !(MELHOR_HORARIO as readonly string[]).includes(d.melhor_horario))
    erros.melhor_horario = MENSAGENS.melhor_horario;
  return erros;
}

/** Respostas da função, lidas pelo formulário. */
export type RespostaContato =
  | { ok: true }
  | { ok: false; erro: "validacao"; campos: Partial<Record<CampoLead, string>> }
  | { ok: false; erro: "bloqueado" | "limite" | "previa" | "falha" };
