# -*- coding: utf-8 -*-
"""
The mechanical gate for Sew & Hoop articles. Nineteen checks plus structure; fifteen run here as code, four are
handed to the auditor/editor agent and listed as MODEL in the report.

Any script check failing means the article does not publish. There is no score and no way to argue with it --
fix the passage and re-run. Never weaken a check to make an article pass.

    python scripts/audit.py content/articles/best-sewing-machine-for-beginners.mdx
    python scripts/audit.py content/articles/<slug>.mdx --report work/S004-.../07-quality-report.md

Exit code 0 = every script check passed. 1 = at least one failed.
"""
from __future__ import annotations

import argparse
import datetime as dt
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import ROOT, load, pages, published_index, split_frontmatter  # noqa: E402

FORBIDDEN = [
    "we tested", "in our hands-on testing", "in our testing", "hands-on testing", "we put it through",
    "users love", "everyone agrees", "customers rave", "guaranteed", "completely safe",
    "the perfect choice", "the undisputed best", "look no further", "without a doubt the best",
    "in my experience", "we found that", "i own", "i have owned", "we own", "our test",
    "game-changer", "game changer", "dive into", "in today's world", "elevate your", "unleash",
]
OWNER_LANGUAGE = re.compile(
    r"\b(owner reports?|owners? (report|describe|mention|say|note)|recurring theme|buyers (report|describe|mention)|"
    r"reports? from (owners|buyers)|owner-reported|many owners|several owners)\b", re.I)
RATING = re.compile(
    r"(\d(\.\d)?\s*(stars?|/5\b|out of (5|five)\b)|★|\b\d[\d,]*\s*(customer |verified )?reviews\b|\b\d[\d,]*\s*ratings\b)", re.I)
UNIT_FIGURE = re.compile(
    r"(\b\d[\d.,]*\s*(spm|stitches per minute|built-in stitches|stitch patterns|stitch options|lbs?|pounds|oz|ounces|"
    r"inch(es)?|mm|watts?|amps?|volts?|-year|year warranty|years? (limited )?warranty)\b"
    r"|\b\d+(\.\d+)?\s?[\"″]|\b\d+(\.\d+)?\s?[x×]\s?\d+(\.\d+)?\b)", re.I)
CENTS_PRICE = re.compile(r"\$\s?\d[\d,]*\.\d{2}\b")
DOLLAR_FIGURE = re.compile(r"\$\s?\d[\d,]*\b")
BAND_CONTEXT = re.compile(
    r"(under|below|around|about|roughly|approximately|up to|between|from|over|above|per|~|circa|"
    r"the\s*\$|mark\b|budget|tier|bracket|range|band|less than|more than|–|-|to\b)", re.I)
OTHER_SITE = re.compile(r"(£|amazon\.co\.uk|\b3d print(er|ing)?s?\b|\bfilament\b|\bunited kingdom\b|\bUK\b)")

STATIC = {"/", "/about/", "/contact/", "/privacy-policy/", "/affiliate-disclosure/", "/terms-and-conditions/",
          "/how-we-review/", "/tools/"}
REFERENCE_HOSTS = {"en.wikipedia.org", "commons.wikimedia.org", "britannica.com", "www.britannica.com", "doi.org",
                   "ncbi.nlm.nih.gov", "cpsc.gov", "www.cpsc.gov", "ftc.gov", "www.ftc.gov", "usa.gov", "www.usa.gov"}
PACK = {"Buying Guide": "A", "Product Review": "B", "Comparison": "V", "Informational Guide": "C"}
TEMPLATE = {"A": "roundup", "B": "review", "V": "review", "C": "informational"}


def fm_scalar(fm, key):
    m = re.search(rf"^{key}:\s*(.+)$", fm, re.M)
    if not m:
        return None
    return m.group(1).strip().strip('"').strip("'")


def fm_product_ids(fm):
    block = re.search(r"^products:\s*\n((?:[ \t]+.*\n?)+)", fm, re.M)
    if not block:
        return []
    return re.findall(r"^\s*-\s*id:\s*\"?([a-z0-9-]+)\"?", block.group(1), re.M)


def strip_comments(body):
    return re.sub(r"\{/\*.*?\*/\}", "", body, flags=re.S)


