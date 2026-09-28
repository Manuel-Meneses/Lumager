import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { Masthead } from "@/components/lumager/noticias/masthead";
import { Wire } from "@/components/lumager/noticias/wire";
import { SectionTag } from "@/components/lumager/noticias/tag";
import { VideoPlayer } from "@/components/lumager/video-player";
import { LumagerFooter } from "@/components/lumager/footer";
import { lumager, lumagerCta, lumagerStats } from "@/lib/lumager";
import { fmtLong, fmtShort, notaBySlug, notaHref, notaImage, notas, portada, yearOf } from "@/lib/lumager-noticias";

export const metadata: Metadata = {
  title: `Noticias | ${lumager.name}`,
  description: `Obras, clientes, prensa y diario de obra de ${lumager.name}.`,
  robots: { index: false, follow: false },
  openGraph: {
    title: `Noticias | ${lumager.name}`,
    description: `Obras, clientes, prensa y diario de obra de ${lumager.name}.`,
    locale: "es_AR",
    type: "website",
    images: ["/lumager/videos/zCdorWfTCTc-poster.jpg"],
  },
};

const nf = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export default function NoticiasPage() {
  const lead = notaBySlug(portada.principal)!;
  const side = portada.secundarias.map((s) => notaBySlug(s)!);
  const diario = notas.filter((n) => n.section === "diario").reverse();

  // La potencia que las notas del último año publican, obra por obra.
  const year = yearOf(notas[0].at);
  const withKw = notas.filter((n) => n.kw && yearOf(n.at) === year && !n.ejemplo);
  const kwYear = withKw.reduce((a, n) => a + n.kw!, 0);

  return (
    <>
      <Masthead />

      <main>
        {/* Portada: la nota principal a la izquierda; a la derecha, dos que la acompañan y la hoja de cifras. */}
        <section aria-label="Portada" className="mx-auto max-w-[88rem] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 lg:px-12 lg:pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* La principal se mira ahí mismo; las demás abren su video en YouTube. */}
            <article className="lx-n-lead lg:col-span-8" data-section={lead.section}>
              {lead.video && <VideoPlayer video={lead.video} poster={lead.image} priority sizes="(min-width: 1024px) 62vw, 100vw" />}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <SectionTag id={lead.section} />
                <time dateTime={lead.at} className="text-sm text-[var(--lx-muted)]">
                  {fmtLong(lead.at)}
                </time>
                {lead.place && <span className="text-sm text-[var(--lx-muted)]">{lead.place}</span>}
              </div>
              <h2 className="lx-display mt-4 max-w-[22ch] text-[clamp(2rem,3.9vw,3.5rem)]">{lead.title}</h2>
              <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-[var(--lx-muted)]">{lead.dek}</p>
              {lead.facts && (
                <dl className="lx-n-facts mt-8">
                  {lead.facts.slice(0, 3).map(([k, val]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd className="lx-num">{val}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>

            <div className="flex flex-col gap-10 lg:col-span-4">
              {side.map((n) => (
                <article key={n.slug} className="lx-n-card">
                  <div className="lx-n-media relative aspect-[4/3]">
                    <Image
                      src={notaImage(n)!}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className={`lx-n-media-img object-cover ${n.pos ?? ""}`}
                    />
                    <span className="lx-n-media-badge lx-num">
                      <PlayIcon size={14} weight="fill" aria-hidden="true" />
                      {n.video?.duration}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <SectionTag id={n.section} />
                    <time dateTime={n.at} className="lx-num text-sm text-[var(--lx-muted)]">
                      {fmtShort(n.at)}.{yearOf(n.at)}
                    </time>
                  </div>
                  <h2 className="lx-wide mt-2 text-xl leading-snug font-semibold text-balance">
                    <a href={notaHref(n)!} target="_blank" rel="noopener noreferrer" className="lx-n-stretch">
                      {n.title}
                      <span className="sr-only"> (video en YouTube, se abre en otra pestaña)</span>
                    </a>
                  </h2>
                </article>
              ))}
            </div>
          </div>

          {/* Hoja de cifras a todo el ancho, como la del hero: filetes y cifra tabular. */}
          <aside aria-labelledby="lx-n-cifras" className="lx-n-board mt-14 lg:mt-16">
            <div className="lx-n-board-head">
              <h2 id="lx-n-cifras" className="lx-wide text-sm font-semibold">
                {lumager.shortName} en cifras
              </h2>
              <p className="lx-n-board-note">
                Cifras publicadas por {lumager.shortName} en su sitio. La de {year} suma la potencia que publica cada obra, en kW o kWp.
              </p>
            </div>
            <dl>
              <div data-tone="sky">
                <dt>Proyectos</dt>
                <dd className="lx-num">+{nf.format(lumagerStats.projects)}</dd>
              </div>
              <div data-tone="sun">
                <dt>Potencia instalada</dt>
                <dd className="lx-num">+{nf.format(lumagerStats.kw)} kW</dd>
              </div>
              <div data-tone="sand">
                <dt>Provincias</dt>
                <dd className="lx-num">{lumagerStats.provinces}</dd>
              </div>
              <div data-tone="green">
                <dt>CO₂ evitado por año</dt>
                <dd className="lx-num">+{nf.format(lumagerStats.co2)} t</dd>
              </div>
              <div data-tone="orange">
                <dt>
                  Obras informadas en {year}
                  <small>{withKw.map((n) => n.figure).join(" + ")}</small>
                </dt>
                <dd className="lx-num">{nf.format(kwYear)} kW</dd>
              </div>
            </dl>
          </aside>
        </section>

        <Wire />

        {/* Diario de obra: la serie en video, en orden de episodios. */}
        <section aria-labelledby="lx-n-diario" className="lx-dark lx-n-diario" data-section="diario">
          <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h2 id="lx-n-diario" className="lx-display text-[clamp(2.5rem,5vw,4rem)] lg:col-span-6">
                Diario de obra
              </h2>
              <p className="max-w-[46ch] text-lg leading-relaxed text-[var(--lx-on-dark-muted)] lg:col-span-5 lg:col-start-8">
                Una obra contada por etapas, con quienes la hacen: de la estación transformadora a la puesta en marcha.
              </p>
            </div>
            <ol className="lx-n-episodes mt-12">
              {diario.map((n) => (
                <li key={n.slug} className="lx-n-card">
                  <div className="lx-n-media relative aspect-[9/14] bg-[#111312]">
                    <Image src={notaImage(n)!} alt="" fill sizes="(min-width: 1024px) 22vw, 70vw" className="lx-n-media-img object-cover" />
                    <span className="lx-n-media-badge lx-num">
                      <PlayIcon size={14} weight="fill" aria-hidden="true" />
                      {n.video?.duration}
                    </span>
                  </div>
                  <p className="lx-num mt-4 flex items-baseline justify-between text-sm text-[var(--lx-on-dark-muted)]">
                    <span className="lx-wide font-semibold text-[var(--lx-n-diario-live)]">{n.figure}</span>
                    <time dateTime={n.at}>
                      {fmtShort(n.at)}.{yearOf(n.at)}
                    </time>
                  </p>
                  <h3 className="lx-wide mt-2 text-lg leading-snug font-semibold text-balance">
                    <a href={notaHref(n)!} target="_blank" rel="noopener noreferrer" className="lx-n-stretch">
                      {n.title}
                      <span className="sr-only"> (video en YouTube, se abre en otra pestaña)</span>
                    </a>
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="lx-n-cta" className="lx-n-cta">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12 lg:py-20">
            <div>
              <h2 id="lx-n-cta" className="lx-display max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)]">
                ¿Tu proyecto es la próxima nota?
              </h2>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-[var(--lx-muted)]">
                Contanos qué necesitás y te respondemos por WhatsApp. {lumager.hours}.
              </p>
            </div>
            <a href={`/lumager${lumagerCta.href}`} className="lx-btn lx-btn-primary shrink-0">
              {lumagerCta.label}
              <ArrowRightIcon size={16} weight="bold" className="lx-arrow" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <LumagerFooter base="/lumager" />
    </>
  );
}
