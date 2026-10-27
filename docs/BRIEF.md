# Brief — GWL Corretora de Seguros

> **BRIEF PROVISÓRIO (v0), 27/10/2026.** Por decisão do responsável (João), o site será construído como **versão de demonstração antes da reunião de briefing**. Este brief foi montado só com fontes públicas e análises (`claude/diagnostico-presenca-atual.md`, `docs/CONCORRENTES.md`, `claude/personas.md`, `claude/copy-site-rascunho.md`, `claude/harness-regulatorio.md`).
> **Nada aqui foi dito pelo cliente.** Tudo o que depende dele está marcado `[A CONFIRMAR]` ou como **hipótese**, e a demonstração exibe esses pontos como "a confirmar", nunca como fato. Depois da reunião, este arquivo vira o brief oficial (v1).

## Pacote contratado
- Hipótese: **site institucional com guias** (home, páginas por perfil, guias por hospital e bairro, FAQ, contato), com captação por WhatsApp e formulário. `[A CONFIRMAR]`

## Contexto
- Empresa: corretora especializada **exclusivamente em planos de saúde e odontológicos** (individual, familiar, empresarial/PME, MEI, adesão, 60+), em Santana, zona norte de São Paulo. Empresa de pequeno porte. (Fonte: site antigo, Instagram e CNPJ.)
- Razão social e CNPJ: GWL CORRETORA DE SEGUROS LTDA · 41.131.963/0001-01 (cadastro público; `[A CONFIRMAR]`)
- Momento: site atual fora do ar ("em manutenção"), Instagram retomado em 2026, presença fraca no Google (6 avaliações) e ausência nos assistentes de IA.

## Objetivo
- Ação principal (CTA único) — hipótese: **iniciar comparação de planos pelo WhatsApp**; secundário: formulário "prefiro que me liguem". `[A CONFIRMAR]`
- Métrica de sucesso em 90 dias: `[A CONFIRMAR]`. Sugestões: contatos pelo site por mês (GA4), avaliações no Google (partindo de 6), presença em buscas locais e reteste nos assistentes de IA.

## Público
- Visitante ideal (proto-personas, `claude/personas.md`):
  1. **Filha ou filho que cuida dos pais 60+** (prioritária; 25% da população local tem 60+).
  2. **Família jovem** (pediatria, maternidade, carência de parto).
  3. **Dono de pequeno negócio** da zona norte (PME).
  4. **MEI ou autônomo** ("plano pelo CNPJ").
  5. **Quem quer trocar de plano.**
- Dores: medo do reajuste (sobretudo 60+ e PME), de o hospital de confiança não estar na rede, de carência e doença preexistente, e de ser empurrado para o plano errado por quem só manda tabela.
- Objeções: "corretor só quer vender o mais caro", "plano pelo MEI é cilada?", "o preço vai disparar com a idade", "vou perder minhas carências se trocar".
- Perguntas reais (AEO/GEO): ver as 14 perguntas do FAQ em `claude/copy-site-rascunho.md`. `[A CONFIRMAR com as perguntas que chegam no WhatsApp]`

## Mensagem
- Proposta de valor em uma frase (provisória): *escolher o plano de saúde começando pelo hospital em que você confia, com carência, reajuste e tipo de contrato explicados antes de assinar.*
- Provas `[A CONFIRMAR todas]`: avaliações no Google (4,5, 6 avaliações), treinamentos com operadoras (Hapvida, NotreDame, Sami), "Destaque 2025 em vendas" (Serra), tempo de mercado (CNPJ de 2021 × "7 anos" × "mais de 10 anos"), número de clientes (100 × 1000).
- Tom de voz (hipótese): **claro, próximo, honesto**. Exemplo: "Antes de falar de preço, a gente pergunta onde você gosta de ser atendido."
- Palavra-chave principal por página (hipótese):
  - home → "corretora de plano de saúde zona norte SP"
  - 60+ → "plano de saúde para idosos zona norte"
  - família → "plano de saúde familiar Santana"
  - empresas → "plano de saúde empresarial zona norte"
  - MEI → "plano de saúde MEI São Paulo"
  - trocar → "portabilidade de plano de saúde"
  - guias → "plano de saúde que atende [hospital]" / "plano de saúde [bairro]"

