import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

/** Layout for site pages (about, legal, contact, how we test). */
export function SimplePage({ title, path, intro, updated, kicker, children }: { title: string; path: string; intro?: string; updated?: string; kicker?: string; children: React.ReactNode }) {
  const crumbs = [{ name: "Home", url: "/" }, { name: title, url: path }];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <header className="border-b border-line bg-cream">
        <div className="mx-auto max-w-prose px-4 pb-10 pt-6 sm:px-6">
          <Breadcrumbs items={crumbs} />
          {kicker && <p className="kicker mt-6">{kicker}</p>}
          <h1 className={`${kicker ? "mt-2" : "mt-6"} text-[2.3rem] leading-tight sm:text-[2.9rem]`}>{title}</h1>
          {intro && <p className="mt-4 text-[1.2rem] leading-relaxed text-ink-soft">{intro}</p>}
          {updated && <p className="label-cond mt-4 text-[0.9rem] text-ink-mute">Last updated: {updated}</p>}
        </div>
      </header>
      <article className="mx-auto max-w-prose px-4 pt-10 sm:px-6">
        <div className="prose-sew">{children}</div>
      </article>
    </>
  );
}
