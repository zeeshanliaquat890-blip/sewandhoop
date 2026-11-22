# -*- coding: utf-8 -*-
"""
Product photos for Sew & Hoop, from each machine's official manufacturer page.

For every row in product-master/product-master.csv that has a Brand URL but no Image, this script:
  1. loads the manufacturer's product page (honest user-agent, one request at a time),
  2. finds the product photo the page itself declares for sharing (og:image / twitter:image / JSON-LD image),
  3. saves it as public/images/products/{product-id}.webp (max 800 px, white background),
  4. writes `/images/products/{id}.webp` into the Image column and the source into Image Source URL.

    python scripts/fetch_brand_images.py            # every product missing an image
    python scripts/fetch_brand_images.py singer-4423 brother-gx37

It never bypasses a block: a page that refuses (403/429) is reported and skipped, and the site keeps the
illustrated placeholder for that machine. Amazon images are never downloaded (Amazon's terms forbid it).
Run scripts/build_data.py afterwards (the workflows do).
"""
from __future__ import annotations

import csv
import html
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "product-master", "product-master.csv")
OUT_DIR = os.path.join(ROOT, "public", "images", "products")
UA = "sewandhoop-images/1.0 (+https://sewandhoop.com/about/)"


def get(url: str, binary: bool = False):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
        return data if binary else data.decode(r.headers.get_content_charset() or "utf-8", "replace")


def find_image(page_url: str, page: str) -> str | None:
    cands = []
    for prop in ("og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"):
        for m in re.finditer(rf'<meta[^>]+(?:property|name)=["\']{re.escape(prop)}["\'][^>]*>', page, re.I):
            c = re.search(r'content=["\']([^"\']+)', m.group(0), re.I)
            if c:
                cands.append(c.group(1))
    for block in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', page, re.S | re.I):
        try:
            data = json.loads(block.strip())
        except ValueError:
            continue
        for node in data if isinstance(data, list) else [data, *data.get("@graph", [])] if isinstance(data, dict) else []:
            if isinstance(node, dict) and "Product" in str(node.get("@type", "")):
                img = node.get("image")
                img = img[0] if isinstance(img, list) and img else img
                img = img.get("url") if isinstance(img, dict) else img
                if isinstance(img, str):
                    cands.insert(0, img)
    for c in cands:
        c = html.unescape(c.strip())
        if c.startswith("//"):
            c = "https:" + c
        c = urllib.parse.urljoin(page_url, c)
        if re.search(r"logo|placeholder|default-share|favicon", c, re.I):
            continue
        return c
    return None


def save_webp(raw: bytes, path: str):
    from PIL import Image
    im = Image.open(io.BytesIO(raw))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    im.thumbnail((800, 800))
    im.save(path, "WEBP", quality=82, method=6)


def main():
    only = set(sys.argv[1:])
    with io.open(CSV_PATH, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fields = list(reader.fieldnames or [])
        rows = list(reader)
    if "Image Source URL" not in fields:
        fields.append("Image Source URL")
    os.makedirs(OUT_DIR, exist_ok=True)
    changed = 0
    for r in rows:
        pid = (r.get("Product ID") or "").strip()
        if not pid or (only and pid not in only):
            continue
        if (r.get("Image") or "").strip() and not only:
            continue
        url = (r.get("Brand URL") or "").strip()
        if not url:
            print(f"{pid}: no Brand URL - skipped")
            continue
        try:
            page = get(url)
            img = find_image(url, page)
            if not img:
                print(f"{pid}: no product image declared on {url}")
                continue
            raw = get(img, binary=True)
            save_webp(raw, os.path.join(OUT_DIR, f"{pid}.webp"))
            r["Image"] = f"/images/products/{pid}.webp"
            r["Image Source URL"] = img
            changed += 1
            print(f"{pid}: saved from {img}")
        except Exception as e:  # blocked, timeout, not an image...
            print(f"{pid}: skipped ({type(e).__name__}: {str(e)[:120]})")
        time.sleep(2)
    if changed:
        with io.open(CSV_PATH, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fields)
            w.writeheader()
            for r in rows:
                w.writerow({k: r.get(k, "") for k in fields})
    print(f"fetch_brand_images: {changed} image(s) saved")


if __name__ == "__main__":
    main()
