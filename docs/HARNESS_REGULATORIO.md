# Harness regulatório — site da GWL Corretora de Seguros

> **Cópia de trabalho.** A fonte da verdade fica no Project "[Site] GWL Corretora de Seguros" (claude.ai). Ao alterar, atualizar os dois lugares.

Versão: **2.0** · Criado em: 27/10/2026 · Última verificação da linha de base: 27/10/2026
Responsável pelo aceite regulatório: [A CONFIRMAR]

> **Escopo do negócio:** segundo o site e o Instagram (`claude/diagnostico-presenca-atual.md`), a GWL vende **exclusivamente planos de saúde e odontológicos**. Por isso há duas camadas:
> - **Corretora (identificação e conduta):** SUSEP/CNSP, CDC e LGPD, nas regras R1–R20.
> - **Produto (planos e seguro saúde):** ANS, nas regras R21–R30, que prevalecem sobre as genéricas quando tratarem do mesmo ponto.

> Natureza deste documento: roteiro de conformidade para a construção do site, baseado nas normas listadas no Anexo B. Não é parecer jurídico. Interpretações aparecem marcadas como **interpretação**. Todo texto do site passa por revisão do responsável técnico da corretora antes de publicar.

---

## 1. Fatos do caso

Preencher com o cliente. Enquanto um fato estiver `[A CONFIRMAR]`, as regras que dependem dele ficam em 🟡.

| # | Fato | Valor | Regras afetadas |
| --- | --- | --- | --- |
| F1 | Razão social e nome fantasia exatos | GWL CORRETORA DE SEGUROS LTDA / GWL Corretora de Seguros (fonte pública cnpja.com, 27/10/2026; confirmar com o cliente) | R1, R2 |
| F2 | CNPJ | 41.131.963/0001-01, aberto em 08/03/2021, EPP; endereço R. Salete, 251, Santana (fonte pública; confirmar) | R1 |
| F3 | Código de registro na SUSEP (corretora) | [A CONFIRMAR] | R1, R8 |
| F4 | Responsável técnico (nome e registro SUSEP) | [A CONFIRMAR] | R1, R19 |
| F5 | Porte (ME, EPP ou outro) | EPP, Simples Nacional (fonte pública; confirmar) | R1 |
| F6 | Ramos que comercializa (auto, vida, residencial, empresarial, saúde/odonto, previdência, capitalização, garantia, outros) | [A CONFIRMAR] | R6, R12, R15 |
| F7 | Seguradoras com que trabalha, ou obrigação de exclusividade | [A CONFIRMAR] | R3, R7 |
| F8 | Participações societárias de 10% ou mais entre a corretora e alguma seguradora (nos dois sentidos) | [A CONFIRMAR] | R3 |
| F9 | Intermedeia proteção patrimonial mutualista (PPM)? Com qual administradora autorizada? | [A CONFIRMAR] | R6 |
| F10 | Prepostos e equipe que aparecerão no site (nome, função, se é corretor habilitado) | [A CONFIRMAR] | R19 |
| F11 | Filiação a entidade autorreguladora (ex.: IBRACOR) | [A CONFIRMAR] | R17 |
| F12 | Autorização escrita das seguradoras para uso de suas marcas | [A CONFIRMAR] | R7 |
| F13 | Haverá contratação online ou só captação de contato e cotação? | [A CONFIRMAR] | R3, R5, R12 |
| F14 | Endereço, telefone, e-mail e canais de atendimento oficiais | [A CONFIRMAR] (site e Instagram divergem) | R1, R17 |
| F15 | Operadoras, seguradoras de saúde e administradoras de benefícios com que a GWL trabalha, e a natureza da relação com a Serra Corretora (assessoria, plataforma ou parceira) | [A CONFIRMAR] | R3, R7, R21 |
| F16 | Tipos de contratação vendidos: individual/familiar, coletivo empresarial (PME, empresário individual), coletivo por adesão (por quais entidades e administradoras) | [A CONFIRMAR] | R26 |
| F17 | A GWL participa do preenchimento da declaração de saúde dos clientes? | [A CONFIRMAR] | R25 |

---

## 2. Como aplicar

**Graus**
- 🔴 **Bloqueante:** contraria norma vinculante, ou o risco é alto e não há leitura razoável que o permita. Não é executado, mesmo que conste do BRIEF.md.
- 🟡 **Atenção:** norma orientativa, interpretação, ou depende de um fato do caso. Só segue com decisão expressa do responsável, registrada no Anexo D.
- Na dúvida sobre o grau, tratar como 🟡 e perguntar.

**Precedência** (integra a ordem do CLAUDE.md do kit):
Harness 🔴 > BRIEF.md > DESIGN.md > regras inegociáveis do CLAUDE.md > Harness 🟡 já decididos (Anexo D) > skills de design.

**Formato da parada regulatória**, antes de produzir ou publicar:
- **O que:** o trecho ou elemento.
- **Norma:** diploma, artigo/inciso e natureza (vinculante ou orientativa).
- **Fundamento:** por que colide.
- **Grau:** 🔴 ou 🟡.
- **Alternativa conforme:** como atingir o objetivo dentro das regras.

---

## 3. Regras

