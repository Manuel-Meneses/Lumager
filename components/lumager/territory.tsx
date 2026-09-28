"use client";

import { useState } from "react";
import { argentina, type Region } from "@/lib/argentina-map";
import { lumager, lumagerStats, offices, regions } from "@/lib/lumager";
import { CountUp } from "../count-up";

/**
 * Las cuatro regiones donde trabajan, sobre el mapa del IGN, y las dos sedes.
 * Elegir una región (click, teclado o hover) la enciende en naranja.
 */
export function Territory() {
  const [active, setActive] = useState<Region>("cuyo");

  return (
    <section id="territorio" aria-labelledby="lx-territory-title" className="lx-dark">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-6 lg:py-8">
          <h2 id="lx-territory-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)]">
            Obras en <span className="lx-num lx-figure">{<CountUp to={lumagerStats.provinces} duration={1400} />}</span> provincias.
          </h2>
          <p className="mt-6 max-w-[42ch] text-lg text-[var(--lx-on-dark-muted)]">
            Trabajamos en {lumager.coverage}, con sedes en San Juan y Rosario.
          </p>

          <ul className="mt-12 border-b border-[var(--lx-dark-line)]" aria-label="Regiones">
            {regions.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  aria-pressed={active === r.id}
                  onClick={() => setActive(r.id)}
                  onMouseEnter={() => setActive(r.id)}
                  onFocus={() => setActive(r.id)}
                  className="lx-region-btn flex w-full items-center gap-4 py-4 text-left"
                >
                  <span className="lx-mark" aria-hidden="true" />
                  <span className="lx-wide text-xl font-semibold">{r.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {offices.map((o) => (
              <address key={o.name} className="text-[0.95rem] leading-relaxed not-italic">
                <p className="lx-wide text-lg font-semibold">Sede {o.name}</p>
                <p className="mt-2 text-[var(--lx-on-dark-muted)]">{o.address}</p>
                <p className="mt-1">
                  <a href={o.phoneHref} className="lx-link lx-num">
                    {o.phoneDisplay}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`mailto:${o.email}`} className="lx-link">
                    {o.email}
                  </a>
                </p>
              </address>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--lx-on-dark-muted)]">{lumager.hours}</p>
        </div>

        <div className="order-first overflow-hidden max-lg:aspect-[370/360] lg:order-none lg:col-span-6">
          <svg
            viewBox="-40 0 370 680"
            className="lx-map mx-auto h-auto w-full max-w-[26rem] max-lg:max-w-[30rem]"
            data-active={active}
            role="img"
            aria-label={`Mapa de Argentina con la región ${regions.find((r) => r.id === active)?.label} resaltada y las sedes de San Juan y Rosario`}
          >
            {argentina.map((p) => (
              <path key={p.name} d={p.d} className="lx-prov" data-region={p.region ?? undefined} />
            ))}
            {offices.map((o) => (
              <g key={o.name}>
                <rect className="lx-pin-ring" x={o.map.x - 4} y={o.map.y - 4} width="8" height="8" fill="none" stroke="#f3f4f1" strokeWidth="1" />
                <rect x={o.map.x - 4} y={o.map.y - 4} width="8" height="8" fill="#f3f4f1" />
                {o.name === "San Juan" && (
                  <line x1={o.map.x - 6} y1={o.map.y} x2={30} y2={o.map.y} stroke="#f3f4f1" strokeWidth="0.8" />
                )}
                <text
                  x={o.name === "San Juan" ? 26 : o.map.x + 10}
                  y={o.map.y + 4}
                  textAnchor={o.name === "San Juan" ? "end" : "start"}
                  fill="#f3f4f1"
                  fontSize="12"
                  fontWeight="600"
                >
                  {o.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
