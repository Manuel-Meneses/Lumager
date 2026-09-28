"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { steps } from "@/lib/lumager";
import parqueImg from "@/public/lumager/parque-aereo.jpg";
import bateriasImg from "@/public/lumager/baterias-backup.jpg";
import tablerosImg from "@/public/lumager/tableros-parque.jpg";
import obraImg from "@/public/lumager/obra-montaje.jpg";
import praderaImg from "@/public/lumager/parque-pradera.jpg";

/* Una foto y una hora del día por etapa, en el mismo orden que `steps`. */
const photos: { img: StaticImageData; alt: string; pos?: string }[] = [
  {
    img: parqueImg,
    alt: "Vista aérea de un parque solar cercado junto a un campo de frutales",
    pos: "object-[50%_85%]",
  },
  { img: bateriasImg, alt: "Sala técnica con inversores y cargadores montados en bandeja y racks de baterías" },
  { img: tablerosImg, alt: "Tablero eléctrico abierto al pie de una fila de paneles solares", pos: "object-left" },
  {
    img: obraImg,
    alt: "Equipo de Lumager con cascos montando la base de una estructura solar junto a una minicargadora",
  },
  {
    img: praderaImg,
    alt: "Filas de paneles solares de Lumager sobre césped, con una cortina de álamos al fondo",
    pos: "object-[50%_60%]",
  },
];

/* El cielo de cada etapa: amanecer, mañana, mediodía, tarde y noche. */
const sky = [
  { hour: "Amanecer", bg: "#f4dcc5", dark: false },
  { hour: "Mañana", bg: "#e2eaee", dark: false },
  { hour: "Mediodía", bg: "#cfe3f3", dark: false },
  { hour: "Tarde", bg: "#f2d4a1", dark: false },
  { hour: "Noche", bg: "#142238", dark: true },
];

// Arco del día en el viewBox 1000×140: sale a la izquierda, se pone a la derecha.
// El sol avanza parejo en horizontal (t de 0 a 1) y su altura sale de la semielipse.
const HORIZON = 118;
function sunAt(t: number) {
  const c = Math.min(1, Math.max(0, t));
  const x = 40 + 920 * c;
  const u = (x - 500) / 460;
  const y = HORIZON - 96 * Math.sqrt(Math.max(0, 1 - u * u)) + Math.max(0, t - 1) * 220;
  return { x, y };
}
// Parte del recorrido en la que el sol está arriba: se pone a mitad de la postventa.
const DAY = 0.9;
const stageT = (i: number) => (i + 0.5) / steps.length / DAY;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Color del cielo en el punto p del recorrido: interpola entre las horas, centradas en su etapa. */
function skyAt(p: number) {
  const pos = clamp01(p) * sky.length - 0.5;
  const i = Math.min(sky.length - 2, Math.max(0, Math.floor(pos)));
  const f = clamp01(pos - i);
  const a = hex(sky[i].bg);
  const b = hex(sky[i + 1].bg);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(" ")})`;
}
function hex(c: string) {
  return [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
}

/**
 * Pinta el cielo, el sol y el arco del punto p del recorrido en variables CSS. El resplandor
 * se mueve con transform (sin repintar): es una capa de 120% × 140% del cielo con el
 * gradiente fijo al centro, así que se traslada en porcentajes de su propio tamaño.
 */
function paintSky(el: HTMLElement | null, p: number) {
  if (!el) return;
  const t = p / DAY;
  const sun = sunAt(t);
  el.style.setProperty("--day-bg", skyAt(p));
  el.style.setProperty("--sun-x", `${sun.x}px`);
  el.style.setProperty("--sun-y", `${sun.y}px`);
  el.style.setProperty("--glow-tx", `${sun.x / 10 / 1.2 - 50}%`);
  el.style.setProperty("--glow-ty", `${(50 + (sun.y / 140) * 50) / 1.4 - 50}%`);
  el.style.setProperty("--glow-o", String(clamp01((0.9 - p) / 0.1)));
  el.style.setProperty("--stars-o", String(clamp01((p - 0.84) / 0.11)));
  el.style.setProperty("--arc", String(1 - clamp01(t)));
}

/** Mini arco para la versión apilada: dónde está el sol en esa etapa. */
function MiniSun({ i, dark }: { i: number; dark: boolean }) {
  const s = sunAt(stageT(i));
  return (
    <svg viewBox="0 0 1000 140" className="h-7 w-16 shrink-0 sm:h-8 sm:w-24" aria-hidden="true">
      <path
        d={`M40 ${HORIZON} A460 96 0 0 1 960 ${HORIZON}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="10"
        strokeDasharray="20 30"
      />
      <line x1="0" x2="1000" y1={HORIZON} y2={HORIZON} stroke="currentColor" strokeOpacity="0.5" strokeWidth="8" />
      <circle
        cx={s.x}
        cy={Math.min(s.y, HORIZON + 14)}
        r="42"
        fill={dark ? "#f3f4f1" : "var(--lx-orange)"}
        opacity={dark ? 0.85 : 1}
      />
    </svg>
  );
}

