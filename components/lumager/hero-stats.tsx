"use client";

import { CountUp } from "@/components/count-up";
import { lumagerStats } from "@/lib/lumager";

/* Las cifras de su sitio. Van en el hero para que la prueba llegue en la primera pantalla. */
const stats = [
  { to: lumagerStats.projects, plus: true, label: "proyectos" },
  { to: lumagerStats.kw, plus: true, unit: "kW", label: "instalados" },
  { to: lumagerStats.provinces, label: "provincias con obra" },
  { to: lumagerStats.co2, plus: true, unit: "t", label: "de CO₂ evitadas por año", green: true },
];

/** Paso de .lx-rise de la primera cifra: el hero les deja el 5 (antes, titular, bajada y botones). */
const FIRST = 5;

/* Lo mismo que el CSS de .lx-rise: 90 ms por paso y 200 ms de base, más la animación de inicio
   (--intro-delay, que queda en 0 si ya se vio). Se lee al contar, en el navegador. */
const introDelay = () => {
  const root = document.querySelector<HTMLElement>(".lx");
  return root ? parseFloat(getComputedStyle(root).getPropertyValue("--intro-delay")) || 0 : 0;
};
const countDelays = stats.map((_, k) => () => introDelay() + (FIRST + k) * 90 + 200 + 250);

/**
 * Placa de cifras del hero, como la hoja de datos de un módulo: filetes de 1px que se
 * trazan al entrar y números que cuentan cuando su celda ya está a la vista. El HTML
 * trae los valores finales; sin JS o con movimiento reducido quedan quietos.
 */
export function HeroStats({ className = "" }: { className?: string }) {
  return (
    <dl className={`lx-hero-stats grid grid-cols-2 gap-y-6 lg:grid-cols-4 ${className}`}>
      {stats.map((s, k) => {
        return (
          <div
            key={s.label}
            className="lx-hero-stat lx-rise flex flex-col"
            data-tone={s.green ? "green" : undefined}
            style={{ ["--i" as string]: FIRST + k }}
          >
            <dt className="order-2 mt-2 text-sm leading-snug text-[var(--lx-on-dark-muted)]">{s.label}</dt>
            <dd className="order-1 lx-display lx-num text-[clamp(1.6rem,7.6vw,2rem)] leading-none whitespace-nowrap lg:text-[clamp(2rem,3.3vw,3rem)]">
              {s.plus && "+"}
              <CountUp to={s.to} locale="es-AR" duration={1800} delay={countDelays[k]} />
              {s.unit && <span className="lx-hero-unit ml-[0.18em] text-[0.55em] text-[var(--lx-on-dark-muted)]">{s.unit}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
