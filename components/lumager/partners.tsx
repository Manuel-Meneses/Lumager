"use client";

import { clientLogos, financeLogos } from "@/lib/lumager-logos";
import { LogoMark } from "./logo-mark";
import { useReveal } from "./use-reveal";
import { FINANCE_OPEN_EVENT } from "@/lib/lumager";

type Cell = { key: string; logo: Parameters<typeof LogoMark>[0]["id"]; tag: string; href: string; external?: boolean; line?: string };

const cells: Cell[] = [
  ...clientLogos.map((c) => ({
    key: c.logo,
    logo: c.logo,
    tag: "Obra en video",
    href: `https://www.youtube.com/watch?v=${c.video}`,
    external: true,
  })),
  ...financeLogos.map((f) => ({ key: f.logo, logo: f.logo, tag: "Financiamiento", href: "#financiamiento", line: f.line })),
  { key: "bichos-de-campo", logo: "bichos-de-campo", tag: "Prensa", href: "#prensa" },
];

/**
 * En buena compañía: clientes con obra en video, las entidades que financian el parque y
 * la prensa del agro, como un módulo de celdas justo debajo del hero. Al entrar, la luz
 * barre el módulo en diagonal y cada celda se enciende con su logo. Cada celda lleva a
 * lo suyo: el video de la obra, la línea de financiamiento abierta o las entrevistas.
 */
export function Partners() {
  const ref = useReveal<HTMLUListElement>();

  return (
    <section aria-labelledby="lx-partners-title" data-own-entrance className="lx-dark">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12">
        <div className="lg:col-span-3">
          <h2 id="lx-partners-title" className="lx-display text-[clamp(1.75rem,2.6vw,2.4rem)]">
            En buena compañía.
          </h2>
          <p className="mt-4 max-w-[34ch] text-[var(--lx-on-dark-muted)]">
            Clientes con obra en video, las entidades con las que podés financiar tu parque y la prensa del agro que
            contó nuestros proyectos.
          </p>
        </div>

        <ul ref={ref} className="lx-partners grid grid-cols-2 sm:grid-cols-5 lg:col-span-9">
          {cells.map((c, i) => (
            <li key={c.key} style={{ ["--i" as string]: i }}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={
                  c.line
                    ? (e) => {
                        // La sección se encarga: abre la fila y la trae al centro de la pantalla.
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent(FINANCE_OPEN_EVENT, { detail: c.line }));
                      }
                    : undefined
                }
                className="lx-partner"
              >
                <LogoMark id={c.logo} size={30} max={1.7} className="lx-partner-logo" />
                <span className="lx-partner-tag">
                  <span className="lx-mark" aria-hidden="true" />
                  {c.tag}
                </span>
                {c.external && <span className="sr-only">(ver el video en YouTube, se abre en otra pestaña)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
