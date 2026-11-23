# Agent 02 - Verifier -- specifications, the claim ledger and the Sew Score

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
`02-research.md`, `product-master/product-master.csv`, `product-master/claim-ledger.csv`,
`product-master/review-insights.csv` (after the Listener has run, for the score), `agents/sew-score.md`.

## JOB
1. For each selected product, open the manufacturer's US product page and, where available, the manual or
   spec sheet. Confirm the **exact variant**. Do not mix variants.
2. Fill or refresh the product's row in `product-master.csv`: machine type, built-in stitches, buttonholes,
   max speed (spm), throat space, embroidery field, weight, needle threader, needle up/down, speed control, free
   arm, metal frame, included feet, US warranty, US support presence, price band (US dollars, from US
   retailers, as a band), Amazon.com ASIN if confirmed on the listing, Amazon search query, brand URL, best-for
   labels, known issues, superseded-by, source URLs, `Brand URL` = the exact manufacturer US product page for this
   variant (product photos are fetched from it automatically -- never paste image URLs yourself, never use Amazon
   images), `Last Verified` = today, `Verified By Page ID`,
   `Verification Status`. New product: append a row. Existing stale row: re-verify only price band,
   availability, model status and warranty; add a correction note rather than overwriting.
   A value that conflicts between sources goes in as `Conflict: ...` (the site hides it).
3. Append one row to `claim-ledger.csv` for **every** specification, compatibility, warranty, safety,
   performance or availability statement the article may use -- including general facts on informational
   pages (needle sizes, stitch lengths), with Product ID `general`. Claim IDs are sequential `C0001`... continuing
   from the last row. Status must be one of: `Verified -- primary source` / `Verified -- two secondary sources` /
   `Inference -- label carefully` / `Conflict -- do not publish` / `Unverified -- do not publish`.
4. Keep manufacturer claims separate from independent findings. Never turn a maximum speed into typical
   real-world performance. Preserve units exactly. If sources conflict and the conflict cannot be resolved by
   checking variant and region, mark `Conflict` and move on.
5. **The Sew Score is PAUSED by the owner.** Leave all score columns empty and never mention a score in the
   article. (`agents/sew-score.md` describes the method for when it is switched back on.)
6. Copy the subset of claims this article may use into `03-claims-used.csv`.
   A product needs, at minimum, verified machine type, built-in stitches (or embroidery field for embroidery-only
   machines), buttonhole type and US warranty to be featured. Fewer verified specs than that -> drop it and say so.
7. Run `python scripts/build_data.py`.

## OUTPUTS
Updated `product-master.csv` and `claim-ledger.csv` (append-only); `03-claims-used.csv`; `data/*.json`.

## GATE
Every selected product has a `Verified` status row with a primary spec source URL, or is explicitly dropped in
a note at the top of `03-claims-used.csv`. No claim without a source URL.
