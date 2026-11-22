# The Sew & Hoop article engine

One article per run, written by ten agents in order. Each agent is a role file in this folder; read the file
before acting as that agent. The structure for the page comes from `packs.md`; the Sew Score from `sew-score.md`.

```
01-scout     -> SERP gaps, products and roles            work/{page}/02-research.md
02-verifier  -> specs + claim ledger + Sew Score         product-master/*.csv, 03-claims-used.csv
03-listener  -> owner-reported patterns                  product-master/review-insights.csv
04-architect -> outline, keywords, links                 04-content-brief.md
05-writer    -> one section at a time                    05-sections/NN-*.md
06-assembler -> one draft                                06-draft.md
07-closer    -> conversion layer                         06-draft.md
08-auditor   -> scripts/audit.py gate                    07-quality-report.md
09-editor    -> SEO, voice, final frontmatter            08-final-article.mdx
10-publisher -> content/articles/{slug}.mdx, commit
```

The Listener runs before the Verifier calculates the Sew Score (step 5 of 02-verifier).

## Commands

| Command | What it does |
|---|---|
| `python scripts/next_article.py` | Which page is next (`--id` for just the ID) |
| `python scripts/run_pipeline.py S004 --prepare-only` | Create `work/S004-…/01-page-input.md` |
| `python scripts/build_data.py` | Ledgers → `data/products.json`, `claims.json`, `insights.json` |
| `python scripts/audit.py content/articles/<slug>.mdx` | The gate (exit 0 = pass) |
| `python scripts/stamp_publish_date.py --since origin/main` | Real publish date on new articles |
| `python scripts/status.py` | Written / live / next |
| `python scripts/gen_agents.py` | Regenerate the agent files after editing the script |

Edit the agent texts in `scripts/gen_agents.py`, not in the generated `.md` files.
