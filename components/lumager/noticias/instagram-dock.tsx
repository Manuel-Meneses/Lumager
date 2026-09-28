"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon, CaretDownIcon, InstagramLogoIcon, PlayIcon } from "@phosphor-icons/react";
import { instagram, type InstagramFeed } from "@/lib/lumager-instagram";

const compact = new Intl.NumberFormat("es-AR", { notation: "compact", compactDisplay: "long", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("es-AR");

/**
 * CTA de Instagram en la esquina inferior derecha. Cerrado es una tarjeta con las últimas
 * miniaturas; abierto, un panel con la grilla de publicaciones y el botón para seguir.
 * No es un diálogo: no atrapa el foco, se cierra con Escape o tocando afuera.
 */
export function InstagramDock({ feed }: { feed: InstagramFeed }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const peek = feed.posts.slice(0, 3);
  const title = feed.live ? "Últimas publicaciones" : "Seguí la obra en Instagram";

  return (
    <aside ref={root} className="lx-ig" data-open={open} aria-label={`Instagram de Lumager, @${instagram.handle}`}>
      <div id="lx-ig-panel" className="lx-ig-panel" inert={!open || undefined}>
        <div className="lx-ig-head">
          <span className="lx-ig-avatar" aria-hidden="true">
            <span>
              <span className="lx-logo" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">@{instagram.handle}</p>
            <p className="lx-num text-sm text-[var(--lx-on-dark-muted)]">
              <span title={`${whole.format(feed.followers)} seguidores`}>{compact.format(feed.followers)} seguidores</span>
              {" · "}
              {whole.format(feed.postsCount)} publicaciones
            </p>
          </div>
          <button
            type="button"
            className="lx-ig-close"
            aria-label="Cerrar Instagram"
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
          >
            <CaretDownIcon size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <p className="lx-ig-label">{feed.live ? "Últimas publicaciones" : "Nuestras obras, todos los días en Instagram"}</p>
        <ul className="lx-ig-grid">
          {feed.posts.slice(0, 6).map((p) => (
            <li key={p.id}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="lx-ig-tile" title={p.caption}>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="7rem"
                  unoptimized={p.remote}
                  className="object-cover"
                />
                {p.video && (
                  <span className="lx-ig-video" aria-hidden="true">
                    <PlayIcon size={12} weight="fill" />
                  </span>
                )}
                <span className="sr-only">
                  {p.caption} (se abre Instagram en otra pestaña)
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="lx-ig-follow">
          <InstagramLogoIcon size={20} weight="bold" aria-hidden="true" />
          Seguir a @{instagram.handle}
          <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" className="ml-auto" />
          <span className="sr-only">(se abre en otra pestaña)</span>
        </a>
      </div>

      <button
        ref={toggle}
        type="button"
        className="lx-ig-toggle"
        aria-expanded={open}
        aria-controls="lx-ig-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lx-ig-peek" aria-hidden="true">
          {peek.map((p) => (
            <span key={p.id}>
              <Image src={p.image} alt="" fill sizes="2.5rem" unoptimized={p.remote} className="object-cover" />
            </span>
          ))}
        </span>
        <span className="lx-ig-toggle-text">
          <span className="font-semibold">{title}</span>
          <span className="text-[var(--lx-on-dark-muted)]">@{instagram.handle}</span>
        </span>
        <span className="lx-ig-mark" aria-hidden="true">
          <InstagramLogoIcon size={24} weight="bold" />
        </span>
        <span className="sr-only">{open ? "Cerrar" : "Abrir"} Instagram de Lumager</span>
      </button>
    </aside>
  );
}
