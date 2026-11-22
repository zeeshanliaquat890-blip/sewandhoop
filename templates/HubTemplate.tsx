import type { Silo } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { Article } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiloIcon } from "@/components/Icons";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolsBox } from "@/components/ToolsBox";

type Group = { id: string; title: string; blurb: string; items: Article[] };

export function HubTemplate({
  silo,
  articles,
  plannedCount,
  content,
}: {
  silo: Silo;
  articles: Article[];
  plannedCount: number;
  content: React.ReactNode | null;
}) {
  const tools = siteConfig.tools.filter((t) => t.silo === silo.slug);
  const groups: Group[] = [
    { id: "buying-guides", title: "Buying guides", blurb: "Our shortlists, sorted by budget, skill level and project.", items: articles.filter((a) => a.fm.template === "roundup") },
    { id: "reviews", title: "Reviews & comparisons", blurb: "One machine at a time, or two side by side.", items: articles.filter((a) => a.fm.template === "review") },
    { id: "how-to", title: "How-tos & explainers", blurb: "Plain-English guides for the questions that come up at the machine.", items: articles.filter((a) => a.fm.template === "informational") },
  ].filter((g) => g.items.length);
  const upcoming = Math.max(0, plannedCount - articles.length);

  return (
    <>
      <section className="border-b border-line bg-linen">
        <div className="mx-auto max-w-site px-4 pb-10 pt-8 sm:px-6 sm:pb-14">
          <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: silo.name, url: `/${silo.slug}/` }]} />
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[auto_1fr]">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-paper text-ink ring-2 ring-dashed ring-ink/30 ring-offset-4 ring-offset-linen sm:h-28 sm:w-28">
              <SiloIcon name={silo.icon} size={56} />
            </span>
            <div>
              <p className="kicker">Category</p>
              <h1 className="mt-1 text-[2.4rem] leading-[1.08] sm:text-[3.2rem]">{silo.name}</h1>
              <p className="mt-3 max-w-2xl text-[1.2rem] leading-relaxed text-ink-soft">{silo.description}</p>
            </div>
          </div>
          {(groups.length > 0 || tools.length > 0) && (
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="rounded-full border border-ink/25 bg-paper px-4 py-2 text-[0.95rem] font-bold text-ink no-underline hover:border-ink">
                  {g.title} <span className="text-ink-mute">({g.items.length})</span>
                </a>
              ))}
              {tools.length > 0 && (
                <a href="#tools-box" className="rounded-full border border-ink/25 bg-paper px-4 py-2 text-[0.95rem] font-bold text-ink no-underline hover:border-ink">Free tools</a>
              )}
            </nav>
          )}
        </div>
      </section>

      {content && (
        <div className="mx-auto max-w-prose px-4 pt-12 sm:px-6">
          <div className="prose-sew">{content}</div>
        </div>
      )}

      <div className="mx-auto max-w-site px-4 sm:px-6">
        {groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="mt-16 scroll-mt-24">
            <hr className="stitch-rule mb-8" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`${g.id}-h`} className="text-[1.95rem]">{g.title}</h2>
              <p className="text-ink-soft">{g.blurb}</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((a) => (
                <ArticleCard key={a.slug} article={a} showSilo={false} />
              ))}
            </div>
          </section>
        ))}

        {upcoming > 0 && (
          <p className="mt-10 rounded-xl border border-dashed border-line px-5 py-4 text-center text-ink-soft">
            <strong className="text-ink">{upcoming} more {silo.short.toLowerCase()} guides</strong> are on the cutting table. New ones go up every week.
          </p>
        )}

        {tools.length > 0 && (
          <div className="mt-16">
            <ToolsBox tools={tools} title={`Free ${silo.short.toLowerCase()} tools`} />
          </div>
        )}
      </div>
    </>
  );
}
