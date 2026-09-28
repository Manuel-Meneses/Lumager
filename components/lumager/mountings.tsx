"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react";
import praderaImg from "@/public/lumager/parque-pradera.jpg";
import techoImg from "@/public/lumager/videos/zCdorWfTCTc-poster.jpg";
import carportImg from "@/public/lumager/carport-solar.jpg";
import bombeoImg from "@/public/lumager/bombeo-solar.jpg";
import { prefillContact } from "@/lib/lumager";
import { mountings, watchUrl, type MountingId } from "@/lib/lumager-videos";
import { useReveal } from "./use-reveal";

/* Una foto de obra por tipo. El pie dice solo lo que la foto muestra. La de techo es un
   fotograma del video de Agro Fer (ver lib/lumager-videos.ts). */
const photos: Record<MountingId, { img: StaticImageData; alt: string; caption: string; pos?: string }> = {
  suelo: {
    img: praderaImg,
    alt: "Filas de paneles solares de Lumager sobre césped, con una cortina de álamos al fondo",
    caption: "Parque sobre césped, frente a una cortina de álamos",
    pos: "object-[50%_60%]",
  },
  techo: {
    img: techoImg,
    alt: "Vista aérea de paneles solares sobre el techo de un galpón de Agro Fer, entre viñedos",
    caption: "Agro Fer: paneles sobre el techo de un galpón",
  },
  estacionamiento: {
    img: carportImg,
    alt: "Carport solar de Lumager: techo de paneles sobre una camioneta en un predio rural",
    caption: "Carport solar en un predio rural",
    pos: "object-[45%_60%]",
  },
  aislado: {
    img: bombeoImg,
    alt: "Bombeo solar: agua saliendo de un caño a un canal de riego, con paneles solares detrás",
    caption: "Bombeo solar en el campo",
  },
};

/* El fondo toma un tono por tipo, todos oscuros y de la misma luminosidad para que el texto
   no cambie: verde de campo (el del logo, apagado), acero de nave, azul de noche sobre el
   estacionamiento y tierra seca lejos de la red. */
const tones: Record<MountingId, string> = {
  suelo: "#15241a",
  techo: "#1b2227",
  estacionamiento: "#142033",
  aislado: "#271f17",
};

/** Cuánto dura cada slide antes de pasar al siguiente (lo marca la barra de la pestaña). */
const SLIDE_MS = 6500;

/**
 * Dónde va el sistema: sobre suelo, sobre techo, en el estacionamiento o fuera de la red.
 * Funciona como un slide: avanza solo y la barra naranja de la pestaña activa se llena como
 * temporizador (su animationend pasa al siguiente). Se pausa con el mouse encima, con el
 * foco adentro y fuera de pantalla; el botón sobre la foto lo pausa o lo reanuda. Si el
 * visitante elige una pestaña o desliza la foto, toma el control y el avance se detiene.
 * Con movimiento reducido no avanza solo. Foto y ficha se deslizan de costado según la
 * dirección. Cada tipo muestra una obra real, qué resuelve, los clientes que lo hicieron
 * (con su video) y un botón que lleva al formulario con el mensaje precargado.
 */
