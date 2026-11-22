import type { Article } from "@/lib/content";
import { getSilo, templateLabel } from "@/lib/content";
import { siteConfig } from "@/site.config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import Link from "next/link";

function fmtDate(d?: string) {
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

export function ArticleHeader({ article }: { article: Article }) {
  const { fm } = article;
  return (
    <header>
      <Breadcrumbs items={crumbs(article)} />
      <p className="kicker mt-6">{templateLabel[fm.template]}</p>
      <h1 className="mt-2 text-[2.15rem] leading-[1.12] sm:text-[2.8rem]">{fm.title}</h1>
      {fm.dek && <p className="mt-4 text-[1.2rem] leading-relaxed text-ink-soft sm:text-[1.3rem]">{fm.dek}</p>}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-ink-mute">
        <span>By <Link href={siteConfig.author.url} className="font-bold text-ink no-underline hover:text-madder">{fm.author || siteConfig.author.name}</Link></span>
        <span aria-hidden="true">·</span>
        <span>{fm.updated ? <>Updated <time dateTime={fm.updated}>{fmtDate(fm.updated)}</time></> : <time dateTime={fm.published}>{fmtDate(fm.published)}</time>}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      {article.hasAffiliateLinks && (
        <div className="mt-6">
          <Disclosure />
        </div>
      )}
      <hr className="stitch-rule mt-8" />
    </header>
  );
}