## Posicionamento (de docs/CONCORRENTES.md)
- Concorrentes analisados: Nipoplan, Silax, Health Plus, Company Hero, Qualicorp, GRP.
- Padrão do mercado que o site precisa ter: CTA de cotação e WhatsApp, lista de operadoras, banner de cookies e política de privacidade, "como funciona".
- Lacuna escolhida: **A + B combinadas.** Corretora local que explica carência, reajuste e tipos de plano antes de vender (A) e que ajuda a escolher a partir do hospital da região (B).
- Mensagem de diferenciação: **"Primeiro o hospital. Depois o plano."** (assinatura); H1 provisório da home: "Para o dia em que você vai pensar: 'ainda bem que eu tenho plano'." (pendência aberta de melhoria).
- Prova que sustenta: conteúdo educativo próprio (Instagram), avaliações que elogiam a paciência, atuação no bairro. `[A CONFIRMAR]`

## Referências
- Admira (hipótese a partir da análise): GRP (técnica e texto conforme), Company Hero (clareza da primeira tela e FAQ), Qualicorp (busca por hospital).
- Evitar: promessas tipo Health Plus ("Cobertura Completa", "menor valor garantido"); vídeo sem proposta na primeira tela (Silax).
- Estilo-base (Refero Styles): `[a definir na etapa de DESIGN.md]`
- Paleta e fontes (Realtime Colors): `[a definir]`; ponto de partida: **identidade existente verde e branco, logotipo de árvore**.

## Escopo
- Páginas (hipótese):
  - home;
  - planos para 60+, para família, para empresas, para MEI e autônomos, para trocar de plano;
  - guias por hospital (modelo) e por bairro (modelo);
  - sobre;
  - perguntas frequentes;
  - contato;
  - obrigado;
  - privacidade e termos;
  - 404.
- Funcionalidades: atalhos por hospital que abrem o WhatsApp com mensagem pronta; formulário curto sem dados de saúde; FAQ estruturado.
- Integrações (hipótese): WhatsApp, e-mail de aviso, GA4 com consentimento. CRM `[A CONFIRMAR]`.
- Fora do escopo (hipótese): simulador de preços, tabelas de valores, contratação online, área do cliente, portal de corretores parceiros `[A CONFIRMAR se entra]`.

## Entidade (manter idêntico em todos os canais)
- Nome fantasia: GWL Corretora de Seguros `[A CONFIRMAR uso de "Corretora de Seguros" × registro SUSEP]`
- Endereço: Rua Salete, 251, 2º andar, Santana, São Paulo/SP, 02016-001 (CNPJ e Google) `[A CONFIRMAR; site antigo usa Voluntários da Pátria, 2325]`
- Telefone / WhatsApp: `[A CONFIRMAR: três números diferentes em uso]`
- E-mail: `[A CONFIRMAR]`
- Área de atendimento (hipótese): São Paulo capital, foco na zona norte
- Redes sociais (sameAs): https://www.instagram.com/gwl.corretoradeseguros/ ; Google Business `[link]`
- Registro SUSEP e responsável técnico: `[A CONFIRMAR]`

## Decisões técnicas
- Política para robôs de IA: **liberar todos** (busca, visita a pedido do usuário e treino), decidida por João em 27/10/2026 para aumentar a presença da GWL nos assistentes de IA. Tabela de robôs conferida em fontes oficiais na mesma data (`docs/ROBOS_IA.md`). Confirmar com o cliente no briefing.
- Domínio: `[A CONFIRMAR: gwlcorretora.com.br × gwlcorretoradeseguros.com.br]`
- Contas criadas em nome do cliente: `[A CONFIRMAR]`
- **Demonstração:** publicada em endereço provisório e privado, nunca no domínio do cliente antes do aceite.

## Restrições
- Identidade existente: logotipo de árvore, verde e branco (site e Instagram). Arquivos originais `[A CONFIRMAR]`.
- Imagens: a demonstração usa ilustrações ou imagens neutras claramente provisórias. Fotos reais da equipe só com autorização. Nenhuma foto genérica de banco de imagens na versão final.
- Legais: **harness regulatório v2.0.1** (SUSEP/CNSP, ANS, CDC, LGPD), obrigatório em todo texto.
- Prazo: `[A CONFIRMAR]`

## Aprovação
- Responsável pelo aceite: `[A CONFIRMAR: Geisa (sócia-administradora)?]`
- Revisão regulatória dos textos: `[responsável técnico da corretora]`
- Marcos: **demonstração (antes do brief)** · brief · layout · aprovado para publicação · entrega
