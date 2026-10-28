"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { isPreview } from "@/config/site";

/**
 * Fundo do topo (DESIGN.md v2 › Movimento 1).
 * - Com `video`: imagem fixa (poster) servida no HTML do servidor e, por cima, o vídeo em laço sem som.
 *   O vídeo só é montado no navegador se a pessoa não pediu movimento reduzido e não está em economia de dados;
 *   aparece com troca de opacidade quando começa a tocar e pausa sozinho fora da tela.
 * - Sem `video`: cenas que se alternam a cada 7s (opacidade em 1,2s e leve aproximação), só transform e opacity.
 * Botão de pausar ao lado do botão principal (WCAG 2.2.2), via `BotaoPausaTopo`.
 * O gradiente Noite (0 → 92%) de baixo para cima garante o contraste do título sobre qualquer imagem.
 */
type Cena = { id: string; src?: string; alt: string; descricao: string };
export type VideoTopo = {
  id: string;
  /** 16:9, telas deitadas. */
  desktop: string;
  posterDesktop: string;
  /** Recorte vertical 4:5, telas em pé. */
  celular: string;
  posterCelular: string;
};

const Contexto = createContext<{ pausado: boolean; alternar: () => void; ativo: boolean; tipo: "video" | "cenas" } | null>(
  null,
);

const tons = ["#2a3b2e", "#3a4436", "#24332a"];
// Telas em pé (celular e tablet na vertical) recebem o recorte 4:5; deitadas, o 16:9.
const CELULAR = "(orientation: portrait)";

export function TopoCenas({ cenas, video, children }: { cenas: readonly Cena[]; video?: VideoTopo; children: ReactNode }) {
  const [pausado, setPausado] = useState(false);
  const [videoPermitido, setVideoPermitido] = useState(false);
  const varias = cenas.length > 1;
  const tipo = video ? "video" : "cenas";
  const ativo = video ? videoPermitido : varias;

  useEffect(() => {
    if (!video) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const avaliar = () => setVideoPermitido(!reduzido.matches && !economia);
    avaliar();
    reduzido.addEventListener("change", avaliar);
    return () => reduzido.removeEventListener("change", avaliar);
  }, [video]);

  return (
    <Contexto.Provider value={{ pausado, alternar: () => setPausado((p) => !p), ativo, tipo }}>
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {video ? (
          <FundoVideo video={video} tocar={videoPermitido} pausado={pausado} />
        ) : (
          <FundoCenas cenas={cenas} pausado={pausado} varias={varias} />
        )}
        {/* Em pé, o texto cobre as pessoas do vídeo: véu Noite extra para manter o contraste (WCAG 1.4.3). */}
        {video && <div className="absolute inset-0 hidden bg-noite/50 portrait:block" />}
        {/* Deitada, as pessoas ficam à direita: véu lateral só sob o título, à esquerda. */}
        {video && <div className="absolute inset-y-0 left-0 hidden w-[70%] bg-linear-to-r from-noite/60 via-noite/35 to-noite/0 landscape:block" />}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-b from-noite/0 to-noite/92" />
      </div>
      {children}
    </Contexto.Provider>
  );
}

function FundoVideo({ video, tocar, pausado }: { video: VideoTopo; tocar: boolean; pausado: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [naTela, setNaTela] = useState(true);

  // Fora da tela, o vídeo para (economia de bateria e de dados).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [tocar]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (pausado || !naTela) el.pause();
    else el.play().catch(() => {});
  }, [pausado, naTela, tocar]);

  return (
    <>
      <picture>
        <source media={CELULAR} srcSet={video.posterCelular} type="image/webp" />
        <img src={video.posterDesktop} alt="" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      </picture>
      {tocar && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVisivel(true)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: visivel ? 1 : 0 }}
        >
          <source media={CELULAR} src={video.celular} type="video/mp4" />
          <source src={video.desktop} type="video/mp4" />
        </video>
      )}
    </>
  );
}

function FundoCenas({ cenas, pausado, varias }: { cenas: readonly Cena[]; pausado: boolean; varias: boolean }) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!varias || pausado) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!reduzido.matches && document.visibilityState === "visible") setAtual((a) => (a + 1) % cenas.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [varias, pausado, cenas.length]);

  return cenas.map((c, i) => (
    <div
      key={c.id}
      className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
      style={{ opacity: i === atual ? 1 : 0 }}
    >
      <div
        className="absolute inset-0 transition-transform duration-[8000ms] ease-out motion-reduce:transition-none"
        style={{ transform: i === atual && !pausado ? "scale(1.06)" : "scale(1)", background: tons[i % tons.length] }}
      >
        {c.src && (
          // eslint-disable-next-line @next/next/no-img-element -- export estático
          <img src={c.src} alt="" className="size-full object-cover" fetchPriority={i === 0 ? "high" : "low"} />
        )}
      </div>
      {!c.src && isPreview && (
        <p className="absolute top-32 right-10 m-0 hidden max-w-72 text-right text-legenda text-nevoa/75 lg:block">
          {c.descricao}
        </p>
      )}
    </div>
  ));
}

export function BotaoPausaTopo() {
  const ctx = useContext(Contexto);
  if (!ctx || !ctx.ativo) return null;
  const alvo = ctx.tipo === "video" ? "o vídeo do topo" : "a troca de imagens do topo";
  return (
    <button
      type="button"
      onClick={ctx.alternar}
      aria-pressed={ctx.pausado}
      aria-label={ctx.pausado ? `Retomar ${alvo}` : `Pausar ${alvo}`}
      className="grid size-15 shrink-0 place-items-center rounded-full border border-nevoa/35 text-nevoa transition-colors duration-200 hover:border-nevoa"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path d={ctx.pausado ? "M3 1.5v11l9-5.5z" : "M3 2h3v10H3zM8 2h3v10H8z"} fill="currentColor" />
      </svg>
    </button>
  );
}
