"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import obraImg from "@/public/lumager/obra-montaje.jpg";
import bateriasImg from "@/public/lumager/baterias-backup.jpg";
import tablerosImg from "@/public/lumager/tableros-parque.jpg";
import bombeoImg from "@/public/lumager/bombeo-solar.jpg";
import tensionImg from "@/public/lumager/media-tension.jpg";
import { moreServices } from "@/lib/lumager";
import { drawings } from "@/lib/service-drawings";
import { Drawing } from "./drawing";

type Current = "cc" | "ca";

type Node = {
  id: string;
  label: string;
  title: string;
  current: string;
  body: string;
  img: StaticImageData;
  alt: string;
  pos?: string;
  /** Centro del símbolo en el esquema (viewBox 1200×320). */
  at: { x: number; y: number };
  /** Corriente del tramo que llega a este nodo (colorea el cable en móvil). */
  feed: Current;
};

/* Un tramo por especialidad de la obra, en el orden en que viaja la energía. */
const nodes: Node[] = [
  {
    id: "fv",
    label: "Generador FV",
    title: "Paneles y estructura",
    current: "Corriente continua",
    body: "Hincado, estructura y montaje de los paneles, en suelo, sobre techo o en carport. Acá nace la corriente continua.",
    img: obraImg,
    alt: "Equipo de Lumager con cascos montando la base de una estructura solar junto a una minicargadora",
    at: { x: 240, y: 120 },
    feed: "cc",
  },
  {
    id: "sala",
    label: "Sala técnica",
    title: "Inversores y baterías",
    current: "Continua a alterna",
    body: "Los inversores pasan la continua a alterna. Con baterías de litio o de plomo-ácido en racks a medida, el sistema tiene respaldo cuando se corta la red.",
    img: bateriasImg,
    alt: "Sala técnica con inversores y cargadores montados en bandeja y racks de baterías",
    at: { x: 480, y: 120 },
    feed: "cc",
  },
  {
    id: "tablero",
    label: "Tablero",
    title: "Tableros eléctricos",
    current: "Corriente alterna",
    body: "Protección, maniobra y medición de todo el sistema. Diseñamos y armamos tableros nuevos, y reparamos los existentes.",
    img: tablerosImg,
    alt: "Tablero eléctrico abierto al pie de una fila de paneles solares",
    pos: "object-left",
    at: { x: 720, y: 120 },
    feed: "ca",
  },
  {
    id: "bomba",
    label: "Consumo",
    title: "Bombeo y consumo propio",
    current: "Corriente alterna",
    body: "La energía se usa ahí mismo: bombas sumergibles con tablero y variador, de 1 a 200 HP, o el consumo de una planta, un comercio o una casa.",
    img: bombeoImg,
    alt: "Pozo de riego bombeando agua junto a una fila de paneles solares",
    at: { x: 720, y: 256 },
    feed: "ca",
  },
  {
    id: "mt",
    label: "Media tensión",
    title: "Transformación y red",
    current: "Alterna en media tensión",
    body: "Instalaciones industriales de media y alta tensión y obras eléctricas en general: el tramo que conecta el sistema con la red.",
    img: tensionImg,
    alt: "Poste de media tensión con transformador contra el cielo azul",
    at: { x: 940, y: 120 },
    feed: "ca",
  },
];

/* ---------- Símbolos de esquema, centrados en (0,0) ---------- */

