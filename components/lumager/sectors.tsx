"use client";

import { sectors, systemTypes } from "@/lib/lumager";
import { useReveal } from "./use-reveal";

/**
 * Para quién y qué: los cinco sectores y los cuatro tipos de sistema de sus piezas
 * "Nuestros servicios", como una hoja de especificaciones en dos columnas. Va arriba
 * para que el visitante se reconozca antes de ver las obras. Al entrar, los sectores se
 * encienden uno tras otro como celdas que empiezan a generar, y los filetes de los
 * sistemas se trazan de izquierda a derecha.
 */
export function Sectors() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section aria-labelledby="lx-sectors-title" data-own-entrance className="bg-[var(--lx-paper-2)]">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
        <h2 id="lx-sectors-title" className="lx-display max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)]">
          Impulsados por energía solar.
        </h2>

        <div ref={ref} className="lx-sectors mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold text-[var(--lx-muted)]">Ingeniería solar para</h3>
            <ul className="mt-4 border-b border-[var(--lx-line)]">
              {sectors.map((s, i) => (
                <li
                  key={s}
                  style={{ ["--i" as string]: i }}
                  className="lx-sector lx-wide flex items-center gap-4 border-t border-[var(--lx-line)] py-3 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.015em]"
                >
                  <span className="lx-mark" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-sm font-semibold text-[var(--lx-muted)]">Sistemas</h3>
            <dl className="mt-4 border-b border-[var(--lx-line)]">
              {systemTypes.map((t, i) => (
                <div
                  key={t.title}
                  style={{ ["--i" as string]: i }}
                  className="lx-rule grid gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
                >
                  <dt className="lx-wide text-xl font-semibold tracking-[-0.01em]">{t.title}</dt>
                  <dd className="text-[#3d423f]">{t.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
