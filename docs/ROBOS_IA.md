# Robôs de IA — tabela aprovada

> Consulta em fontes oficiais das empresas em 27/10/2026 (prompt "Verificar robôs de IA", `docs/PROMPTS.md`). Aprovada por João em 27/10/2026.
> **Política:** liberar todos os robôs (busca, visita a pedido do usuário e treino). Na prévia, tudo bloqueado até a publicação oficial.
> Reverificar antes de cada mudança no `robots.txt` (os nomes mudam: ex. Google-NotebookLM virou Google-GeminiNotebook em 2026).

| Robô | Empresa | Função | Respeita robots.txt | Fonte oficial |
| --- | --- | --- | --- | --- |
| GPTBot | OpenAI | Treino | Sim | https://developers.openai.com/api/docs/bots |
| OAI-SearchBot | OpenAI | Busca do ChatGPT | Sim | idem |
| ChatGPT-User | OpenAI | Visita a pedido do usuário | Nem sempre | idem |
| OAI-AdsBot | OpenAI | Verificação de páginas de anúncios no ChatGPT | Não informado | idem |
| ClaudeBot | Anthropic | Treino | Sim | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler |
| Claude-SearchBot | Anthropic | Busca | Sim | idem |
| Claude-User | Anthropic | Visita a pedido do usuário | Sim | idem |
| Googlebot | Google | Busca do Google | Sim | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers |
| Google-Extended | Google | Marcação de controle de uso no Gemini e Vertex AI (não afeta a busca) | Não se aplica | idem |
| Google-CloudVertexBot | Google | Coleta pedida pelo dono do site para agentes na Vertex AI | Sim | idem |
| Google-Agent | Google | Agentes que navegam a pedido do usuário | Em geral não | https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers |
| Google-GeminiNotebook | Google | Páginas adicionadas como fonte no Gemini Notebook (substitui Google-NotebookLM) | Em geral não | idem |
| PerplexityBot | Perplexity | Busca (não usado para treino, segundo a página) | Controle pelo robots.txt | https://docs.perplexity.ai/guides/bots |
| Perplexity-User | Perplexity | Visita a pedido do usuário | Em geral não | idem |
| bingbot | Microsoft | Busca do Bing (base do Copilot); uso em IA controlado por meta `noarchive`/`nocache`, não pelo robots.txt | Sim | https://blogs.bing.com/webmaster/September-2010/Bingbot-is-coming-to-town · https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat |
| Applebot | Apple | Busca (Spotlight, Siri, Safari); dados podem treinar modelos | Sim | https://support.apple.com/en-us/119829 |
| Applebot-Extended | Apple | Marcação de controle: exclui do treino | Não se aplica | idem |
| meta-externalagent | Meta | Treino e indexação para produtos | Não informado | https://developers.facebook.com/docs/sharing/webmasters/web-crawlers |
| meta-webindexer | Meta | Busca do Meta AI | Não informado | idem |
| meta-externalfetcher | Meta | Visita a pedido do usuário | Pode ignorar | idem |
| meta-externalads | Meta | Publicidade | Não informado | idem |
| FacebookExternalHit | Meta | Prévia de links compartilhados | Em geral sim | idem |

**Não confirmado:** a central de ajuda do Bing Webmaster (lista de robôs da Microsoft) não abriu sem JavaScript; não há confirmação oficial de outro robô da Microsoft para o Copilot.

**Depois do deploy (etapa 11):** desligar o bloqueio de robôs de IA e o robots.txt gerenciado da Cloudflare (senão a Cloudflare bloqueia o que liberamos) e rodar o teste do `checklists/seo-ia.md` (resposta 200 para cada robô).
