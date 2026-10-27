# IMAGENS.md — inventário e prompts

> Versão 1 · 27/10/2026 · base: `DESIGN.md` v2 › Imagens e vídeo; harness, Anexo D (decisão de 27/10/2026 sobre a origem das imagens).
> Cada imagem gerada entra em `LICENCAS.md` com o ID abaixo, a ferramenta, a data e a conferência dos termos de uso comercial.

## Regras para todas as imagens geradas por IA
- **Só ambiente e situação.** Nunca apresentar como cliente, equipe da GWL, depoimento, hospital ou lugar identificável (CDC, art. 37; Anexo D).
- **Sem marcas:** nada de logos, uniformes, fachadas, placas, crachás ou textos legíveis.
- **Sem drama médico:** nada de estetoscópio, jaleco posando, maca, ambulância, UTI, soro, sangue.
- **Pessoas brasileiras reais e diversas**, de idades e tons de pele variados, roupas comuns de São Paulo; nada de modelo de catálogo.
- **Revisar cada resultado:** mãos e dedos, rostos, objetos deformados, texto inventado em segundo plano. Descartar se houver qualquer um.
- **Entrega:** o maior tamanho que a ferramenta permitir, em PNG ou JPG de alta qualidade. O site converte para AVIF/WebP no build.

## Estilo comum (colar no fim de todo prompt)

```
Editorial documentary photography, shot on 35mm, natural soft morning light, warm and slightly desaturated color grade, muted greens and warm neutrals, gentle film grain, shallow depth of field, eye-level framing, candid unposed moment, realistic Brazilian people in São Paulo, calm and reassuring mood, no text, no logos, no signage, no uniforms, no medical equipment.
```

**Negativo (se a ferramenta aceitar):**

```
stock photo look, posed smile at camera, stethoscope, white coat, hospital bed, ambulance, syringe, blood, logo, brand, text, watermark, signage, uniform, oversaturated, HDR, plastic skin, extra fingers, distorted hands, cartoon, 3d render, illustration
```

## Inventário

| ID | Onde | Origem | Proporção e tamanho mínimo | Situação |
| --- | --- | --- | --- | --- |
| IMG-01 | Topo (cena 1) | IA | 16:9 (2560×1440) e recorte 4:5 (1440×1800) | Pendente |
| IMG-02 | Topo (cena 2) | IA | 16:9 (2560×1440) e recorte 4:5 | Pendente |
| IMG-03 | Topo (cena 3) | **Cliente** (equipe da GWL atendendo) | 16:9 e 4:5 | Pedir ao cliente |
| IMG-04 | Tipos de plano · Individual ou familiar | IA | 7:4 (1680×960) | Pendente |
| IMG-05 | Tipos de plano · Coletivo por adesão | IA | 7:4 | Pendente |
| IMG-06 | Tipos de plano · Empresarial | IA | 7:4 | Pendente |
| IMG-07 | Tipos de plano · MEI e autônomo | IA | 7:4 | Pendente |
| IMG-08 | Tipos de plano · Odontológico | IA | 7:4 | Pendente |
| IMG-09 | Páginas de perfil · 60+ | IA | 3:2 (2400×1600) | Pendente (etapa 4) |
| IMG-10 | Páginas de perfil · Família | IA | 3:2 | Pendente (etapa 4) |
| IMG-11 | Sobre · equipe e escritório | **Cliente** | 3:2 | Pedir ao cliente |
| IMG-12 | Depoimentos com foto | **Cliente** (com autorização de imagem) | 4:5 (1200×1500) | Pedir ao cliente |
| LOGO-xx | Esteira de operadoras | Site oficial de cada operadora | SVG de preferência; PNG transparente ≥ 400px de largura | Depende da lista (F15) |
| VID-01 | Topo (vídeo) | IA (vídeo) ou cliente | 16:9, 15–20s, sem som | Opcional: sem vídeo, as cenas IMG-01 a 03 se alternam |

