# Agent 04 - Architect -- the content brief

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
`01-page-input.md`, `02-research.md`, `03-claims-used.csv`, `review-insights.csv` rows for the selected
products, `product-master/published-index.csv`, `agents/packs.md`.

## JOB
1. Select the pack from Content Type: Buying Guide -> **Pack A**; Product Review -> **Pack B**;
   Comparison -> **Pack V**; Informational Guide -> **Pack C**. Use that pack's structure. Build an original
   outline serving the intent, target word range and buyer journey. Never reproduce a competitor outline.
   Never add a section for length.
2. Entity map in three layers: core (recur naturally), heading-specific, supporting (only where they improve
   meaning). Never force entities in.
3. Keyword placement: primary keyword -> SEO title, H1, first 100 words, once each. Secondary keywords -> only the
   H2/H3 that genuinely covers that ground. No exact-match repetition targets. Write down where each goes.
4. For every planned heading record: reader question answered / search intent served / entities / approved
   Claim IDs / approved Insight IDs (recurring or dominant only) / target length / internal link (only if the
   target is `Published` in `published-index.csv`, or is a hub, tool or site page; otherwise list under "Pending
   links") / conversion role (informational, comparison, decision, CTA-appropriate) / any `<Tool>` to embed.
5. Cannibalisation check: compare this outline's angle against every published page in the same silo. If it is
   not distinct, stop and write `Brief decision: Hold` with the reason.

## OUTPUTS
`04-content-brief.md`: pack, SEO title (30-60 chars, keyword first, no brand suffix), meta description
(140-160 chars), H1, dek (one sentence), outline with the per-heading record above, keyword placement table,
entity map, pending internal links, 4-8 FAQ questions drawn from People Also Ask and the gap list.

## GATE
Every heading has at least one Claim ID or is explicitly marked "no specification content". Word targets sum
to the page's range. No heading is assigned a Claim ID that is not `Verified`.