### R1 — Identificação da corretora
- O site deve conter a expressão **"Corretor(a) de Seguros"** ou **"Corretagem de Seguros"**. A Circular SUSEP 510/2015, art. 4º, exige isso no nome empresarial e nos sítios eletrônicos (vinculante). A dispensa para ME/EPP (parágrafo único) vale só para o nome empresarial, não para o site. 🔴 se a expressão faltar.
- Rodapé de todas as páginas: razão social, CNPJ, endereço, telefone e e-mail. Base: CDC, art. 31, e Decreto 7.962/2013, art. 2º, que se aplica quando há oferta ou contratação pela internet (vinculante). 🔴 se faltar.
- Mostrar o código de registro SUSEP da corretora e do responsável técnico, com link para a consulta pública de corretores no site da SUSEP. Não achei norma vigente que exija o código em publicidade (Res. CNSP 493/2026, art. 5º, § 2º, só cria o código). **Interpretação:** é a prova mais direta de habilitação para o visitante e reforça o dever de transparência (Res. CNSP 382/2020, art. 3º). 🟡, com recomendação de exibir.

### R2 — Nunca se apresentar como seguradora
- A corretora é intermediária (Lei 4.594/1964, art. 1º; DL 73/1966, art. 122) e não aceita riscos nem paga indenizações. Ficam proibidos textos como "nós cobrimos", "nossa apólice", "nós indenizamos", "seguro GWL", "aprovamos seu seguro". 🔴
- Não usar "Seguros" ou "Seguradora" sozinhos, como nome, logo, título ou domínio, de forma que sugira que a GWL emite seguros. Base: Circ. SUSEP 510/2015, art. 4º, e CDC, art. 37, § 1º (vinculantes). 🔴
- Correto: "intermediamos", "cotamos com seguradoras autorizadas pela SUSEP", "a seguradora emite a apólice e paga a indenização".

### R3 — Transparência da Res. CNSP 382/2020
- **Seguradoras para as quais atua, ou a exclusividade, no site:** art. 4º, § 1º, III, combinado com o § 3º (vinculante). 🔴 se o site for ao ar sem essa informação. Depende do F7.
- **Participações de 10% ou mais** entre a corretora e alguma seguradora (art. 4º, § 1º, I e II): devem ser divulgadas em material de venda, canal de atendimento ou site, informando como acessá-las (§ 2º, vinculante). Se não houver, registrar no Anexo D (F8).
- **Remuneração (comissão):** o intermediário informa formalmente o valor ao cliente antes da contratação, junto com o prêmio (art. 4º, § 1º, IV, vinculante). Não precisa ficar no site. Se o site tiver contratação online (F13), o fluxo precisa exibir essa informação antes da proposta. 🔴 nesse caso.
- **Conflito de interesses:** qualquer conflito decorrente da relação com a seguradora deve ficar claro para o cliente (art. 4º, caput).
- **Divulgação clara e adequada**, com práticas que reduzam a má compreensão (art. 3º, § 1º, V).

### R4 — Sem promessas de resultado
- Proibido: "aprovação garantida", "indenização garantida", "sinistro pago em X dias", "cobertura total/completa/sem limites", "menor preço garantido", "o seguro mais barato", "sem burocracia", "sem análise". A corretora não controla aceitação, preço nem regulação de sinistro, e esses textos configuram publicidade enganosa (CDC, art. 37, § 1º, vinculante). 🔴
- Coberturas têm limites e exclusões, que a lei exige descritos "de forma clara e inequívoca" (Lei 15.040/2024, art. 9º, § 1º) e em destaque (art. 48, § 1º). O site não pode vender o produto como se não tivesse exclusões. 🔴
- Alternativa: "buscamos a melhor relação entre cobertura e preço entre as seguradoras com que trabalhamos", "acompanhamos você no sinistro do aviso à indenização".

### R5 — Preços, cotação e simulador
- Toda oferta suficientemente precisa vincula quem a faz (CDC, art. 30, vinculante). Preço exato ou "a partir de R$ X" no site só com fonte, data, condições e validade, e com decisão registrada. 🟡
- Cotação e simulador: o resultado é estimativa, sujeito à análise e aceitação da seguradora. Dizer isso no próprio resultado, não só nos termos. 🔴 se o resultado parecer preço final.
- Formulário de cotação ≠ contratação. O botão diz "solicitar cotação" ou "falar com um corretor", nunca "contratar" ou "comprar", salvo se houver contratação online real (F13).

### R6 — Produtos permitidos
- Só produtos de seguradoras autorizadas pela SUSEP. Para outros produtos, só os que a corretora pode intermediar por lei: capitalização, previdência aberta e PPM (Res. CNSP 493/2026, art. 1º, parágrafo único; DL 73, art. 122, parágrafo único, na redação da LC 213/2025).
- **Proteção patrimonial mutualista** só por administradora autorizada pela SUSEP (DL 73, art. 88-H). Operar sem autorização sujeita a penalidades até o triplo (DL 73, art. 113). Anunciar "proteção veicular" de associação não autorizada: 🔴. Com administradora autorizada: 🟡, deixando claro que **não é seguro** e explicando a diferença.
- Não chamar de "seguro" o que não é seguro (assistência 24h avulsa, clube de benefícios, PPM). Base: CDC, art. 37, § 1º. 🔴

### R7 — Marcas de seguradoras
- Logos e nomes de seguradoras só com autorização (F12), pois são marcas registradas (Lei 9.279/1996; Res. CNSP 493/2026, art. 7º, V, manda observar as regras de marca do INPI). 🟡 até haver autorização escrita.
- A lista de seguradoras exibida deve bater com a informação do R3. Não sugerir parceria exclusiva, "credenciamento especial" ou ranking que não existam. 🔴 se for falso.

### R8 — SUSEP e órgãos públicos
- Não usar o logotipo da SUSEP ou do governo como selo, nem dizer "certificada", "aprovada" ou "recomendada pela SUSEP". **Interpretação:** sugere chancela oficial inexistente (CDC, art. 37, § 1º). A Res. CNSP 493/2026, art. 7º, IV, também veda sigla de órgão público na denominação, e a Circ. SUSEP 656/2022, art. 31, I, proíbe o nome ou a imagem da SUSEP na publicidade de capitalização. 🔴
- Permitido em texto: "Corretora registrada na SUSEP sob o código nº [F3]", com link para a consulta oficial.

