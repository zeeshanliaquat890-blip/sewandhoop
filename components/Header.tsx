import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "./Logo";
import { IconMenu, IconSearch, SiloIcon } from "./Icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-[4.25rem] max-w-site items-center justify-between gap-4 px-4 sm:px-6">
        <Logo compact />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-full px-3 py-2 text-[0.98rem] font-bold text-ink no-underline hover:bg-linen hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/#find" className="grid h-11 w-11 place-items-center rounded-full text-ink no-underline hover:bg-linen hover:text-ink" aria-label="Search guides">
            <IconSearch />
          </Link>
          {/* Mobile menu: no JavaScript, just <details> */}
          <details className="group relative lg:hidden">
            <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full hover:bg-linen [&::-webkit-details-marker]:hidden" aria-label="Open menu">
              <IconMenu />
            </summary>
            <div className="fixed inset-x-0 top-[4.25rem] max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-b border-line bg-paper px-4 pb-8 pt-4 shadow-[0_18px_30px_-20px_rgba(38,34,30,.35)]">
              <p className="kicker mb-3">Browse by craft</p>
              <ul className="grid gap-1">
                {siteConfig.silos.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}/`} className="flex items-center gap-3 rounded-lg px-2 py-3 text-lg font-bold text-ink no-underline hover:bg-linen hover:text-ink">
                      <SiloIcon name={s.icon} size={28} className="text-ink" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="stitch-rule-ink my-4" />
              <ul className="grid gap-1 text-lg">
                <li><Link href="/tools/" className="block rounded-lg px-2 py-3 font-bold text-ink no-underline hover:bg-linen">Free sewing tools</Link></li>
                <li><Link href="/about/" className="block rounded-lg px-2 py-3 text-ink no-underline hover:bg-linen">About us</Link></li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
