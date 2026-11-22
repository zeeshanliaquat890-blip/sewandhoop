import Link from "next/link";
import type { Article } from "@/lib/content";
import { getSilo, templateLabel } from "@/lib/content";
import { siteConfig } from "@/site.config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { LogoMark } from "@/components/Logo";
import { TocSidebar, TocMobileBar } from "@/components/TocSpy";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ProductImage } from "@/components/product/ProductImage";
import { ScoreRing } from "@/components/Score";
import { IconArrow } from "@/components/Icons";

export function fmtDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00Z");
  return isNaN(+dt) ? d : dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function crumbs(article: Article) {
  const silo = getSilo(article.silo);
  return [
    { name: "Home", url: "/" },
    ...(silo ? [{ name: silo.name, url: `/${silo.slug}/` }] : []),
    { name: article.fm.title, url: article.url },
  ];
}

const GRID = "mx-auto grid max-w-site gap-x-14 px-4 sm:px-6 lg:grid-cols-[17rem_minmax(0,47.5rem)] lg:justify-center";

function ArticleHero({ article }: { article: Article }) {
  const { fm } = article;
  const n = fm.products?.length ?? 0;
  return (
    <header className="border-b border-line bg-cream">
      <div className={`${GRID} pb-8 pt-6 sm:pb-10`}>
        <div className="hidden lg:block" />
        <div>
          <Breadcrumbs items={crumbs(article)} />
          <p className="kicker mt-6">{templateLabel[fm.template]}</p>
          <h1 className="mt-2 text-[2.15rem] leading-[1.1] sm:text-[2.9rem]">{fm.title}</h1>
          {fm.dek && <p className="mt-4 text-[1.18rem] leading-relaxed text-ink-soft sm:text-[1.28rem]">{fm.dek}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white"><LogoMark size={32} /></span>
              <div className="leading-tight">
                <p className="text-[0.98rem]">By <Link href={siteConfig.author.url} className="font-bold text-ink no-underline hover:text-madder">{fm.author || siteConfig.author.name}</Link></p>
                <p className="text-[0.9rem] text-ink-mute">
                  {fm.updated ? <>Updated <time dateTime={fm.updated}>{fmtDate(fm.updated)}</time></> : <time dateTime={fm.published}>{fmtDate(fm.published)}</time>} · {article.readingMinutes} min read
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2 text-[0.88rem]">
            {n > 1 && <li className="label-cond rounded-full bg-ink px-3 py-1 text-white">{n} machines compared</li>}
            <li className="label-cond rounded-full border border-line bg-white px-3 py-1 text-ink-soft">Independently chosen</li>
            <li className="label-cond rounded-full border border-line bg-white px-3 py-1 text-ink-soft"><Link href="/how-we-review/" className="text-ink-soft no-underline hover:text-madder">How we review →</Link></li>
          </ul>

          {article.hasAffiliateLinks && <div className="mt-6"><Disclosure /></div>}
        </div>
      </div>
    </header>
  );
}

function SideCard({ article }: { article: Article }) {
  const top = article.fm.products?.find((p) => p.badge) ?? (article.fm.template === "review" ? article.fm.products?.[0] : undefined);
  if (top) {
    return (
      <div className="card mt-4 p-4">
        <div className="flex items-center justify-between">
          <span className="ribbon !text-[0.78rem]">{top.badge || "Our pick"}</span>
          {top.score !== undefined && <ScoreRing score={top.score} size={46} label="" />}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-16 shrink-0"><ProductImage product={top} small /></div>
          <p className="font-serif text-[1.02rem] font-bold leading-snug">{top.name}</p>
        </div>
        <AffiliateLink asin={top.asin} query={top.amazonQuery || top.name} variant="amazon" className="mt-3 w-full !min-h-[2.5rem] !text-[0.88rem]" track="sidebar">Check price</AffiliateLink>
      </div>
    );
  }
  return (
    <div className="weave mt-4 rounded-xl p-5 text-white">
      <p className="label-cond text-[0.85rem] text-[#e9a796]">Free tool</p>
      <p className="mt-1 font-serif text-[1.2rem] font-bold leading-snug text-white">Not sure which machine to buy?</p>
      <Link href="/tools/machine-finder/" className="btn btn-light mt-3 w-full !min-h-[2.5rem] !text-[0.9rem]">Machine Finder <IconArrow size={15} /></Link>
    </div>
  );
}

/** Shared article layout: hero band, sticky "On this page" sidebar (desktop), sticky section bar (mobile). */
export function ArticleShell({ article, children }: { article: Article; children: React.ReactNode }) {
  return (
    <>
      <ArticleHero article={article} />
      <div className={`${GRID} pt-2 lg:pt-10`}>
        <aside className="hidden lg:block">
          <div className="sticky top-[6.25rem]">
            <TocSidebar headings={article.headings} />
            <SideCard article={article} />
          </div>
        </aside>
        <article className="min-w-0">
          {article.headings.filter((h) => h.depth === 2).length > 1 && <TocMobileBar headings={article.headings} />}
          {children}
        </article>
      </div>
    </>
  );
}