function Sym({ id }: { id: string }) {
  switch (id) {
    case "sol":
      return (
        <g className="lx-sym-sun">
          <circle r="15" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line key={i} x1={Math.cos(a) * 21} y1={Math.sin(a) * 21} x2={Math.cos(a) * 28} y2={Math.sin(a) * 28} />
            );
          })}
        </g>
      );
    case "fv":
      return (
        <g>
          <rect x="-38" y="-26" width="76" height="52" />
          <path d="M-12.7 -26V26M12.7 -26V26M-38 0H38" className="lx-sym-thin" />
        </g>
      );
    case "sala":
      return (
        <g>
          <rect x="-30" y="-30" width="60" height="60" />
          <path d="M-30 30L30 -30" className="lx-sym-thin" />
          <path d="M-21 -19H-8M-21 -13H-8" />
          <path d="M8 17c3-6 6-6 8 0s5 6 8 0" />
        </g>
      );
    case "bateria":
      return (
        <g>
          <path d="M-20 -12H20M-10 -4H10M-20 4H20M-10 12H10" />
          <path d="M26 -16h6M29 -19v6" className="lx-sym-thin" />
        </g>
      );
    case "tablero":
      return (
        <g>
          <rect x="-26" y="-34" width="52" height="68" />
          {[-18, 0, 18].map((y) => (
            <path key={y} d={`M-16 ${y}H-6L6 ${y - 7}M8 ${y}H16`} className="lx-sym-thin" />
          ))}
        </g>
      );
    case "bomba":
      return (
        <g>
          <circle r="22" />
          <text y="7" textAnchor="middle" className="lx-sym-text">
            M
          </text>
        </g>
      );
    case "mt":
      return (
        <g>
          <circle cx="-11" r="17" />
          <circle cx="11" r="17" />
        </g>
      );
    case "red":
      return (
        <g>
          <path d="M-16 34L0 -34L16 34M-11 12H11M-6 -10H6M-24 -22H24M-11 12L6 -10M11 12L-6 -10" />
        </g>
      );
    default:
      return null;
  }
}

/* Cables del esquema, dibujados en el sentido en que circula la energía. */
const wires: { d: string; c: Current; tag?: { x: number; y: number; t: string } }[] = [
  { d: "M278 120H450", c: "cc", tag: { x: 364, y: 110, t: "CC" } },
  { d: "M480 150V244", c: "cc", tag: { x: 492, y: 202, t: "CC" } },
  { d: "M510 120H694", c: "ca", tag: { x: 602, y: 110, t: "CA" } },
  { d: "M720 154V234", c: "ca", tag: { x: 732, y: 198, t: "CA" } },
  { d: "M746 120H912", c: "ca", tag: { x: 829, y: 110, t: "CA" } },
  { d: "M968 120H1114", c: "ca", tag: { x: 1041, y: 110, t: "MT" } },
];