/**
 * Llave en mano, de sol a sol. En escritorio la sección queda fija mientras bajás: las cinco
 * etapas pasan como las horas de un día, el cielo cambia de color y el sol del hero cruza el
 * arco hasta la noche de la postventa. En móvil es una columna de franjas, una por hora.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const day = useRef<HTMLDivElement>(null);

  // Avance del recorrido (0 al entrar la sección arriba, 1 al terminar), leído una vez por
  // cuadro con el scroll. Solo en escritorio: en celular el día fijo no existe.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const desk = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const read = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? clamp01(-r.top / run) : 0;
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      paintSky(day.current, p);
    };
    const schedule = () => {
      if (!raf && desk.matches) raf = requestAnimationFrame(read);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desk.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desk.removeEventListener("change", schedule);
    };
  }, []);

  const dark = sky[active].dark;

  const goTo = (i: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + run * ((i + 0.5) / steps.length), behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <section ref={root} id="llave-en-mano" aria-label="Llave en mano: de sol a sol" className="relative lg:h-[440svh]">
      {/* Lectores de pantalla: las cinco etapas como lista, sin depender del scroll. */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.title}>
            {s.title}: {s.body}
          </li>
        ))}
      </ol>

      {/* ---------- Escritorio: un día fijo en pantalla ---------- */}
      <div ref={day} className="lx-day sticky top-0 hidden h-svh overflow-hidden lg:block" data-dark={dark}>
        <div aria-hidden="true" className="lx-day-sky absolute inset-0" />
        <div aria-hidden="true" className="lx-day-glow absolute top-0 left-0" />
        <div aria-hidden="true" className="lx-stars absolute inset-x-0 top-0 h-2/3" />

        <div className="relative mx-auto flex h-full max-w-[88rem] flex-col px-12 pt-28 pb-8">
          <div className="grid grid-cols-12 items-end gap-10">
            <h2 className="lx-display col-span-7 text-[clamp(2.25rem,4.4vw,3.75rem)]">De sol a sol.</h2>
            <p className="lx-day-muted col-span-5 max-w-[42ch] text-lg">
              Llave en mano, con acompañamiento integral de la primera consulta a la postventa. Si no tenés una idea,
              alcanza con tu consumo y tu necesidad.
            </p>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-12 items-center gap-10 py-6" aria-hidden="true">
            {/* Contenedor de consulta: el título largo ("Dimensionamiento.") se mide contra
                esta columna y nunca se mete debajo de la foto. */}
            <div className="@container col-span-5">
              <p className="lx-day-muted lx-num text-sm font-semibold tracking-[0.12em] uppercase">
                {sky[active].hour} · Etapa {active + 1} de {steps.length}
              </p>
              {/* Cada etapa entra con opacidad y desplazamiento (lx-stage-in), sin blur. */}
              <div key={active} className="lx-stage-in">
                <p
                  className={`lx-display mt-4 ${
                    steps[active].title.length > 12
                      ? "text-[min(3.4rem,8.6cqi)]"
                      : "text-[clamp(2.75rem,5.2vw,4.75rem)]"
                  }`}
                >
                  {steps[active].title}.
                </p>
                <p className="lx-day-muted mt-6 max-w-[34ch] text-xl leading-relaxed">{steps[active].body}</p>
              </div>
            </div>
            <div className="relative col-span-7 h-full max-h-[48svh] min-h-[14rem] overflow-hidden bg-[rgb(27_29_28/0.08)]">
              {photos.map((p, i) => (
                <Image
                  key={p.alt}
                  src={p.img}
                  alt=""
                  fill
                  sizes="55vw"
                  className={`lx-process-photo object-cover ${p.pos ?? ""}`}
                  data-active={i === active}
                />
              ))}
            </div>
          </div>

          {/* El arco del día con el sol en su hora, y las etapas marcadas sobre el horizonte. */}
          <div className="relative">
            <svg viewBox="0 0 1000 140" className="block h-auto w-full overflow-visible" aria-hidden="true">
              <path
                d={`M40 ${HORIZON} A460 96 0 0 1 960 ${HORIZON}`}
                fill="none"
                className="lx-day-arc"
                strokeWidth="1"
                strokeDasharray="2 5"
              />
              <path
                d={`M40 ${HORIZON} A460 96 0 0 1 960 ${HORIZON}`}
                fill="none"
                stroke="var(--lx-orange)"
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray="1"
                style={{ strokeDashoffset: "var(--arc, 1)" }}
              />
              <line x1="0" x2="1000" y1={HORIZON} y2={HORIZON} className="lx-day-horizon" strokeWidth="1" />
              <defs>
                <clipPath id="lx-day-sky">
                  <rect x="-40" y="-60" width="1080" height={HORIZON + 60} />
                </clipPath>
              </defs>
              <g clipPath="url(#lx-day-sky)">
                <g style={{ transform: "translate(var(--sun-x, 40px), var(--sun-y, 118px))" }}>
                  <circle r="22" fill="var(--lx-orange)" opacity="0.2" />
                  <circle r="9" fill="var(--lx-orange)" />
                </g>
              </g>
            </svg>
            <ol className="relative mt-1 h-10">
              {steps.map((s, i) => {
                const x = sunAt(stageT(i)).x / 10;
                const last = i === steps.length - 1;
                return (
                  <li
                    key={s.title}
                    className={`absolute top-0 ${last ? "-translate-x-full" : "-translate-x-1/2"}`}
                    style={{ left: `${last ? 100 : x}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className="lx-day-tick flex items-center gap-2 py-2 text-sm font-semibold whitespace-nowrap"
                    >
                      <span aria-hidden="true" className="lx-mark" />
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* ---------- Móvil y tablet: el día en franjas ---------- */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-[88rem] px-5 pt-24 pb-12 sm:px-8 sm:pt-32">
          <h2 className="lx-display text-[clamp(2.25rem,8vw,4rem)]">De sol a sol.</h2>
          <p className="mt-6 max-w-[42ch] text-lg text-[var(--lx-muted)]">
            Llave en mano, con acompañamiento integral de la primera consulta a la postventa. Si no tenés una idea, alcanza
            con tu consumo y tu necesidad.
          </p>
          <p className="lx-swipe-hint mt-6">Deslizá para recorrer el día</p>
        </div>
        {/* En celular el día se desliza de costado (lx-mrail): el sol avanza de izquierda a
            derecha, como en el cielo. Desde tablet, franjas una debajo de la otra. */}
        <ol aria-hidden="true" className="lx-mrail lx-day-rail">
          {steps.map((s, i) => (
            <li key={s.title} className="lx-day-band" data-dark={sky[i].dark} style={{ backgroundColor: sky[i].bg }}>
              <div className="mx-auto max-w-[88rem] px-5 py-7 sm:px-8 sm:py-12">
                <div className="flex items-center justify-between gap-4">
                  <p className="lx-day-muted lx-num text-xs font-semibold tracking-[0.12em] uppercase">
                    {sky[i].hour} · Etapa {i + 1} de {steps.length}
                  </p>
                  <MiniSun i={i} dark={sky[i].dark} />
                </div>
                <p
                  className={`lx-display mt-4 ${s.title.length > 12 ? "text-[clamp(1.5rem,6.4vw,2.25rem)]" : "text-[clamp(1.9rem,8.4vw,2.25rem)]"}`}
                >
                  {s.title}.
                </p>
                <p className="lx-day-muted mt-4 max-w-[40ch] text-lg leading-relaxed">{s.body}</p>
                <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-[rgb(27_29_28/0.08)] sm:mt-8">
                  <Image
                    src={photos[i].img}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 100vw, 84vw"
                    className={`object-cover ${photos[i].pos ?? ""}`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
