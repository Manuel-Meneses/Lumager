"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react";
import { FINANCE_OPEN_EVENT, financeLines, prefillContact, type FinanceLine } from "@/lib/lumager";
import { CountUp } from "../count-up";
import { LogoMark } from "./logo-mark";
import { useReveal } from "./use-reveal";

const lineLabel = (l: FinanceLine) => (l.program ? `${l.entity}, ${l.program}` : l.entity);

/**
 * Financiá tu parque solar: las líneas que Lumager publica en sus piezas, como un listado
 * comparable. Cada fila abre sus condiciones completas; el dato fuerte de la fila abierta
 * se enciende sobre una placa naranja, como en sus posts, y los logos van en cajas blancas
 * como en sus piezas. Al entrar, los filetes de las filas se trazan de arriba abajo y los
 * datos cuentan hasta su valor. Consultar una línea lleva al formulario con el
 * financiamiento ya elegido; las celdas de bancos de "En buena compañía" abren su fila.
 */
export function Financing() {
  const [open, setOpen] = useState<number | null>(0);
  const list = useReveal<HTMLUListElement>();

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const i = financeLines.findIndex((l) => l.id === id);
      if (i < 0) return;
      setOpen(i);
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        document.getElementById(`lx-fin-${id}`)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" }),
      );
    };
    window.addEventListener(FINANCE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(FINANCE_OPEN_EVENT, onOpen);
  }, []);

  return (
    <section id="financiamiento" aria-labelledby="lx-fin-title" data-own-entrance>
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="lx-fin-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Financiá tu parque solar.
          </h2>
          <p className="max-w-[44ch] text-lg text-[var(--lx-muted)] lg:col-span-5">
            Energía solar para industrias y agro, con líneas de Santander, Banco Nación, CFI y Fiduciaria San Juan.
            Compará y te ayudamos a elegir la mejor opción.
          </p>
        </div>

        {/* Encabezados de columna: solo en escritorio, cada fila repite su etiqueta para lectores. */}
        <div
          aria-hidden="true"
          className="mt-14 hidden grid-cols-12 gap-6 pb-3 text-sm font-semibold text-[var(--lx-muted)] lg:mt-20 lg:grid"
        >
          <span className="col-span-4 pl-[22px]">Entidad</span>
          <span className="col-span-3">Dato clave</span>
          <span className="col-span-2">Plazo máximo</span>
          <span className="col-span-2">Gracia</span>
        </div>

        <ul ref={list} className="lx-fin-list mt-10 lg:mt-0">
          {financeLines.map((l, i) => {
            const isOpen = open === i;
            return (
              <li key={l.id} className="lx-service lx-fin" data-on={isOpen} style={{ ["--i" as string]: i }}>
                <h3>
                  <button
                    type="button"
                    id={`lx-fin-${l.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`lx-fin-panel-${l.id}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-6 text-left lg:grid-cols-12 lg:py-7"
                  >
                    <span className="flex items-center gap-3 lg:col-span-4">
                      <span className="lx-mark" aria-hidden="true" />
                      <span className="lx-fin-logo" aria-hidden="true">
                        <LogoMark id={l.logo} size={20} max={1.6} />
                      </span>
                      <span className="min-w-0">
                        <span className="lx-service-title lx-wide block text-[1.35rem] font-semibold tracking-[-0.01em] sm:text-2xl">
                          {l.entity}
                        </span>
                        {(l.program || l.scope) && (
                          <span className="mt-1 block text-[0.95rem] text-[var(--lx-muted)]">{l.program ?? l.scope}</span>
                        )}
                      </span>
                    </span>

                    <span className="col-start-1 row-start-2 flex items-baseline gap-3 pl-[22px] lg:col-span-3 lg:col-start-5 lg:row-start-1 lg:pl-0">
                      <span className="lx-fin-key lx-num lx-wide text-[clamp(1.75rem,2.6vw,2.4rem)] leading-none font-semibold">
                        <CountUp to={l.key.value} duration={1200} />
                        {l.key.unit}
                      </span>
                      <span className="text-sm text-[var(--lx-muted)]">{l.key.label}</span>
                    </span>

                    <span className="lx-num hidden font-medium lg:col-span-2 lg:block">
                      <span className="sr-only">Plazo máximo: </span>
                      {l.term}
                    </span>
                    <span className="lx-num hidden font-medium lg:col-span-2 lg:block">
                      <span className="sr-only">Gracia: </span>
                      {l.grace}
                    </span>

                    <PlusIcon
                      size={22}
                      aria-hidden="true"
                      className="lx-service-icon col-start-2 row-start-1 justify-self-end lg:col-span-1 lg:col-start-12"
                    />
                  </button>
                </h3>

                <div
                  id={`lx-fin-panel-${l.id}`}
                  role="region"
                  aria-labelledby={`lx-fin-${l.id}`}
                  className="lx-service-panel"
                  data-open={isOpen}
                  inert={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-8 pl-[22px] lg:grid-cols-12 lg:gap-6 lg:pl-0">
                      <dl className="lg:col-span-5 lg:col-start-5">
                        {l.conditions.map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-baseline justify-between gap-6 border-t border-[var(--lx-line)] py-3 first:border-t-0 first:pt-0"
                          >
                            <dt className="text-[var(--lx-muted)]">{k}</dt>
                            <dd className="lx-num text-right font-semibold">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="flex flex-col items-start gap-3 lg:col-span-3 lg:col-start-10">
                        <button
                          type="button"
                          onClick={() => prefillContact({ financia: "Sí", linea: lineLabel(l) })}
                          className="lx-btn lx-btn-primary"
                        >
                          Consultar esta línea
                          <ArrowRightIcon size={18} weight="bold" className="lx-arrow" aria-hidden="true" />
                        </button>
                        <p className="text-sm text-[var(--lx-muted)]">Te llevamos al formulario con la línea elegida.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="lx-display text-[clamp(1.75rem,3.2vw,2.75rem)]">Potenciá tu producción.</p>
            <p className="mt-4 max-w-[46ch] text-lg text-[var(--lx-muted)]">
              ¿No sabés cuál te conviene? Contanos tu proyecto y te ayudamos a elegir la mejor opción.
            </p>
            <button
              type="button"
              onClick={() => prefillContact({ financia: "Quiero asesoramiento" })}
              className="lx-btn lx-btn-ink mt-8"
            >
              Te ayudamos a elegir
              <ArrowRightIcon size={18} weight="bold" className="lx-arrow" aria-hidden="true" />
            </button>
          </div>
          <p className="max-w-[52ch] text-sm leading-relaxed text-[var(--lx-muted)] lg:col-span-4 lg:col-start-9 lg:self-end">
            Condiciones informadas por cada entidad, sujetas a aprobación crediticia y a cambios: consultanos la vigencia
            antes de decidir. TNA es tasa nominal anual. TAMAR y BADLAR son tasas de referencia que publica el Banco
            Central; en un crédito UVA el capital se ajusta por inflación.
          </p>
        </div>
      </div>
    </section>
  );
}
