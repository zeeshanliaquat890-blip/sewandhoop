# Role packs

`contentType` in `data/pages.json` selects the pack. The structures below are the required order; the Architect
may merge or rename headings for the specific page but must not drop a required block. Headings are worded fresh
for every page -- two guides must never read from the same template.

## Pack A -- Buying Guide  (template: roundup)
Reader's job: choose between several machines quickly and correctly. Be the decision engine.
1. H1 (frontmatter `title`)  2. Two-sentence direct answer, primary keyword in the first 100 words
3. `<KeyTakeaways>` -- top pick and budget pick, one line each with the reason  4. `<QuickPicks />`
5. `<ComparisonTable columns={[...]} />` -- decision-relevant spec labels only
6. How we chose these (methodology; research-based status stated honestly; link `/how-we-review/`)
7. Product sections, each a distinct role, each inside `<ProductBox id="...">`: who it suits -> why it earned the
   role -> the specs that matter and what they mean in practice -> what owners consistently report -> honest
   limitations -> who should choose something else -> `<BuySkip>`
8. What to look for before buying (features explained for a beginner)
9. Price and value: what each price band gets you (bands only, US dollars)
10. Warranty, service and support in the US (dealer vs. online purchase, where to get it serviced)
11. Where to buy and availability
12. Common mistakes / who should avoid this kind of machine
13. FAQs (frontmatter `faq:`)  14. `<Verdict buyIf skipIf>` final recommendation
15. How this article was researched
Rules: **at least 10 products**, every one with a role no other holds (keep each product section tight, around
200-300 words, so the page stays readable); never open a product section by repeating its name as a sentence;
rank by merit, document any commercial tiebreak in the report.

## Pack B -- Product Review  (template: review, one product)
Reader's job: decide whether to buy this machine. Give the ownership picture the product page won't.
1. H1  2. Frontmatter `verdict:` (rendered at the top with the Sew Score) -- who it is for / who should avoid it
3. **Exact variant stated in the first 100 words**; the template shows score breakdown, pros/cons and specs
4. What it does well  5. Where it falls short
6. **What owners consistently report** -- `<Owners>` patterns, clearly labelled owner-reported; where the
   manufacturer claim and owner reports disagree, say so plainly
7. Setup and learning curve (threading, bobbin, manual)  8. Stitch quality and fabrics in practice
9. Noise, size, weight and where it fits at home  10. Price and value (band, what's in the box, extra costs)
11. Warranty, service and support in the US  12. Where to buy and availability
13. Versus its two closest alternatives (frontmatter `alternatives:`)
14. Who should buy it / who should not  15. FAQs  16. `<Verdict>` final verdict  17. How this was researched
Rules: if superseded, say so early and link the current model; a review with no meaningful limitation has failed.

## Pack V -- Comparison, X vs Y  (template: review, two or more products)
Reader's job: pick one of two. Answer which, for whom, in the first screen.
1. H1  2. Frontmatter `verdict:` -- the one-sentence answer and who each one suits
3. `<KeyTakeaways>`  4. `<ComparisonTable columns={[...]} />`
5. The differences that matter, one H2 each (in order of how much they change the decision)
6. What owners report about each  7. Price and value  8. Warranty, service and availability in the US
9. Who should buy X / who should buy Y (`<BuySkip>` for each)  10. FAQs  11. `<Verdict>`  12. How this was researched
For non-machine comparisons (e.g. interfacing vs stabilizer) products are optional; use Pack C rules for links.

## Pack C -- Informational Guide  (template: informational)
Reader's job: understand or do something before they are ready to buy. Teach it, then hand over.
1. H1  2. Direct answer in the first two sentences  3. What you need (if a task)
4. The explanation or the steps, in teaching order (`<Steps>` for procedures)  5. Worked examples and numbers
6. Common mistakes and misconceptions  7. Troubleshooting (if a task)  8. What this means for choosing a machine
9. FAQs  10. Bridge to the relevant buying guide or hub (the template also adds a related-machines box)
11. How this article was researched
Rules: conversion is internal; one or two contextual affiliate mentions at most (consumables the task needs);
answer fully, never tease and redirect. Embed a relevant `<Tool>` where it genuinely helps.
