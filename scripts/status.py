# -*- coding: utf-8 -*-
"""What is written, what is live, what is next.   python scripts/status.py"""
import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import article_path, fm_value, pages, split_frontmatter, us_today  # noqa: E402

today = us_today()
counts = {"live": 0, "draft": 0, "hold": 0, "todo": 0}
for p in pages():
    path = article_path(p)
    if not os.path.exists(path):
        counts["todo"] += 1
        continue
    fm, _ = split_frontmatter(io.open(path, encoding="utf-8").read())
    st, pub = fm_value(fm, "status"), fm_value(fm, "publishAt") or ""
    if st == "ready" and pub <= today:
        counts["live"] += 1
    elif st == "hold":
        counts["hold"] += 1
    else:
        counts["draft"] += 1
print(f"US date {today}: {counts['live']} live · {counts['draft']} draft · {counts['hold']} on hold · {counts['todo']} not written ({len(pages())} planned)")
os.system(f'"{sys.executable}" "{os.path.join(os.path.dirname(__file__), "next_article.py")}"')
