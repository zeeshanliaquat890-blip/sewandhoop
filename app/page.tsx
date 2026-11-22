import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { getAllArticles, getArticlesForSilo } from "@/lib/content";
import { getPlannedForSilo } from "@/lib/urlmap";
import { pageMetadata, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Search } from "@/components/Search";
import { SiloIcon, IconArrow } from "@/components/Icons";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolsBox } from "@/components/ToolsBox";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — Sewing & Embroidery Machine Reviews and Guides`,
  description: siteConfig.description,
  path: "/",
});

const finderOptions = [
  { label: "Clothes & mending", q: "garments" },
  { label: "Quilts", q: "quilting" },
  { label: "Embroidery", q: "embroidery" },
  { label: "Denim & canvas", q: "heavy-duty" },
];
const budgets = ["Under $200", "$200–$500", "$500+"];

export default function Home() {
  const articles = getAllArticles();
  return (
    <>
      <JsonLd data={websiteLd()} />

      {/* ---------- Hero ---------- */}
      <section id="find" className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-site items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:pb-24">
          <div>
            <p className="kicker">Sewing · Embroidery · Quilting · Sergers</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.06] sm:text-[3.6rem]">
              Find the sewing machine you&apos;ll <span className="scribble whitespace-nowrap">actually love</span> using.
            </h1>
            <p className="mt-5 max-w-xl text-[1.2rem] leading-relaxed text-ink-soft">
              Honest shortlists, plain-English reviews and calm fixes for the moment your machine starts chewing thread. No jargon, no hype.
            </p>
            <div className="mt-8 max-w-xl">
              <Search />
            </div>
            <p className="mt-5 text-[0.98rem] text-ink-mute">
              Popular:{" "}
              {siteConfig.silos.slice(0, 4).map((s, i) => (
                <span key={s.slug}>
                  <Link href={`/${s.slug}/`} className="font-bold">{s.short}</Link>
                  {i < 3 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>

          {/* Machine Finder — styled like a sewing pattern envelope */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rotate-2 rounded-2xl bg-linen-deep" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-paper">
              <div className="flex items-center justify-between bg-ink px-6 py-3 text-paper">
                <span className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#e9a796]">Pattern No. 01</span>
                <span className="hidden text-[0.78rem] font-bold uppercase tracking-[0.18em] sm:inline">3 questions · 1 minute</span>
              </div>
              <div className="p-6 sm:p-7">
                <p className="font-serif text-[1.9rem] leading-tight">Machine Finder</p>
                <p className="mt-1 text-ink-soft">Tell us what you sew. We&apos;ll hand you a short, sensible shortlist.</p>
                <p className="mt-6 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-mute">What will you sew most?</p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {finderOptions.map((o) => (
                    <li key={o.q}>
                      <Link href={`/tools/machine-finder/?project=${o.q}`} className="flex h-full items-center gap-2 rounded-lg border-2 border-line px-3 py-2.5 text-[0.98rem] font-bold text-ink no-underline hover:border-ink hover:text-ink">
                        <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-[4px] border-2 border-ink" />
                        {o.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-mute">Budget</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <li key={b} className="rounded-full border-2 border-dashed border-line px-3 py-1 text-[0.95rem] text-ink-soft">{b}</li>
                  ))}
                </ul>
                <Link href="/tools/machine-finder/" className="btn btn-primary mt-7 w-full">
                  Find my machine <IconArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section aria-labelledby="crafts" className="mx-auto max-w-site px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Browse by craft</p>
            <h2 id="crafts" className="mt-1 text-[2.1rem] sm:text-[2.5rem]">What are you making?</h2>
          </div>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.silos.map((s, i) => {
            const live = getArticlesForSilo(s.slug).length;
            const planned = getPlannedForSilo(s.slug).length;
            return (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="group flex h-full gap-4 rounded-xl border border-line bg-paper p-5 text-ink no-underline transition-colors hover:border-ink hover:bg-linen hover:text-ink">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-dashed border-ink/30 bg-linen text-ink group-hover:bg-paper">
                    <SiloIcon name={s.icon} size={34} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink-mute">Section {String.fromCharCode(65 + i)}</span>
                    <span className="mt-0.5 block font-serif text-[1.35rem] leading-snug group-hover:text-madder">{s.name}</span>
                    <span className="mt-1 block text-[0.98rem] leading-snug text-ink-soft">{s.description}</span>
                    <span className="mt-2 block text-[0.9rem] font-bold text-madder">{live > 0 ? `${live} ${live === 1 ? "guide" : "guides"}` : `${planned} guides coming`}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Latest guides ---------- */}
      {articles.length > 0 && (
        <section aria-labelledby="latest" className="mx-auto max-w-site px-4 pt-20 sm:px-6">
          <hr className="stitch-rule mb-10" />
          <p className="kicker">Fresh off the machine</p>
          <h2 id="latest" className="mt-1 text-[2.1rem] sm:text-[2.5rem]">Latest guides</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* ---------- How we choose ---------- */}
      <section aria-labelledby="how" className="mx-auto mt-20 max-w-site px-4 sm:px-6">
        <div className="patch grid gap-10 p-7 sm:p-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="kicker">Why trust us</p>
            <h2 id="how" className="mt-1 text-[2rem] leading-tight sm:text-[2.3rem]">How we choose the machines we recommend</h2>
            <p className="mt-4 text-ink-soft">
              We don&apos;t accept payment for placement. If a machine is on our list, it&apos;s because we&apos;d tell a friend to buy it.{" "}
              <Link href="/about/">More about us</Link>
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            {[
              ["Start with the sewist", "Who is it for? A first machine, a quilter's workhorse and a small embroidery business need very different things."],
              ["Read past the box", "Manuals, spec sheets, feet that come included, and the parts that wear out — not just the stitch count."],
              ["Listen to owners", "Long-term owner feedback tells you what a machine is like in year three, not just on day one."],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-madder font-serif text-xl text-madder">{i + 1}</span>
                <p className="mt-3 font-serif text-[1.25rem] leading-snug">{t}</p>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Tools ---------- */}
      <section className="mx-auto mt-20 max-w-site px-4 sm:px-6">
        <ToolsBox tools={siteConfig.tools} title="Free calculators & helpers for sewists" />
        <p className="mt-4 text-right">
          <Link href="/tools/" className="font-bold">See all tools →</Link>
        </p>
      </section>
    </>
  );
}
