# -*- coding: utf-8 -*-
"""
Read-only Reddit search through the official API (application-only OAuth), for the Listener agent.

Needs repository secrets REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET (a "script" app at reddit.com/prefs/apps).
Without them it says so and exits 0, so the pipeline simply falls back to other sources.

    python scripts/reddit_search.py "singer 4423" --subs sewing,sewhelp,quilting --limit 25
    python scripts/reddit_search.py --thread /r/sewing/comments/abc123/some_title/ --comments 40

Output is plain text for reading: thread title, subreddit, score, date, permalink, and (for --thread) the top
comments. It is research input only: articles never quote Reddit, never name users and never copy text --
patterns are recorded in our own words in review-insights.csv.
"""
from __future__ import annotations

import argparse
import base64
import datetime as dt
import json
import os
import sys
import time
import urllib.parse
import urllib.request

UA = "sewandhoop-research/1.0 (by sewandhoop.com; read-only research)"


def token():
    cid, secret = os.environ.get("REDDIT_CLIENT_ID"), os.environ.get("REDDIT_CLIENT_SECRET")
    if not cid or not secret:
        print("reddit_search: REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET not set - Reddit unavailable, use other sources")
        sys.exit(0)
    req = urllib.request.Request(
        "https://www.reddit.com/api/v1/access_token",
        data=b"grant_type=client_credentials",
        headers={"User-Agent": UA, "Authorization": "Basic " + base64.b64encode(f"{cid}:{secret}".encode()).decode()},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)["access_token"]


def api(tok, path, params):
    url = "https://oauth.reddit.com" + path + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Authorization": f"bearer {tok}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        time.sleep(1.2)  # stay far below the rate limit
        return json.load(r)


def when(ts):
    return dt.datetime.fromtimestamp(ts, dt.timezone.utc).strftime("%Y-%m-%d")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("query", nargs="?")
    ap.add_argument("--subs", default="sewing,sewhelp,quilting,MachineEmbroidery")
    ap.add_argument("--limit", type=int, default=25)
    ap.add_argument("--thread")
    ap.add_argument("--comments", type=int, default=30)
    a = ap.parse_args()
    tok = token()
    if a.thread:
        path = "/" + a.thread.strip("/").split("reddit.com/")[-1].lstrip("/")
        data = api(tok, path, {"limit": a.comments, "sort": "top", "depth": 1})
        post = data[0]["data"]["children"][0]["data"]
        print(f"THREAD: {post['title']}  (r/{post['subreddit']}, {when(post['created_utc'])})\n{post.get('selftext','')[:1500]}\n")
        for c in data[1]["data"]["children"][: a.comments]:
            d = c.get("data", {})
            if d.get("body"):
                print(f"- [{d.get('score',0)}] {d['body'][:600].replace(chr(10),' ')}")
        return
    if not a.query:
        ap.error("give a query or --thread")
    for sub in [s.strip() for s in a.subs.split(",") if s.strip()]:
        data = api(tok, f"/r/{sub}/search", {"q": a.query, "restrict_sr": 1, "limit": a.limit, "sort": "relevance", "t": "all"})
        posts = data.get("data", {}).get("children", [])
        print(f"== r/{sub}: {len(posts)} thread(s) for '{a.query}'")
        for p in posts:
            d = p["data"]
            print(f"- {when(d['created_utc'])} [{d.get('score',0)} pts, {d.get('num_comments',0)} comments] {d['title'][:140]}  https://www.reddit.com{d['permalink']}")


if __name__ == "__main__":
    main()
