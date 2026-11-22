# -*- coding: utf-8 -*-
"""
Export the owner's content plan to the data layer the pipeline reads.

    python scripts/export_plan.py                      # uses plan/CONTENT-PLAN-FINAL.xlsx
    python scripts/export_plan.py path/to/plan.xlsx

Writes data/pages.json (one object per article) and data/schedule.json (writing order).
Slugs come from data/url-map.csv, which is the URL plan and must not change once a page is live.
Safe to re-run: it never touches content/ or product-master/.
"""
from __future__ import annotations

import csv
import io
import json
import os
import re
import sys

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

SILO_SLUG = {
    "Sewing Machines": "sewing-machines", "Embroidery Machines": "embroidery-machines",
    "Accessories & Supplies": "accessories", "Troubleshooting & Care": "troubleshooting",
    "Sergers & Overlockers": "sergers", "Quilting Machines": "quilting-machines",
}
QUESTION = re.compile(r"^(how|what|why|can|does|do|is|are|where|when|which)\b", re.I)
DEFAULT_RANGE = {"Buying Guide": "3,000–4,500", "Product Review": "2,500–3,500", "Comparison": "2,000–3,000", "Informational Guide": "1,500–2,500"}


def slugify(s: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


def content_type(keyword: str, intent: str) -> str:
    k = keyword.lower()
    if " vs " in f" {k} ":
        return "Comparison"
    if intent.startswith("Informational") or QUESTION.match(k):
        return "Informational Guide"
    # a single model: "singer 4423 ... review", "bernette b79 reviews"
    if re.search(r"review", k) and re.search(r"\d", k):
        return "Product Review"
    return "Buying Guide"


def word_range(target, ctype):
    if not target:
        return DEFAULT_RANGE[ctype]
    t = int(target)
    lo, hi = int(round(t * 0.9, -2)), int(round(t * 1.3, -2))
    return f"{lo:,}–{hi:,}"


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "plan", "CONTENT-PLAN-FINAL.xlsx")
    wb = openpyxl.load_workbook(src, data_only=True)

    serp = {}
    for r in wb["0. SERP Verified"].iter_rows(min_row=5, values_only=True):
        if r[1]:
            serp[str(r[1]).strip().lower()] = {"organic": r[6], "slots": r[7], "weakness": r[8], "ugc": r[9],
                                               "newestDomainYears": r[10], "targetWords": r[11], "note": r[13]}

    urlmap = {}
    with io.open(os.path.join(DATA, "url-map.csv"), encoding="utf-8") as f:
        for row in csv.DictReader(f):
            urlmap[row["primary_keyword"].strip().lower()] = row["url"].strip("/")

    pages, order = [], []
    for r in wb["2. Publish Order"].iter_rows(min_row=5, values_only=True):
        seq, _day, _month, intent, silo, _hub, kw, vol, kd, cpc, nkws, sec, _checked, _status = r[:14]
        if not kw or intent == "Tool":
            continue
        kw = str(kw).strip()
        slug = urlmap.get(kw.lower()) or slugify(kw)
        ctype = content_type(kw, str(intent))
        s = serp.get(kw.lower(), {})
        page = {
            "pageId": f"S{int(seq):03d}",
            "slug": slug,
            "url": f"/{slug}/",
            "primaryKeyword": kw,
            "secondaryKeywords": [x.strip() for x in str(sec or "").split("|") if x.strip()][:40],
            "planIntent": intent,
            "contentType": ctype,
            "silo": SILO_SLUG.get(silo, "sewing-machines"),
            "siloName": silo,
            "volume": vol or 0, "kd": kd or 0, "cpc": cpc or 0, "keywordsInCluster": nkws or 0,
            "wordRange": word_range(s.get("targetWords"), ctype),
            "serp": {k: v for k, v in s.items() if v not in (None, "")},
            "priority": int(seq),
        }
        pages.append(page)
        order.append(page["pageId"])

    os.makedirs(DATA, exist_ok=True)
    json.dump(pages, io.open(os.path.join(DATA, "pages.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump({"order": order, "perDay": 1}, io.open(os.path.join(DATA, "schedule.json"), "w", encoding="utf-8"), indent=1)
    from collections import Counter
    print(f"{len(pages)} pages →", dict(Counter(p["contentType"] for p in pages)))


if __name__ == "__main__":
    main()