export function Mountings() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipe = useRef<number | null>(null);
  const media = useReveal<HTMLDivElement>();
  const m = mountings[active];
  const last = mountings.length - 1;

  // Solo corre mientras la sección está a la vista; con movimiento reducido arranca quieto.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduce = () => reduce.matches && setPlaying(false);
    onReduce();
    reduce.addEventListener("change", onReduce);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  const go = (i: number, d: 1 | -1) => {
    if (i === active) return;
    setDir(d);
    setPrev(active);
    setActive(i);
  };
  // Elección del visitante: toma el control y el avance automático se detiene.
  const pick = (i: number) => {
    setPlaying(false);
    go(i, i > active ? 1 : -1);
  };
  const next = () => go(active === last ? 0 : active + 1, 1);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    const to = keys[e.key];
    if (to === undefined) return;
    e.preventDefault();
    setPlaying(false);
    go(to, e.key === "ArrowLeft" || e.key === "Home" ? -1 : 1);
    tabs.current[to]?.focus();
  };

  // Deslizar la foto con el dedo (o el lápiz) pasa de slide.
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipe.current = e.clientX;
  };
  const onUp = (e: PointerEvent) => {
    if (swipe.current === null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) < 40) return;
    setPlaying(false);
    if (dx < 0) go(active === last ? 0 : active + 1, 1);
    else go(active === 0 ? last : active - 1, -1);
  };

  const running = playing && inView && !hover && !focusIn;

  return (
    <section
      ref={section}
      id="obras"
      aria-labelledby="lx-mount-title"
      aria-roledescription="carrusel"
      data-own-entrance
      data-auto={playing}
      data-running={running}
      className="lx-dark lx-mount"
      style={{
        ["--mount-bg" as string]: tones[m.id],
        ["--dir" as string]: dir,
        ["--slide-ms" as string]: `${SLIDE_MS}ms`,
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setFocusIn(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusIn(false)}
    >
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="lx-mount-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Donde lo necesites.
          </h2>
          <p className="max-w-[44ch] text-lg text-[var(--lx-on-dark-muted)] lg:col-span-5">
            Sobre suelo, sobre techo, en el estacionamiento o lejos de la red. Elegí dónde iría el tuyo y mirá quién ya
            lo hizo con Lumager.
          </p>
        </div>

        <div role="tablist" aria-label="Dónde va el sistema" className="lx-mount-tabs mt-12 lg:mt-16">
          {mountings.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`lx-mount-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`lx-mount-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => onKey(e, i)}
              className="lx-mount-tab"
            >
              <span className="lx-wide text-[0.95rem] leading-tight font-semibold sm:text-lg">{t.label}</span>
              <span className="text-sm">
                {t.works.length} {t.works.length === 1 ? "obra" : "obras"} en video
              </span>
              {/* Temporizador del slide: al terminar de llenarse pasa al siguiente. */}
              {playing && i === active && (
                <span key={active} aria-hidden="true" className="lx-mount-progress" onAnimationEnd={next} />
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12">
          <div
            ref={media}
            className="lx-mount-media relative aspect-[4/3] touch-pan-y overflow-hidden bg-[var(--lx-graphite)] select-none lg:col-span-7 lg:aspect-auto lg:min-h-[36rem]"
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {mountings.map((t, i) => {
              const ph = photos[t.id];
              const on = i === active;
              return (
                <div key={t.id} className="lx-mount-shot absolute inset-0" data-on={on} data-prev={i === prev} aria-hidden={!on}>
                  <Image
                    src={ph.img}
                    alt={on ? ph.alt : ""}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 50rem, 100vw"
                    className={`object-cover ${ph.pos ?? ""}`}
                  />
                  <p className="lx-mount-cap">{ph.caption}</p>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pausar el pase automático" : "Reanudar el pase automático"}
              className="lx-mount-play"
            >
              {playing ? <PauseIcon size={18} weight="fill" aria-hidden="true" /> : <PlayIcon size={18} weight="fill" aria-hidden="true" />}
            </button>
          </div>

          {/* Las cuatro fichas apiladas en la misma celda: la caja mide lo que la más larga y
              nada salta debajo al cambiar de slide. */}
          <div className="lx-mount-infos lg:col-span-5">
            {mountings.map((t, i) => {
              const on = i === active;
              return (
                <div
                  key={t.id}
                  role="tabpanel"
                  id={`lx-mount-panel-${t.id}`}
                  aria-labelledby={`lx-mount-tab-${t.id}`}
                  className="lx-mount-info flex flex-col"
                  data-on={on}
                  data-prev={i === prev}
                  inert={!on}
                >
                  <h3 className="lx-display text-[clamp(min(1.9rem,8.75vw),3.2vw,2.9rem)]">{t.title}</h3>
                  <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-[var(--lx-on-dark-muted)]">{t.body}</p>

                  <h4 className="mt-10 text-sm font-semibold text-[var(--lx-on-dark-muted)]">Lo hicieron con Lumager</h4>
                  <ul className="mt-3 border-b border-[var(--lx-dark-line)]">
                    {t.works.map((w, k) => (
                      <li key={w.video.id} className="lx-mount-work border-t border-[var(--lx-dark-line)]" style={{ ["--k" as string]: k }}>
                        <a
                          href={watchUrl(w.video)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lx-more grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-2.5"
                        >
                          <span className="lx-more-thumb relative aspect-video overflow-hidden bg-[var(--lx-graphite)]">
                            <Image src={`/lumager/videos/${w.video.id}.jpg`} alt="" fill sizes="4.5rem" className="object-cover" />
                          </span>
                          <span className="min-w-0">
                            <span className="lx-wide block leading-tight font-semibold">{w.name}</span>
                            <span className="mt-0.5 block text-sm leading-snug text-[var(--lx-on-dark-muted)]">{w.detail}</span>
                          </span>
                          <ArrowUpRightIcon
                            size={18}
                            weight="bold"
                            className="lx-more-arrow text-[var(--lx-on-dark-muted)]"
                            aria-hidden="true"
                          />
                          <span className="sr-only">(ver el video en YouTube, se abre en otra pestaña)</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <button type="button" onClick={() => prefillContact({ mensaje: t.ask })} className="lx-btn lx-btn-primary">
                      {t.cta}
                      <ArrowRightIcon size={18} weight="bold" className="lx-arrow" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
