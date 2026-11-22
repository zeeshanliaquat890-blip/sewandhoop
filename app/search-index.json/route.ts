import { siteConfig } from "@/site.config";
import { getAllArticles, getSilo, templateLabel } from "@/lib/content";

export const dynamic = "force-static";

/** Static search index for the client-side search box. */
export function GET() {
  const entries = [
    ...siteConfig.silos.map((s) => ({ t: s.name, u: `/${s.slug}/`, k: s.description, c: "Category" })),
    ...siteConfig.tools.map((t) => ({ t: t.name, u: `/tools/${t.slug}/`, k: t.description, c: "Free tool" })),
    ...getAllArticles().map((a) => ({
      t: a.fm.title,
      u: a.url,
      k: [a.map?.primaryKeyword, ...(a.map?.secondaryKeywords ?? []).slice(0, 12), getSilo(a.silo)?.name].filter(Boolean).join(" "),
      c: templateLabel[a.fm.template],
    })),
  ];
  return Response.json(entries);
}
