// Submit today's newly published URLs to IndexNow (Bing, Yandex, Seznam…).
// Does nothing while indexing is switched off in site.config.ts (allowIndexing: false).
//   node scripts/indexnow.mjs [--dry]
import fs from "node:fs";

const KEY = "5f8faadbabd95038378cd7159deac9c2"; // public/5f8faadbabd95038378cd7159deac9c2.txt
const HOST = "sewandhoop.com";
const dry = process.argv.includes("--dry");

const config = fs.readFileSync(new URL("../site.config.ts", import.meta.url), "utf8");
if (!/allowIndexing:\s*true/.test(config)) {
  console.log("indexnow: indexing is switched off (allowIndexing: false) — nothing submitted");
  process.exit(0);
}
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
const csv = fs.readFileSync(new URL("../product-master/published-index.csv", import.meta.url), "utf8").trim().split("\n").slice(1);
const urls = csv
  .map((l) => l.split(","))
  .filter((c) => c[4] === "Published" && c[5] === today)
  .map((c) => `https://${HOST}/${c[1].replace(/^\/|\/$/g, "")}/`);
if (!urls.length) {
  console.log("indexnow: nothing published today");
  process.exit(0);
}
console.log("indexnow:", urls);
if (dry) process.exit(0);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log("indexnow: responded", res.status);
