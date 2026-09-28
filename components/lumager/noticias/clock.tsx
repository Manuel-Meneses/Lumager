"use client";

import { useEffect, useState } from "react";

const TZ = "America/Argentina/San_Juan";

/**
 * Fecha y hora de San Juan, como la cabecera de un diario del día. Se calcula en el
 * navegador (el servidor no sabe cuándo mira cada uno) y se actualiza cada minuto.
 */
export function NewsClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const day = now
    ? new Intl.DateTimeFormat("es-AR", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)
    : "";
  const time = now ? new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(now) : "--:--";

  return (
    <p className={`lx-n-clock ${className}`} data-ready={!!now}>
      <span className="first-letter:uppercase">{day}</span>
      <span className="lx-num">
        San Juan <time>{time}</time>
      </span>
    </p>
  );
}
