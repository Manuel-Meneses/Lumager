import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/ssr";
import { lumager, lumagerLinks, newsLink, socials } from "@/lib/lumager";

const icons = { Instagram: InstagramLogoIcon, LinkedIn: LinkedinLogoIcon, YouTube: YoutubeLogoIcon, Facebook: FacebookLogoIcon } as const;

/** `base` antepone la ruta del inicio a los anclajes cuando el pie va en otra página. */
export function LumagerFooter({ base = "" }: { base?: string }) {
  return (
    <footer className="lx-dark">
      <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-[var(--lx-dark-line)] pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <span role="img" aria-label={lumager.name} className="lx-logo !h-12" />
            <p className="mt-6 max-w-[40ch] text-[var(--lx-on-dark-muted)]">{lumager.description}</p>
          </div>
          <nav aria-label="Pie" className="md:col-span-3">
            <ul className="space-y-1">
              {lumagerLinks.map((l) => (
                <li key={l.href}>
                  <a href={`${base}${l.href}`} className="lx-nav-link inline-block py-2">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={newsLink.href} className="lx-nav-link inline-block py-2">
                  {newsLink.label}
                </a>
              </li>
            </ul>
          </nav>
          <ul className="flex gap-2 md:col-span-3 md:justify-end">
            {socials.map((s) => {
              const Icon = icons[s.label as keyof typeof icons];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (se abre en otra pestaña)`}
                    className="flex size-11 items-center justify-center border border-[var(--lx-dark-line)] text-[var(--lx-on-dark-muted)] transition-colors duration-200 hover:border-[var(--lx-orange)] hover:text-[var(--lx-on-dark)]"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2 pt-8 text-sm text-[var(--lx-on-dark-muted)] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {lumager.name}
          </p>
          <p>{lumager.hours}</p>
        </div>
      </div>
    </footer>
  );
}
