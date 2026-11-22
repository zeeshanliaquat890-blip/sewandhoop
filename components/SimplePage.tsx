import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

/** Layout for site pages (about, legal, contact). */
export function SimplePage({ title, path, intro, updated, children }: { title: string; path: string; intro?: string; updated?: string; children: React.ReactNode }) {
  const crumbs = [{ name: "Home", url: "/" }, { name: title, url: path }];
  return (
    <article className="mx-auto max-w-prose px-4 pt-8 sm:px-6">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-[2.3rem] leading-tight sm:text-[2.8rem]">{title}</h1>
      {intro && <p className="mt-4 text-[1.22rem] leading-relaxed text-ink-soft">{intro}</p>}
      {updated && <p className="mt-3 text-[0.95rem] text-ink-mute">Last updated: {updated}</p>}
      <hr className="stitch-rule my-8" />
      <div className="prose-sew">{children}</div>
    </article>
  );
}
