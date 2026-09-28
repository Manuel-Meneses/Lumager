"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Carril horizontal: estado de las flechas según la posición, arrastre con mouse (el táctil
 * ya desliza de forma nativa) y avance de a una tarjeta. Mientras arrastra, el carril lleva
 * data-dragging para que el CSS corte el snap y los clics de las tarjetas.
 */
export function useRail(track: RefObject<HTMLElement | null>, gap = 24) {
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let x0 = 0;
    let left0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      left0 = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.dataset.dragging = "true";
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = left0 - dx;
    };
    const onUp = () => {
      down = false;
      delete el.dataset.dragging;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [track]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return { edge, go };
}
