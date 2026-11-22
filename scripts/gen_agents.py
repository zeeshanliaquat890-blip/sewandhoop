# -*- coding: utf-8 -*-
"""
Generate agents/01-scout.md ... agents/10-publisher.md for Sew & Hoop.

The ground rules and workspace block are shared, so they are written once here and stamped into every
agent file. Edit this script, not the generated files, then run:

    python scripts/gen_agents.py
"""
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "agents")

GROUND = """## Ground rules (apply to every agent)

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
"""

WORKSPACE = """## Workspace

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
"""

AGENTS = {}

AGENTS["01-scout"] = ("Scout -- SERP gap analysis and product discovery", """## INPUTS
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
   role no other product holds. **A buying guide must feature at least 10 verified products** (the owner's rule).
   Start with a candidate list of 14-16 so that blocked or unverifiable machines can be dropped. Look across the
   main US brands: Brother, Singer, Janome, Juki, Baby Lock, Bernette, Bernina, Husqvarna Viking, Pfaff, Elna,
   Necchi -- current models only. If fewer than 10 can be verified after the source fallbacks, write
   `SERP decision: Hold -- sources` with what was blocked, so the next run resumes from the ledger.
6. Commercial factors are **tiebreakers between near-equals only**. Record any tiebreak used. Never rank a
   weaker product higher for commission; never omit a clearly better product because it pays less.

## OUTPUTS
`02-research.md` with sections: Page purpose and distinctness / SERP decision (Validated, Merge or Hold) /
Competitor pages reached (count) / Gap list / Selected products (id, role, one-line reason) / Rejected products
(reason) / Commercial tiebreaks / Open questions.

## GATE
Every selected product has a Product ID (existing, or new in kebab-case: `brand-model`, e.g. `singer-4423`,
`brother-se700`) and a stated role with a reason. Competitor access count is stated as a number.
""")

AGENTS["02-verifier"] = ("Verifier -- specifications, the claim ledger and the Sew Score", """## INPUTS
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
5. **After the Listener has added insight rows**, calculate the Sew Score for each product exactly as
   `agents/sew-score.md` says and write the six score columns plus `Score Notes`. If a row already has a score
   from the last 90 days, keep it.
6. Copy the subset of claims this article may use into `03-claims-used.csv`.
   A product needs, at minimum, verified machine type, built-in stitches (or embroidery field for embroidery-only
   machines), buttonhole type and US warranty to be featured. Fewer verified specs than that -> drop it and say so.
7. Run `python scripts/build_data.py`.

## OUTPUTS
Updated `product-master.csv` and `claim-ledger.csv` (append-only); `03-claims-used.csv`; `data/*.json`.

## GATE
Every selected product has a `Verified` status row with a primary spec source URL, or is explicitly dropped in
a note at the top of `03-claims-used.csv`. No claim without a source URL.
""")

AGENTS["03-listener"] = ("Listener -- owner-experience patterns", """## INPUTS
Selected products from `02-research.md`; `product-master/review-insights.csv`.

## JOB
Find **recurring patterns** in what owners report about each selected product. Try these sources in order; if one
is blocked, record it and go to the next (never disguise the client to get past a block):
1. Reddit's public JSON endpoints, identifying ourselves honestly and at a gentle pace (one request every few
   seconds), e.g. `curl -sL -A "sewandhoop-research/1.0 (+https://sewandhoop.com/about/)"
   "https://www.reddit.com/r/sewing/search.json?q=singer%204423&restrict_sr=1&limit=25"` (also r/quilting,
   r/MachineEmbroidery, r/sewhelp). If Reddit refuses, move on.
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
""")

AGENTS["04-architect"] = ("Architect -- the content brief", """## INPUTS
`01-page-input.md`, `02-research.md`, `03-claims-used.csv`, `review-insights.csv` rows for the selected
products, `product-master/published-index.csv`, `agents/packs.md`.

## JOB
1. Select the pack from Content Type: Buying Guide -> **Pack A**; Product Review -> **Pack B**;
   Comparison -> **Pack V**; Informational Guide -> **Pack C**. Use that pack's structure. Build an original
   outline serving the intent, target word range and buyer journey. Never reproduce a competitor outline.
   Never add a section for length.
2. Entity map in three layers: core (recur naturally), heading-specific, supporting (only where they improve
   meaning). Never force entities in.
3. Keyword placement: the primary keyword's main terms -> SEO title and H1 (natural wording, exact match not
   required), and the primary keyword itself once in the first 100 words. Secondary keywords -> the title (one or
   two, if natural) and only the H2/H3 that genuinely covers that ground. No exact-match repetition targets.
   Write down where each goes.
4. For every planned heading record: reader question answered / search intent served / entities / approved
   Claim IDs / approved Insight IDs (recurring or dominant only) / target length / internal link (only if the
   target is `Published` in `published-index.csv`, or is a hub, tool or site page; otherwise list under "Pending
   links") / conversion role (informational, comparison, decision, CTA-appropriate) / any `<Tool>` to embed.
5. Cannibalisation check: compare this outline's angle against every published page in the same silo. If it is
   not distinct, stop and write `Brief decision: Hold` with the reason.

## OUTPUTS
`04-content-brief.md`: pack, SEO title (50-60 chars, main keyword terms plus secondary terms, no brand suffix), meta description
(140-160 chars), H1, dek (one sentence), outline with the per-heading record above, keyword placement table,
entity map, pending internal links, 4-8 FAQ questions drawn from People Also Ask and the gap list.

## GATE
Every heading has at least one Claim ID or is explicitly marked "no specification content". Word targets sum
to the page's range. No heading is assigned a Claim ID that is not `Verified`.
""")

