import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { lumager, lumagerCta } from "@/lib/lumager";
import { fmtShort, fmtTime, notaHref, notas, yearOf, type Nota } from "@/lib/lumager-noticias";
import { NewsClock } from "./clock";

/**
 * Cabecera del noticiero: una barra de servicio (marca, fecha y hora de San Juan, contacto),
 * el nombre del medio con su hoja de datos y la cinta de últimos titulares.
 */
export function Masthead() {
  // Las notas de ejemplo no cuentan como última nota ni corren en la cinta.
  const reales = notas.filter((n) => !n.ejemplo);
  const latest = reales[0];
  const years = reales.map((n) => yearOf(n.at));

  return (
    <header className="lx-dark lx-n-mast">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="lx-n-bar">
          <a href="/lumager" aria-label={`${lumager.name}, inicio`} className="shrink-0 py-2">
            <span className="lx-logo !h-7 sm:!h-8" />
          </a>
          <NewsClock className="hidden md:flex" />
          <a href={`/lumager${lumagerCta.href}`} className="lx-btn lx-btn-primary !h-10 shrink-0 !px-4 !text-sm">
            <span className="hidden sm:inline">{lumagerCta.label}</span>
            <span className="sm:hidden">Contacto</span>
            <ArrowRightIcon size={15} weight="bold" className="lx-arrow" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-8 pt-10 pb-9 sm:pt-14 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-12">
          <div className="lg:col-span-7">
            <h1 className="lx-display lx-n-name">Noticias</h1>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[var(--lx-on-dark-muted)]">
              Obras, clientes, prensa y el diario de cada proyecto de {lumager.shortName}, contado con lo que la empresa publica.
            </p>
          </div>
          <dl className="lx-n-sheet lg:col-span-5">
            <div>
              <dt>Última nota</dt>
              <dd className="lx-num">
                <time dateTime={latest.at}>
                  {fmtShort(latest.at)}.{yearOf(latest.at)} · {fmtTime(latest.at)}
                </time>
              </dd>
            </div>
            <div>
              <dt>Notas</dt>
              <dd className="lx-num">{reales.length}</dd>
            </div>
            <div>
              <dt>Cobertura</dt>
              <dd className="lx-num">
                {Math.min(...years)}–{Math.max(...years)}
              </dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>Canal de Lumager y prensa</dd>
            </div>
          </dl>
        </div>
      </div>
      <Ticker items={reales.slice(0, 8)} />
    </header>
  );
}

/**
 * La cinta de últimos titulares: cada uno abre su video. Corre sola y se detiene con el
 * mouse o el foco encima; con movimiento reducido queda quieta y se desliza a mano. La copia que cierra el loop
 * es inerte: el lector de pantalla y el teclado recorren una sola vez cada titular.
 */
function Ticker({ items }: { items: Nota[] }) {
  const row = (copy: boolean) => (
    <ul className="lx-n-ticker-row" aria-hidden={copy || undefined} inert={copy || undefined}>
      {items.map((n) => (
        <li key={n.slug}>
          <a href={notaHref(n) ?? undefined} target="_blank" rel="noopener noreferrer" className="lx-n-ticker-item" data-section={n.section}>
            <time dateTime={n.at} className="lx-num">
              {fmtShort(n.at)}
            </time>
            <span>{n.title}</span>
            <span className="sr-only">(video en YouTube, se abre en otra pestaña)</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Últimos titulares" className="lx-n-ticker">
      <p className="lx-n-ticker-label">
        <span className="lx-n-live" aria-hidden="true" />
        Último
      </p>
      <div className="lx-n-ticker-view">
        <div className="lx-n-ticker-track" style={{ ["--n" as string]: items.length }}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
