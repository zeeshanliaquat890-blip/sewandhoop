# Sew & Hoop (sewandhoop.com) — rules for every Claude session

## RULE 0 — never mix sites
This repository is **Sew & Hoop only**: sewing, embroidery, quilting machines and sergers, for the **USA**.

The owner also runs **3D Print Picks** (3dprintpicks.co.uk, a UK 3D-printer site) in a separate repository.
The two sites must never be mixed:

- Never read from, write to, copy from, or commit to the 3dprintpicks repository while working here.
- Never reuse its product data, claim IDs, insight IDs, ledgers, slugs, keywords, copy, images, Amazon tag or schedule.
- Never mention 3D printers, the UK, pounds (£), Amazon.co.uk or British spelling on this site.
- This site's Amazon tag lives only in `site.config.ts`. Never use any other tag.
- If a task, prompt or file seems to refer to the other site, stop and say so instead of acting on it.

## Market and voice
- Market: United States. Marketplace: **Amazon.com**. American English (en-US). Prices in **US dollars**, as bands only.
- Audience: US home sewists and embroiderers, mostly 35+, not technical. Plain, warm, calm, honest.
- Testing status: **research-based**. We do not claim to have tested, owned or measured machines unless the owner
  explicitly says a specific machine was tested hands-on.

## How articles are made
Articles are written by the ten-agent pipeline in `agents/` (01-scout → 10-publisher), run one page at a time by
`.github/workflows/write-article.yml`. Read `agents/README.md` before touching anything in `agents/`, `scripts/`,
`product-master/` or `content/articles/`.

- The page plan is `data/pages.json` (from the owner's content plan); the order is `data/schedule.json`.
- Facts live in `product-master/` (append-only ledgers) and are compiled to `data/*.json` by `scripts/build_data.py`.
- `scripts/audit.py` is the gate. Never weaken a check to make an article pass.
- Indexing is switched off site-wide (`allowIndexing: false` in `site.config.ts`) until the first real article is
  live; then `scripts/maybe_enable_indexing.py` (run by the workflow, at the owner's request) switches it on once.
  Agents never edit `site.config.ts`.
