import Link from "next/link";
import type { Silo } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { Article, Heading } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiloIcon, IconArrow, IconTool } from "@/components/Icons";
import { ArticleCard } from "@/components/ArticleCard";
import { TocSidebar, TocMobileBar } from "@/components/TocSpy";
import { ScoreRing } from "@/components/Score";
import { ProductImage } from "@/components/product/ProductImage";
import { AffiliateLink } from "@/components/AffiliateLink";

type Group = { id: string; title: string; blurb: string; items: Article[] };

export function HubTemplate({
  silo,
  articles,
  plannedCount,
  content,
  contentHeadings,
}: {
  silo: Silo;
  articles: Article[];
  plannedCount: number;
  content: React.ReactNode | null;
  contentHeadings: Heading[];
}) {
  const tools = siteConfig.tools.filter((t) => t.silo === silo.slug);
  const groups: Group[] = [
    { id: "buying-guides", title: "Buying guides", blurb: "Our shortlists, sorted by budget, skill level and project.", items: articles.filter((a) => a.fm.template === "roundup") },
    { id: "reviews", title: "Reviews & comparisons", blurb: "One machine at a time, or two side by side.", items: articles.filter((a) => a.fm.template === "review") },
    { id: "how-to", title: "How-tos & explainers", blurb: "Plain-English answers to the questions that come up at the machine.", items: articles.filter((a) => a.fm.template === "informational") },
  ].filter((g) => g.items.length);
  const picks = articles
    .filter((a) => a.fm.template === "roundup")
    .flatMap((a) => (a.fm.products ?? []).filter((p) => p.badge).map((p) => ({ p, a })))
    .slice(0, 3);
  const upcoming = Math.max(0, plannedCount - articles.length);

  const headings: Heading[] = [
    ...(picks.length ? [{ depth: 2 as const, text: "Top picks", id: "top-picks" }] : []),
    ...contentHeadings,
    ...groups.map((g) => ({ depth: 2 as const, text: g.title, id: g.id })),
    ...(tools.length ? [{ depth: 2 as const, text: "Free tools", id: "tools" }] : []),
  ];

  return (
    <>
      <section className="weave relative text-white">
        <div className="mx-auto max-w-site px-4 pb-12 pt-7 sm:px-6 sm:pb-16">
          <div className="[&_a]:!text-white/80 [&_span]:!text-white/70"><Breadcrumbs items={[{ name: "Home", url: "/" }, { name: silo.name, url: `/${silo.slug}/` }]} /></div>
          <div className="mt-8 grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <span className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-[#3a332d] bg-cream text-ink shadow-[0_0_0_2px_rgba(255,255,255,.08)]">
              <SiloIcon name={silo.icon} size={60} />
            </span>
            <div>
              <p className="label-cond text-[0.95rem] text-[#e9a796]">Category</p>
              <h1 className="mt-1 text-[2.5rem] leading-[1.05] text-white sm:text-[3.3rem]">{silo.name}</h1>
              <p className="mt-3 max-w-2xl text-[1.18rem] leading-relaxed text-white/75">{silo.description}</p>
            </div>
            <dl className="grid grid-cols-3 gap-3 md:grid-cols-1">
              {[
                [plannedCount, "guides planned"],
                [articles.filter((a) => a.fm.template !== "informational").length, "buying guides live"],
                [tools.length, "free tools"],
              ].map(([n, l]) => (
                <div key={String(l)} className="rounded-xl bg-white/10 px-4 py-2.5 text-center md:text-left">
                  <dt className="sr-only">{l}</dt>
                  <dd><span className="font-cond text-[1.8rem] font-bold leading-none text-white">{n}</span> <span className="block text-[0.85rem] text-white/70 md:inline">{l}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="stitch-edge absolute inset-x-0 bottom-0 h-[3px]" />
      </section>

      <div className="mx-auto grid max-w-site gap-x-14 px-4 pt-2 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:pt-10">
        <aside className="hidden lg:block">
          <div className="sticky top-[6.25rem]">
            <TocSidebar headings={headings} />
            <Link href="/tools/machine-finder/" className="weave mt-4 block rounded-xl p-5 text-white no-underline hover:text-white">
              <p className="label-cond text-[0.85rem] text-[#e9a796]">Free tool</p>
              <p className="mt-1 font-serif text-[1.15rem] font-bold leading-snug">Get a personal shortlist with the Machine Finder →</p>
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          {headings.filter((h) => h.depth === 2).length > 1 && <TocMobileBar headings={headings} />}

          {picks.length > 0 && (
            <section id="top-picks" aria-labelledby="top-picks-h" className="scroll-mt-28 pt-8 lg:pt-0">
              <p className="kicker">Editors&apos; choice</p>
              <h2 id="top-picks-h" className="text-[1.9rem]">Top {silo.short.toLowerCase()} picks</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {picks.map(({ p, a }) => (
                  <li key={a.slug + p.id} className="card relative flex flex-col overflow-hidden">
                    <span className="ribbon absolute left-0 top-3 z-10 !text-[0.8rem]">{p.badge}</span>
                    {p.score !== undefined && <div className="absolute right-2.5 top-2.5 z-10"><ScoreRing score={p.score} size={48} label="" /></div>}
                    <ProductImage product={p} className="!rounded-none" />
                    <div className="flex flex-1 flex-col p-4">
                      <p className="flex-1 font-serif text-[1.08rem] font-bold leading-snug">{p.name}</p>
                      <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="amazon" className="mt-3 !min-h-[2.5rem] !text-[0.88rem]" track={`hub-${p.id}`}>Check price</AffiliateLink>
                      <Link href={`${a.url}#product-${p.id}`} className="mt-2 text-center text-[0.88rem] font-bold no-underline">Read review</Link>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {content && <div className="prose-sew mt-10 max-w-prose">{content}</div>}

          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="mt-16 scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line pb-3">
                <div>
                  <p className="kicker">{g.items.length} {g.items.length === 1 ? "article" : "articles"}</p>
                  <h2 id={`${g.id}-h`} className="text-[1.9rem]">{g.title}</h2>
                </div>
                <p className="text-[0.98rem] text-ink-soft">{g.blurb}</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {g.items.map((a) => <ArticleCard key={a.slug} article={a} showSilo={false} />)}
              </div>
            </section>
          ))}

          {upcoming > 0 && (
            <p className="mt-10 rounded-xl border-2 border-dashed border-line bg-cream px-5 py-4 text-center text-ink-soft">
              <strong className="text-ink">{upcoming} more {silo.short.toLowerCase()} guides</strong> are on the cutting table. New ones go up every week.
            </p>
          )}

          {tools.length > 0 && (
            <section id="tools" aria-labelledby="tools-h" className="mt-16 scroll-mt-28">
              <p className="kicker">Free, no sign-up</p>
              <h2 id="tools-h" className="text-[1.9rem]">Free {silo.short.toLowerCase()} tools</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}/`} className="card group flex h-full gap-4 p-5 text-ink no-underline hover:text-ink">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-madder-tint text-madder"><IconTool /></span>
                      <span>
                        <span className="flex items-center gap-1.5 font-serif text-[1.15rem] font-bold group-hover:text-madder">{t.name} <IconArrow size={15} /></span>
                        <span className="mt-1 block text-[0.95rem] leading-snug text-ink-soft">{t.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
