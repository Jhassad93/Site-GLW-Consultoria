import { createCn } from "cn/config";

/**
 * `cn` com as escalas do DESIGN.md registradas como tamanho de fonte e raio.
 * Sem isso, `text-corpo` era tratado como cor e apagava `text-tinta` ao lado (visto nos prints da etapa 2).
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["legenda", "corpo", "sub", "h3", "h2", "h1", "h1-home"] }],
      rounded: [{ rounded: ["folha"] }],
    },
  },
});
