# The Sew Score

A research-based score out of 100, shown on product boxes, verdicts, comparison tables and the Machine Comparison
tool. It is calculated **once per machine** and stored in `product-master.csv`, so a machine has the same score on
every page. It is never adjusted for one article.

## Sub-scores (each 0–100, integers)

| Sub-score | Weight | Evidence it may use |
|---|---|---|
| Stitch quality | 25% | Owner insights on stitch consistency, tension, feeding thick/thin fabric, skipped stitches; verified feed system / stitch regulation |
| Ease of use | 20% | Verified: needle threader, 1-step buttonhole, drop-in bobbin, speed control, screen, manual quality. Insights on learning curve and threading |
| Build & reliability | 20% | Verified: metal frame, warranty length and terms. Insights on breakdowns, plastic parts, timing issues, service |
| Features for the price | 20% | Verified features and included feet against the US price band, compared with machines at the same band |
| Owner satisfaction | 15% | Direction and frequency of all `recurring`/`dominant` insight rows for the machine |

## Method (mechanical — follow it exactly)

1. Every sub-score starts at **75** (a sound, current machine with nothing notable either way).
2. Adjust only with ledgered evidence:
   - recurring praise relevant to the sub-score: **+5** (dominant: **+10**)
   - recurring complaint relevant to the sub-score: **−5** (dominant: **−10**)
   - a verified feature that is a clear advantage for the sub-score at this price band: **+5** (max +10 per sub-score)
   - a verified missing feature buyers at this band expect: **−5**
   - a documented recall, safety notice or widespread defect: **−10**
3. Clamp each sub-score to **50–98**.
4. Sew Score = round(0.25 × Stitch quality + 0.20 × Ease of use + 0.20 × Build & reliability
   + 0.20 × Features for the price + 0.15 × Owner satisfaction).
5. Write the evidence in `Score Notes`, e.g. `SQ +5 R0012; EoU +5 C0040 (1-step buttonhole); B&R -5 R0015`.
6. **No score without evidence**: if a machine has fewer than three `recurring`/`dominant` insight rows, leave all
   score columns empty — the site then shows no score for it.

## How it is described on the site
"The Sew Score is our research-based rating out of 100. It combines checked specifications with patterns in
long-term owner reports, using the same method for every machine." Never call it a test score.
