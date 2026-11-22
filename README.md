# Sew & Hoop — sewandhoop.com

An Amazon affiliate site about sewing and embroidery machines (US market).
Built with Next.js (App Router), TypeScript, Tailwind CSS and MDX files. There is no CMS and no database.
Every page is generated as static HTML at build time.

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages static)
```

---

## Folder map

```
site.config.ts            ← ALL site settings: name, URL, Amazon tag, silos, tools, nav, author
data/url-map.csv          ← the URL plan (url, primary_keyword, intent, hub_it_links_to, …)
content/articles/*.mdx    ← one file per article. File name = URL slug
content/hubs/*.mdx        ← 800–1,000 word intro for each hub page (optional)
app/                      ← routes (home, [slug], tools, legal pages, sitemap, robots, OG images)
templates/                ← Hub, Roundup, Review/vs, Informational page layouts
components/               ← AffiliateLink, ProductBox, ComparisonTable, FAQ, TOC, Steps, …
components/tools/         ← the 8 tools (placeholders for now) + registry.tsx
assets/fonts/             ← TTF fonts used only for generating OG images
```

The Amazon tag lives **only** in `site.config.ts` → `amazon.tag`. Never write it anywhere else.

---

## How to add a new article (step by step)

1. **Find the row** in `data/url-map.csv`. The `url` column gives the slug, e.g. `/how-to-sew-a-hem/` → `how-to-sew-a-hem`.
2. **Create the file** `content/articles/how-to-sew-a-hem.mdx`. The file name must equal the slug exactly.
   The hub (breadcrumb, related articles, hub listing) is picked up automatically from `hub_it_links_to`.
3. **Pick the template** in the frontmatter:
   - `roundup` → "best X" pages (quick picks + comparison table + product boxes + buying guide + FAQ)
   - `review` → single reviews and "X vs Y" (verdict box on top; 1 product = specs + pros/cons, 2+ products = comparison table)
   - `informational` → how-to / what-is (TOC, steps, FAQ, "related machine guides" box)
4. **Write the frontmatter** (copy from a demo file):

```yaml
---
title: "Best Sewing Machines for Beginners in 2026"
description: "150–160 character meta description."
template: roundup
published: "2026-12-01"
updated: "2026-12-01"        # optional
dek: "One-line summary shown under the H1."
products:                    # roundup + review only
  - id: model-a              # used by <ProductBox id="model-a">
    name: "Brand Model 1234"
    asin: "B0XXXXXXX"        # or amazonQuery: "search words" if no ASIN yet
    image: "/images/model-a.jpg"   # optional
    badge: "Best overall"    # products with a badge appear in Quick Picks (max 4)
    bestFor: "Beginners who want room to grow"
    score: 94                # Sew Score 0–100 (shown as a ring)
    scores: { "Stitch quality": 95, "Ease of use": 96, "Build & reliability": 90, "Features for the price": 94, "Owner satisfaction": 92 }
    priceRange: "$200–$300"  # never a live price (Amazon policy)
    summary: "Short summary."
    specs: { "Stitches": "60", "Weight": "13 lb" }   # first 4 keys become comparison table columns
    pros: ["…", "…"]
    cons: ["…"]
verdict:                     # review only
  productId: model-a
  rating: 4.6
  headline: "One-sentence verdict"
  summary: "2–3 sentences."
  bestFor: "…"
  skipIf: "…"
alternatives:                # review only, optional
  - name: "Other Model"
    asin: "B0…"
    why: "Why someone might pick it."
    href: "/other-model-review/"   # optional internal link
faq:                         # any template — also creates FAQPage schema
  - q: "Question?"
    a: "40–60 word answer."
---
```

5. **Write the body in Markdown.** Use `##` for main sections (they build the table of contents) and `###` for sub-sections. Components you can use:

```mdx
<ProductBox id="model-a">Long review text for this product…</ProductBox>

<AffiliateLink asin="B0XXXXXXX">inline link text</AffiliateLink>
<AffiliateLink query="sewing machine needles" variant="button">Shop needles</AffiliateLink>

<Steps>
  <Step title="Press the hem">Text…</Step>
</Steps>

<Callout type="tip">Text…</Callout>       (types: tip, note, warning)

<Tool name="fabric-yardage-calculator" /> (any tool slug from site.config.ts)
```

   Internal links are normal Markdown links: `[beginner guide](/best-sewing-machine-for-beginners/)`.

6. **Run `npm run dev`** and check the page, then commit and push. Vercel rebuilds automatically.

### What happens automatically

- The sticky **On this page** sidebar (desktop) and section bar (mobile) are built from your `##`/`###` headings, product boxes and FAQ.

- Affiliate disclosure line on top of every page with affiliate links
- `rel="sponsored nofollow"` + `target="_blank"` + the tag on every Amazon link
- Breadcrumb → hub, hub listing, 4–6 related articles from the same silo
- Informational articles show a box linking to the commercial pages of the same silo
- Sitemap, canonical, Open Graph/Twitter tags, OG image, and schema (Article, BreadcrumbList, ItemList, FAQPage, Product review)
- Only articles that exist as MDX files are linked or put in the sitemap. Planned URLs never become broken links.

### Demo articles

`best-sewing-machine-for-beginners`, `serger-vs-sewing-machine` and `how-to-sew-a-hem` are demos with `noindex: true`.
When you write the real article, overwrite the file and **delete the `noindex: true` line**.

### Drafts

Add `draft: true` to the frontmatter. The page shows in `npm run dev` but is left out of production builds.

---

## Hub pages

Create or edit `content/hubs/<silo-slug>.mdx` (e.g. `embroidery-machines.mdx`) with `title`, `description` and 800–1,000 words of body.
The article lists, grouped by type, and the tools box are added below it automatically.

## Tools

All 8 tools are live React components in `components/tools/`, registered in `components/tools/registry.tsx`.
Each one works on its own page (`/tools/<slug>/`) **and** inside any article: `<Tool name="<slug>" />`.
Page copy (intro, how-to steps, FAQ + FAQ schema) lives in `lib/tool-content.ts`.

| Tool | File | Data it uses |
|---|---|---|
| Machine Finder | `MachineFinder.tsx` | Built-in rules. Links to guides only once they are published (otherwise to the hub). Reads `?project=` from the URL. |
| Thread Color Converter | `ThreadColorConverter.tsx` | `public/data/threads.json`: 10 thread lines (Madeira Rayon & Polyneon, Isacord, Robison-Anton Rayon & Poly, Brother, Brother Country, Sulky Rayon, Floriani, Janome), loaded only when the tool opens. Matching uses CIEDE2000. |
| Needle & Thread Selector | `NeedleThreadSelector.tsx` | 18 fabrics, built into the file. |
| Machine Comparison | `MachineComparison.tsx` | `data/machines.ts`. **Contains demo machines** — replace them with real, checked specs. |
| Embroidery Pricing Calculator | `EmbroideryPricingCalculator.tsx` | Formula only. |
| Fabric Yardage Calculator | `FabricYardageCalculator.tsx` | Formula only (pieces, quilt backing, binding). |
| Stitch Count & Time Estimator | `StitchCountEstimator.tsx` | Rules of thumb (stitches per sq in by style). |
| Troubleshooting Wizard | `TroubleshootingWizard.tsx` | 10 problems with ordered fixes, built into the file. |

Thread color data was adapted from the open-source Ink/Stitch project palettes (inkstitch.org, GPL-3.0); the source is credited under the tool.

## URL map

`data/url-map.csv` was generated from `CONTENT-PLAN-FINAL.xlsx` (slugs made from the primary keyword).
If you have your own `URL-MAP.csv`, replace this file with it. Keep the same column names.

## Click tracking

`components/AffiliateClickTracker.tsx` pushes an `affiliate_click` event to `window.dataLayer` on every Amazon click
(this works with Google Tag Manager / GA4 when you add them). To send clicks to your own endpoint, set
`analytics.affiliateClickEndpoint` in `site.config.ts`.

---

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to vercel.com → **Add New… → Project** → import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected). Leave build settings on their defaults. No environment variables are needed.
4. Click **Deploy**.
5. In the project, open **Settings → Domains** → add `sewandhoop.com` and `www.sewandhoop.com`. Set `sewandhoop.com` as primary and redirect `www` to it.
6. At your domain registrar add the DNS records Vercel shows (usually an `A` record `76.76.21.21` for the root and a `CNAME` `cname.vercel-dns.com` for `www`).
7. After it goes live, submit `https://sewandhoop.com/sitemap.xml` in Google Search Console.

Every push to `main` deploys automatically.