### R9 — Depoimentos, avaliações, números e cases
- Só depoimentos reais, com autorização escrita do autor para uso de nome e imagem. Nada de depoimento inventado ou "ilustrativo" (CDC, art. 37; Código CONAR, Anexo Q, orientativo). 🔴 se for fictício.
- Nunca expor dados de sinistro, apólice ou valores de cliente sem autorização (LGPD). 🔴
- Números ("+X clientes", "R$ Y em indenizações acompanhadas", "Z anos") só com fonte guardada e data. 🟡
- Avaliações de terceiros (Google, Reclame Aqui) só por reprodução fiel, com fonte e data.

### R10 — Comparações e concorrência
- Comparar seguradoras ou concorrentes só com dados objetivos, verificáveis e da mesma data. Nada de denegrir. Base: Código CONAR, art. 32, orientativo, e CDC, art. 37. 🟡

### R11 — Venda casada e produtos acessórios
- Quando um seguro for acessório de outro produto ou serviço, informar que ele não é obrigatório e que o cliente pode adquirir o principal sem ele (Res. CNSP 382/2020, art. 5º; CDC, art. 39, I; vinculantes). 🔴 se o texto condicionar uma coisa à outra.

### R12 — Formulários e dados pessoais (LGPD)
- Coletar o mínimo para retornar o contato: nome, telefone ou e-mail, ramo de interesse e mensagem opcional (LGPD, art. 6º, III).
- **Dados de saúde são dados sensíveis** (LGPD, art. 5º, II, e art. 11). Não perguntar no site sobre doenças, preexistências, hábitos (fumo) ou condição de saúde, nem pedir CPF, RG ou foto de documento. Essas informações só no atendimento individual, por canal seguro e com base legal registrada. 🔴 se o formulário público pedir dado sensível.
- Dados de terceiros (beneficiários, condutores, dependentes) também não entram no formulário público. 🔴
- Consentimento ou aviso de privacidade junto do botão de envio, com link para a política. Retenção definida no SCHEMA.md.
- Placa, chassi e CEP para cotação de auto: 🟡. Só se o BRIEF justificar e a política de privacidade cobrir.

### R13 — Cookies, pixels e analytics
- Scripts de analytics, pixels de anúncio e remarketing só carregam após consentimento (LGPD, arts. 7º e 8º; Guia de cookies da ANPD, orientativo; regra já inegociável no kit). 🔴

### R14 — WhatsApp, chatbot e IA
- Assistente automatizado deve se identificar como tal. Ele não recomenda cobertura, não informa aceitação nem preço final e não pede dado sensível. Encaminha para corretor habilitado. **Interpretação:** recomendar o seguro e assistir o segurado é atribuição do corretor (Lei 4.594/1964, art. 1º, parágrafo único), e a divulgação precisa ser clara e evitar má compreensão (Res. CNSP 382/2020, art. 3º, § 1º, V). 🟡
- Conversas com dados pessoais seguem o R12 e a retenção do SCHEMA.md.

### R15 — Ramos com regulação própria (conforme F6)
- **Planos de saúde e odontológicos:** regulados pela ANS, ver o bloco R21–R30. Esse é o núcleo do negócio da GWL.
- **Capitalização:** toda publicidade apresenta em destaque o nome da sociedade de capitalização (Circ. SUSEP 656/2022, art. 32, § 2º), sem usar o nome ou a imagem da SUSEP (art. 31, I). 🔴 se faltar.
- **Previdência aberta e seguro de pessoas:** pesquisar a norma específica antes de publicar página dedicada. 🟡

### R16 — Linguagem clara
- Explicar termos técnicos (franquia, carência, prêmio, sinistro, indenização, LMI) em linguagem simples. A apólice deve ter glossário (Lei 15.040/2024, art. 55, § 2º), e o site segue o mesmo espírito. Base: CDC, arts. 6º, III, e 31; Res. CNSP 382/2020, art. 3º, § 1º. 🟡
- Ao falar de produto, mencionar que há franquia, carência ou exclusões quando houver, sem esconder em nota. 🔴 se a página afirmar o contrário.
- Conteúdo educativo (FAQ, guias) é genérico e remete às condições gerais da seguradora. Nunca afirmar que um caso concreto "está coberto".

### R17 — Atendimento e reclamações
- Informar canais de atendimento com horário. Tratar reclamações de forma tempestiva e adequada (Res. CNSP 382/2020, art. 3º, § 1º, VIII). Havendo contratação online, oferecer atendimento eletrônico eficaz (Decreto 7.962/2013, art. 4º).
- Recomendado: na página de contato ou no FAQ, mencionar os canais externos (SUSEP e consumidor.gov.br) e, se houver filiação (F11), a entidade autorreguladora. 🟡

### R18 — Acessibilidade
- Site acessível conforme as boas práticas internacionais (Lei 13.146/2015, art. 63, vinculante): contraste AA, texto alternativo, navegação por teclado, formulário com rótulos e erros por campo. Já coberto em parte pelos checklists do kit. 🔴 para falhas que impeçam o uso do formulário.

### R19 — Equipe, prepostos e responsável técnico
- Só chamar de "corretor(a) de seguros" quem tem registro ativo. Prepostos atuam em nome e sob responsabilidade do corretor que os cadastrou, nunca por conta própria (Res. CNSP 493/2026, arts. 2º, II, 22 a 27). 🔴 se o site atribuir habilitação a quem não tem.
- Identificar o responsável técnico (F4) na página "Sobre" ou no rodapé (Res. CNSP 493/2026, art. 7º, III; Circ. SUSEP 510/2015, art. 9º). 🟡
- Fotos e nomes de funcionários só com autorização de uso de imagem.

