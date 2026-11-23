import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { getAllArticles, getArticlesForSilo, type Product, type Article } from "@/lib/content";
import { getPlannedForSilo } from "@/lib/urlmap";
import { staticMetadata, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Search } from "@/components/Search";
import { SiloIcon, IconArrow, IconTool, IconCheck } from "@/components/Icons";
import { ArticleCard } from "@/components/ArticleCard";
import { MachineIllustration } from "@/components/Illustration";
import { ScoreRing, ScoreBars } from "@/components/Score";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ProductImage } from "@/components/product/ProductImage";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = staticMetadata("/");

const finderOptions = [
  { label: "Clothes & mending", q: "garments" },
  { label: "Quilts", q: "quilting" },
  { label: "Embroidery", q: "embroidery" },
  { label: "Denim & canvas", q: "heavy-duty" },
];

function topRated(articles: Article[]) {
  const out: { p: Product; a: Article }[] = [];
  for (const a of articles) {
    if (a.fm.template !== "roundup") continue;
    for (const p of a.fm.products ?? []) if (p.badge && (p.score !== undefined || !siteConfig.showSewScore)) out.push({ p, a });
  }
  return out.sort((x, y) => (y.p.score ?? 0) - (x.p.score ?? 0)).slice(0, 4);
}

export default function Home() {
  const articles = getAllArticles();
  const picks = topRated(articles);
  const totalPlanned = siteConfig.silos.reduce((n, s) => n + getPlannedForSilo(s.slug).length, 0);

  return (
    <>
      <JsonLd data={websiteLd()} />

      {/* ---------- Hero ---------- */}
      <section id="find" className="weave relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-32">
          <div>
            <p className="label-cond inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[0.85rem] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e9735c]" aria-hidden="true" /> Sewing · Embroidery · Quilting · Sergers
            </p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.04] text-white sm:text-[3.8rem]">
              Find the sewing machine you&apos;ll <span className="scribble whitespace-nowrap text-[#ffd9cf]">actually love</span> using.
            </h1>
            <p className="mt-5 max-w-xl text-[1.2rem] leading-relaxed text-white/75">
              Honest scores, side-by-side comparisons and calm, step-by-step fixes. Written for home sewists, not engineers.
            </p>
            <div className="mt-8 max-w-xl text-ink"><Search /></div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.silos.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.95rem] font-semibold text-white no-underline hover:bg-white/20 hover:text-white">
                    <SiloIcon name={s.icon} size={18} /> {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustration collage */}
          <div className="relative mx-auto hidden w-full max-w-[34rem] sm:block" aria-hidden="true">
            <div className="relative aspect-square rounded-full border-[10px] border-[#3a332d] bg-cream p-10 shadow-[0_0_0_2px_rgba(255,255,255,.08)]">
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-madder/40" />
              <div className="absolute left-1/2 top-[-22px] h-8 w-16 -translate-x-1/2 rounded-md bg-[#3a332d]" />
              <MachineIllustration className="relative mt-[12%] w-full" />
            </div>
            <div className="card absolute -left-6 top-10 flex items-center gap-3 !rounded-xl px-4 py-3 text-ink">
              {siteConfig.showSewScore ? (
                <>
                  <ScoreRing score={94} size={52} label="" />
                  <div className="leading-tight"><p className="label-cond text-[0.8rem] text-ink-mute">Sew Score</p><p className="font-bold">Outstanding</p></div>
                </>
              ) : (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage text-white"><IconCheck size={20} /></span>
                  <div className="leading-tight"><p className="label-cond text-[0.8rem] text-ink-mute">Every spec</p><p className="font-bold">Checked at the source</p></div>
                </>
              )}
            </div>
            <div className="absolute -right-2 bottom-16"><span className="ribbon !text-[1rem]">Best overall</span></div>
            <div className="card absolute bottom-2 left-4 !rounded-xl px-4 py-3 text-ink">
              <p className="label-cond text-[0.8rem] text-ink-mute">Stitch quality</p>
              <div className="mt-1 h-2 w-40 rounded-full bg-linen-deep"><div className="h-full w-[92%] rounded-full bg-madder" /></div>
            </div>
          </div>
        </div>
        <div className="stitch-edge absolute inset-x-0 bottom-0 h-[3px]" />
      </section>

      {/* ---------- Trust strip ---------- */}
      <section aria-label="Why readers trust us" className="relative z-10 mx-auto -mt-14 max-w-site px-4 sm:px-6">
        <ul className="card grid grid-cols-2 gap-px overflow-hidden !bg-line md:grid-cols-4">
          {[
            [String(totalPlanned), "in-depth guides in the works"],
            siteConfig.showSewScore ? ["100-pt", "Sew Score on every machine"] : ["100%", "of specs checked against the maker's own pages"],
            [String(siteConfig.tools.length), "free calculators & tools"],
            ["0", "paid placements. Ever."],
          ].map(([n, l]) => (
            <li key={l} className="bg-white p-5 text-center">
              <p className="font-cond text-[2.3rem] font-bold leading-none text-madder">{n}</p>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Categories ---------- */}
      <section aria-labelledby="crafts" className="mx-auto max-w-site px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Browse by category</p>
            <h2 id="crafts" className="mt-1 text-[2.2rem] sm:text-[2.6rem]">What are you shopping for?</h2>
          </div>
          <Link href="/tools/machine-finder/" className="hidden font-bold sm:inline">Not sure? Try the Machine Finder →</Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.silos.map((s) => {
            const live = getArticlesForSilo(s.slug).length;
            const planned = getPlannedForSilo(s.slug).length;
            return (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="card group flex h-full flex-col overflow-hidden text-ink no-underline hover:text-ink">
                  <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-cream to-linen-deep">
                    <span className="grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-ink/25 bg-white text-ink transition-transform group-hover:scale-105">
                      <SiloIcon name={s.icon} size={52} />
                    </span>
                    <span className="label-cond absolute right-3 top-3 rounded-full bg-white px-2.5 py-0.5 text-[0.8rem] text-ink-soft">{live > 0 ? `${live} live` : `${planned} coming`}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-serif text-[1.4rem] font-bold leading-snug group-hover:text-madder">{s.name}</span>
                    <span className="mt-1.5 flex-1 text-[0.98rem] leading-snug text-ink-soft">{s.description}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-bold text-madder">Explore {s.short.toLowerCase()} <IconArrow size={16} /></span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Top rated ---------- */}
      {picks.length > 0 && (
        <section aria-labelledby="top-rated" className="mt-20 border-y border-line bg-cream py-16">
          <div className="mx-auto max-w-site px-4 sm:px-6">
            <p className="kicker">{siteConfig.showSewScore ? "Highest Sew Scores" : "Editors' picks"}</p>
            <h2 id="top-rated" className="mt-1 text-[2.2rem] sm:text-[2.6rem]">{siteConfig.showSewScore ? "Top-rated machines right now" : "Our top picks right now"}</h2>
            <ol className={`mt-8 grid gap-5 sm:grid-cols-2 ${picks.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {picks.map(({ p, a }, i) => (
                <li key={a.slug + p.id} className="card relative flex flex-col overflow-hidden">
                  <span className="ribbon absolute left-0 top-4 z-10">{p.badge}</span>
                  {p.score !== undefined && <div className="absolute right-3 top-3 z-10"><ScoreRing score={p.score} size={54} label="" /></div>}
                  <ProductImage product={p} className="!rounded-none" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="label-cond text-[0.8rem] text-ink-mute">#{i + 1} · from {a.fm.title.replace(/\s*\(.*\)$/, "")}</p>
                    <p className="mt-1 flex-1 font-serif text-[1.18rem] font-bold leading-snug">{p.name}</p>
                    <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="amazon" className="mt-4 !min-h-[2.6rem] !text-[0.9rem]" track={`home-top-${p.id}`}>Check price</AffiliateLink>
                    <Link href={`${a.url}#product-${p.id}`} className="mt-2 text-center text-[0.9rem] font-bold no-underline">Read review</Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---------- Machine finder band ---------- */}
      <section aria-labelledby="finder" className="mx-auto mt-20 max-w-site px-4 sm:px-6">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-linen p-6 sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="kicker">Free tool · 1 minute</p>
            <h2 id="finder" className="mt-1 text-[2.2rem] leading-tight sm:text-[2.6rem]">Answer four questions. Get a shortlist you can trust.</h2>
            <p className="mt-4 text-[1.1rem] text-ink-soft">Tell us what you sew, how often and what you want to spend. The Machine Finder matches you with two or three machines that actually fit, not the most expensive one.</p>
            <Link href="/tools/machine-finder/" className="btn btn-primary mt-7">Start the Machine Finder <IconArrow /></Link>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -right-2 -top-2 h-full w-full rotate-2 rounded-2xl bg-linen-deep" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-white">
              <div className="flex items-center justify-between bg-ink px-6 py-3 text-white">
                <span className="label-cond text-[0.85rem] text-[#e9a796]">Pattern No. 01</span>
                <span className="label-cond text-[0.85rem]">Question 1 of 4</span>
              </div>
              <div className="p-6">
                <p className="font-serif text-[1.5rem] font-bold">What will you sew most?</p>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {finderOptions.map((o) => (
                    <li key={o.q}>
                      <Link href={`/tools/machine-finder/?project=${o.q}`} className="flex h-full items-center gap-2.5 rounded-lg border-2 border-line px-3 py-3 text-[0.98rem] font-bold text-ink no-underline hover:border-madder hover:bg-madder-tint hover:text-ink">
                        <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border-2 border-ink" />
                        {o.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-1.5" aria-hidden="true">
                  <span className="h-1.5 flex-1 rounded-full bg-madder" /><span className="h-1.5 flex-1 rounded-full bg-linen-deep" /><span className="h-1.5 flex-1 rounded-full bg-linen-deep" /><span className="h-1.5 flex-1 rounded-full bg-linen-deep" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Latest ---------- */}
      {articles.length > 0 && (
        <section aria-labelledby="latest" className="mx-auto max-w-site px-4 pt-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="kicker">Fresh off the machine</p>
              <h2 id="latest" className="mt-1 text-[2.2rem] sm:text-[2.6rem]">Latest reviews & guides</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      {/* ---------- Sew Score explainer (hidden while the score is paused) ---------- */}
      {siteConfig.showSewScore && <section aria-labelledby="score" className="weave mt-24 text-white">
        <div className="mx-auto grid max-w-site items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="label-cond text-[0.95rem] text-[#e9a796]">How we rate machines</p>
            <h2 id="score" className="mt-1 text-[2.2rem] leading-tight text-white sm:text-[2.6rem]">The Sew Score: one honest number, five things that matter</h2>
            <p className="mt-4 max-w-xl text-[1.1rem] text-white/75">
              Every machine we recommend gets a research-based score out of 100, built from checked specs and long-term owner reports. Same five parts, same method, every time — so a 90 in one guide means the same as a 90 in another.
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Stitch quality", "Ease of use", "Build & reliability", "Features for the price", "Owner satisfaction"].map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#e9735c] font-cond font-bold text-[#ffd9cf]">{i + 1}</span>
                  <span className="font-semibold">{t}</span>
                </li>
              ))}
            </ol>
            <Link href="/how-we-review/" className="btn btn-light mt-8">How we score machines <IconArrow /></Link>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
            <div className="flex items-center gap-4">
              <ScoreRing score={91} size={92} />
              <div>
                <p className="label-cond text-[0.85rem] text-ink-mute">Example score card (illustration)</p>
                <p className="font-serif text-[1.3rem] font-bold leading-tight">A great first machine</p>
              </div>
            </div>
            <div className="mt-6">
              <ScoreBars scores={{ "Stitch quality": 93, "Ease of use": 95, "Build & reliability": 88, "Features for the price": 92, "Owner satisfaction": 89 }} />
            </div>
          </div>
        </div>
      </section>}

      {/* ---------- Tools ---------- */}
      <section aria-labelledby="tools-h" className="mx-auto max-w-site px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker">Free, no sign-up</p>
            <h2 id="tools-h" className="mt-1 text-[2.2rem] sm:text-[2.6rem]">Calculators & helpers for sewists</h2>
          </div>
          <Link href="/tools/" className="font-bold">All tools →</Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.tools.map((t, i) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}/`} className="card group flex h-full flex-col p-5 text-ink no-underline hover:text-ink">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-madder-tint text-madder"><IconTool /></span>
                  <span className="font-cond text-[0.95rem] font-bold text-ink-mute">No. {String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="mt-4 font-serif text-[1.15rem] font-bold leading-snug group-hover:text-madder">{t.name}</span>
                <span className="mt-1 text-[0.93rem] leading-snug text-ink-soft">{t.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- About teaser ---------- */}
      <section className="mx-auto max-w-site px-4 pt-20 sm:px-6">
        <div className="patch flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-12 sm:text-left">
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white"><LogoMark size={64} /></span>
          <div className="flex-1">
            <p className="kicker">Who we are</p>
            <p className="mt-1 font-serif text-[1.6rem] font-bold leading-snug">{siteConfig.author.bio}</p>
          </div>
          <Link href="/about/" className="btn btn-ghost shrink-0">Meet the team</Link>
        </div>
      </section>
    </>
  );
}
