"use client";

import type { CSSProperties } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";
import { method } from "@/lib/lumager";
import { reels, testimonials, watchUrl } from "@/lib/lumager-videos";
import { useReveal } from "./use-reveal";

/* Esquema de una obra genérica en 12 semanas: sirve para mostrar el método, no es el
   cronograma de ninguna obra (el pie lo aclara). Las fases salen de sus etapas. */
const WEEKS = 12;
const phases = [
  { label: "Diseño", from: 0, to: 3 },
  { label: "Provisión", from: 3, to: 6 },
  { label: "Ejecución", from: 6, to: 12 },
];
const LOOKAHEAD = { from: 6, to: 10 };
const restrictions = ["Materiales", "Información", "Equipos"];
const weekCells = [6, 7, 8, 9];

/** Posición en el eje de semanas y demora de su entrada (ms). */
const at = (from: number, to: number, d: number) =>
  ({ left: `${(from / WEEKS) * 100}%`, width: `${((to - from) / WEEKS) * 100}%`, ["--d" as string]: `${d}ms` }) as CSSProperties;
const delay = (d: number) => ({ ["--d" as string]: `${d}ms` }) as CSSProperties;

// La prueba de plazos: la cita de Jeremías (subtítulo de su video) y el reel del bombeo.
const jeremias = testimonials.find((t) => t.name === "Jeremías");
const bombeo = reels.find((r) => r.video.id === "3H11oS3RCjw");

function Track({ id }: { id: (typeof method.levels)[number]["id"] }) {
  if (id === "maestro")
    return (
      <>
        <span className="lx-lps-line" style={delay(0)} />
        <span className="lx-lps-milestone" style={delay(650)} />
        <span className="lx-lps-milestone-label" style={delay(650)}>
          Puesta en marcha
        </span>
      </>
    );
  if (id === "fases")
    // Se arman desde el final: la última fase primero, como se planifica hacia atrás.
    return (
      <>
        {phases.map((p, i) => (
          <span key={p.label} className="lx-lps-bar" style={at(p.from, p.to, 900 + (phases.length - 1 - i) * 250)}>
            {p.label}
          </span>
        ))}
      </>
    );
  if (id === "intermedio")
    return (
      <span className="lx-lps-band" style={at(LOOKAHEAD.from, LOOKAHEAD.to, 1750)}>
        {restrictions.map((r, k) => (
          <span key={r} className="lx-lps-chip" style={delay(2150 + k * 170)}>
            <span className="lx-lps-chip-box">
              <CheckIcon size={9} weight="bold" />
            </span>
            {r}
          </span>
        ))}
      </span>
    );
  return (
    <>
      {weekCells.map((w, k) => {
        const current = k === weekCells.length - 1;
        return (
          <span key={w} className="lx-lps-week" data-current={current} style={at(w, w + 1, 2750 + k * 200)}>
            {!current && <CheckIcon size={14} weight="bold" className="lx-lps-week-check" />}
          </span>
        );
      })}
    </>
  );
}

/**
 * El método de obra (Lean Construction + Last Planner System) dicho para quien compra: la
 * obra se planifica con quienes la hacen. Un esquema de plan de obra se arma al entrar, nivel
 * por nivel: el plan maestro hasta la puesta en marcha, las fases tiradas desde el final, la
 * ventana de las próximas semanas liberando restricciones y el plan semanal que se tilda.
 * Abajo, los plazos contados por un cliente y por un reel de obra.
 */
export function Method() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="metodo" aria-labelledby="lx-method-title" data-own-entrance>
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="lx-method-title" className="lx-display text-[clamp(2.25rem,4.6vw,3.75rem)] lg:col-span-6">
            Planificada con quienes la hacen.
          </h2>
          <div className="max-w-[54ch] space-y-4 lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed">
              Trabajamos con Lean Construction y Last Planner System: cada obra se planifica con quienes la ejecutan,
              desde la puesta en marcha hacia atrás, y se controla semana a semana.
            </p>
            <p className="leading-relaxed text-[var(--lx-muted)]">{method.lean}</p>
          </div>
        </div>

        <figure className="mt-16 lg:mt-20">
          <div ref={ref} className="lx-lps">
            <div className="lx-lps-row lx-lps-axis" aria-hidden="true">
              <span className="text-xs font-semibold text-[var(--lx-muted)]">Semanas</span>
              <span className="lx-lps-ticks lx-num">
                {Array.from({ length: WEEKS }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </span>
            </div>
            {method.levels.map((l) => (
              <div key={l.id} className="lx-lps-row">
                <div>
                  <h3 className="lx-wide text-lg leading-tight font-semibold">{l.title}</h3>
                  <p className="mt-1 max-w-[36ch] text-sm leading-snug text-[var(--lx-muted)]">{l.body}</p>
                </div>
                <div className="lx-lps-track" data-level={l.id} aria-hidden="true">
                  <Track id={l.id} />
                </div>
              </div>
            ))}
          </div>
          <figcaption className="mt-4 text-sm text-[var(--lx-muted)]">
            Esquema del método en una obra de 12 semanas. No es el cronograma de una obra real.
          </figcaption>
        </figure>

        {jeremias?.quote && bombeo && (
          <div className="mt-20 grid gap-10 border-t border-[var(--lx-line)] pt-10 lg:mt-24 lg:grid-cols-12 lg:gap-10">
            <h3 className="lx-wide text-xl font-semibold tracking-[-0.01em] lg:col-span-3">Los plazos, contados en obra.</h3>
            <figure className="lg:col-span-5">
              <blockquote className="text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty">
                “{jeremias.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--lx-muted)]">
                {jeremias.name}, {jeremias.role.charAt(0).toLowerCase() + jeremias.role.slice(1)}.{" "}
                <a
                  href={watchUrl(jeremias.video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lx-link inline-flex items-center gap-1 font-semibold text-[var(--lx-ink)]"
                >
                  Ver su video
                  <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </figcaption>
            </figure>
            <div className="lg:col-span-4">
              <p className="lx-display lx-num text-[clamp(2.5rem,4vw,3.5rem)] leading-none">2 días</p>
              <p className="mt-3 max-w-[32ch] text-[var(--lx-muted)]">
                Bombeo solar de 15 HP off-grid, instalado en dos días.{" "}
                <a
                  href={watchUrl(bombeo.video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lx-link inline-flex items-center gap-1 font-semibold text-[var(--lx-ink)]"
                >
                  Ver el reel
                  <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
