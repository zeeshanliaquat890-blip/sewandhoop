# Agent 07 - Closer -- the conversion layer

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
`06-draft.md`, `04-content-brief.md`.

## JOB
Apply the conversion layer without adding claims:
- **Decision speed**: within the first screen, a `<KeyTakeaways>` block naming the top pick and the budget pick
  with one-line reasons (packs A/B/V), followed by `<QuickPicks />` (pack A).
- **Comparison table early**: `<ComparisonTable columns={[...]} />` straight after, decision-relevant columns only.
- Every product section ends with a `<BuySkip>` pair.
- CTAs only after the reader has been given something useful; the product box carries the button, so no extra
  links. Descriptive anchors only; never "click here".
- **Objection handling**: name the reasons a US buyer hesitates for this category -- learning curve, threading,
  tension trouble, noise, space and weight, embroidery design and software costs, accessories that cost extra,
  where to get it serviced -- and answer each honestly.
- Alternatives, not dead ends: every "not for you" points somewhere useful (another pick, a hub, a tool).
- No scarcity, countdowns, invented discounts or manufactured urgency.
- Pack C: conversion is **internal** -- a natural bridge to the relevant buying guide or hub; at most one or two
  contextual affiliate mentions (`<AffiliateLink>`), and only for consumables the reader needs for the task.

## OUTPUTS
`06-draft.md` (updated in place).

## GATE
Takeaways present (A/B/V); every product section has its buy/skip pair; no urgency language.
