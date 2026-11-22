import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { getUrlMapRow, type UrlMapRow } from "./urlmap";
import { siteConfig } from "@/site.config";
import productsData from "@/data/products.json";

export type Template = "roundup" | "review" | "informational";

export type Product = {
  id: string;
  name: string;
  asin?: string;
  /** Use when you have no ASIN yet: builds an Amazon search link instead. */
  amazonQuery?: string;
  image?: string;
  badge?: string; // "Best overall"
  bestFor?: string;
  rating?: number; // out of 5 — optional, derived from `score` if missing
  /** Sew Score 0–100 (overall) */
  score?: number;
  /** Sub-scores 0–100, e.g. { "Stitch quality": 92, "Ease of use": 88 } */
  scores?: Record<string, number>;
  priceRange?: string; // "$$" or "Under $200" — never a live price
  specs?: Record<string, string | number>;
  pros?: string[];
  cons?: string[];
  summary?: string;
};

export type Faq = { q: string; a: string };

export type ArticleFrontmatter = {
  /** Page ID from data/pages.json, e.g. "S004" */
  pageId?: string;
  title: string;
  /** Full <title>, 30–60 characters, no brand suffix. Falls back to `title`. */
  seoTitle?: string;
  description: string;
  template: Template;
  contentType?: string;
  primaryKeyword?: string;
  /** Publish gate: only "ready" pages whose publishAt has arrived (US Eastern) are built. */
  status?: "draft" | "ready" | "hold" | "example";
  publishAt?: string;
  updatedAt?: string;
  published: string; // YYYY-MM-DD
  updated?: string;
  author?: string;
  image?: string;
  /** Short line shown under the H1 */
  dek?: string;
  products?: Product[];
  faq?: Faq[];
  /** Review / vs pages */
  verdict?: { productId?: string; rating?: number; headline: string; summary: string; bestFor?: string; skipIf?: string };
  alternatives?: { name: string; asin?: string; amazonQuery?: string; why: string; href?: string }[];
  draft?: boolean;
  /** true = page is built but hidden from Google (noindex + left out of sitemap). Used by the demo articles. */
  noindex?: boolean;
};

export type Heading = { depth: 2 | 3; text: string; id: string };

export type Article = {
  slug: string;
  url: string;
  fm: ArticleFrontmatter;
  body: string;
  silo: string;
  map?: UrlMapRow;
  headings: Heading[];
  hasAffiliateLinks: boolean;
  readingMinutes: number;
};

/* ---------- product records (data/products.json, built from product-master/) ---------- */

type ProductRecord = {
  id: string; name: string; asin?: string | null; amazonQuery?: string | null; image?: string | null;
  priceRange?: string | null; specs?: Record<string, string>; score?: number | null; scores?: Record<string, number> | null;
};
const PRODUCTS = productsData as unknown as Record<string, ProductRecord>;

export function getProductRecord(id: string) {
  return PRODUCTS[id];
}
export function allProductRecords() {
  return Object.values(PRODUCTS);
}

/**
 * An article names a product by id and adds only what belongs to that page (rank, role, verdict,
 * pros/cons). Facts, the Amazon link, the price band and the Sew Score come from the product record,
 * so one ledger edit updates every page. Inline products (with a `name`) are used as-is (demo pages).
 */
function resolveProduct(p: Product & { verdict?: string; rank?: number; role?: string }): Product {
  const rec = PRODUCTS[p.id];
  if (!rec) return { ...p, badge: p.badge ?? p.role, summary: p.summary ?? p.verdict };
  return {
    ...p,
    name: p.name || rec.name,
    asin: p.asin ?? rec.asin ?? undefined,
    amazonQuery: p.amazonQuery ?? rec.amazonQuery ?? undefined,
    image: p.image ?? rec.image ?? undefined,
    priceRange: p.priceRange ?? rec.priceRange ?? undefined,
    specs: p.specs ?? rec.specs,
    score: p.score ?? rec.score ?? undefined,
    scores: p.scores ?? rec.scores ?? undefined,
    summary: p.summary ?? p.verdict,
    badge: p.badge ?? p.role,
  };
}

/** "Today" for the publish gate, in US Eastern time. */
export function usToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

/**
 * The publish gate. A page is built only when it is marked ready AND its publishAt date has arrived.
 * Legacy/demo files without a status follow their old behaviour; status "example" pages show only in
 * `next dev` or with PREVIEW_ALL=true (never set PREVIEW_ALL on Vercel).
 */