### R20 — Atualização da linha de base
Reverificar a cada 90 dias e obrigatoriamente antes de publicar:
1. **Res. CNSP 493/2026**, em vigor a partir de 17/01/2027: texto integral e eventual circular ou resolução SUSEP que regulamente o código de registro, recadastramento e identificação.
2. **Circ. SUSEP 510/2015**: confirmar que continua vigente após a Res. CNSP 493/2026, ou qual norma a substituiu.
3. **Res. CNSP 382/2020**: alterações e desfecho da ação da Fenacor sobre a divulgação de remuneração.
4. **Lei 15.040/2024**: regulamentação pendente pelo CNSP e pela SUSEP.
5. **Normas ANS**, se saúde ou odonto estiverem no escopo (F6).
6. **LC 213/2025 e Res. CNSP 491/2026 (PPM)**, se PPM estiver no escopo (F9).

7. **ANS:** novas resoluções sobre planos coletivos, política de preços e reajuste (agenda regulatória 2026–2028), revisão das RNs 557 e 558/2022 e teto anual de reajuste dos planos individuais.

Se o Anexo C não tiver verificação nos últimos 90 dias, avisar que a linha de base pode estar desatualizada.

---

## Bloco ANS — Saúde suplementar (R21–R30)

### R21 — Quem é quem
- Planos de saúde e odontológicos e o seguro saúde são regulados pela ANS (Lei 9.656/1998; Lei 9.961/2000; Lei 10.185/2001, que enquadra as seguradoras especializadas em saúde). Os produtos são da **operadora**. A GWL não é operadora nem administradora de benefícios. 🔴 se o texto sugerir o contrário: "plano GWL", "nossa rede", "nós autorizamos o procedimento" (aplica o R2).
- "Seguro saúde" só para produto de seguradora especializada em saúde. Não usar "seguro" como sinônimo de plano de saúde de medicina de grupo, cooperativa ou autogestão. 🟡
- **Nome da empresa (interpretação):** "Corretora de Seguros" pressupõe registro na SUSEP (Lei 4.594/1964, arts. 1º e 2º). Se a GWL não tiver registro ativo (F3), usar o nome com essa expressão pode induzir a erro (CDC, art. 37, § 1º). 🟡 até confirmar o F3; 🔴 se não houver registro.

### R22 — Só produtos registrados e ativos
- Só divulgar produtos com registro ativo na ANS e comercialização não suspensa. O registro é condição para comercializar, e produto com irregularidade não pode ser comercializado (RN ANS 543/2022, arts. 11 e 18, § 3º, vinculante). 🔴
- Usar o **nome do produto como registrado na ANS**: o nome registrado deve corresponder ao usado na divulgação e publicidade (RN 543/2022, Anexo II, item 1.1). 🔴 se o site inventar nome comercial.
- Recomendado: junto do nome da operadora, informar o número de registro dela na ANS e o link para a consulta pública da ANS. Não confirmei a norma vigente que obriga isso na publicidade do corretor (Anexo E). 🟡

### R23 — Preços e tabelas
- O preço do plano depende de operadora, produto, faixa etária, tipo de contratação, região, acomodação, coparticipação e número de vidas, e as tabelas mudam. Publicar "tabela de valores" ou "a partir de R$ X" exige, no próprio anúncio: operadora, nome registrado do produto, faixa etária, tipo de contratação, abrangência, acomodação, coparticipação, data e validade. A oferta vincula (CDC, art. 30). 🔴 sem essas condições; 🟡 com elas.
- Recomendação: o site não publica tabelas. O preço sai na simulação individual com o corretor (aplica o R5).

### R24 — Carência, CPT e doenças preexistentes
- Prazos de carência só como **máximos legais**: 24 horas para urgência e emergência, 300 dias para parto a termo e 180 dias para os demais casos (Lei 9.656/1998, art. 12, V). A operadora pode oferecer prazos menores.
- "Carência zero" só com a condição que a garante. Exemplos: coletivo empresarial com 30 ou mais participantes e ingresso em até 30 dias (RN 557/2022, arts. 6º e 7º); coletivo por adesão com ingresso em até 30 dias da celebração (art. 17); campanha de redução da operadora, com nome e validade. 🔴 sem condição.
- CPT por doença preexistente dura no máximo 24 meses e só alcança cirurgias, leitos de alta tecnologia e procedimentos de alta complexidade ligados à doença declarada (RN 558/2022). Explicar sem minimizar.

### R25 — Declaração de saúde
- O site, o formulário e o chat **nunca** coletam declaração de saúde, doenças, sintomas, medicamentos, peso ou altura (reforça o R12). A declaração é sempre no formulário da operadora.
- Nenhum conteúdo pode orientar, sugerir ou insinuar omitir doença ou lesão preexistente. A omissão pode caracterizar fraude e levar à suspensão ou rescisão (RN 558/2022, art. 5º). 🔴
- Informar que o beneficiário tem direito de preencher a declaração com orientação de médico da rede da operadora, sem custo (RN 558/2022, art. 5º, § 1º). Se o corretor presenciar o preenchimento, ele se identifica, informa o CPF e assina a Carta de Orientação (art. 3º, § 1º, II). Isso vale para o processo de atendimento descrito no site (F17). 🟡

