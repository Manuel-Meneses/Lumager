import { sectionLabel, type SectionId } from "@/lib/lumager-noticias";

/** Sección de una nota: un cuadrado con el tono de la sección y su nombre. */
export function SectionTag({ id, className = "" }: { id: SectionId; className?: string }) {
  return (
    <span className={`lx-n-tag ${className}`} data-section={id}>
      {sectionLabel(id)}
    </span>
  );
}

/** Marca de nota de ejemplo: se ve en el cable, la portada y la nota misma. */
export function ExampleMark() {
  return <span className="lx-n-example">Ejemplo</span>;
}
