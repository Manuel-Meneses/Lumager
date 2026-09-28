"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@phosphor-icons/react";
import type { Video } from "@/lib/lumager-videos";

const PLAY_EVENT = "lx-video-play";

/**
 * Video de YouTube liviano: hasta que lo tocás es solo la portada (local, optimizada).
 * Al reproducir monta el reproductor sin cookies con autoplay y pausa, desmontándolo,
 * cualquier otro video de la página que estuviera sonando.
 */
export function VideoPlayer({
  video,
  sizes,
  className = "",
  priority = false,
  frame,
  pos = "",
  poster,
}: {
  video: Video;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Clases de tamaño que reemplazan la proporción del video (la portada se recorta). */
  frame?: string;
  /** Encuadre de la portada recortada (object-position). */
  pos?: string;
  /** Otra portada local en lugar de /lumager/videos/<id>.jpg. */
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const onOther = (e: Event) => (e as CustomEvent<string>).detail !== video.id && setPlaying(false);
    window.addEventListener(PLAY_EVENT, onOther);
    return () => window.removeEventListener(PLAY_EVENT, onOther);
  }, [playing, video.id]);

  const play = () => {
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video.id }));
    setPlaying(true);
  };

  return (
    <div
      className={`lx-video relative overflow-hidden bg-[#111312] ${frame ?? (video.vertical ? "aspect-[9/16]" : "aspect-video")} ${className}`}
      data-shape={video.vertical ? "tall" : "wide"}
      data-playing={playing}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={play} className="lx-video-poster group absolute inset-0 size-full">
          <Image
            src={poster ?? `/lumager/videos/${video.id}.jpg`}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className={`lx-video-img object-cover ${pos}`}
          />
          <span className="lx-play" aria-hidden="true">
            <PlayIcon size={20} weight="fill" />
          </span>
          <span className="lx-duration lx-num" aria-hidden="true">
            {video.duration}
          </span>
          <span className="sr-only">
            Reproducir video: {video.title} ({video.duration})
          </span>
        </button>
      )}
    </div>
  );
}
