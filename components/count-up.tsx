"use client";

import { useEffect, useRef } from "react";

/**
 * Cuenta desde 0 hasta `to` la primera vez que entra en pantalla. El HTML del
 * servidor ya trae el valor final (sin JS o con prefers-reduced-motion queda así).
 */
const format = (locale: string | undefined, n: number) => (locale ? n.toLocaleString(locale) : String(n));

export function CountUp({
  to,
  from = 0,
  duration = 1600,
  locale,
  delay = 0,
}: {
  to: number;
  from?: number;
  duration?: number;
  /** Con locale, separa miles ("13.000" en es-AR). */
  locale?: string;
  /** Espera antes de contar (ms), para que el número termine de aparecer. Puede calcularse al montar. */
  delay?: number | (() => number);
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let wait = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let start = 0;
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        el.textContent = format(locale, Math.round(from + (1 - Math.pow(1 - p, 4)) * (to - from)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      el.textContent = format(locale, from);
      const ms = typeof delay === "function" ? delay() : delay;
      wait = window.setTimeout(() => (raf = requestAnimationFrame(tick)), ms);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(wait);
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration, locale, delay]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {format(locale, to)}
    </span>
  );
}
