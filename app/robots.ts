import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

/**
 * robots.txt
 * Crawling stays allowed even while the site is noindexed: Google has to be able to fetch a page to see its
 * noindex tag. (Blocking it here would let URLs appear in search without a snippet.)
 * The noindex switch is `allowIndexing` in site.config.ts.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/search-index.json", "/*?*"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
