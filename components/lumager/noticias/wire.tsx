"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { fmtMonth, fmtShort, fmtTime, notaHref, notaImage, notas, sections, type SectionId } from "@/lib/lumager-noticias";
import { ExampleMark, SectionTag } from "./tag";

type Filter = SectionId | "todo";

/**
 * El cable: todas las notas en filas densas, de la más nueva a la más vieja, agrupadas
 * por mes. Cada fila abre su video en YouTube; las notas de ejemplo no llevan a ningún lado. Filtrar por sección vuelve a "imprimir" las filas de izquierda a derecha,
 * como un teletipo; la primera carga no se anima (el contenido ya está a la vista).
 */
export function Wire() {
  const [filter, setFilter] = useState<Filter>("todo");
  const [printed, setPrinted] = useState(0);

  const list = filter === "todo" ? notas : notas.filter((n) => n.section === filter);
  const months: { label: string; items: typeof notas }[] = [];
  for (const n of list) {
    const label = fmtMonth(n.at);
    const last = months.at(-1);
    if (last?.label === label) last.items.push(n);
    else months.push({ label, items: [n] });
  }

  const choose = (f: Filter) => {
    if (f === filter) return;
    setFilter(f);
    setPrinted((p) => p + 1);
  };

  const options: { id: Filter; label: string; count: number }[] = [
    { id: "todo", label: "Todo", count: notas.length },
    ...sections.map((s) => ({ id: s.id, label: s.label, count: notas.filter((n) => n.section === s.id).length })),
  ];

  let i = 0;

  return (
    <section id="cable" aria-labelledby="lx-n-cable-title" className="scroll-mt-4">
      <div className="lx-n-filters">
        <div className="mx-auto flex max-w-[88rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <h2 id="lx-n-cable-title" className="lx-wide hidden shrink-0 text-lg font-semibold lg:block">
            Cable
          </h2>
          <div role="group" aria-label="Filtrar por sección" className="lx-n-filter-row">
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={filter === o.id}
                onClick={() => choose(o.id)}
                className="lx-n-filter"
                data-section={o.id}
              >
                {o.label}
                <span className="lx-num">{o.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <p className="sr-only" aria-live="polite">
          {list.length} notas en {options.find((o) => o.id === filter)!.label}
        </p>
        <div key={printed} className="lx-n-list" data-print={printed > 0 || undefined}>
          {months.map((m) => (
            <section key={m.label} aria-label={m.label}>
              <h3 className="lx-n-month">
                <span>{m.label}</span>
                <span className="lx-n-month-meta lx-num">
                  {/* Mezcla de secciones del mes: un segmento por nota, en el tono de su sección. */}
                  <span className="lx-n-mix" aria-hidden="true">
                    {m.items.map((n) => (
                      <span key={n.slug} data-section={n.section} />
                    ))}
                  </span>
                  {m.items.length} {m.items.length === 1 ? "nota" : "notas"}
                </span>
              </h3>
              <ol>
                {m.items.map((n) => {
                  const img = notaImage(n);
                  const url = notaHref(n);
                  const inner = (
                    <>
                      <time dateTime={n.at} className="lx-n-row-date lx-num">
                        <span>{fmtShort(n.at)}</span>
                        <span>{fmtTime(n.at)}</span>
                      </time>
                      <span className="lx-n-row-section">
                        <SectionTag id={n.section} />
                        {n.ejemplo && <ExampleMark />}
                      </span>
                      <span className="lx-n-row-text">
                        <span className="lx-n-row-title">{n.title}</span>
                        <span className="lx-n-row-dek">{n.dek}</span>
                      </span>
                      <span className="lx-n-row-figure lx-num">{n.figure}</span>
                      <span className="lx-n-row-thumb">
                        {img && <Image src={img} alt="" fill sizes="8rem" className={`object-cover ${n.pos ?? ""}`} />}
                      </span>
                    </>
                  );
                  const props = { className: "lx-n-row", "data-section": n.section, style: { ["--i" as string]: i++ } };
                  return (
                    <li key={n.slug}>
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
                          {inner}
                          <ArrowUpRightIcon size={18} className="lx-n-row-arrow" aria-hidden="true" />
                          <span className="sr-only">(video en YouTube, se abre en otra pestaña)</span>
                        </a>
                      ) : (
                        <div {...props}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
