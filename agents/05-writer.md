# Agent 05 - Writer -- one section at a time

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
For **one** heading only: its entry in `04-content-brief.md`, the ledger rows for its approved Claim IDs
(`03-claims-used.csv`), its approved Insight rows, `agents/packs.md`, and a two-line summary of the previous
section. Nothing else.

## JOB
Write this section as MDX, using only the evidence supplied. **Do not research.** If a fact you need is missing,
stop and write `MISSING FACT: ...` at the top of the file instead of guessing.

Writing rules:
- Answer the heading directly in the first sentence where appropriate.
- American English; write for a real person choosing a machine, not a search engine. Warm, calm, plain.
- Connect every specification to an outcome -- what it means for stitch quality, sewing thick seams, quilting
  space, ease of threading, noise, portability or cost. Explain a term the first time it appears.
- Every sentence containing a specification figure carries `<Cite id="C0123" />` immediately after the figure.
  Every owner-experience sentence is wrapped: `<Owners id="R0007">Owner reports repeatedly mention ...</Owners>`
  using the ledger's Allowed Wording.
- Products appear only through the site components -- never write an Amazon URL, never type a spec into a card:
  - `<ProductBox id="singer-4423">section text…</ProductBox>` (the box reads the product record)
  - `<QuickPicks />` and `<ComparisonTable columns={["Type","Built-in stitches","Weight","Warranty (US)"]} />`
    (they read the frontmatter products; columns are spec labels from the product record)
  - `<KeyTakeaways points={["…","…"]} />`, `<BuySkip buy="…" skip="…" />`, `<Verdict buyIf="…" skipIf="…">…</Verdict>`
  - how-tos: `<Steps><Step title="…">…</Step></Steps>`, `<Callout type="tip|note|warning">…</Callout>`
  - a contextual link: `<AffiliateLink query="universal sewing machine needles 80/12">a pack of 80/12 needles</AffiliateLink>`
  - a tool: `<Tool name="fabric-yardage-calculator" />` (slugs in `site.config.ts`)
- Price bands only, in US dollars. Never an exact live-looking figure.
- Vary sentence length. No empty openings, generic summaries, exaggerated adjectives, fake urgency or repetitive
  conclusions. Never mention being an AI. Never claim first-hand use.
- Forbidden literally: "we tested", "in our testing", "hands-on testing", "users love", "everyone agrees",
  "customers rave", "guaranteed", "completely safe", "the perfect choice", "the undisputed best",
  "look no further", "without a doubt the best", "in my experience", "we found that", "I own", "we own",
  "game-changer", "dive into", "in today's world", "elevate your".
- Product sections end with `<BuySkip buy="…" skip="…" />`; the page's final verdict uses `<Verdict>`.

## OUTPUTS
`05-sections/NN-{slug}.md` for this heading only.

## GATE
No `MISSING FACT`. Every unit figure has a `<Cite>`. Every owner sentence has `<Owners>`.
