# -*- coding: utf-8 -*-
"""
Prepare a page's workspace for the ten-agent pipeline.

    python scripts/run_pipeline.py S004 --prepare-only

Creates work/{PageID}-{slug}/ with 01-page-input.md: everything the plan says about the page, its sibling
pages (cannibalisation), what is already published in the silo (internal-link targets), the hub and the tools.
The agents themselves are run by a Claude Code session following agents/01..10 (see the write workflow).
"""
from __future__ import annotations

import argparse
import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import ROOT, WORK, page_by_id, pages, published_index, us_today  # noqa: E402

PACK = {"Buying Guide": "A (template: roundup)", "Product Review": "B (template: review)",
        "Comparison": "V (template: review)", "Informational Guide": "C (template: informational)"}


def words(s):
    return set(re.findall(r"[a-z0-9]+", s.lower())) - {"a", "an", "the", "for", "to", "of", "and", "in", "on", "how", "what", "is", "best", "machine", "machines", "sewing", "with", "vs", "do", "you", "can", "my"}


def site_tools():
    src = io.open(os.path.join(ROOT, "site.config.ts"), encoding="utf-8").read()
    return re.findall(r'\{ slug: "([^"]+)", name: "([^"]+)", silo: "([^"]+)"', src)


def page_input(page):
    allp = pages()
    mine = words(page["primaryKeyword"])
    siblings = [p for p in allp if p["pageId"] != page["pageId"] and p["silo"] == page["silo"] and len(mine & words(p["primaryKeyword"])) >= 1]
    siblings.sort(key=lambda p: -len(mine & words(p["primaryKeyword"])))
    live = [r for r in published_index() if (r.get("Status") or "").lower() == "published"]
    silo_slugs = {p["slug"] for p in allp if p["silo"] == page["silo"]}
    tools = [t for t in site_tools() if t[2] == page["silo"]]
    serp = page.get("serp") or {}
    lines = [
        f"# {page['pageId']} — {page['primaryKeyword']}", "",
        f"- Site: **Sew & Hoop (sewandhoop.com)** — USA, Amazon.com, American English. Never mix with any other site.",
        f"- Slug / URL: `/{page['slug']}/` (fixed — must not change)",
        f"- Content type: **{page['contentType']}** → Pack {PACK[page['contentType']]}",
        f"- Silo / hub: {page['siloName']} → `/{page['silo']}/`",
        f"- Primary keyword: **{page['primaryKeyword']}** · US volume {page['volume']} · KD {page['kd']} · CPC ${page['cpc']}",
        f"- Plan intent: {page['planIntent']} · Priority #{page['priority']}",
        f"- Target length: **{page['wordRange']} words**",
        f"- Today (US Eastern): {us_today()}",
        "", "## SERP notes from the plan",
        *([f"- {k}: {v}" for k, v in serp.items()] or ["- —"]),
        "", "## Secondary keywords (cover only where a heading genuinely covers them)",
        *([f"- {k}" for k in page["secondaryKeywords"]] or ["- —"]),
        "", "## Sibling pages in this silo with overlapping keywords (this page must be distinct from each)",
        *([f"- {p['pageId']} `/{p['slug']}/` — {p['primaryKeyword']} ({p['contentType']})" for p in siblings[:15]] or ["- none"]),
        "", "## Published pages you may link to (anything else goes to 'Pending links')",
        *([f"- `/{r['Slug'].strip('/')}/` — {r['Title']}" + (" (same silo)" if r['Slug'].strip('/') in silo_slugs else "") for r in live] or ["- none yet"]),
        f"- Always allowed: the hub `/{page['silo']}/`, `/tools/…`, `/how-we-review/`, `/about/`",
        "", "## Tools in this silo (embed with <Tool name=\"…\" /> where it genuinely helps)",
        *([f"- `{t[0]}` — {t[1]}" for t in tools] or ["- none"]),
        "",
    ]
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("page_id")
    ap.add_argument("--prepare-only", action="store_true")
    a = ap.parse_args()
    page = page_by_id(a.page_id)
    if not page:
        print(f"unknown page id {a.page_id}", file=sys.stderr)
        return 2
    d = os.path.join(WORK, f"{page['pageId']}-{page['slug']}")
    os.makedirs(os.path.join(d, "05-sections"), exist_ok=True)
    io.open(os.path.join(d, "01-page-input.md"), "w", encoding="utf-8", newline="\n").write(page_input(page))
    print(f"prepared {os.path.relpath(d, ROOT)}/01-page-input.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
