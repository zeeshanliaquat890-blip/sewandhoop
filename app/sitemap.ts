import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllArticles, getArticlesForSilo } from "@/lib/content";
import { absUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Only pages that actually exist (published MDX) go into the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getAllArticles().filter((a) => !a.fm.noindex);
  const latest = (list: typeof articles) =>
    list.length ? new Date(list.map((a) => a.fm.updated || a.fm.published).sort().reverse()[0]) : now;
  return [
    { url: absUrl("/"), lastModified: latest(articles), changeFrequency: "daily", priority: 1 },
    ...siteConfig.silos.map((s) => ({ url: absUrl(`/${s.slug}/`), lastModified: latest(getArticlesForSilo(s.slug)), changeFrequency: "weekly" as const, priority: 0.9 })),
    ...articles.map((a) => ({ url: absUrl(a.url), lastModified: new Date(a.fm.updated || a.fm.published), changeFrequency: "monthly" as const, priority: a.fm.template === "informational" ? 0.6 : 0.8 })),
    { url: absUrl("/tools/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...siteConfig.tools.map((t) => ({ url: absUrl(`/tools/${t.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["/about/", "/how-we-test/", "/contact/", "/affiliate-disclosure/", "/privacy-policy/", "/terms-and-conditions/"].map((p) => ({ url: absUrl(p), lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