def prose_only(body):
    text = strip_comments(body)
    text = re.sub(r"\[([^\]]*)\]\((?:https?|/)[^)]*\)", r"\1", text)
    props = re.findall(r'(?:verdict|bestFor|buyIf|skipIf|buy|skip|caption|title|label)=\s*"([^"]*)"', text)
    strings = re.findall(r'^\s*"([^"]{20,})",?\s*$', text, re.M)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\{[^{}]*\}", " ", text)
    return text + "\n" + "\n".join(props + strings)


def paragraphs(body):
    return [p.strip() for p in re.split(r"\n\s*\n", strip_comments(body)) if p.strip()]


def word_count(body):
    return len(re.findall(r"[A-Za-z$0-9][\w$'’.-]*", prose_only(body)))


def parse_range(word_range):
    nums = [int(n.replace(",", "")) for n in re.findall(r"\d[\d,]*", word_range or "")]
    return (nums[0], nums[1]) if len(nums) >= 2 else (None, None)


def run_checks(path):
    raw = io.open(path, encoding="utf-8").read()
    fm, body = split_frontmatter(raw)
    body_nc = strip_comments(body)
    products, claims, insights = load("products.json"), load("claims.json"), load("insights.json")
    slug = os.path.basename(path)[:-4]
    plan = {p["slug"]: p for p in pages()}.get(slug)
    ctype = fm_scalar(fm, "contentType") or (plan or {}).get("contentType", "")
    pack = PACK.get(ctype, "?")
    results = []

    def add(num, name, ok, detail="", model=False):
        results.append((num, name, "MODEL" if model else ("PASS" if ok else "FAIL"), detail))

    # 01 -- every specification sentence carries a Claim ID
    cites = re.findall(r'<Cite\s+id="([^"]+)"', body_nc)
    bad = []
    for para in paragraphs(body):
        if para.lstrip().startswith("#") or (para.startswith("<") and not re.match(r"<(p|ProductBox|Owners|Step|Callout)\b", para)):
            if not re.match(r"<(ProductBox|Step|Callout)\b", para):
                continue
        if UNIT_FIGURE.search(para) and "<Cite" not in para:
            bad.append(para[:70].replace("\n", " "))
    add(1, "Specification sentences carry a Claim ID", not bad,
        f"{len(bad)} paragraph(s) with a unit figure and no <Cite>: " + " | ".join(bad[:3]) if bad else f"{len(cites)} citation(s)")

    # 02 -- every Claim ID resolves to a ledger row with a source URL
    unresolved = [c for c in cites if c not in claims]
    unsourced = [c for c in cites if c in claims and not claims[c].get("sourceUrl")]
    add(2, "Every Claim ID resolves to a sourced ledger row", not (unresolved or unsourced),
        (f"unknown: {unresolved[:5]} " if unresolved else "") + (f"no source URL: {unsourced[:5]}" if unsourced else ""))

    # 03 -- no Conflict / Unverified claim cited
    badstatus = [c for c in cites if c in claims and not claims[c]["status"].lower().startswith(("verified", "inference"))]
    add(3, "No Conflict or Unverified claim is cited", not badstatus, f"{badstatus[:5]}" if badstatus else "")

    # 04 -- forbidden phrases
    low = prose_only(body).lower()
    hits = [p for p in FORBIDDEN if re.search(r"\b" + re.escape(p) + r"\b", low)]
    add(4, "No forbidden phrase", not hits, ", ".join(hits))

    add(5, "Every 'best for' role has an evidence-based reason in its section", True, "auditor agent", model=True)

    # 06 -- no star ratings / review counts / quoted reviews
    rhits = [m.group(0) for m in RATING.finditer(prose_only(body))]
    quoted = re.findall(r'[“"][^”"]{60,}[”"]', prose_only(body))
    add(6, "No star rating, review count or quoted customer review", not (rhits or quoted),
        (f"ratings: {rhits[:3]} " if rhits else "") + (f"long quotations: {len(quoted)}" if quoted else ""))

    # 07 -- owner-experience statements map to recurring/dominant Insight IDs
    owner_ids = re.findall(r'<Owners\s+id="([^"]+)"', body_nc)
    bad_ids = [i for i in owner_ids if i not in insights or insights[i]["frequency"] not in ("recurring", "dominant")]
    methodology = re.compile(r"(methodology|how we (chose|pick|select|review|research)|built from|basis|researched)", re.I)
    unwrapped = [p[:70].replace("\n", " ") for p in paragraphs(body)
                 if OWNER_LANGUAGE.search(p) and "<Owners" not in p and not methodology.search(p)]
    add(7, "Owner-experience statements map to a recurring/dominant Insight ID", not (bad_ids or unwrapped),
        (f"bad/isolated ids: {bad_ids[:4]} " if bad_ids else "") + (f"owner language without <Owners>: {unwrapped[:2]}" if unwrapped else ""))

    add(8, "No specification attributed to the wrong variant", True, "auditor agent", model=True)

    # 09 -- product boxes and frontmatter products agree; every product is in the ledger
    fm_ids = fm_product_ids(fm)
    box_ids = re.findall(r'<ProductBox\s+id="([^"]+)"', body_nc)
    unknown = sorted({i for i in fm_ids + box_ids if i not in products})
    mismatch = pack == "A" and set(fm_ids) != set(box_ids)
    stray = sorted(set(box_ids) - set(fm_ids))
    add(9, "Product boxes, frontmatter products and the product ledger agree", not (unknown or mismatch or stray),
        (f"not in product-master: {unknown} " if unknown else "")
        + (f"frontmatter {sorted(fm_ids)} vs boxes {sorted(box_ids)} " if mismatch else "")
        + (f"boxes without a frontmatter entry: {stray}" if stray else "") or f"{len(fm_ids)} products")

    # 10 -- every internal link targets a live page, a hub, a tool or a site page
    live = {"/" + r["Slug"].strip("/") + "/" for r in published_index() if (r.get("Status") or "").lower() == "published"}
    hubs = {f"/{s}/" for s in ("sewing-machines", "embroidery-machines", "accessories", "troubleshooting", "sergers", "quilting-machines")}
    links = re.findall(r"\]\((/[^)\s#]*)", body_nc) + re.findall(r'href="(/[^"#]*)"', body_nc)
    norm = ["/" + l.strip("/") + "/" if l != "/" else "/" for l in links]
    dead = sorted({l for l in norm if l not in live and l not in STATIC and l not in hubs and not l.startswith("/tools/") and l != f"/{slug}/"})
    add(10, "Every internal link targets a published page, hub, tool or site page", not dead,
        f"unpublished targets: {dead[:5]}" if dead else f"{len(norm)} link(s)")

    # 11 -- outbound links only to reference works; Amazon only through components
    raw_amz = re.findall(r"https?://(?:www\.)?amazon\.[a-z.]+/[^\s)\"']*", body_nc)
    external = re.findall(r"\]\((https?://[^)]+)\)", body_nc) + re.findall(r'href="(https?://[^"]+)"', body_nc)
    off_list = sorted({u for u in external if re.sub(r"^https?://([^/]+).*", r"\1", u) not in REFERENCE_HOSTS})
    add(11, "Body links out only to reference works; Amazon only through components", not (raw_amz or off_list),
        (f"{len(raw_amz)} raw Amazon url(s) " if raw_amz else "") + (f"non-reference links: {off_list[:4]}" if off_list else "")
        or f"{len(external)} reference link(s)")

    # 12 -- no live-style exact price
    prose = prose_only(body)
    cents = [m.group(0) for m in CENTS_PRICE.finditer(prose)]
    hard = []
    for m in DOLLAR_FIGURE.finditer(prose):
        before, after = prose[max(0, m.start() - 28):m.start()], prose[m.end():m.end() + 14]
        if not (BAND_CONTEXT.search(before) or BAND_CONTEXT.search(after)):
            hard.append(prose[max(0, m.start() - 20):m.end() + 12].replace("\n", " "))
    add(12, "No live-style exact price in body text", not (cents or hard),
        (f"cents-precision: {cents[:3]} " if cents else "") + (f"bare figures: {hard[:3]}" if hard else ""))

    # 13 -- word count inside the plan's range
    wc = word_count(body)
    lo, hi = parse_range((plan or {}).get("wordRange") or fm_scalar(fm, "wordRange"))
    add(13, "Word count inside target range", lo is None or lo <= wc <= hi, f"{wc} words, target {lo}–{hi}")

    # 14 -- required US sections (packs A, B, V)
    sections = re.split(r"^(#{2,3}\s+.+)$", body_nc, flags=re.M)[1:]
    heads = " ".join((sections[i] + " " + sections[i + 1][:400]).lower() for i in range(0, len(sections) - 1, 2))
    need = {"price/value": r"price|cost|value|budget|spend", "warranty/service": r"warranty|service|support|repair",
            "availability": r"availab|where to buy|in stock|retailer|dealer"}
    missing = [k for k, rx in need.items() if not re.search(rx, heads)]
    if pack in ("A", "B", "V") and (pack != "V" or fm_ids):
        add(14, "Price/value, warranty/service and availability sections present", not missing, f"missing: {missing}" if missing else "")
    else:
        results.append((14, "US buying sections (not required for this page type)", "SKIP", ""))

    add(15, "No safety/health claim without adequate support", True, "auditor agent", model=True)
    add(16, "No first-hand testing, ownership or measurement implied", True, "auditor agent", model=True)

    # 17 -- SEO title
    seo = (fm_scalar(fm, "seoTitle") or "").strip()
    add(17, "SEO title is 30-60 characters with no brand suffix", 30 <= len(seo) <= 60 and "|" not in seo and "Sew & Hoop" not in seo,
        f"{len(seo)} chars: {seo[:70]}")

    # 18 -- meta description
    desc = (fm_scalar(fm, "description") or "").strip()
    add(18, "Meta description is 140-160 characters", 140 <= len(desc) <= 160, f"{len(desc)} chars")

    # 19 -- Rule 0: nothing from the other site (UK, pounds, 3D printing)
    other = sorted({m.group(0) for m in OTHER_SITE.finditer(raw)})
    add(19, "Nothing from another site (no £, UK, Amazon.co.uk, 3D printing)", not other, f"found: {other[:5]}" if other else "")

    # structure
    extras = []
    status = fm_scalar(fm, "status")
    if status not in ("draft", "ready", "hold"):
        extras.append(f"status is {status!r}")
    if plan is None:
        extras.append(f"slug '{slug}' is not in data/pages.json")
    elif fm_scalar(fm, "pageId") != plan["pageId"]:
        extras.append(f"pageId should be {plan['pageId']}")
    if pack in TEMPLATE and fm_scalar(fm, "template") != TEMPLATE[pack]:
        extras.append(f"template should be {TEMPLATE[pack]} for {ctype}")
    if pack in ("A", "B") and not fm_ids:
        extras.append("no products in frontmatter")
    if pack in ("A", "B", "V") and "<Verdict" not in body_nc:
        extras.append("no <Verdict> block")
    if pack in ("B", "V") and not re.search(r"^verdict:", fm, re.M):
        extras.append("no verdict: in frontmatter")
    if not re.search(r"^faq:", fm, re.M):
        extras.append("no faq in frontmatter")
    if re.search(r"^noindex:\s*true", fm, re.M):
        extras.append("noindex: true left in (demo leftover)")
    if not re.search(r"^##\s+How this article was researched", body_nc, re.M | re.I):
        extras.append("missing '## How this article was researched'")
    add(0, "Structure: status, pageId, template, products, verdict, faq, research note", not extras, ", ".join(extras))

    return results, {"pack": pack, "contentType": ctype, "words": wc, "pageId": fm_scalar(fm, "pageId")}


