# S004 quality report: NOT WRITTEN, no article produced

Status: stopped at Verifier/Listener. `content/articles/best-sewing-machine-for-beginners.mdx` is still the demo (status: example), untouched.

Reasons:
1. Only 2 machines verified from a primary source (Brother CS7000X, GX37). A Pack A roundup needs 5-8.
2. Singer (429) and Janome (403) manufacturer pages were unreachable; search snippets are not primary sources.
3. Listener: Reddit unreachable, so no review-insights rows; no `<Owners>` content and no Sew Score possible.
4. CS7000X/GX37 pages give speed and weight without units; left out rather than assumed.

To resume: re-run S004; ledger rows C0001-C0009 are reusable. Need Singer/Janome/other primary pages and an owner-report source.

## Second run, 2026-11-22: still blocked, still not written
- singer.com M3500 (`/products/singer-m3500-sewing-machine`): HTTP 429 again; the old guessed URL is 404.
  A search snippet and retailer listings mention specs, but these are not primary sources and were not ledgered.
- janome.com: HTTP 403. patternreview.com: redirects to sewing.patternreview.com, then HTTP 403.
- No owner-report source reached, so there are no `review-insights.csv` rows, no `<Owners>` content and no Sew Score.
- Article left unwritten. The demo `best-sewing-machine-for-beginners.mdx` (status: example) is unchanged.
- Resume when singer.com stops returning 429 and a Janome or other 3rd-brand primary page and an owner-report
  source are reachable. Ledger rows C0001-C0009 stay reusable.