function Diagram({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <div className="relative aspect-[1200/320]">
      <svg
        viewBox="0 0 1200 320"
        className="lx-plan-svg absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        {/* Luz del sol hacia los paneles. */}
        <path d="M104 104L186 110M106 120H186M104 136L186 130" className="lx-plan-light" />
        {wires.map((w, i) => (
          <g key={w.d} data-c={w.c} style={{ ["--d" as string]: `${i * 140}ms` }}>
            <path d={w.d} pathLength={1} className="lx-wire" />
            <path d={w.d} className="lx-wire-flow" />
            {w.tag && (
              <text x={w.tag.x} y={w.tag.y} textAnchor={w.d.includes("V") ? "start" : "middle"} className="lx-wire-tag">
                {w.tag.t}
              </text>
            )}
          </g>
        ))}

        <g transform="translate(70 120)" className="lx-sym">
          <Sym id="sol" />
        </g>
        <text x="70" y="62" textAnchor="middle" className="lx-sym-label">
          Sol
        </text>
        <g transform="translate(480 256)" className="lx-sym">
          <Sym id="bateria" />
        </g>
        <text x="514" y="260" className="lx-sym-label">
          Baterías
        </text>
        <g transform="translate(1146 120)" className="lx-sym">
          <Sym id="red" />
        </g>
        <text x="1146" y="62" textAnchor="middle" className="lx-sym-label">
          Red
        </text>

        {nodes.map((n, i) => {
          const above = n.id !== "bomba";
          return (
            <g key={n.id} className="lx-sym" data-on={active === i}>
              <g transform={`translate(${n.at.x} ${n.at.y})`}>
                {/* Marcas de selección de plano, en las cuatro esquinas. */}
                <path d="M-50 -40v-10h10M40 -50h10v10M50 40v10h-10M-40 50h-10v-10" className="lx-sym-select" />
                <Sym id={n.id} />
              </g>
              <text
                x={above ? n.at.x : n.at.x + 36}
                y={above ? n.at.y - 58 : n.at.y + 5}
                textAnchor={above ? "middle" : "start"}
                className="lx-sym-label"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Zonas tocables sobre cada símbolo: el esquema es decorativo, los botones nombran el tramo. */}
      {nodes.map((n, i) => (
        <button
          key={n.id}
          type="button"
          aria-pressed={active === i}
          aria-controls="lx-plan-sheet"
          onClick={() => onPick(i)}
          onPointerEnter={(e) => e.pointerType === "mouse" && onPick(i)}
          className="lx-plan-hit absolute"
          style={{
            left: `${((n.at.x - 56) / 1200) * 100}%`,
            top: `${((n.at.y - (n.id === "bomba" ? 56 : 76)) / 320) * 100}%`,
            width: `${(112 / 1200) * 100}%`,
            height: `${(n.id === "bomba" ? 112 : 132) / 3.2}%`,
          }}
        >
          <span className="sr-only">
            {n.label}: {n.title}
          </span>
        </button>
      ))}
    </div>
  );
}

function Chip({ children, c }: { children: ReactNode; c: Current }) {
  return (
    <span
      className="lx-current-chip inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase"
      data-c={c}
    >
      <span aria-hidden="true" className="size-2" />
      {children}
    </span>
  );
}

/**
 * Del sol a la red: un esquema unifilar de referencia, dibujado como un plano. Cada tramo es
 * una especialidad de Lumager y abre su ficha con una foto de obra. La corriente continua va en
 * naranja, la alterna en verde. Se recorre sola mientras está a la vista hasta que la tocás.
 */
export function EnergyPath() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || touched || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % nodes.length), 4200);
    return () => window.clearInterval(id);
  }, [visible, touched, hovered]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const n = nodes[active];

  return (
    <section
      ref={root}
      id="servicios"
      aria-labelledby="lx-plan-title"
      className="lx-plan"
      data-live={visible}
      data-seen={seen}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="lx-plan-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Todo en uno, del sol a la red.
          </h2>
          <p className="max-w-[44ch] text-lg text-[var(--lx-on-plan-muted)] lg:col-span-5">
            Así viaja la energía en una obra de Lumager, tramo por tramo: cada uno es una de nuestras especialidades, del
            diseño a la puesta en marcha.
          </p>
        </div>

        {/* Escritorio: el esquema completo y la ficha del tramo elegido, en una hoja de plano
            apoyada sobre el panel. */}
        <div className="lx-plan-paper mt-16 hidden lg:block">
          <div className="px-10 pt-8 pb-2">
            <Diagram active={active} onPick={pick} />
          </div>

          <div className="grid grid-cols-12 gap-10 border-t border-[var(--lx-plan-line)] p-10">
            <div className="relative col-span-7 aspect-[16/9] overflow-hidden bg-[var(--lx-plan-2)]">
              {nodes.map((m, i) => (
                <Image
                  key={m.id}
                  src={m.img}
                  alt={i === active ? m.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="55vw"
                  className={`lx-plan-photo object-cover ${m.pos ?? ""}`}
                  data-on={i === active}
                />
              ))}
            </div>
            <div id="lx-plan-sheet" aria-live="polite" className="col-span-5 flex flex-col">
              <div key={n.id} className="lx-plan-sheet">
                <Chip c={n.feed}>{n.current}</Chip>
                <h3 className="lx-display mt-5 text-[clamp(1.9rem,3vw,2.75rem)]">{n.title}</h3>
                <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[var(--lx-on-plan-muted)]">{n.body}</p>
              </div>
              <dl className="lx-plan-stamp mt-auto grid grid-cols-2 text-xs">
                <div className="col-span-2">
                  <dt className="sr-only">Plano</dt>
                  <dd className="lx-wide font-semibold tracking-[0.08em] uppercase">Esquema unifilar de referencia</dd>
                </div>
                <div>
                  <dt>Continua</dt>
                  <dd data-c="cc">Naranja</dd>
                </div>
                <div>
                  <dt>Alterna</dt>
                  <dd data-c="ca">Verde</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Móvil y tablet: el mismo recorrido de arriba abajo, un tramo abierto a la vez. */}
        <ol className="lx-plan-paper mt-14 px-4 pt-6 pb-2 sm:px-6 lg:hidden">
          <li className="lx-plan-row" data-c="cc" data-edge="start">
            <span className="lx-plan-icon" aria-hidden="true">
              <svg viewBox="-40 -40 80 80" className="lx-plan-svg size-full">
                <g className="lx-sym">
                  <Sym id="sol" />
                </g>
              </svg>
            </span>
            <p className="lx-wide self-center text-[0.8rem] font-semibold tracking-[0.12em] text-[var(--lx-on-plan-muted)] uppercase">
              Sol
            </p>
          </li>
          {nodes.map((m, i) => {
            const open = active === i;
            return (
              <li key={m.id} className="lx-plan-row" data-c={m.feed}>
                <span className="lx-plan-icon" aria-hidden="true">
                  <svg viewBox="-40 -40 80 80" className="lx-plan-svg size-full">
                    <g className="lx-sym" data-on={open}>
                      <Sym id={m.id} />
                    </g>
                  </svg>
                </span>
                <div className="min-w-0 pb-8">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`lx-plan-m-${m.id}`}
                    onClick={() => pick(i)}
                    className="flex min-h-12 w-full flex-col items-start text-left"
                  >
                    <span className="text-[0.8rem] font-semibold tracking-[0.12em] text-[var(--lx-on-plan-muted)] uppercase">
                      {m.label}
                    </span>
                    <span className="lx-wide mt-1 text-xl font-semibold">{m.title}</span>
                  </button>
                  <div id={`lx-plan-m-${m.id}`} className="lx-service-panel" data-open={open} inert={!open}>
                    <div className="overflow-hidden">
                      <div className="pt-4">
                        <Chip c={m.feed}>{m.current}</Chip>
                        <p className="mt-3 max-w-[46ch] leading-relaxed text-[var(--lx-on-plan-muted)]">{m.body}</p>
                        <div className="relative mt-5 aspect-[16/10] overflow-hidden bg-[var(--lx-plan-2)]">
                          <Image
                            src={m.img}
                            alt={m.alt}
                            fill
                            sizes="90vw"
                            className={`object-cover ${m.pos ?? ""}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className="lx-plan-row" data-c="ca" data-edge="end">
            <span className="lx-plan-icon" aria-hidden="true">
              <svg viewBox="-40 -40 80 80" className="lx-plan-svg size-full">
                <g className="lx-sym">
                  <Sym id="red" />
                </g>
              </svg>
            </span>
            <p className="lx-wide self-center text-[0.8rem] font-semibold tracking-[0.12em] text-[var(--lx-on-plan-muted)] uppercase">
              Red
            </p>
          </li>
        </ol>

        <MoreServices />
      </div>
    </section>
  );
}

/**
 * Los servicios que no son un tramo del recorrido: alumbrado, eficiencia y obra civil. Cada
 * uno en su lámina tintada, que se dibuja al entrar en pantalla, una tras otra.
 */
function MoreServices() {
  const list = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setOn(true);
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-16 lg:mt-20">
      <h3 className="lx-wide text-xl font-semibold tracking-[-0.01em]">Y además</h3>
      <ul ref={list} className="lx-plan-paper lx-more-sheet mt-8 grid md:grid-cols-3">
        {moreServices.map((s, i) => (
          // En celular, lámina chica al costado; desde tablet, lámina arriba.
          <li key={s.drawing} className="grid grid-cols-[6.5rem_1fr] items-start gap-4 p-5 max-[360px]:grid-cols-1 md:block md:p-6">
            <div className="lx-lamina aspect-[4/3] p-[7%] max-[360px]:w-32" data-tone={s.tone}>
              <Drawing parts={drawings[s.drawing]} on={on} stagger={i} className="block size-full" />
            </div>
            <div>
              <h4 className="lx-wide text-lg leading-tight font-semibold md:mt-5">{s.title}</h4>
              <p className="mt-2 max-w-[42ch] leading-relaxed text-[var(--lx-on-plan-muted)]">{s.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
