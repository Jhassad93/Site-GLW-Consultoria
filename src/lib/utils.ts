import { createCn } from "cn/config";

/**
 * `cn` com a escala do DESIGN.md v2 registrada como tamanho de fonte.
 * Sem isso, `text-corpo` seria tratado como cor e apagaria `text-noite` ao lado.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "legenda", "nota", "corpo", "sub", "h3", "h2", "h2-cel", "manifesto", "manifesto-cel",
            "h1", "h1-cel", "final", "final-cel",
          ],
        },
      ],
      tracking: [{ tracking: ["titulo", "marca"] }],
    },
  },
});
