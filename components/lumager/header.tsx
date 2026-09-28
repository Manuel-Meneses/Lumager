"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { lumager, lumagerCta, lumagerLinks, newsLink } from "@/lib/lumager";

/**
 * La barra es un módulo fotovoltaico: marco de aluminio, celdas iguales separadas por
 * juntas y busbars tenues. La celda de la sección que estás viendo "genera" (marca
 * naranja y luz cálida); al pasar el mouse, un reflejo de sol cruza el vidrio.
 */
export function LumagerHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Scroll-spy: la sección que cruza la franja central de la pantalla enciende su celda.
  useEffect(() => {
    const ids = lumagerLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.id);
          else setCurrent((c) => (c === e.target.id ? null : c));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-6 lg:px-10">
      <div className="lx-module mx-auto max-w-[86rem]" data-solid={solid || open}>
        <a href="#inicio" aria-label={`${lumager.name}, inicio`} className="lx-cell lx-cell-logo">
          <span className="lx-logo" />
        </a>

        <nav aria-label="Principal" className="contents">
          {lumagerLinks.map((l) => {
            const on = current === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "location" : undefined}
                data-on={on}
                className="lx-cell lx-cell-link hidden xl:flex"
              >
                <span className="lx-mark" aria-hidden="true" />
                {l.label}
              </a>
            );
          })}
          <a href={newsLink.href} className="lx-cell lx-cell-link hidden xl:flex">
            <span className="lx-mark" aria-hidden="true" />
            {newsLink.label}
          </a>
        </nav>

        <a href={lumagerCta.href} className="lx-cell lx-cell-cta hidden sm:flex">
          {lumagerCta.label}
          <ArrowRightIcon size={16} weight="bold" className="lx-arrow" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="lx-cell lx-cell-menu xl:hidden"
          aria-expanded={open}
          aria-controls="lx-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {/* Menú de celular: velo y módulo entran con CSS (lx-menu-*), sin librería de animación. */}
      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="lx-menu-veil fixed inset-0 -z-10 bg-[rgb(20_22_21/0.9)] xl:hidden"
          />
          <nav
            id="lx-menu"
            aria-label="Menú"
            className="lx-module lx-module-menu lx-menu-in mx-auto mt-2 max-w-[86rem] xl:hidden"
            data-solid="true"
          >
            {lumagerLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-on={current === l.href.slice(1)}
                className="lx-cell lx-cell-link lx-cell-big lx-menu-item"
                style={{ ["--i" as string]: i }}
              >
                <span className="lx-mark" aria-hidden="true" />
                {l.label}
              </a>
            ))}
            <a
              href={newsLink.href}
              className="lx-cell lx-cell-link lx-cell-big lx-menu-item"
              style={{ ["--i" as string]: lumagerLinks.length }}
            >
              <span className="lx-mark" aria-hidden="true" />
              {newsLink.label}
            </a>
            <a href={lumagerCta.href} onClick={() => setOpen(false)} className="lx-cell lx-cell-cta col-span-2">
              {lumagerCta.label}
              <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
