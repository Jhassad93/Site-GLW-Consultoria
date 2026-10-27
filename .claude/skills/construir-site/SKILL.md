---
name: construir-site
description: Conduz a construção de um site de cliente com IA pelo processo do kit (brief, app flow, design, schema, plano, construção etapa por etapa e três checklists). Use quando o usuário pedir para começar, continuar ou auditar um site do kit, ou digitar /construir-site.
---

# Construir site (kit Sites com IA)

Você conduz um projeto criado a partir do template "Kit — Sites com IA". O `CLAUDE.md` da raiz é a regra; esta skill diz como agir em cada situação.

## 1. Situar o projeto

Leia `CLAUDE.md` e os arquivos de `docs/`. Classifique o estado:

| Estado | Sinal | Próxima ação |
| --- | --- | --- |
| Sem análise de concorrentes | `docs/CONCORRENTES.md` ainda é o modelo | Pedir 3 a 5 concorrentes ao usuário, completar pela busca e preencher a matriz com evidências |
| Sem brief | `docs/BRIEF.md` ainda é o modelo | Pedir a transcrição da reunião ou fazer as perguntas do brief |
| Brief incompleto | Há `[A CONFIRMAR]` em objetivo, público ou CTA | Listar perguntas pendentes e parar |
| Planejamento | Brief ok, falta APP_FLOW, DESIGN, SCHEMA ou plano | Gerar o próximo documento que falta e parar (DESIGN.md: ver seção 3) |
| Construção | Plano existe com etapas não marcadas | Executar a primeira etapa não marcada e parar |
| Pré-publicação | Todas as etapas de construção do plano marcadas, publicação ainda não | Rodar as três auditorias |
| Publicado | Etapa de publicação do plano marcada | Oferecer o checklist de entrega e o plano de manutenção |

Informe ao usuário, em uma linha, o estado encontrado e o que vai fazer.

## 2. Perguntas do brief

O roteiro oficial é `docs/ROTEIRO_BRIEFING.md` (12 perguntas + complementares). Use sempre esse arquivo; não substitua por um roteiro próprio.

- **Com transcrição:** gere o BRIEF.md e confira a transcrição contra o roteiro, listando cada pergunta não coberta.
- **Sem transcrição:** faça as perguntas do roteiro em blocos de no máximo 4, preferindo opções de múltipla escolha.

## 3. Gerar o DESIGN.md

Use o estilo-base e a paleta indicados no BRIEF.md e a skill Frontend Design (`frontend-design`) para propor a direção. O DESIGN.md precisa ter:
- direção visual em uma frase, justificada pelo público e pelo tom de voz;
- uma ou duas famílias de fonte com papéis claros, sem fontes padrão (Inter, Roboto, Arial) salvo se forem da marca;
- paleta de 3 a 5 cores, cada uma sempre no mesmo papel, com contraste AA;
- seção Imagens: origem (cliente, sessão de fotos, geradas ou banco curado), estilo e direito de uso; nunca foto genérica de banco;
- seção Celular: decisões próprias de layout, não o desktop encolhido.

## 4. Executar uma etapa

- Faça só o que a etapa pede. Se encontrar algo fora do escopo, anote em "Pendências" no fim da resposta em vez de fazer.
- Ao terminar: marque `[x]`, resuma em até 5 linhas, liste o que testar no navegador, sugira a mensagem de commit e pare.
- Se uma etapa falhar (build quebrado, dependência incompatível), pare e explique antes de tentar alternativas.
- Se a etapa mexeu em interface: rode `/impeccable critique`, revise animações com `review-animations` e tire prints com o Playwright em 375, 768 e 1280px antes de dar a etapa por concluída. Se as skills ou o Playwright não estiverem instalados, avise e sugira `scripts/setup-design.sh`.

## 5. Auditorias

Para cada checklist (`checklists/producao.md`, `seguranca.md`, `seo-ia.md`), produza uma tabela: item · OK/falha/não se aplica · onde verificou. Corrija as falhas uma por vez, pedindo confirmação antes de mexer em autenticação, banco, variáveis de ambiente ou textos aprovados. Lembre o usuário de fazer pessoalmente o item 19 de segurança (testar como um estranho).

## 6. Regras que nunca mudam

- Segredos só em variáveis de ambiente; nunca no código.
- RLS em toda tabela com dado pessoal.
- Conteúdo de páginas renderizado no servidor.
- Nomes dos robôs de IA verificados na documentação oficial antes de gerar robots.txt e llms.txt.
- Cada componente de terceiros e cada imagem que não seja do cliente registrados em `docs/LICENCAS.md` (origem e licença ou direito de uso).
- Fonte que não abre (link privado, arquivo ausente): use a versão equivalente do repositório; se não houver ou também não abrir, pare e peça o arquivo colado ou anexado. Nunca improvise roteiro, checklist ou método.
