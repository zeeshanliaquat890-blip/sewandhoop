# -*- coding: utf-8 -*-
"""
Which page should be written next?

Walks data/schedule.json in order and returns the first page that has no finished article.
"Finished" = content/articles/{slug}.mdx exists, its status is ready (or hold, which is skipped on purpose),
and its body is written.

    python scripts/next_article.py            # human summary
    python scripts/next_article.py --id       # just the page ID, for the workflow
    python scripts/next_article.py --count 5  # the next five

Exit code 0 when something is due, 1 when the queue is clear.
"""
from __future__ import annotations

import argparse
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import article_path, fm_value, load, pages, split_frontmatter  # noqa: E402


def finished(page) -> bool:
    path = article_path(page)
    if not os.path.exists(path):
        return False
    fm, body = split_frontmatter(io.open(path, encoding="utf-8").read())
    status = fm_value(fm, "status")
    if status == "hold":
        return True                     # deliberately parked by the owner or the Scout
    body = re.sub(r"\{/\*.*?\*/\}", "", body, flags=re.S).strip()
    return status == "ready" and len(body) > 1500


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--id", action="store_true")
    ap.add_argument("--count", type=int, default=1)
    a = ap.parse_args()

    by_id = {p["pageId"]: p for p in pages()}
    order = load("schedule.json").get("order", [])
    queue = [by_id[pid] for pid in order if pid in by_id and not finished(by_id[pid])]
    if not queue:
        if not a.id:
            print("Queue is clear — every planned article is written.")
        return 1
    picked = queue[: a.count]
    if a.id:
        print(" ".join(p["pageId"] for p in picked))
        return 0
    print(f"{len(queue)} of {len(order)} articles still to write.")
    for p in picked:
        print(f"  {p['pageId']}  /{p['slug']}/")
        print(f"      {p['contentType']} · {p['wordRange']} words · primary: {p['primaryKeyword']} · silo: {p['siloName']}")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.exit(main())