def render(results, meta, path):
    lines = [f"# Quality report — {meta['pageId']} ({meta['contentType']}, pack {meta['pack']})", "",
             f"File: `{os.path.relpath(path, ROOT)}`  ·  {meta['words']} words  ·  {dt.date.today().isoformat()}", "",
             "| # | Check | Result | Detail |", "|---|---|---|---|"]
    for num, name, status, detail in sorted(results, key=lambda r: r[0] or 99):
        lines.append(f"| {f'{num:02d}' if num else '—'} | {name} | **{status}** | {detail} |")
    fails = [r for r in results if r[2] == "FAIL"]
    lines += ["", f"**Script verdict: {'PASS' if not fails else 'FAIL'}** — {len(fails)} failing, "
              f"{sum(1 for r in results if r[2] == 'MODEL')} handed to the auditor agent."]
    return "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("article")
    ap.add_argument("--report")
    ap.add_argument("--quiet", action="store_true")
    a = ap.parse_args()
    results, meta = run_checks(a.article)
    report = render(results, meta, a.article)
    if a.report:
        os.makedirs(os.path.dirname(a.report) or ".", exist_ok=True)
        io.open(a.report, "w", encoding="utf-8", newline="\n").write(report)
    if not a.quiet:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        print(report)
    sys.exit(1 if any(r[2] == "FAIL" for r in results) else 0)


if __name__ == "__main__":
    main()
