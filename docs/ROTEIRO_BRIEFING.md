# Roteiro da reunião de briefing

> Versão oficial do roteiro. Fica no repositório para que qualquer pessoa ou agente (Claude, Cursor, Codex, em qualquer conta) tenha acesso. A ficha 7 da biblioteca aponta para cá.
> Duração: 60 minutos (+10 min do bloco regulatório, que pode ir por e-mail). Cada pergunta indica a seção do `BRIEF.md` que ela alimenta.

## Antes da reunião

- [ ] Diagnóstico do site atual pronto (ou anotado que não há site).
- [ ] `docs/CONCORRENTES.md` preenchido, com 2 ou 3 lacunas candidatas a diferencial.
- [ ] Pacote provável identificado na qualificação.
- [ ] Gravador com transcrição pronto.

## Abertura (5 min)

1. Ler o aviso de gravação e pedir consentimento. Sem consentimento, anotar à mão.
2. Explicar o objetivo: sair da reunião com tudo o que é preciso para a proposta.

## Diagnóstico e concorrentes (15 min)

3. Apresentar os 3 a 5 problemas do site atual.
4. Mostrar a matriz de concorrentes: o que é padrão do mercado e as lacunas.
5. Validar a lacuna escolhida: "Vocês conseguem provar isso? Com qual número, case ou garantia?" → **Posicionamento**

## As 12 perguntas (35 min)

| # | Pergunta | Alimenta no BRIEF.md |
| --- | --- | --- |
| 1 | O que a empresa vende e qual é o diferencial em relação aos concorrentes? | Contexto, Posicionamento |
| 2 | Qual é a única ação que o visitante deve tomar no site? | Objetivo (CTA único) |
| 3 | Como saberemos, em 90 dias, que o site funcionou? (leads, vendas, agendamentos) | Objetivo (métrica) |
| 4 | Quem é o visitante ideal? Cargo, setor, porte, momento de compra. | Público |
| 5 | Quais dúvidas ou objeções ele tem antes de comprar? Quais perguntas ele faz no WhatsApp ou por telefone? | Público (objeções e perguntas reais para AEO/GEO) |
| 6 | Que provas temos? Clientes, números, depoimentos, certificações. | Mensagem (provas) |
| 7 | Como a marca fala? Três adjetivos e um exemplo de texto que a represente bem. | Mensagem (tom de voz) |
| 8 | Quais sites admira e quais detesta, e por quê? (pedir 3 e 1) | Referências |
| 9 | O que já existe? Logo, cores, fontes, fotos, textos, domínio. Se não houver fotos boas: topa uma sessão de fotos ou imagens geradas por IA? | Restrições (identidade e imagens), Decisões técnicas |
| 10 | Quais páginas e integrações são obrigatórias (CRM, WhatsApp, agenda, pagamento)? | Escopo |
| 11 | Qual é o prazo, o orçamento e quem aprova as entregas? | Restrições, Aprovação |
| 12 | O que está fora do escopo? | Escopo |

## Complementares (5 min, ou por e-mail depois)

- Dados da empresa exatamente como devem aparecer em todos os canais: nome fantasia, razão social, CNPJ, endereço, telefone, e-mail, área de atendimento, redes sociais. → **Entidade**
- Política para robôs de IA: padrão sugerido é liberar robôs de busca e bloquear os de treino. → **Decisões técnicas**
- Quem cria as contas no nome da empresa (domínio, Cloudflare, GA4, Search Console). → **Decisões técnicas**
- Regras do setor ou exigências legais além da LGPD. → **Restrições**

## Regulatório — corretora de seguros (10 min, ou por e-mail depois)

> Alimenta os fatos F1–F14 do harness regulatório (`claude/harness-regulatorio.md` no Project). Enquanto um fato estiver `[A CONFIRMAR]`, as regras que dependem dele ficam em 🟡 e podem travar textos e páginas.
> Dados da empresa (razão social, CNPJ, endereço, telefone, e-mail) já estão nas Complementares acima.

| # | Pergunta | Fato | Alimenta no BRIEF.md |
| --- | --- | --- | --- |
| R-1 | Qual é o código de registro da corretora na SUSEP? | F3 | Entidade |
| R-2 | Quem é o responsável técnico (nome e registro SUSEP)? Ele vai revisar e aprovar os textos do site? | F4 | Entidade, Aprovação |
| R-3 | A empresa é ME, EPP ou outro porte? | F5 | Entidade |
| R-4 | Quais ramos vocês vendem (auto, vida, residencial, empresarial, saúde/odonto, previdência, capitalização, garantia, outros)? Quais devem aparecer no site? | F6 | Contexto, Escopo |
| R-5 | Com quais seguradoras vocês trabalham? Há contrato de exclusividade com alguma? | F7 | Entidade, Escopo |
| R-6 | Existe participação societária de 10% ou mais entre a corretora e alguma seguradora, em qualquer sentido? | F8 | Restrições (legais) |
| R-7 | Vocês intermedeiam proteção patrimonial mutualista ("proteção veicular")? Com qual administradora autorizada pela SUSEP? | F9 | Escopo, Restrições |
| R-8 | Quem da equipe vai aparecer no site (nome, função, se é corretor habilitado ou preposto)? Todos autorizam o uso de imagem? | F10 | Mensagem (provas), Restrições (imagens) |
| R-9 | A corretora é filiada a alguma entidade autorreguladora (ex.: IBRACOR)? | F11 | Entidade |
| R-10 | Vocês têm autorização escrita das seguradoras para usar os logotipos delas? | F12 | Restrições (identidade) |
| R-11 | O site só capta contatos e pedidos de cotação, ou haverá contratação online? | F13 | Escopo (funcionalidades) |
| R-12 | Os depoimentos e números que vocês querem mostrar têm autorização dos clientes e fonte guardada? | R9 | Mensagem (provas) |
| R-13 | Com quais operadoras, seguradoras de saúde e administradoras de benefícios vocês trabalham hoje? Qual é a relação com a Serra Corretora (assessoria, plataforma, parceira)? | F15 | Entidade, Escopo |
| R-14 | Quais tipos de contratação vocês vendem: individual/familiar, empresarial (PME, MEI), coletivo por adesão (por quais entidades)? | F16 | Escopo |
| R-15 | O corretor da GWL acompanha o cliente no preenchimento da declaração de saúde? | F17 | Restrições (legais) |

## Encerramento (5 min)

- Explicar o processo em 4 marcos (brief, layout, aprovação para publicação, entrega).
- Avisar que o site não tem painel de edição: alterações são feitas pelo plano de manutenção.
- Combinar a data de envio da proposta (até 48 horas).

## Depois da reunião

1. Gerar o `BRIEF.md` com o prompt "Brief a partir da reunião" (`docs/PROMPTS.md`).
2. Rodar o prompt "Conferir briefing" para listar o que o roteiro pedia e a reunião não cobriu.
3. Mandar ao cliente as perguntas pendentes em uma única mensagem.

## Conferência rápida

Um brief só está pronto para construir quando estes itens não estão `[A CONFIRMAR]`:

- [ ] CTA único (pergunta 2)
- [ ] Métrica de 90 dias (pergunta 3)
- [ ] Visitante ideal (pergunta 4)
- [ ] Lacuna escolhida e prova (abertura, item 5)
- [ ] Páginas do escopo (pergunta 10)
- [ ] Responsável pelo aceite (pergunta 11)
- [ ] Código SUSEP e responsável técnico (R-1, R-2)
- [ ] Ramos no site e seguradoras/exclusividade (R-4, R-5)
- [ ] Contratação online ou só cotação (R-11)
