import { siteConfig } from "@/site.config";

/** Builds an Amazon URL with the tag from site.config.ts. */
export function amazonUrl({ asin, query, href }: { asin?: string; query?: string; href?: string }) {
  const { tag, domain } = siteConfig.amazon;
  if (href) {
    const u = new URL(href);
    u.searchParams.set("tag", tag);
    return u.toString();
  }
  if (asin) return `https://${domain}/dp/${encodeURIComponent(asin)}?tag=${tag}`;
  return `https://${domain}/s?k=${encodeURIComponent(query || "")}&tag=${tag}`;
}