## Prompts

### IMG-01 — Topo, cena 1: o alívio depois da consulta
**Ideia:** um casal de mais de 60 anos saindo de uma clínica, tranquilo, de mãos dadas. O "ainda bem que eu tenho plano" sem dizer nada.
```
A Brazilian couple in their late sixties walking out of a modern, bright clinic building onto a tree-lined sidewalk in the morning, holding hands, relaxed expressions, the woman lightly smiling and looking at her husband, he carries a light jacket over his arm, seen from slightly in front at a distance, wide composition with generous empty space on the left half and lower third for text, background softly blurred with green trees and warm sunlight filtering through leaves.
```
+ estilo comum. Pedir também uma versão vertical 4:5 com o casal centralizado.

### IMG-02 — Topo, cena 2: família em casa
**Ideia:** cuidado no dia a dia, sem doença em cena.
```
A Brazilian family at home in a warm, simple apartment in late afternoon light: a mother in her early forties sitting on the sofa reading to her young daughter, the father in the background bringing two cups of coffee, plants by the window, lived-in and tidy, wide composition with empty space on the left half and lower third for text.
```
+ estilo comum.

### IMG-04 — Individual ou familiar
```
A woman in her fifties and her elderly mother sitting at a kitchen table looking at papers together, calm conversation, the mother's hand resting on the daughter's arm, warm window light, close-medium shot, papers blurred and unreadable.
```
+ estilo comum.

### IMG-05 — Coletivo por adesão
```
A Brazilian professional in her thirties, an architect or engineer, standing at a large work table with drawings and a laptop in a small bright studio, looking down concentrated, casual smart clothes, medium shot, screen and drawings unreadable.
```
+ estilo comum.

### IMG-06 — Empresarial
```
A small team of four people of different ages in a modest, well-lit office in São Paulo, having an informal meeting around a wooden table with coffee cups, one person laughing, plants and shelves in the background, medium-wide shot, no screens with readable content.
```
+ estilo comum.

### IMG-07 — MEI e autônomo
```
A Brazilian man in his forties running a small neighborhood bakery or coffee counter, arranging bread on the counter early in the morning, apron without any logo, warm light, the street softly visible through the door, medium shot.
```
+ estilo comum.

### IMG-08 — Odontológico
```
A grandmother and her grandson brushing their teeth side by side in front of a bathroom mirror at home, laughing, morning light, close-medium shot, reflection softly visible, no product brands.
```
+ estilo comum.

### IMG-09 — Página 60+ (etapa 4)
```
An elderly Brazilian man in his seventies taking a slow morning walk in a neighborhood park with his adult daughter, both in casual clothes, trees and paths, relaxed conversation, wide shot with space for text on one side.
```
+ estilo comum.

### IMG-10 — Página Família (etapa 4)
```
A young Brazilian father holding his toddler on his shoulders at a weekend street fair in a residential neighborhood, both smiling, colorful but softly blurred background, no readable signs, medium shot.
```
+ estilo comum.

### VID-01 — Vídeo do topo (opcional, ferramenta de vídeo)
```
Slow, steady cinematic shot, 16:9, 15 seconds, no cuts: a Brazilian couple in their late sixties walks out of a bright modern clinic onto a tree-lined sidewalk in soft morning light, holding hands, calm and relieved; gentle camera dolly backwards; leaves moving lightly in the breeze; warm, slightly desaturated documentary color grade; no text, no logos, no signage; loopable ending.
```

## O que pedir ao cliente
- Fotos da equipe atendendo no escritório (IMG-03, IMG-11), com autorização de imagem de quem aparece.
- Foto da fachada ou do interior do escritório, se quiser mostrar o atendimento presencial.
- Fotos de clientes para depoimentos (IMG-12), só com autorização escrita.
- Logotipo original da GWL em vetor (SVG, PDF ou AI).
