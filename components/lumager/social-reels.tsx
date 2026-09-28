"use client";

import { useRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { socials } from "@/lib/lumager";
import { reels } from "@/lib/lumager-videos";
import { useRail } from "./use-rail";
import { VideoPlayer } from "./video-player";

const icons = { Instagram: InstagramLogoIcon, LinkedIn: LinkedinLogoIcon, YouTube: YoutubeLogoIcon, Facebook: FacebookLogoIcon } as const;

/**
 * Lo que publican en redes: el diario de obra por episodios y otros reels, en un carril
 * que se recorre como la galería. Cada reel se reproduce ahí mismo.
 */
export function SocialReels() {
  const track = useRef<HTMLUListElement>(null);
  const { edge, go } = useRail(track, 20);

  return (
    <section aria-labelledby="lx-reels-title" className="lx-dark overflow-hidden py-24 sm:py-32">
      <div className="mx-auto flex max-w-[88rem] flex-wrap items-end justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <div>
          <h2 id="lx-reels-title" className="lx-display text-[clamp(2.25rem,5vw,4rem)]">
            Seguí la obra.
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-[var(--lx-on-dark-muted)]">
            En redes mostramos la obra etapa por etapa: de la estación transformadora a la puesta en marcha.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Videos anteriores" className="lx-gal-nav">
            <ArrowLeftIcon size={20} weight="bold" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Videos siguientes" className="lx-gal-nav">
            <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul ref={track} className="lx-gal-track lx-reel-track mt-14" aria-label="Videos de obra">
        {reels.map((r) => (
          <li key={r.video.id} className="lx-reel">
            <VideoPlayer video={r.video} sizes="17rem" />
            <p className="mt-4 text-[0.72rem] tracking-[0.12em] text-[var(--lx-on-dark-muted)] uppercase">{r.tag}</p>
            <p className="lx-wide mt-1 text-lg leading-snug font-semibold text-balance">{r.title}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 flex max-w-[88rem] flex-wrap items-center gap-x-6 gap-y-4 px-5 sm:px-8 lg:px-12">
        <p className="text-[var(--lx-on-dark-muted)]">
          Seguinos como <span className="font-semibold text-[var(--lx-on-dark)]">@lumager.energia</span>
        </p>
        <ul className="flex flex-wrap gap-2">
          {socials.map((s) => {
            const Icon = icons[s.label as keyof typeof icons];
            return (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="lx-btn lx-btn-line lx-social-btn">
                  <Icon size={18} aria-hidden="true" />
                  {s.label}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
