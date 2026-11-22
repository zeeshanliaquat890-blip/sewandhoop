# Agent 09 - Editor -- SEO, voice and the final file

## Ground rules (apply to every agent)

- **Rule 0 — this is Sew & Hoop only.** Never read, copy from, or write to the 3dprintpicks repository or any
  other site's data. Never reuse another site's product IDs, claim IDs, insight IDs, ledgers, copy or Amazon tag.
- Market: **United States**. Marketplace: **Amazon.com**. American English (en-US) throughout: color, center,
  favorite, inch, pound. Measurements in US units first (inches, lb), metric in brackets only where useful.
- Audience: US home sewists, quilters and embroiderers, mostly 35+, not technical. Explain every term once.
- Testing status: **research-based, no first-hand testing**. Never imply ownership, hands-on testing,
  measurement or our own photographs. Say what the basis is.
- Three outcomes must hold at once; if they conflict, resolve in this order:
  1. the reader must be better off; 2. the information must be accurate; 3. the page must convert.
- Source priority: manufacturer US product page -> official manual / spec sheet / brochure -> manufacturer
  support pages -> authorized US dealer listing -> Amazon.com listing (availability and price band only) ->
  independent lab or long-term review -> competitor editorial (discovery only, never a fact source).
  An Amazon seller description is **not** manufacturer-confirmed.
- Variants are different machines: Singer 4423 / 4432 / 4452, Brother CS7000X / CS7000i, SE700 / SE630,
  "-i", "-X", "Plus", "Special Edition", retailer-exclusive bundles and previous generations never share a
  specification. State the exact variant.
- Competitors are read to find **gaps only**. Never copy or closely paraphrase their wording, structure,
  tables or headings.
- Respect every site's access rules. Never bypass a block, a CAPTCHA, a login or a paywall, and never disguise
  the client (no fake browser user-agents) to get past a 403. A blocked page is not a reason to stop the article:
  use the **source fallbacks** below, record what was blocked, and move on.
- Amazon blocks automated browsing; never scrape Amazon at volume.

### Source fallbacks (when a page will not load)
1. HTTP 429 (rate limited): wait as long as the site's Retry-After asks (or 60 seconds), retry at most twice.
2. 404 or wrong page: find the real URL with WebSearch (`site:singer.com 4423`, `site:janome.com "memory craft"`)
   instead of guessing.
3. Manufacturer page blocked (403) -> the **official manual, quick-start guide or brochure PDF** for the exact model,
   wherever the manufacturer publishes it (download with `curl -sL -o m.pdf <url>`, read with `pdftotext m.pdf -`).
4. Still nothing -> **two independent authorized US dealer listings that agree** on the value (e.g. Sewing Machines
   Plus, AllBrands, Ken's Sewing Center, brand-authorized local dealers) -> status
   `Verified -- two secondary sources`.
5. A value that appears only in search snippets, a single seller listing or competitor editorial is not verified --
   leave that one value out; never stop the whole article for one missing figure.
- Prices: **US dollar bands only** ("around $250", "under $500", "$200–$300"). Never a live-looking exact
  figure, list price, saving or discount. Never invent a price.
- Never quote a customer review, reproduce a star rating, review count, reviewer name or image.
- Do not modify `data/pages.json` or the plan. Record suggested changes in `09-plan-updates.csv`.
- Do not ask questions mid-run. Record uncertainties in the quality report instead.
- Write only to the files named in your OUTPUTS. Read only the files named in your INPUTS.

## Workspace

Shared, site-wide (read before anything else; append-only, never overwrite a verified row):

    product-master/product-master.csv     one row per machine (specs, price band, Sew Score)
    product-master/claim-ledger.csv       one row per verified claim  (C0001, C0002, ...)
    product-master/review-insights.csv    owner-reported patterns      (R0001, R0002, ...)
    product-master/published-index.csv    which pages are live
    agents/sew-score.md                   how the Sew Score is calculated

Per page, in `work/{PageID}-{slug}/`:

    01-page-input.md       02-research.md          03-claims-used.csv
    04-content-brief.md    05-sections/NN-*.md     06-draft.md
    07-quality-report.md   08-final-article.mdx    09-plan-updates.csv

---
## INPUTS
Audited draft, `04-content-brief.md`, `07-quality-report.md`.

## JOB
1. SEO title: **50-60 characters, primary keyword first, no brand suffix** -- what you write is the whole
   `<title>`. Use the room: after the keyword add a few useful words (the number of picks, who it's for, a clear
   benefit, the year only if the page is current for it), e.g. "Best Sewing Machine for Beginners: 10 Easy Picks
   for 2026" -- never pad with filler or repeat the keyword. Slug = the primary keyword exactly, as in
   `data/pages.json`; never add or remove words. Meta description **140-160 characters**, accurate and click-worthy without overpromising. One H1
   (frontmatter `title`) / logical H2-H3 / primary keyword in the first 100 words once / secondary keywords only
   where the heading genuinely covers them / slug exactly as `data/pages.json` / schema only for **visible**
   content (no FAQ schema without a visible FAQ -- the template renders `faq:` and its schema together).
2. Semantic: core entities present; relationships explained accurately; no stuffing; FAQs do not repeat the body.
3. Human read: consistent American spelling; clear on first read; varied paragraph rhythm; natural transitions;
   calm, independent tone; clichés removed; weaknesses presented fairly. Ask: does this read as one writer, or
   nine blocks stapled together? Fix what fails.
4. E-E-A-T: testing status stated honestly; methodology visible (link `/how-we-review/`); sources traceable via
   `<Cite>`; affiliate relationship disclosed (the template does this automatically); limitations acknowledged.
5. Produce the final `.mdx` with complete frontmatter:

```yaml
---
pageId: "S004"
title: "Best Sewing Machines for Beginners"      # the H1
seoTitle: "Best Sewing Machine for Beginners: 10 Easy Picks for 2026"   # 50-60 chars
description: "140-160 characters…"
template: roundup            # roundup (pack A) | review (packs B and V) | informational (pack C)
contentType: "Buying Guide"
primaryKeyword: "best sewing machine for beginners"
dek: "One sentence under the H1."
status: draft                # the Publisher sets ready
publishAt: "YYYY-MM-DD"      # stamped automatically on the day it goes live
updatedAt: "YYYY-MM-DD"
products:                    # packs A, B, V -- facts come from the product record
  - id: "singer-4423"
    rank: 1
    role: "Best overall"     # the ribbon
    bestFor: "Who it suits, in one line"
    verdict: "One or two sentences on why it earned the role."
    pros: ["…", "…"]
    cons: ["…"]
verdict:                     # packs B and V: shown in the verdict box at the top
  productId: "singer-4423"   # B only
  headline: "One-sentence answer"
  summary: "Two or three sentences."
  bestFor: "Buy it if…"
  skipIf: "Skip it if…"
alternatives:                # pack B, optional
  - name: "Brother CS7000X"
    amazonQuery: "brother cs7000x"
    why: "Who should pick this instead."
faq:
  - q: "Question?"
    a: "40-60 word answer."
---
```

   End the body with a short `## How this article was researched` section stating the research-based basis.

## OUTPUTS
`08-final-article.mdx`.

## GATE
`python scripts/audit.py` on the final file still passes. Title and description lengths in range.
