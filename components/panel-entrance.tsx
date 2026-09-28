"use client";

import { useEffect } from "react";

/**
 * Entrada de secciones como un panel que se enciende: cada sección (menos el hero)
 * arranca tapada por una grilla de celdas de su mismo color, con juntas de 1px.
 * Al entrar en pantalla la luz la barre en diagonal desde arriba a la izquierda,
 * como el sol: cada celda toma un destello azul y se retira, destapando el contenido.
 *
 * Sin JavaScript o con prefers-reduced-motion no se agrega nada y todo se ve tal cual.
 * Las secciones que ya están en pantalla al cargar no se tapan (sin parpadeo), ni las que
 * traen su propia entrada (data-own-entrance).
 */
const STEP_MS = 28; // desfase entre diagonales
const MAX_DELAY_MS = 900; // tope para secciones muy altas
const CELL_MS = 480;

function cellSize(width: number) {
  return width < 640 ? 72 : width < 1024 ? 96 : 120;
}

/** Primer color de fondo no transparente subiendo por el árbol. */
function surfaceColor(el: Element) {
  for (let node: Element | null = el; node; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg)) return bg;
  }
  return getComputedStyle(document.body).backgroundColor;
}

function buildVeil(section: HTMLElement) {
  const { width, height } = section.getBoundingClientRect();
  const size = cellSize(window.innerWidth);
  const cols = Math.max(1, Math.round(width / size));
  // Celdas de píxeles enteros: con fracciones quedan rendijas por donde se ve el contenido.
  const cell = Math.ceil(width / cols);
  const rows = Math.max(1, Math.ceil(height / cell));

  const veil = document.createElement("div");
  veil.className = "panel-veil";
  veil.setAttribute("aria-hidden", "true");
  veil.style.setProperty("--cols", String(cols));
  veil.style.setProperty("--cell", `${cell}px`);
  veil.style.setProperty("--veil-bg", surfaceColor(section));

  const frag = document.createDocumentFragment();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const span = document.createElement("span");
      span.style.setProperty("--d", `${Math.min((r + c) * STEP_MS, MAX_DELAY_MS)}ms`);
      frag.appendChild(span);
    }
  }
  veil.appendChild(frag);
  return veil;
}

export function PanelEntrance() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const veils = new Map<Element, HTMLElement>();
    let near: IntersectionObserver | null = null;
    let lit: IntersectionObserver | null = null;

    // Arranca cuando el navegador queda libre (después de la intro y la hidratación) y arma
    // cada grilla recién cuando su sección está a una pantalla y media de aparecer: así no
    // se crean miles de celdas de una vez mientras corre la animación de inicio.
    const start = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section:not(#inicio):not([data-own-entrance])"),
      ).filter((s) => s.getBoundingClientRect().top > window.innerHeight);

      lit = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const veil = veils.get(entry.target);
            if (!veil) continue;
            lit?.unobserve(entry.target);
            veils.delete(entry.target);
            veil.classList.add("is-lit");
            window.setTimeout(() => veil.remove(), MAX_DELAY_MS + CELL_MS + 100);
          }
        },
        { rootMargin: "0px 0px -18% 0px" },
      );

      near = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const section = entry.target as HTMLElement;
            near?.unobserve(section);
            if (getComputedStyle(section).position === "static") section.style.position = "relative";
            const veil = buildVeil(section);
            section.appendChild(veil);
            veils.set(section, veil);
            lit?.observe(section);
          }
        },
        { rootMargin: "0px 0px 150% 0px" },
      );
      sections.forEach((s) => near?.observe(s));
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      near?.disconnect();
      lit?.disconnect();
      veils.forEach((veil) => veil.remove());
    };
  }, []);

  return null;
}
