import { logos, type LogoId } from "@/lib/lumager-logos";

/**
 * Logo en silueta, pintado con currentColor a través de una máscara: toma el color de
 * donde esté (tinta sobre papel, papel sobre grafito). La altura compensa la proporción
 * para que todos pesen parecido: un logo largo baja, un emblema cuadrado sube.
 * `size` es la altura que tendría un logo de proporción 3:1.
 */
export function LogoMark({
  id,
  size = 34,
  max = 1.5,
  className = "",
}: {
  id: LogoId;
  size?: number;
  /** Tope de altura, en múltiplos de `size`. */
  max?: number;
  className?: string;
}) {
  const l = logos[id];
  const ratio = l.w / l.h;
  const h = Math.min(size * max, Math.sqrt((size * size * 3) / ratio));
  return (
    <span
      role="img"
      aria-label={l.name}
      className={`lx-logo-mark ${className}`}
      style={{
        ["--logo" as string]: `url(/lumager/logos/${l.id}.png)`,
        height: `${(h / 16).toFixed(3)}rem`,
        aspectRatio: String(ratio),
      }}
    />
  );
}
