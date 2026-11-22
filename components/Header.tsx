import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getArticlesForSilo } from "@/lib/content";
import { getPlannedForSilo } from "@/lib/urlmap";
import { Logo } from "./Logo";
import { IconMenu, IconSearch, SiloIcon, IconArrow, IconTool } from "./Icons";

function MegaPanel({ slug }: { slug: string }) {
  const silo = siteConfig.silos.find((s) => s.slug === slug)!;
  const guides = getArticlesForSilo(slug).slice(0, 6);
  const tools = siteConfig.tools.filter((t) => t.silo === slug);
  const planned = getPlannedForSilo(slug).length;
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[44rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="card grid grid-cols-[15rem_1fr] overflow-hidden !rounded-xl">
        <div className="weave p-6 text-white">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white"><SiloIcon name={silo.icon} size={32} /></span>
          <p className="mt-4 font-serif text-[1.35rem] font-bold leading-tight text-white">{silo.name}</p>
          <p className="mt-2 text-[0.92rem] leading-snug text-white/70">{silo.description}</p>
          <Link href={`/${slug}/`} className="btn btn-light mt-5 !min-h-[2.5rem] !px-4 !text-[0.9rem]">All {planned} guides <IconArrow size={15} /></Link>
        </div>
        <div className="p-6">
          <p className="label-cond text-[0.82rem] text-ink-mute">Popular guides</p>
          {guides.length ? (
            <ul className="mt-2 grid gap-0.5">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={g.url} className="block rounded-md px-2 py-1.5 text-[0.98rem] font-semibold text-ink no-underline hover:bg-cream hover:text-madder">{g.fm.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[0.95rem] text-ink-mute">New guides are being written for this section.</p>
          )}
          {tools.length > 0 && (
            <>
              <p className="label-cond mt-5 text-[0.82rem] text-ink-mute">Free tools</p>
              <ul className="mt-2 grid gap-0.5">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}/`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.95rem] text-ink no-underline hover:bg-cream hover:text-madder">
                      <IconTool size={17} className="text-madder" /> {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="weave hidden text-[0.85rem] text-white/80 md:block">
        <div className="mx-auto flex h-9 max-w-site items-center justify-between px-4 sm:px-6">
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e9735c]" aria-hidden="true" />
            Independent reviews. No brand can pay for a spot on our lists.
          </p>
          <nav aria-label="Utility" className="flex items-center gap-5">
            <Link href="/how-we-test/" className="text-white/80 no-underline hover:text-white">How we test</Link>
            <Link href="/tools/" className="text-white/80 no-underline hover:text-white">Free tools</Link>
            <Link href="/about/" className="text-white/80 no-underline hover:text-white">About</Link>
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex h-[4.25rem] max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.75rem]">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center">
              {siteConfig.silos.map((s) => (
                <li key={s.slug} className="group relative">
                  <Link href={`/${s.slug}/`} className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[0.98rem] font-bold text-ink no-underline hover:bg-cream hover:text-ink group-hover:text-madder">
                    {s.short}
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="opacity-50 transition-transform group-hover:rotate-180"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </Link>
                  <MegaPanel slug={s.slug} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1.5">
            <Link href="/#find" className="grid h-11 w-11 place-items-center rounded-full text-ink no-underline hover:bg-cream hover:text-ink" aria-label="Search guides">
              <IconSearch />
            </Link>
            <Link href="/tools/machine-finder/" className="btn btn-primary hidden !min-h-[2.75rem] !px-4 !text-[0.95rem] sm:inline-flex">Machine Finder</Link>
            <details className="group xl:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full hover:bg-cream [&::-webkit-details-marker]:hidden" aria-label="Open menu">
                <IconMenu />
              </summary>
              <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-b border-line bg-white px-4 pb-8 pt-4 shadow-[0_18px_30px_-20px_rgba(30,26,23,.35)]">
                <p className="kicker mb-2">Browse by category</p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {siteConfig.silos.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}/`} className="flex items-center gap-3 rounded-lg px-2 py-3 text-lg font-bold text-ink no-underline hover:bg-cream hover:text-ink">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-linen"><SiloIcon name={s.icon} size={26} /></span>
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr className="stitch-rule-ink my-4" />
                <div className="grid gap-2 sm:grid-cols-3">
                  <Link href="/tools/machine-finder/" className="btn btn-primary">Machine Finder</Link>
                  <Link href="/tools/" className="btn btn-ghost">Free tools</Link>
                  <Link href="/how-we-test/" className="btn btn-ghost">How we test</Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
