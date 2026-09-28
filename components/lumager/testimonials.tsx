"use client";

import { pressInterviews, testimonials } from "@/lib/lumager-videos";
import { VideoPlayer } from "./video-player";
import { LogoMark } from "./logo-mark";
import { useReveal } from "./use-reveal";

/**
 * Testimonios en video de clientes reales, tomados del canal de Lumager. La cita es el
 * subtítulo que el propio video muestra; si el video no muestra uno, no hay cita.
 * Abajo, las entrevistas que el medio agropecuario Bichos de Campo les hizo a clientes.
 */
export function Testimonials() {
  const list = useReveal<HTMLUListElement>();

  return (
    <section id="testimonios" aria-labelledby="lx-voices-title" data-own-entrance className="relative mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      {/* Hilo que baja desde las obras hasta las voces; se traza con el scroll. */}
      <span aria-hidden="true" className="lx-thread" />
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id="lx-voices-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)] lg:col-span-7">
          Lo cuentan ellos.
        </h2>
        <p className="max-w-[42ch] text-lg text-[var(--lx-muted)] lg:col-span-5">
          Ernesto, Jeremías, Gustavo y María Laura cuentan, en sus palabras, cómo fue trabajar con Lumager.
        </p>
      </div>

      <ul ref={list} className="lx-voices mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-y-20">
        {testimonials.map((t, i) => (
          <li key={t.video.id} style={{ ["--i" as string]: i }}>
            <figure className="flex gap-5 sm:gap-7">
              <VideoPlayer video={t.video} sizes="(min-width: 1024px) 13rem, 40vw" className="lx-voice-video w-[42%] max-w-[13rem] shrink-0" />
              <div className="lx-rule lx-rule-orange flex min-w-0 flex-1 flex-col pt-5">
                {t.quote ? (
                  <blockquote className="text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty">
                    “{t.quote}”
                  </blockquote>
                ) : (
                  <p className="text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.3] tracking-[-0.01em] text-pretty text-[var(--lx-muted)]">
                    {t.context}
                  </p>
                )}
                <figcaption className="mt-auto pt-6">
                  <p className="lx-wide font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--lx-muted)]">{t.role}</p>
                  {t.quote && <p className="mt-3 text-sm leading-snug text-[var(--lx-muted)]">{t.context}</p>}
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>

      <div id="prensa" className="mt-20 grid scroll-mt-24 gap-10 border-t border-[var(--lx-line)] pt-12 lg:mt-28 lg:grid-cols-12 lg:gap-10 lg:pt-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <LogoMark id="bichos-de-campo" size={26} className="text-[var(--lx-ink)]" />
          <h3 className="lx-wide mt-6 text-2xl font-semibold tracking-[-0.01em]">En Bichos de Campo.</h3>
          <p className="mt-4 max-w-[36ch] text-[var(--lx-muted)]">
            El medio del agro entrevistó a clientes de Lumager sobre sus sistemas solares.
          </p>
          <p className="lx-swipe-hint mt-5">Deslizá para ver las {pressInterviews.length} entrevistas</p>
        </div>
        {/* En celular, carril horizontal (lx-mrail): cuatro videos apilados eran una pantalla y media. */}
        <ul className="lx-mrail grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {pressInterviews.map((p) => (
            <li key={p.video.id}>
              <VideoPlayer video={p.video} sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 84vw" />
              <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 border-t border-[var(--lx-line)] pt-3">
                <span className="font-semibold">{p.name}</span>
                <span className="text-sm text-[var(--lx-muted)]">{p.detail}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