### R26 — Tipo de contratação e elegibilidade
- Explicar os três tipos com equilíbrio (RN 557/2022, art. 2º):
  - **Individual ou familiar:** reajuste anual com teto da ANS; rescisão unilateral pela operadora só por fraude ou inadimplência (Lei 9.656/1998, art. 13).
  - **Coletivo empresarial:** exige vínculo com a pessoa jurídica (arts. 5º a 8º).
  - **Coletivo por adesão:** exige vínculo com entidade profissional, classista ou setorial; a entidade precisa existir há pelo menos 1 ano, salvo conselhos e sindicatos (arts. 15 e 16).
  - Não apresentar o coletivo só pelo preço, escondendo as diferenças de reajuste e rescisão. 🔴 se omitir.
- **Empresário individual e MEI:** inscrição e regularidade cadastral por no mínimo 6 meses, comprovadas na contratação e anualmente (RN 557/2022, arts. 9º e 10). Empresários individuais não podem se reunir para contratar coletivo empresarial (art. 29). 🔴 para qualquer conteúdo que sugira abrir CNPJ ou MEI, ou se filiar a entidade sem vínculo real, só para conseguir plano mais barato (falso coletivo).

### R27 — Reajuste
- Proibido: "sem reajuste", "sem surpresas no reajuste", "reajuste garantido abaixo de X". Planos individuais têm teto anual definido pela ANS; coletivos seguem o contrato; reajuste por faixa etária segue a Lei 9.656/1998, art. 15, e as regras da ANS. 🔴
- Pode: explicar como funciona cada tipo de reajuste, com fonte e data quando citar percentuais.

### R28 — Cobertura e rede
- A cobertura segue a segmentação contratada (ambulatorial, hospitalar, obstetrícia, odontológica) e o Rol de Procedimentos da ANS. Proibido: "cobertura completa/total/ilimitada" e "cobre tudo". 🔴
- Hospitais, laboratórios e médicos variam por produto e mudam com o tempo. Citar só como "rede do produto X conforme a operadora em [data]", recomendando consultar a rede atualizada na operadora. 🔴 se prometer um hospital sem condição.
- Dados de operadoras (beneficiários, número de prestadores, prêmios, "líder de mercado") só com fonte oficial e data (R9).

### R29 — Documentos e cobranças no processo de venda
- A operadora deve entregar o Manual de Orientação para Contratação de Planos de Saúde (MPS) antes da assinatura da proposta e o Guia de Leitura Contratual (GLC) junto com a carteirinha (RN 557/2022, arts. 30 a 34). O fluxo de atendimento descrito no site não pode pular essas etapas. 🟡
- Não anunciar cobrança de "taxa de adesão", "taxa de corretagem" ou "taxa de cadastro" do consumidor. **Interpretação:** órgãos de defesa do consumidor consideram abusiva a cobrança sem serviço correspondente (CDC, art. 39). 🟡
- "Sem taxa" ou "atendimento gratuito" só se for verdade para toda a jornada.

### R30 — Canais ANS
- Recomendado no FAQ e no rodapé: informar que planos são regulados pela ANS, com link para o site da ANS (consulta de operadoras e produtos, guia do consumidor) e o canal de atendimento ao consumidor da ANS (Disque ANS). Não usar o logotipo da ANS como selo (aplica o R8). 🟡

---

## Anexo A — Quarta auditoria (antes de publicar)

Rodar junto com `checklists/producao.md`, `seguranca.md` e `seo-ia.md`. Para cada item: OK / falha / não se aplica, com página e trecho verificado.

| # | Item | Regra |
| --- | --- | --- |
| A1 | Expressão "Corretora de Seguros" ou "Corretagem de Seguros" visível no site | R1 |
| A2 | Rodapé com razão social, CNPJ, endereço, telefone e e-mail em todas as páginas | R1 |
| A3 | Código SUSEP da corretora e do responsável técnico com link para a consulta oficial (ou decisão no Anexo D) | R1, R19 |
| A4 | Nenhum texto apresenta a GWL como seguradora | R2 |
| A5 | Lista de seguradoras ou declaração de exclusividade publicada no site | R3 |
| A6 | Participações de 10% ou mais divulgadas, ou registrada a inexistência | R3 |
| A7 | Se houver contratação online: remuneração informada antes da proposta | R3 |
| A8 | Nenhuma promessa de aprovação, indenização, prazo de sinistro, menor preço ou cobertura total | R4 |
| A9 | Resultados de cotação e simulador marcados como estimativa sujeita à aceitação da seguradora | R5 |
| A10 | Botões de CTA não prometem contratação quando não há contratação | R5 |
| A11 | Nenhum produto de entidade não autorizada; PPM, se houver, identificada como não seguro | R6 |
| A12 | Logos de seguradoras com autorização arquivada | R7 |
| A13 | Nenhum logo da SUSEP ou do governo e nenhuma "certificação SUSEP" | R8 |
| A14 | Depoimentos com autorização arquivada; números com fonte e data | R9 |
| A15 | Produtos acessórios informados como não obrigatórios | R11 |
| A16 | Formulários sem dados de saúde, documentos ou dados de terceiros | R12 |
| A17 | Nenhum script de rastreamento antes do consentimento | R13 |
| A18 | Chatbot ou WhatsApp automatizado se identifica e não recomenda cobertura | R14 |
| A19 | Páginas de saúde, odonto, capitalização ou previdência conferidas contra a norma específica | R15 |
| A20 | Termos técnicos explicados; franquia, carência e exclusões mencionadas onde há produto | R16 |
| A21 | Canais de atendimento e de reclamação informados | R17 |
| A22 | Equipe apresentada como corretor só se habilitada; autorizações de imagem arquivadas | R19 |
| A23 | Linha de base reverificada há menos de 90 dias (Anexo C) | R20 |
| A24 | Textos aprovados pelo responsável técnico da corretora | Geral |
| A25 | Nenhum texto apresenta a GWL como operadora ou administradora ("plano GWL", "nossa rede") | R21 |
| A26 | Uso de "Corretora de Seguros" compatível com o registro SUSEP (F3) | R21 |
| A27 | Produtos citados com registro ativo na ANS e nome igual ao registrado | R22 |
| A28 | Nenhuma tabela ou preço sem operadora, produto, faixa etária, tipo, abrangência, acomodação, coparticipação, data e validade | R23 |
| A29 | Carências só como máximos legais; "carência zero" sempre com a condição | R24 |
| A30 | Nenhum conteúdo sobre omitir doença preexistente; declaração de saúde fora do site | R25 |
| A31 | Tipos de contratação explicados com reajuste e rescisão; nada que incentive falso coletivo ou MEI de fachada | R26 |
| A32 | Nenhuma promessa sobre reajuste | R27 |
| A33 | Nenhuma "cobertura completa"; hospitais citados com condição e data | R28 |
| A34 | Fluxo de atendimento prevê MPS antes da proposta; nenhuma taxa cobrada do consumidor sem base | R29 |
| A35 | Link para a ANS e canal ao consumidor no FAQ ou rodapé; sem logo da ANS como selo | R30 |

