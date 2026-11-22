# -*- coding: utf-8 -*-
"""
Compile the product-master ledgers into the JSON the site and the audit read.

    python scripts/build_data.py

product-master/product-master.csv   -> data/products.json   (id -> product record)
product-master/claim-ledger.csv     -> data/claims.json     (claim id -> {status, sourceUrl, ...})
product-master/review-insights.csv  -> data/insights.json   (insight id -> {frequency, ...})

The CSVs are the source of truth and are append-only. Never edit the JSON by hand.
"""
from __future__ import annotations

import csv
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PM = os.path.join(ROOT, "product-master")
DATA = os.path.join(ROOT, "data")

# Columns shown as specs on the site (label on the site -> CSV column)
SPECS = [
    ("Type", "Machine Type"), ("Built-in stitches", "Built-in Stitches"), ("Buttonholes", "Buttonholes"),
    ("Max speed", "Max Speed (spm)"), ("Throat space", "Throat Space"), ("Embroidery field", "Embroidery Field"),
    ("Weight", "Machine Weight"), ("Needle threader", "Auto Needle Threader"), ("Needle up/down", "Needle Up/Down"),
    ("Speed control", "Speed Control"), ("Free arm", "Free Arm"), ("Metal frame", "Metal Frame"),
    ("Warranty (US)", "US Warranty"),
]
SCORES = [("Stitch quality", "Score Stitch Quality"), ("Ease of use", "Score Ease of Use"),
          ("Build & reliability", "Score Build & Reliability"), ("Features for the price", "Score Features for the Price"),
          ("Owner satisfaction", "Score Owner Satisfaction")]


def rows(name):
    p = os.path.join(PM, name)
    if not os.path.exists(p):
        return []
    with io.open(p, encoding="utf-8", newline="") as f:
        return [r for r in csv.DictReader(f) if any((v or "").strip() for v in r.values())]


def num(v):
    try:
        return int(round(float(str(v).strip())))
    except (TypeError, ValueError):
        return None


def clean(v):
    v = (v or "").strip()
    return "" if not v or v.lower().startswith(("conflict", "unverified", "n/a", "unknown")) else v


def main():
    products = {}
    for r in rows("product-master.csv"):
        pid = r["Product ID"].strip()
        if not pid:
            continue
        specs = {label: clean(r.get(col)) for label, col in SPECS if clean(r.get(col))}
        if re.fullmatch(r"[\d,]+", specs.get("Max speed", "")):
            specs["Max speed"] += " spm"
        scores = {label: num(r.get(col)) for label, col in SCORES if num(r.get(col)) is not None}
        products[pid] = {
            "id": pid,
            "name": r.get("Display Name") or f"{r.get('Brand','')} {r.get('Model','')}".strip(),
            "brand": r.get("Brand", ""), "variant": r.get("Exact Variant", ""),
            "type": r.get("Machine Type", ""),
            "asin": (r.get("Amazon.com ASIN") or "").strip() or None,
            "amazonQuery": (r.get("Amazon Search Query") or "").strip() or None,
            "image": (r.get("Image") or "").strip() or None,
            "priceRange": clean(r.get("Price Band")) or None,
            "specs": specs,
            "score": num(r.get("Sew Score")),
            "scores": scores or None,
            "supersededBy": (r.get("Superseded By") or "").strip() or None,
            "status": r.get("Verification Status", ""),
            "lastVerified": r.get("Last Verified", ""),
        }
    claims = {r["Claim ID"].strip(): {"product": r.get("Product ID", ""), "claim": r.get("Claim", ""),
                                      "status": r.get("Verification Status", ""), "sourceUrl": (r.get("Source URL") or "").strip()}
              for r in rows("claim-ledger.csv") if r.get("Claim ID")}
    insights = {r["Insight ID"].strip(): {"product": r.get("Product ID", ""), "theme": r.get("Theme", ""),
                                          "frequency": (r.get("Frequency Signal") or "").strip().lower(),
                                          "direction": r.get("Direction", "")}
                for r in rows("review-insights.csv") if r.get("Insight ID")}
    os.makedirs(DATA, exist_ok=True)
    for name, obj in (("products.json", products), ("claims.json", claims), ("insights.json", insights)):
        json.dump(obj, io.open(os.path.join(DATA, name), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"build_data: {len(products)} products, {len(claims)} claims, {len(insights)} insights")


if __name__ == "__main__":
    main()
