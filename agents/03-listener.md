# Agent 03 - Listener -- owner-experience patterns

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
Selected products from `02-research.md`; `product-master/review-insights.csv`.

## JOB
Find **recurring patterns** in what owners report about each selected product. Try these sources in order; if one
is blocked, record it and go to the next (never disguise the client to get past a block):
1. Reddit through the official API: `python scripts/reddit_search.py "singer 4423"` lists matching threads in
   r/sewing, r/sewhelp, r/quilting and r/MachineEmbroidery (`--subs` to change); then read the useful ones with
   `python scripts/reddit_search.py --thread <permalink>`. Use it for research only: never quote, never name
   users, record patterns in your own words. If it reports that Reddit is unavailable, move on.
2. WebSearch with `site:reddit.com`, `site:quiltingboard.com`, `site:patternreview.com`, `"<model>" problems` --
   **search snippets count only when the same pattern appears in at least three different threads or pages**;
   record every URL.
3. Customer Q&A and review summaries on the manufacturer's own US site, Walmart, Target or dealer pages (patterns
   only, no quotes, no counts).
4. Long-term YouTube review descriptions reachable without login.
Read Amazon.com review pages only if they load without a block, and only a few -- never at volume.
If a product ends up with fewer than two recurring patterns, that is fine: the article says less about owner
experience for it and it gets no Sew Score. Never stop the article for this.

For every pattern, append a row to `review-insights.csv`: Insight ID (`R0001`... sequential), Product ID,
Theme (tension, feeding thick fabric, thread nesting, bobbin, noise, learning curve, embroidery software,
hoop/field, needle threader, plastic parts, service and warranty, packaging damage...), Pattern Description
**in your own words**, Direction (recurring complaint / recurring praise / mixed), Frequency Signal (`isolated`
/ `recurring` / `dominant`), Sample Size Seen, Sources, Date Collected, Confidence (low / medium / high),
Allowed Wording -- the exact phrasing permitted in the article, e.g. "Owner reports repeatedly mention...",
"A recurring theme among buyers is...", "Several owners describe..., although this is not consistent across all
reports."

Never: quote a review, reproduce a rating or count, present one report as representative, present owner reports
as verified specification, or manufacture a pattern the reports do not show. `isolated` patterns stay in the
ledger as background and never reach an article.

## OUTPUTS
Appended rows in `review-insights.csv`.

## GATE
Every `recurring` / `dominant` row has an Allowed Wording that contains an honest qualifier and no absolute
("all", "every", "everyone", "always").