### A2 — Léxico

| Evitar | Por quê | Usar |
| --- | --- | --- |
| "Nós cobrimos / indenizamos / pagamos o sinistro" | Corretor não é seguradora (R2) | "A seguradora indeniza; nós acompanhamos o processo" |
| "Seguro GWL", "nossa apólice" | Sugere emissão própria (R2) | "Seguros das principais seguradoras do mercado" |
| "Aprovação garantida", "sem análise" | Promessa que a corretora não controla (R4) | "Enviamos sua proposta e acompanhamos a análise" |
| "Indenização garantida", "sinistro pago em 24h" | Promessa de resultado (R4) | "Orientamos você em cada etapa do sinistro" |
| "Cobertura total / completa / sem limites" | Toda apólice tem limites e exclusões (R4) | "Cobertura ampla, conforme as condições gerais" |
| "Menor preço garantido", "o mais barato" | Enganoso e não comprovável (R4) | "Comparamos opções para encontrar o melhor custo-benefício" |
| "Contrate agora" (sem contratação online) | Confunde cotação com contratação (R5) | "Solicite sua cotação" |
| "Certificado / aprovado pela SUSEP" | Chancela inexistente (R8) | "Registrada na SUSEP sob o nº …" |
| "Proteção veicular" como sinônimo de seguro | Não é seguro (R6) | "Seguro auto" (ou PPM identificada como tal) |
| "Parceiro exclusivo da Seguradora X" (sem contrato) | Falso (R7) | Lista neutra de seguradoras com que trabalhamos |
| "Plano GWL", "nossa rede credenciada" | A GWL não é operadora (R21) | "Planos das operadoras com que trabalhamos" |
| "Carência zero" (sem condição) | Depende de vidas, prazo ou campanha (R24) | "Sem carência para empresas com 30 vidas ou mais que entrarem em até 30 dias" |
| "Sem surpresas no reajuste", "sem reajuste" | Promessa sobre reajuste (R27) | "Explicamos como funciona o reajuste de cada tipo de plano" |
| "Cobertura completa", "cobre tudo" | Cobertura segue segmentação e Rol ANS (R28) | "Cobertura conforme a segmentação contratada e o Rol da ANS" |
| "Atendimento no Hospital X garantido" | Rede varia por produto e muda (R28) | "Produto com o Hospital X na rede em [data]; confira a rede atualizada" |
| "Abra um MEI e pague menos" | Incentiva falso coletivo (R26) | "Tem CNPJ ativo há 6 meses ou mais? Veja se o plano empresarial faz sentido" |
| "Economize até 40%" (sem fonte) | Número sem prova (R4, R9) | Comparação real, com produtos, data e fonte |
| "Não precisa declarar doença" | Induz omissão de DLP (R25) | "Declare tudo na declaração de saúde; você pode ter orientação médica gratuita" |
| "Tabela de valores" (sem condições) | Oferta vinculante incompleta (R23) | "Peça uma simulação para o seu perfil" |

---

## Anexo B — Linha de base regulatória

