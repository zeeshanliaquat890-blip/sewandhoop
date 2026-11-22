# -*- coding: utf-8 -*-
"""Stamp the real publish date (US Eastern) on any article going live in this run.

An article "goes live in this run" when its status is `ready` now and was not `ready` at the base ref.
Nothing else is touched. Run by the workflow after the agent and before the push.

    python scripts/stamp_publish_date.py --since origin/main [--dry]
"""
from __future__ import annotations

import argparse
import glob
import io
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import CONTENT, ROOT, us_today  # noqa: E402

READY = re.compile(r'^status:\s*"?ready"?\s*$', re.M)
PUBLISH = re.compile(r'^(publishAt:\s*).*$', re.M)
UPDATED = re.compile(r'^(updatedAt:\s*).*$', re.M)


def at_ref(ref, rel):
    r = subprocess.run(["git", "show", f"{ref}:{rel}"], cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
    return r.stdout if r.returncode == 0 else None


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--since", default="origin/main")
    ap.add_argument("--dry", action="store_true")
    a = ap.parse_args()
    today = us_today()
    for path in sorted(glob.glob(os.path.join(CONTENT, "*.mdx"))):
        rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
        now = io.open(path, encoding="utf-8").read()
        if not READY.search(now):
            continue
        before = at_ref(a.since, rel)
        if before is not None and READY.search(before):
            continue
        new = PUBLISH.sub(lambda m: f'{m.group(1)}"{today}"', now, count=1) if PUBLISH.search(now) else now.replace("status: ready", f'status: ready\npublishAt: "{today}"', 1)
        new = UPDATED.sub(lambda m: f'{m.group(1)}"{today}"', new, count=1)
        if new != now:
            print(f"stamp_publish_date: {rel} -> {today}" + ("  (dry)" if a.dry else ""))
            if not a.dry:
                io.open(path, "w", encoding="utf-8", newline="\n").write(new)
    return 0


if __name__ == "__main__":
    sys.exit(main())
