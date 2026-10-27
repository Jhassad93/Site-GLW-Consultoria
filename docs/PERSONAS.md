# Personas — clientes da GWL Corretora de Seguros

> **Cópia de trabalho.** A fonte da verdade fica no Project "[Site] GWL Corretora de Seguros" (claude.ai). Ao alterar, atualizar os dois lugares.

Versão 1 · 27/10/2026 · **Proto-personas**: hipóteses construídas com dados públicos e com os canais da GWL, **a validar no briefing** com perguntas sobre os clientes reais (quem fecha, quanto tempo leva, o que perguntam no WhatsApp).

## Base de evidências

| Evidência | Fonte | O que sugere |
| --- | --- | --- |
| Subprefeitura Santana/Tucuruvi: 318.913 moradores; 79.473 com 60 anos ou mais (cerca de 25%); favelas em 0,2% a 1,3% dos domicílios, contra 13% na cidade | [Prefeitura de SP – Diagnóstico Santana/Tucuruvi](https://prefeitura.sp.gov.br/documents/d/assistencia_social/diagnostico-santana_tucuruvi-pdf) (Censo 2022) | Bairro de classe média e envelhecido: o público 60+ e os filhos que cuidam deles são centrais. |
| 53,2 milhões de beneficiários de planos médicos (ago/2026): 39,0 milhões em coletivo empresarial, 8,4 milhões em individual ou familiar, 5,8 milhões em adesão; 37,3 milhões em planos só odontológicos | [O Liberal/Estadão, dados ANS](https://www.oliberal.com/variedades/ans-numero-de-beneficiarios-de-planos-de-saude-sobe-0-02-em-agosto-para-53-164-milhoes-1.1178016) | O mercado é majoritariamente empresarial (73%), incluindo PME e MEI. O odonto é volume relevante. |
| Queixas de beneficiários 60+ sobre reajuste em coletivos subiram 47% entre 2021 e 2025 (842 para 1.238 NIPs); teto do individual em 2026 é 5,11%, coletivos sem teto | [A Tarde, 10/08/2026, dados ANS](https://atarde.com.br/brasil/reajuste-em-planos-coletivos-faz-queixas-de-idosos-subirem-47-1398135) | O medo do reajuste é a dor nº 1 de quem tem 60+ e dos donos de pequenas empresas. |
| 94% de quem não tem plano gostaria de ter; 46% dos que têm não leram o contrato ou só passaram os olhos | [Datafolha/Abramge, 2023, via Medicina S/A](https://medicinasa.com.br/?p=95294) | O desejo é alto e a compreensão é baixa: há espaço para quem explica. |
| Principais litígios: medicamentos, órteses e próteses, negativas fora do Rol, reajustes e descredenciamento de rede | [Consumidor Moderno](https://consumidormoderno.com.br/as-cinco-principais-reclamacoes-contra-planos-de-saude/) (2016, dado antigo, usado só como padrão) | Medo de negativa e de perder o hospital. |
| Os assistentes de IA recomendam escolher pela rede: "confirme se o plano inclui o Hospital Santana (HSANP), Hospital São Camilo Santana" | Teste no Perplexity, 27/10/2026 (`docs/CONCORRENTES.md`) | O hospital é o critério de decisão que o público já usa. |
| Conteúdo da GWL: planos infantis, sênior, MEI, empresarial, odonto, hospitais por região; avaliações elogiam "educado, paciente e entende do assunto" | `claude/diagnostico-presenca-atual.md` | A GWL já fala com esses públicos e é reconhecida pela paciência. |

## Persona 1 — A filha que cuida dos pais (decisora para 60+)
- **Quem:** mulher de 45 a 58 anos, mora ou cresceu na zona norte, trabalha (CLT ou autônoma) e é quem "resolve as coisas" da família. Procura plano para pai ou mãe de 62 a 78 anos, às vezes para os dois. Pode ser também o próprio idoso, mas quem pesquisa e fala com o corretor costuma ser a filha ou o filho.
- **Gatilho:** o pai perdeu o plano da empresa ao se aposentar, o reajuste do plano atual ficou impagável ou houve um susto de saúde.
- **Objetivo:** um plano que caiba no orçamento **por muitos anos** e que atenda no hospital onde os pais já se tratam.
- **Dores:**
  - O preço sobe muito com a idade, e ela não entende por quê.
  - Medo de reajuste que obrigue a cancelar depois.
  - Os pais têm condições crônicas (pressão, diabetes) e ela teme que "o plano não cubra".
  - Corretores que só mandam tabela pelo WhatsApp.
- **Dúvidas:**
  - Plano para idoso tem carência?
  - Doença que ele já tem vai ser coberta?
  - Individual ou coletivo, qual reajusta menos?
  - Vale Prevent Senior ou MedSênior?
  - O Hospital [X] atende pelo plano?
  - Se meu pai tem 70 anos, ainda consegue contratar?
- **O que a convence:** alguém paciente que explique por escrito, compare opções com a rede de hospitais da região e seja honesto sobre reajuste e CPT.
- **Canais:** Google ("plano de saúde para idoso zona norte"), indicação, WhatsApp, cada vez mais assistentes de IA.
- **Alerta do harness:** R24 (CPT, carência), R25 (declaração de saúde), R27 (reajuste), R28 (rede).

## Persona 2 — A família jovem da zona norte
- **Quem:** casal de 30 a 42 anos com 1 ou 2 filhos pequenos (ou esperando o primeiro), renda de classe média, um ou os dois com carteira assinada sem plano bom, ou autônomos.
- **Gatilho:** nascimento ou gravidez planejada, emergência pediátrica cara, perda do plano do emprego.
- **Objetivo:** pediatria e pronto-socorro perto de casa, maternidade de confiança, mensalidade previsível.
- **Dores:**
  - Medo de pronto-socorro lotado.
  - Não sabe se compensa coparticipação.
  - Parto tem carência longa.
  - Confunde enfermaria com apartamento e regional com nacional.
- **Dúvidas:**
  - Quanto tempo de carência para parto?
  - Bebê recém-nascido entra no plano?
  - Coparticipação vale a pena?
  - Qual plano tem pediatria e maternidade em Santana?
  - Plano só ambulatorial serve?
  - Odonto infantil junto compensa?
- **O que a convence:** comparação lado a lado com hospitais e maternidades perto de casa, explicação simples de coparticipação e carência e simulação rápida pelo WhatsApp.
- **Canais:** Instagram, Google, indicação de amigos, grupos de pais.
- **Alerta do harness:** R24 (carência de parto: até 300 dias), R26 (tipos), R23 (preço).

## Persona 3 — O dono do pequeno negócio da Voluntários da Pátria
- **Quem:** dono ou sócio de comércio ou serviço com 3 a 30 funcionários na zona norte (loja, clínica, escritório contábil, academia), de 35 a 60 anos. Decide sozinho, às vezes com o contador.
- **Gatilho:** perder funcionário para concorrente que oferece plano, pedido da equipe, reajuste alto no contrato atual, troca de corretor que "sumiu".
- **Objetivo:** benefício que ajude a reter a equipe, com custo controlado e sem dor de cabeça na gestão (inclusões, exclusões, boletos).
- **Dores:**
  - Reajuste anual imprevisível (sinistralidade).
  - Não sabe as regras de vidas mínimas.
  - Funcionário reclamando de rede ou autorização.
  - Corretor que só aparece na venda.
- **Dúvidas:**
  - Com quantas vidas posso contratar?
  - Funcionário tem carência?
  - Posso incluir os sócios e as famílias?
  - Como funciona o reajuste do plano empresarial?
  - Coparticipação reduz o custo?
  - Quem me ajuda depois da contratação?
- **O que a convence:** corretor do bairro que atende pessoalmente, explica o reajuste antes, faz a gestão pós-venda e tem referências de outras empresas da região.
- **Canais:** indicação (contador, outros empresários), Google, LinkedIn, visita presencial.
- **Alerta do harness:** R26 (vínculo empregatício; 30 ou mais vidas sem carência só com ingresso em até 30 dias), R27, R29.

## Persona 4 — O MEI ou autônomo que ouviu falar em "plano pelo CNPJ"
- **Quem:** profissional autônomo ou MEI de 28 a 50 anos (cabeleireira, técnico, representante, profissional liberal), muitas vezes sem plano desde que saiu da CLT.
- **Gatilho:** viu anúncio de "plano PJ mais barato", passou por um susto de saúde ou perdeu o plano do emprego anterior.
- **Objetivo:** pagar menos que o plano individual sem cair em armadilha.
- **Dores:**
  - Desconfiança ("é golpe?").
  - Não sabe se o MEI dele serve.
  - Medo de o plano ser cancelado.
  - Promessas de "economize 40%" sem explicação.
- **Dúvidas:**
  - MEI pode ter plano empresarial?
  - Quanto tempo de CNPJ precisa?
  - Posso incluir a família?
  - A operadora pode cancelar?
  - Qual a diferença para o plano individual?
  - Adesão pela minha profissão é melhor?
- **O que a convence:** explicação franca das regras (6 meses de CNPJ ativo, comprovação anual, reajuste e rescisão do coletivo) e comparação honesta com individual e adesão.
- **Canais:** Google, Instagram, anúncios, IA ("plano de saúde MEI vale a pena").
- **Alerta do harness:** **R26 é crítico.** Nunca sugerir abrir CNPJ só para o plano. Explicar riscos e regras.

## Persona 5 — Quem quer trocar de plano
- **Quem:** pessoa de 35 a 65 anos que já tem plano (individual, adesão ou PME) e está insatisfeita, em qualquer um dos perfis acima.
- **Gatilho:** reajuste alto na carta de aniversário, descredenciamento do hospital preferido, negativa ou demora de autorização.
- **Objetivo:** trocar sem perder carências já cumpridas e sem piorar a rede.
- **Dores:**
  - Medo de recomeçar carência.
  - Medo de que a doença atual vire problema.
  - Não sabe se pode levar o tempo de plano.
- **Dúvidas:**
  - Posso trocar de plano sem cumprir carência de novo?
  - O que é portabilidade?
  - Meu reajuste foi abusivo?
  - Existe plano com o mesmo hospital e preço menor?
- **O que a convence:** análise do contrato atual antes de propor a troca, explicação da portabilidade e comparação com a mesma rede.
- **Canais:** Google ("portabilidade de plano de saúde"), IA, indicação.
- **Alerta do harness:** R24, R27, R28. Portabilidade a confirmar na norma da ANS antes de publicar (pendência).

## Persona secundária — Corretor parceiro (B2B)
- O site atual tem uma página "Institucional", que é um portal para corretores parceiros (tabelas, manuais, backoffice). **A confirmar no briefing** se esse público entra no escopo do novo site. Se entrar, fica numa área separada, sem misturar com a comunicação ao consumidor.

## Matriz rápida: persona × critério de decisão

| | Hospital perto | Preço hoje | Reajuste futuro | Carência | Doença preexistente | Pós-venda |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Filha (60+) | Alto | Alto | **Muito alto** | Médio | **Muito alto** | Alto |
| 2. Família jovem | **Muito alto** | Alto | Médio | **Alto (parto)** | Baixo | Médio |
| 3. Dono de PME | Médio | Alto | **Muito alto** | Médio | Baixo | **Muito alto** |
| 4. MEI/autônomo | Médio | **Muito alto** | Alto | Médio | Médio | Médio |
| 5. Quer trocar | **Muito alto** | Alto | Alto | **Muito alto** | Alto | Médio |

**Leitura:** "hospital que você quer usar" e "reajuste e carência explicados antes" atravessam todas as personas. Isso confirma a combinação das lacunas A e B como posicionamento.
