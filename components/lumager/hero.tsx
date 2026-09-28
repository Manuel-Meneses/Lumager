import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { lumagerCta } from "@/lib/lumager";
import { financeLogos } from "@/lib/lumager-logos";
import { LogoMark } from "./logo-mark";
import heroImg from "@/public/lumager/parque-solar-drone.jpg";
import { SunInstrument } from "./sun-instrument";
import { HeroStats } from "./hero-stats";

export function LumagerHero() {
  return (
    <section id="inicio" aria-labelledby="lx-hero-title" className="lx-dark relative isolate flex min-h-[100svh] overflow-hidden">
      <div className="lx-hero-media absolute inset-0 -z-10">
        <Image
          src={heroImg}
          alt="Vista aérea de un parque solar de Lumager: filas de paneles frente a un olivar, con la cordillera al fondo"
          fill
          priority
          sizes="100vw"
          className="lx-hero-img object-cover object-[50%_70%]"
        />
        <div aria-hidden="true" className="lx-hero-veil absolute inset-0" />
      </div>

      <div className="mx-auto flex w-full max-w-[88rem] flex-col justify-end px-5 pt-28 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
        {/* En celular las cifras suben antes que los bancos y el instrumento: son la prueba. */}
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8 lg:row-start-1">
            <h1 id="lx-hero-title" className="lx-display text-[clamp(3rem,min(8.4vw,11.5svh),6rem)]">
              <span className="lx-rise block" style={{ ["--i" as string]: 0 }}>
                Impulsamos
              </span>
              <span className="lx-rise block" style={{ ["--i" as string]: 1 }}>
                la energía.
              </span>
            </h1>
            <p
              className="lx-rise mt-7 max-w-[46ch] text-lg leading-relaxed text-[var(--lx-on-dark)]/85 sm:text-xl"
              style={{ ["--i" as string]: 3 }}
            >
              Ingeniería fotovoltaica llave en mano para industria, agro, minería y comercio. Diseñamos, construimos y
              acompañamos cada sistema desde San Juan y Rosario.
            </p>
            <div className="lx-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ["--i" as string]: 4 }}>
              <a href={lumagerCta.href} className="lx-btn lx-btn-primary w-full sm:w-auto">
                {lumagerCta.label}
                <ArrowRightIcon size={18} weight="bold" className="lx-arrow" aria-hidden="true" />
              </a>
              <a href="#financiamiento" className="lx-link font-semibold">
                Financiá tu parque solar
              </a>
            </div>
          </div>
          <HeroStats className="lg:col-span-12 lg:row-start-3" />
          <a
            href="#financiamiento"
            className="lx-rise lx-hero-fin inline-flex flex-wrap items-center gap-x-6 gap-y-3 justify-self-start lg:col-span-8 lg:row-start-2"
            style={{ ["--i" as string]: 9 }}
          >
            <span className="text-sm font-semibold text-[var(--lx-on-dark)]/75">Financiación con</span>
            {financeLogos.map((f) => (
              <LogoMark key={f.logo} id={f.logo} size={17} max={1.5} className="lx-hero-fin-logo" />
            ))}
          </a>
          <div
            className="lx-rise lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:justify-self-end"
            style={{ ["--i" as string]: 10 }}
          >
            <SunInstrument />
          </div>
        </div>
      </div>
    </section>
  );
}