| Norma | Dispositivos usados | Natureza | Situação | Fonte | Conferido em |
| --- | --- | --- | --- | --- | --- |
| Decreto-Lei 73/1966 (com redação da LC 213/2025) | arts. 88-D, 88-H, 113, 122, 125 | Vinculante | Vigente | [LC 213/2025 – Lex](https://www.lex.com.br/lei-complementar-no-213-de-15-de-janeiro-de-2025/) | 27/10/2026 |
| Lei 4.594/1964 | arts. 1º, 2º, 3º, 13, 20, 21 (art. 17 revogado pela LC 213/2025) | Vinculante | Vigente | [Câmara – texto atualizado](https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4594-29-dezembro-1964-377667-normaatualizada-pl.pdf) | 27/10/2026 |
| LC 213/2025 | art. 3º (altera DL 73), art. 9º (regularização de associações), art. 12, I | Vinculante | Vigente | [Senado](https://legis.senado.leg.br/norma/40167942/publicacao/40170324) | 27/10/2026 |
| Lei 15.040/2024 (contrato de seguro) | arts. 9º § 1º, 37, 39, 40, 48, 55, 57, 59, 134 | Vinculante | Vigente desde dez/2025; regulamentação pendente | [Câmara – publicação original](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html) | 27/10/2026 |
| Res. CNSP 493/2026 (corretores) | arts. 1º, 2º, 5º, 7º, 21–27, 69, 70 | Vinculante | Publicada em 21/07/2026; **vigência em 17/01/2027** | [SUSEP – notícia](https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2026/julho-1/resolucao-do-cnsp-dispoe-sobre-atuacao-de-corretores-de-seguros-e-entidades-autorreguladoras); [LegisWeb – texto](https://www.legisweb.com.br/legislacao/?id=498563) | 27/10/2026 |
| Res. CNSP 382/2020 (conduta) | arts. 2º, 3º, 4º, 5º | Vinculante | Vigente; art. 4º, § 1º, IV, foi questionado judicialmente pela Fenacor (liminar cassada em 2020) | [Legismap](https://legismap.com.br/leis-e-normas/resolucao-cnsp-n-382-de-04-03-2020); [Sonho Seguro](https://www.sonhoseguro.com.br/2020/07/susep-derruba-liminar-da-fenacor-na-resolucao-382-20/) | 27/10/2026 |
| Circ. SUSEP 510/2015 (registro de corretores) | arts. 4º, 9º, 21 | Vinculante | Vigente segundo o Legismap; **reconfirmar** após a Res. CNSP 493 | [Legismap](https://legismap.com.br/leis-e-normas/circular-susep-n-510-de-22-01-2015) | 27/10/2026 |
| Circ. SUSEP 656/2022 (capitalização) | arts. 31, I; 32, § 2º | Vinculante | Vigente (alterada pela Circ. 676/2022) | [LegisWeb](https://www.legisweb.com.br/legislacao/?id=428900) | 27/10/2026 |
| CDC (Lei 8.078/1990) | arts. 6º, III; 30; 31; 37; 39, I | Vinculante | Vigente | Planalto | Texto consolidado; reconferir |
| Decreto 7.962/2013 (comércio eletrônico) | arts. 2º, 4º | Vinculante | Vigente | Planalto | Texto consolidado; reconferir |
| LGPD (Lei 13.709/2018) | arts. 5º, II; 6º; 7º; 8º; 11 | Vinculante | Vigente | Planalto | Texto consolidado; reconferir |
| Guia orientativo de cookies (ANPD) | — | Orientativa | Vigente | gov.br/anpd | Reconferir |
| Lei 13.146/2015 (LBI) | art. 63 | Vinculante | Vigente | Planalto | Texto consolidado; reconferir |
| Lei 9.279/1996 (propriedade industrial) | marcas | Vinculante | Vigente | Planalto | Texto consolidado; reconferir |
| Código CONAR | art. 32 (publicidade comparativa) e Anexo Q (testemunhais) | Orientativa (autorregulação) | Vigente | conar.org.br | Reconferir |
| Lei 9.656/1998 (planos de saúde) | arts. 1º, 10, 11, 12, V, 13, 15 | Vinculante | Vigente | Planalto | Texto consolidado; reconferir (E11) |
| Lei 9.961/2000 (cria a ANS) e Lei 10.185/2001 (seguradoras especializadas em saúde) | — | Vinculante | Vigentes | Planalto | Texto consolidado; reconferir |
| RN ANS 557/2022 (tipos de contratação) | arts. 2º, 5º–10, 15–17, 20, 27, 29, 30–34 | Vinculante | Em vigor desde 01/02/2023; alterada pelas RNs 570 e 573/2023 e 617/2024 | [Legismap](https://legismap.com.br/leis-e-normas/resolucao-normativa-ans-n-557-de-14-12-2022) | 27/10/2026 |
| RN ANS 558/2022 (doenças preexistentes) | arts. 2º, 3º, 5º, 10, 11, 15–17 | Vinculante | Em vigor desde 01/02/2023 | [Legismap](https://legismap.com.br/leis-e-normas/resolucao-normativa-ans-n-558-de-14-12-2022) | 27/10/2026 |
| RN ANS 543/2022 (autorização e registro de produtos) | arts. 11, 18, 19; Anexo II, 1.1 | Vinculante | Em vigor desde 01/10/2022 | [Legismap](https://legismap.com.br/leis-e-normas/resolucao-normativa-ans-n-543-de-02-09-2022) | 27/10/2026 |

---

## Anexo C — Changelog

| Versão | Data | Mudança |
| --- | --- | --- |
| 1.0 | 27/10/2026 | Criação: regras R1–R20, quarta auditoria, léxico, linha de base e integração com o kit. |
| 1.1 | 27/10/2026 | Anexo F: roteiro e BRIEF.md do kit passam a ter o bloco regulatório (R-1 a R-12) que coleta F1–F14. Regras inalteradas. |
| 2.0 | 27/10/2026 | O diagnóstico mostrou que a GWL vende só planos de saúde e odonto. Incluídos o bloco ANS (R21–R30), os fatos F15–F17, os itens A25–A35, o léxico de saúde, a linha de base ANS e as pendências E7–E11. O R15 passa a remeter ao bloco. |
| 2.0.1 | 27/10/2026 | Fatos F1, F2 e F5 preenchidos com o cadastro público (cnpja.com), pendentes de confirmação do cliente. Regras inalteradas. |

---

## Anexo D — Registro de decisões (🟡)

| Data | Pedido | Risco | Norma | Decisão | Justificativa | Quem decidiu |
| --- | --- | --- | --- | --- | --- | --- |
| 27/10/2026 | Construir uma versão de demonstração do site **antes** da reunião de briefing, com brief provisório (v0) | Exibir como fato dados não confirmados (CNPJ, endereço, SUSEP, operadoras, provas); demonstração indexada ou confundida com o site oficial | R1, R3, R7, R9, R19, R21 | Aprovado, com condições: (1) dados não confirmados aparecem visivelmente como "a confirmar"; (2) sem logos de operadoras nem depoimentos ou fotos de pessoas reais; (3) demonstração em endereço provisório, com `noindex`, fora do domínio do cliente; (4) textos marcados como rascunho; (5) quarta auditoria completa antes de qualquer publicação real | Estratégia comercial: mostrar valor antes do briefing; os riscos ficam contidos se a demo não for pública nem tratada como oficial | João (responsável) |
| 27/10/2026 | Construir com arquitetura de **versão final** (formulário real com banco, e-mail de aviso, antispam, retenção LGPD), sem modo simulado | Leads reais gravados antes do aceite do cliente; dados pessoais sem controlador definido | R12, R13, LGPD | Aprovado. Condições anteriores mantidas, agora como **configuração** (`SITE_STAGE=preview` liga a faixa, os "a confirmar" e o `noindex`; `production` desliga). Banco e contas de produção criados **em nome do cliente** antes de receber qualquer lead real. Até lá, o formulário em preview só aceita envios de teste da equipe. | O código é o mesmo da entrega final; o que muda é só a configuração de publicação | João (responsável) |

---

## Anexo E — Pendências

| # | Pendência | Bloqueia |
| --- | --- | --- |
| E1 | Preencher os fatos F1–F14 com o cliente (incluir no roteiro de briefing) | BRIEF.md |
| E2 | Confirmar se a Circ. SUSEP 510/2015 segue vigente e se a SUSEP publicou norma complementar à Res. CNSP 493/2026 | Publicação |
| E3 | Confirmar o desfecho judicial da ação da Fenacor sobre o art. 4º, § 1º, IV, da Res. CNSP 382/2020 | Só se houver contratação online |
| E4 | ~~Pesquisar normas ANS~~ Feito na v2.0 (bloco R21–R30) | — |
| E5 | Ler o texto integral da Res. CNSP 493/2026 no DOU (a linha de base usa LegisWeb e resumos) | Publicação |
| E6 | Obter autorizações de marca das seguradoras e operadoras (F12) e de imagem da equipe e dos depoentes | Uso de logos, fotos e depoimentos |
| E7 | Confirmar se há norma ANS vigente que obrigue o corretor a exibir o registro ANS da operadora na publicidade (a RN 16/2002, para operadoras, não foi confirmada como vigente) | R22 vira 🔴 ou fica 🟡 |
| E8 | Acompanhar a agenda da ANS 2026: política de preços e reajuste de coletivos e eventuais mudanças nas RNs 557 e 558 | Publicação |
| E9 | Confirmar se a GWL tem registro ativo na SUSEP (F3). Sem ele, rever o uso de "Corretora de Seguros" no nome e no site | R1, R21 |
| E10 | Entender a relação com a Serra Corretora e com administradoras de benefícios (F15) | R3 |
| E11 | Reconferir no texto oficial os artigos da Lei 9.656/1998 citados (12, V; 13; 15) | Publicação |

---

## Anexo F — Integração com o kit `construir-site`

| Documento ou etapa do kit | Ajuste do harness |
| --- | --- |
| `CONCORRENTES.md` (saúde) | Concorrentes comparáveis: corretoras de planos de saúde e odonto em São Paulo, com foco na zona norte. Acrescentar à matriz: preços sem condições, "carência zero" sem condição, promessas de reajuste, incentivo a MEI de fachada e explicação equilibrada dos tipos de contratação (R23–R27). |
| `CONCORRENTES.md` (geral) | Acrescentar à matriz: expressão "Corretora de Seguros" no site; código SUSEP visível; lista de seguradoras (Res. 382); promessas proibidas (R4). Lacunas regulatórias dos concorrentes podem virar diferencial ("corretora transparente"). |
| `ROTEIRO_BRIEFING.md` | Bloco "Regulatório — corretora de seguros" (perguntas R-1 a R-12) cobre F3–F13; F1, F2 e F14 vêm das Complementares. Conferência rápida exige código SUSEP, responsável técnico, ramos, seguradoras e modo de contratação. |
| `BRIEF.md` | Em **Entidade**, incluir código SUSEP, responsável técnico e lista de seguradoras. Em **Restrições › Legais**, referenciar este harness. Provas e números com fonte (R9). |
| `APP_FLOW.md` | Fluxo de cotação com aviso de estimativa (R5); se houver contratação online, passo de informação da remuneração antes da proposta (R3); chat encaminha para corretor (R14). |
| `DESIGN.md` | Sem logo da SUSEP; logos de seguradoras só com autorização, em faixa neutra; rodapé de identificação previsto no layout (R1). |
| `SCHEMA.md` | Tabela `leads` sem dados sensíveis nem de terceiros (R12); retenção definida; campo `ramo_interesse` como lista fechada. |
| `IMPLEMENTATION_PLAN.md` | Em cada etapa com texto: rodar o harness antes de pedir aprovação. Na etapa de publicação: quarta auditoria (Anexo A) e reverificação R20. |
| JSON-LD (`schema-org.json.example`) | Tipo `InsuranceAgency`, com `legalName`, `taxID` (CNPJ) e `identifier` (código SUSEP), coerentes com o rodapé. |
| `llms.txt` e FAQ (AEO/GEO) | Mesmas regras de R2, R4 e R16: respostas genéricas que remetem às condições gerais, sem afirmar cobertura de caso concreto. Temas de saúde (carência, CPT, coparticipação, reembolso, reajuste, tipos de contratação, Rol ANS, portabilidade) seguem R24–R28. O conteúdo educativo antigo do Instagram pode ser base, depois de revisado. |
| `ROTEIRO_BRIEFING.md` (saúde) | Acrescentar F15–F17: operadoras, administradoras e Serra; tipos de contratação vendidos; participação na declaração de saúde. |
| Entregas de texto | Todo texto gerado por IA sai marcado **RASCUNHO**, pendente de revisão do responsável técnico. |
