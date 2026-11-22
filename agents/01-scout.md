# Agent 01 - Scout -- SERP gap analysis and product discovery

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
- Amazon blocks automated browsing. Do not bypass a block or a CAPTCHA. If a page will not load, record it and
  move on. Owner experience comes from Reddit (r/sewing, r/quilting, r/MachineEmbroidery, brand subs),
  PatternReview.com, manufacturer forums, long-term YouTube reviews and US retailer Q&A -- never from scraping
  Amazon at volume.
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
`01-page-input.md`, the four shared files, `data/pages.json` rows in the same silo.

## JOB
1. Read the page input. State in one paragraph what this page must do and how it differs from every sibling
   page listed in it (same silo, overlapping keywords). If you cannot state a distinct reason for it to exist,
   write `SERP decision: Hold` and explain -- do not proceed to product work.
2. Research the live **US** Google results for the primary keyword and its main variants. Attempt 5-10
   organic results. **Record how many competitor pages you actually reached.** If fewer than 3, say so and fall
   back to result titles, snippets, People Also Ask, related searches and retailer Q&A. Use the plan's SERP
   notes in the page input (weakness, UGC, newest domain age) as context.
3. Record: dominant intent and the format Google is rewarding; decision factors that repeat across ranking
   pages; **buyer questions answered badly or not at all (the gap list -- your most valuable output)**;
   outdated recommendations competitors still make (discontinued models, old prices).
4. Candidate products (Buying Guide, Product Review, Comparison pages): start from models named in the keyword
   and cluster; add current models from manufacturer US ranges and US retailer listings. Reuse any
   `product-master.csv` row verified within 60 days; do not re-research it. Informational pages may need no
   products at all -- say so.
5. Score candidates (fit for this page's use case 20 / verified evidence quality 15 / stitch and output quality
   15 / ease of use 15 / build and reliability 10 / US value for money 10 / US warranty, service and dealer
   support 10 / current US availability 5). Assign a **distinct buyer role** to each selected product for buying
   guides (e.g. "Best overall", "Best under $200", "Best for heavy fabric"). Cut any product that cannot earn a
   role no other product holds. Typical buying guide: 5-8 products.
6. Commercial factors are **tiebreakers between near-equals only**. Record any tiebreak used. Never rank a
   weaker product higher for commission; never omit a clearly better product because it pays less.

## OUTPUTS
`02-research.md` with sections: Page purpose and distinctness / SERP decision (Validated, Merge or Hold) /
Competitor pages reached (count) / Gap list / Selected products (id, role, one-line reason) / Rejected products
(reason) / Commercial tiebreaks / Open questions.

## GATE
Every selected product has a Product ID (existing, or new in kebab-case: `brand-model`, e.g. `singer-4423`,
`brother-se700`) and a stated role with a reason. Competitor access count is stated as a number.