AGENTS["05-writer"] = ("Writer -- one section at a time", """## INPUTS
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
""")

AGENTS["06-assembler"] = ("Assembler -- one article from the sections", """## INPUTS
`05-sections/*.md` in order, `04-content-brief.md`, `product-master/published-index.csv`.

## JOB
Combine sections into `06-draft.md` in the brief's order. Remove duplicated facts and repeated product
introductions. Keep product names and terminology identical throughout. Order information the way a buyer
decides. Every `<ProductBox id>` must have a matching `products:` entry in the frontmatter and vice versa --
any mismatch is a hard failure you fix here. Insert internal links only to pages that are `Published` in
`published-index.csv`, the hub pages, `/tools/...` pages and site pages; everything else goes to a "Pending
internal links" list at the bottom of the file inside an MDX comment `{/* ... */}`.

## OUTPUTS
`06-draft.md`.

## GATE
One `<Verdict>` (packs A, B and V). Product IDs in boxes equal frontmatter products. No duplicated H2.
""")

AGENTS["07-closer"] = ("Closer -- the conversion layer", """## INPUTS
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
""")

AGENTS["08-auditor"] = ("Auditor -- the gate", """## INPUTS
`06-draft.md` assembled into the article file with frontmatter; the data layer.

## JOB
Write the draft (with full frontmatter, see the Editor) to `content/articles/{slug}.mdx` with `status: draft`
and run `python scripts/audit.py content/articles/{slug}.mdx --report work/{page}/07-quality-report.md`.
The script checks are code and cannot be argued with. For each **FAIL**, return the failing passage to the
Writer with exact repair instructions (which check, which sentence, what to change) and re-run. Three cycles
maximum. If it still fails, do not pretend it passed: leave the best version at `status: draft` and list every
unresolved item at the top of the report.

The four **MODEL** checks (05 best-for reasons / 08 variant attribution / 15 safety claims / 16 no implied
first-hand use) are yours to judge by reading the draft. Record a literal Yes/No for each in the report with the
sentence that decided it.

## OUTPUTS
`07-quality-report.md` (script table plus your four judgements, revision history, unresolved items).

## GATE
All script checks PASS and all 4 model checks Yes -> the article may proceed to the Editor.
""")

AGENTS["09-editor"] = ("Editor -- SEO, voice and the final file", """## INPUTS
Audited draft, `04-content-brief.md`, `07-quality-report.md`.

## JOB
1. SEO title: **50-60 characters, no brand suffix** -- what you write is the whole `<title>`. Google ranks a page
   for many related searches, so write the title for people and for the whole keyword cluster: it must contain
   the main terms of the primary keyword (exact order not required, a natural variation is fine), and it should
   pick up one or two strong secondary terms where they read naturally. Keyword placement is a judgement call:
   put the main terms early when it reads well, but never force an awkward exact match. Use the room for useful
   words (number of picks, who it's for, a clear benefit, the year only if the page is current for it), e.g.
   "10 Best Sewing Machines for Beginners, Easy to Learn (2026)". Never pad with filler or repeat a word. Slug = the primary keyword exactly, as in
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
seoTitle: "10 Best Sewing Machines for Beginners, Easy to Learn (2026)"   # 50-60 chars
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
""")

AGENTS["10-publisher"] = ("Publisher -- going live", """## INPUTS
`08-final-article.mdx`, `07-quality-report.md`, `data/schedule.json`.

## JOB
1. Copy `08-final-article.mdx` to `content/articles/{slug}.mdx` (slug exactly as `data/pages.json`). Set
   `publishAt` and `updatedAt` = today (US Eastern). Set `status: ready` **only if** the quality report's script
   verdict is PASS and the four model checks are Yes; otherwise `status: draft`.
2. Run `python scripts/build_data.py` and `npm run build`. A failure here is a stop: fix it or leave the
   article at `status: draft`.
3. Append this page to `product-master/published-index.csv` with status `Published` (or `Draft`) and today's
   date, plus the Products Featured list (ids separated by `; `).
4. Write `09-plan-updates.csv` rows: `Page ID, Field, Current Value, Suggested Value, Reason`.
5. `git add` the article, the shared CSVs, `data/` and the work folder; commit with message
   `Article: {PageID} {title} ({status})`. Do not push -- the workflow pushes.

## OUTPUTS
`content/articles/{slug}.mdx`, updated `published-index.csv`, `09-plan-updates.csv`, one commit.

## GATE
The build passes; the commit exists.
""")


def main():
    os.makedirs(OUT, exist_ok=True)
    for i, (key, (title, body)) in enumerate(AGENTS.items(), start=1):
        text = f"# Agent {key[:2]} - {title}\n\n{GROUND}\n{WORKSPACE}\n---\n{body}"
        io.open(os.path.join(OUT, f"{key}.md"), "w", encoding="utf-8", newline="\n").write(text)
    print(f"wrote {len(AGENTS)} agent files")


if __name__ == "__main__":
    main()
