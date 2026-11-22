"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconSearch, IconArrow } from "./Icons";

type Entry = { t: string; u: string; k: string; c: string };

/** Lightweight site search. Index (/search-index.json) is fetched only when the box is focused. */
export function Search({ placeholder = "Search machines, how-tos, fixes…" }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [active, setActive] = useState(0);
  const loading = useRef(false);

  const load = () => {
    if (index || loading.current) return;
    loading.current = true;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  };

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!index || !terms.length) return [];
    return index
      .map((e) => {
        const hay = (e.t + " " + e.k).toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (!hay.includes(t)) return { e, score: 0 };
          score += e.t.toLowerCase().includes(t) ? 3 : 1;
        }
        return { e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((r) => r.e);
  }, [q, index]);

  useEffect(() => setActive(0), [q]);

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[active]) location.href = results[active].u;
        }}
        className="flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1.5 pl-5 pr-1.5 shadow-[4px_4px_0_0_#26221e] focus-within:shadow-[4px_4px_0_0_#a63d29]"
      >
        <IconSearch className="shrink-0 text-ink-mute" />
        <label htmlFor="site-search" className="sr-only">Search Sew &amp; Hoop</label>
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          value={q}
          onFocus={load}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          }}
          placeholder={placeholder}
          className="h-11 min-w-0 flex-1 bg-transparent text-[1.05rem] text-ink outline-none placeholder:text-ink-mute"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
        />
        <button type="submit" className="btn btn-primary !min-h-[2.75rem] shrink-0 !px-5">Search</button>
      </form>
      {q.length > 1 && index && (
        <ul id="search-results" role="listbox" className="absolute inset-x-0 top-full z-30 mt-3 overflow-hidden rounded-xl border-2 border-ink bg-white text-left shadow-[0_20px_40px_-20px_rgba(38,34,30,.5)]">
          {results.length === 0 && <li className="px-5 py-4 text-ink-soft">No guides match yet — try “beginner” or “embroidery”.</li>}
          {results.map((r, i) => (
            <li key={r.u} role="option" aria-selected={i === active}>
              <a href={r.u} className={`flex items-center justify-between gap-3 px-5 py-3.5 text-ink no-underline ${i === active ? "bg-linen" : ""}`}>
                <span>
                  <span className="block text-[0.75rem] font-bold uppercase tracking-[0.12em] text-madder">{r.c}</span>
                  <span className="font-bold">{r.t}</span>
                </span>
                <IconArrow className="shrink-0 text-ink-mute" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
