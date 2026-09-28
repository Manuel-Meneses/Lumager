import type { DrawingPart } from "@/lib/service-drawings";

/**
 * Ilustración de línea que se traza sola cuando `on` pasa a true (ver .lx-drawing en
 * lumager.css). `stagger` retrasa todo el dibujo para encadenar varios.
 */
export function Drawing({
  parts,
  on,
  viewBox = "0 0 400 300",
  stagger = 0,
  className = "",
}: {
  parts: DrawingPart[];
  on: boolean;
  viewBox?: string;
  stagger?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={`lx-drawing ${className}`}
      data-on={on}
      style={{ ["--s" as string]: stagger }}
      aria-hidden="true"
    >
      {parts.map((part, k) => (
        <path
          key={k}
          d={part.d}
          pathLength={1}
          data-c={part.c}
          className={part.f ? "lx-ink lx-ink-fill" : "lx-ink"}
          style={{ ["--k" as string]: k }}
        />
      ))}
    </svg>
  );
}
