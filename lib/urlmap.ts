import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

/** One row of data/url-map.csv */
export type UrlMapRow = {
  url: string; // "/how-to-sew-a-hem/"
  slug: string; // "how-to-sew-a-hem"
  primaryKeyword: string;
  intent: "Hub" | "Tool" | "Commercial" | "Informational" | "Site page";
  hub: string; // silo slug, e.g. "sewing-machines" ("" for hubs/site pages)
  secondaryKeywords: string[];
  priority: number;
};

let cache: UrlMapRow[] | null = null;

const toSlug = (url: string) => url.replace(/^\/+|\/+$/g, "");

export function getUrlMap(): UrlMapRow[] {
  if (cache) return cache;
  const file = fs.readFileSync(path.join(process.cwd(), "data", "url-map.csv"), "utf8");
  const parsed = Papa.parse<Record<string, string>>(file, { header: true, skipEmptyLines: true });
  cache = parsed.data.map((r) => ({
    url: r.url.trim(),
    slug: toSlug(r.url.trim()),
    primaryKeyword: (r.primary_keyword || "").trim(),
    intent: (r.intent || "").trim() as UrlMapRow["intent"],
    hub: toSlug((r.hub_it_links_to || "").trim()),
    secondaryKeywords: (r.secondary_keywords || "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean),
    priority: Number(r.priority_order) || 9999,
  }));
  return cache;
}

export function getUrlMapRow(slug: string): UrlMapRow | undefined {
  return getUrlMap().find((r) => r.slug === slug);
}

/** All planned articles for a silo (published or not). */
export function getPlannedForSilo(silo: string): UrlMapRow[] {
  return getUrlMap().filter((r) => r.hub === silo && (r.intent === "Commercial" || r.intent === "Informational"));
}
