# -*- coding: utf-8 -*-
"""Shared helpers for the Sew & Hoop pipeline scripts."""
from __future__ import annotations

import csv
import datetime as dt
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
CONTENT = os.path.join(ROOT, "content", "articles")
PM = os.path.join(ROOT, "product-master")
WORK = os.path.join(ROOT, "work")


def us_today() -> str:
    """The site's clock: US Eastern. The publish gate in lib/content.ts uses the same zone."""
    try:
        from zoneinfo import ZoneInfo
        return dt.datetime.now(ZoneInfo("America/New_York")).date().isoformat()
    except Exception:
        return dt.date.today().isoformat()


def load(name):
    p = os.path.join(DATA, name)
    return json.load(io.open(p, encoding="utf-8")) if os.path.exists(p) else {}


def pages():
    return load("pages.json")


def page_by_id(pid):
    return next((p for p in pages() if p["pageId"] == pid), None)


def article_path(page):
    return os.path.join(CONTENT, f"{page['slug']}.mdx")


def split_frontmatter(text):
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", text, re.S)
    return (m.group(1), m.group(2)) if m else ("", text)


def fm_value(fm, key):
    m = re.search(rf'^{key}:\s*"?([^"\n]*)"?\s*$', fm, re.M)
    return m.group(1).strip() if m else None


def published_index():
    p = os.path.join(PM, "published-index.csv")
    if not os.path.exists(p):
        return []
    with io.open(p, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))
