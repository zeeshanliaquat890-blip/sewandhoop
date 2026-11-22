# -*- coding: utf-8 -*-
"""Switch site-wide indexing on once the first real article is live -- the owner asked for exactly this.

Runs in the write workflow after the date stamp. Does something only when site.config.ts has
`allowIndexing: false` AND `autoEnableIndexingAfterFirstArticle: true` AND at least one article in
content/articles/ is `status: ready`. Then it flips allowIndexing to true (and the auto flag to false) once.
The writing agent itself never touches site.config.ts.
"""
import glob
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import CONTENT, ROOT  # noqa: E402

cfg_path = os.path.join(ROOT, "site.config.ts")
cfg = io.open(cfg_path, encoding="utf-8").read()
if not re.search(r"allowIndexing:\s*false", cfg) or not re.search(r"autoEnableIndexingAfterFirstArticle:\s*true", cfg):
    print("maybe_enable_indexing: nothing to do")
    sys.exit(0)
live = [p for p in glob.glob(os.path.join(CONTENT, "*.mdx")) if re.search(r'^status:\s*"?ready"?\s*$', io.open(p, encoding="utf-8").read(), re.M)]
if not live:
    print("maybe_enable_indexing: no ready article yet - indexing stays off")
    sys.exit(0)
cfg = re.sub(r"allowIndexing:\s*false", "allowIndexing: true", cfg, count=1)
cfg = re.sub(r"autoEnableIndexingAfterFirstArticle:\s*true", "autoEnableIndexingAfterFirstArticle: false", cfg, count=1)
io.open(cfg_path, "w", encoding="utf-8", newline="\n").write(cfg)
print(f"maybe_enable_indexing: first article live ({os.path.basename(live[0])}) - indexing switched ON")
