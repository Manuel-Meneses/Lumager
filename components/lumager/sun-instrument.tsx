"use client";

import { useEffect, useState } from "react";
import { sunSite } from "@/lib/lumager";
import { hhmm, sunState, type SunState } from "@/lib/sun";

const W = 280;
const H = 64;
// Semielipse del día: de la salida (izquierda) a la puesta (derecha).
const arc = `M 6 ${H} A ${W / 2 - 6} ${H - 8} 0 0 1 ${W - 6} ${H}`;

function pointAt(t: number) {
  const a = Math.PI * (1 - t);
  return { x: W / 2 + (W / 2 - 6) * Math.cos(a), y: H - (H - 8) * Math.sin(a) };
}

/**
 * El sol sobre Pocito ahora mismo: hora local, altura calculada y su lugar en el arco
 * del día. Se calcula en el navegador (el servidor no sabe la hora de quien mira) y se
 * actualiza una vez por minuto.
 */
export function SunInstrument() {
  const [sun, setSun] = useState<SunState | null>(null);

  useEffect(() => {
    const tick = () => setSun(sunState(new Date(), sunSite.lat, sunSite.lon, sunSite.utcOffset));
    const first = window.setTimeout(tick, 50);
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const day = sun ? sun.progress >= 0 && sun.progress <= 1 : false;
  const t = sun ? Math.min(1, Math.max(0, sun.progress)) : 0;
  // De noche: bajo el horizonte, en el borde por donde sale (antes del amanecer) o se puso, a su profundidad real.
  const below = sun && !day ? Math.min(10, (-sun.elevation / 90) * 30) + 4 : 0;
  const p = day ? pointAt(t) : { x: sun && sun.progress > 1 ? W - 26 : 26, y: H + below };

  return (
    <figure className="w-full max-w-[24rem] text-[var(--lx-on-dark)]" aria-live="off">
      <svg viewBox={`0 -4 ${W} ${H + 22}`} className="w-full overflow-visible" aria-hidden="true">
        <path d={arc} fill="none" stroke="rgb(243 244 241 / 0.28)" strokeWidth="1" strokeDasharray="2 4" />
        <path
          d={arc}
          fill="none"
          stroke="var(--lx-orange)"
          strokeWidth="1.5"
          pathLength={1}
          className="lx-sun-arc"
          style={{ strokeDashoffset: sun ? 1 - t : 1 }}
        />
        <line x1="0" y1={H} x2={W} y2={H} stroke="rgb(243 244 241 / 0.4)" strokeWidth="1" />
        <g
          className="lx-sun-dot"
          style={{ transform: `translate(${sun ? p.x : 6}px, ${sun ? p.y : H}px)`, opacity: sun ? (day ? 1 : 0.6) : 0 }}
        >
          <circle r="11" fill="var(--lx-orange)" opacity="0.18" />
          <circle r="5" fill="var(--lx-orange)" />
        </g>
      </svg>
      <figcaption className="mt-1 grid grid-cols-[auto_1fr_auto] items-baseline gap-3 text-sm text-[var(--lx-on-dark-muted)]">
        <span className="lx-num">{sun ? hhmm(sun.sunrise) : "--:--"}</span>
        <span className="lx-num text-center whitespace-nowrap text-[var(--lx-on-dark)]">
          {sun ? (day ? `Sol a ${Math.max(0, Math.round(sun.elevation))}° · ${hhmm(sun.now)}` : `Amanece ${hhmm(sun.sunrise)} · ${hhmm(sun.now)}`) : ""}
        </span>
        <span className="lx-num">{sun ? hhmm(sun.sunset) : "--:--"}</span>
        <span className="col-span-3 text-center text-xs">{sunSite.name}, ahora</span>
      </figcaption>
    </figure>
  );
}
