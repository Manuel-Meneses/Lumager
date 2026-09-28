"use client";

import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { clients, moreClients, watchUrl, youtubeChannel, type Client } from "@/lib/lumager-videos";
import { VideoPlayer } from "./video-player";
import { useReveal } from "./use-reveal";

/* Las obras que publican su potencia van en grande; el resto, en el registro de abajo. */
const cases = clients.filter((c) => c.kw);
const others = clients.filter((c) => !c.kw);
const maxKw = Math.max(...cases.map((c) => c.kw ?? 0));

/**
 * Una obra con nombre propio: su video en grande (se reproduce ahí mismo), el cliente, su
 * rubro y la potencia. El filete naranja mide la potencia contra la obra más grande de la
 * lista, así la escala se lee de un vistazo; se carga al entrar, como un medidor.
 */
function Case({ c, i, lead = false }: { c: Client; i: number; lead?: boolean }) {
  return (
    <article
      className={`lx-case flex flex-col ${lead ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}`}
      style={{ ["--i" as string]: i, ["--kw" as string]: (c.kw ?? 0) / maxKw }}
    >
      <VideoPlayer
        video={c.video}
        sizes={lead ? "(min-width: 1024px) 50rem, 100vw" : "(min-width: 1024px) 36rem, 100vw"}
        frame={lead ? "aspect-[4/3] lg:aspect-auto lg:min-h-[26rem] lg:flex-1" : "aspect-video"}
        pos={c.pos}
        poster={c.poster}
      />
      <div className="lx-case-meter mt-5" aria-hidden="true">
        <span />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <h3 className={`lx-wide min-w-0 font-semibold tracking-[-0.01em] ${lead ? "text-[clamp(1.5rem,2.4vw,2.25rem)]" : "text-2xl"}`}>
          {c.name}
        </h3>
        <p
          className={`lx-case-figure lx-display lx-num shrink-0 ${lead ? "text-[clamp(2.25rem,4.4vw,4rem)]" : "text-[clamp(1.9rem,3vw,2.75rem)]"}`}
        >
          {c.figure}
        </p>
      </div>
      <p className="mt-2 max-w-[50ch] text-[var(--lx-muted)]">
        <span className="font-semibold text-[var(--lx-ink)]">{c.sector}.</span> {c.work}.
      </p>
    </article>
  );
}

/**
 * Clientes con nombre propio. Arriba, las tres obras que publican su potencia, con su video
 * a la vista y la escala comparada; abajo, el registro del resto con su portada, cada una
 * abre su video en YouTube.
 */
export function Clients() {
  const grid = useReveal<HTMLDivElement>();

  return (
    <section id="clientes" aria-labelledby="lx-clients-title" data-own-entrance>
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="lx-clients-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
            Con nombre propio.
          </h2>
          <p className="max-w-[44ch] text-lg text-[var(--lx-muted)] lg:col-span-5">
            Industrias, productores, instituciones y cooperativas que eligieron a Lumager. Cada obra, con su video.
          </p>
        </div>

        <div ref={grid} className="lx-cases mt-14 grid gap-x-10 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:gap-y-14">
          {cases.map((c, i) => (
            <Case key={c.name} c={c} i={i} lead={i === 0} />
          ))}
        </div>

        <div className="mt-24 lg:mt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h3 className="lx-wide text-xl font-semibold tracking-[-0.01em]">Más obras en video</h3>
            <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className="lx-link inline-flex items-center gap-1.5 font-semibold">
              Todas en YouTube
              <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </div>
          <ul className="lx-more-list mt-6 grid lg:grid-cols-2 lg:gap-x-10">
            {others.map((c) => (
              <li key={c.name}>
                <a
                  href={watchUrl(c.video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lx-more grid grid-cols-[7rem_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[9.5rem_1fr_auto] sm:gap-6"
                >
                  <span className="lx-more-thumb relative aspect-video overflow-hidden bg-[var(--lx-ink)]">
                    <Image
                      src={`/lumager/videos/${c.video.id}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 9.5rem, 7rem"
                      className={`object-cover ${c.pos ?? ""}`}
                    />
                    <span className="lx-more-time lx-num">{c.video.duration}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="lx-wide block text-lg leading-tight font-semibold">{c.name}</span>
                    <span className="mt-1 block text-sm leading-snug text-[var(--lx-muted)]">
                      {c.sector}. {c.work}.
                    </span>
                  </span>
                  <ArrowUpRightIcon size={18} weight="bold" className="lx-more-arrow text-[var(--lx-muted)]" aria-hidden="true" />
                  <span className="sr-only">(ver el video en YouTube, se abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[var(--lx-muted)]">También con obra en video: {moreClients.join(", ")}.</p>
        </div>
      </div>
    </section>
  );
}