export function isLive(fm: ArticleFrontmatter) {
  if (process.env.PREVIEW_ALL === "true" || process.env.NODE_ENV === "development") return fm.status !== "hold";
  if (fm.status === undefined) return !fm.draft;
  return fm.status === "ready" && String(fm.publishAt ?? "") <= usToday();
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const HUBS_DIR = path.join(process.cwd(), "content", "hubs");

let cache: Article[] | null = null;

export function extractHeadings(body: string, fm: Partial<ArticleFrontmatter> = {}): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  const products = fm.products ?? [];
  // Sections the templates add around the body
  if (fm.template === "roundup" && products.some((p) => p.badge)) out.push({ depth: 2, text: "Our top picks", id: "quick-picks" });
  if (products.length > 1) out.push({ depth: 2, text: "Comparison table", id: "comparison" });
  if (fm.template === "review" && fm.verdict) out.unshift({ depth: 2, text: "Our verdict", id: "verdict" });
  let inCode = false;
  for (const line of body.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const pb = /<ProductBox\s+id="([^"]+)"/.exec(line);
    if (pb) {
      const prod = products.find((p) => p.id === pb[1]);
      if (prod) out.push({ depth: 3, text: prod.name, id: `product-${prod.id}` });
      continue;
    }
    const m = /^(##|###)\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
      out.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
    }
  }
  if (fm.template === "review" && fm.alternatives?.length) out.push({ depth: 2, text: "Alternatives", id: "alternatives" });
  if (fm.faq?.length) out.push({ depth: 2, text: "FAQ", id: "faq" });
  return out;
}

export function getAllArticles(): Article[] {
  if (cache) return cache;
  if (!fs.existsSync(ARTICLES_DIR)) return (cache = []);
  const list: Article[] = [];
  for (const file of fs.readdirSync(ARTICLES_DIR)) {
    if (!/\.mdx?$/.test(file)) continue;
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;
    if (!isLive(fm)) continue;
    if (fm.products) fm.products = fm.products.map(resolveProduct);
    if (fm.publishAt && !fm.published) fm.published = String(fm.publishAt);
    if (fm.updatedAt && !fm.updated) fm.updated = String(fm.updatedAt);
    const map = getUrlMapRow(slug);
    if (!map) {
      console.warn(`[content] "${slug}" is not in data/url-map.csv — check the file name.`);
    }
    const words = content.split(/\s+/).length;
    list.push({
      slug,
      url: `/${slug}/`,
      fm: { ...fm, published: String(fm.published ?? ""), updated: fm.updated ? String(fm.updated) : undefined },
      body: content,
      silo: map?.hub || "sewing-machines",
      map,
      headings: extractHeadings(content, fm),
      hasAffiliateLinks:
        fm.template !== "informational" ||
        Boolean(fm.products?.length) ||
        /<(AffiliateLink|ProductBox|QuickPicks|ComparisonTable|Verdict)\b/.test(content),
      readingMinutes: Math.max(1, Math.round(words / 230)),
    });
  }
  list.sort((a, b) => (b.fm.updated || b.fm.published).localeCompare(a.fm.updated || a.fm.published));
  return (cache = list);
}

export function getArticle(slug: string) {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesForSilo(silo: string) {
  return getAllArticles().filter((a) => a.silo === silo);
}

/** 4–6 related articles from the same silo. Prefers the same template, then the rest. */
export function getRelated(article: Article, count = 6) {
  const pool = getArticlesForSilo(article.silo).filter((a) => a.slug !== article.slug);
  const same = pool.filter((a) => a.fm.template === article.fm.template);
  const other = pool.filter((a) => a.fm.template !== article.fm.template);
  return [...same, ...other].slice(0, count);
}

/** Commercial (money) pages in the same silo — shown under informational articles. */
export function getMoneyPages(silo: string, exclude?: string, count = 4) {
  return getArticlesForSilo(silo)
    .filter((a) => a.fm.template !== "informational" && a.slug !== exclude)
    .sort((a, b) => (a.map?.priority ?? 9999) - (b.map?.priority ?? 9999))
    .slice(0, count);
}

export function getHubContent(silo: string): { body: string; fm: Record<string, unknown> } | null {
  const file = path.join(HUBS_DIR, `${silo}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { body: content, fm: data };
}

export function getSilo(slug: string) {
  return siteConfig.silos.find((s) => s.slug === slug);
}

export const templateLabel: Record<Template, string> = {
  roundup: "Buying guide",
  review: "Review",
  informational: "How-to",
};
