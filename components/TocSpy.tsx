"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";

function useActive(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (!ids.length) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = 120;
      let current = els[0]?.id ?? "";
      for (const el of els) {
        if (el.getBoundingClientRect().top - y <= 0) current = el.id;
        else break;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return p;
}

/** Desktop sidebar "On this page" — sticky, highlights the section you're reading. */
export function TocSidebar({ headings }: { headings: Heading[] }) {
  const active = useActive(headings.map((h) => h.id));
  const progress = useProgress();
  const activeParent = (() => {
    const i = headings.findIndex((h) => h.id === active);
    for (let j = i; j >= 0; j--) if (headings[j].depth === 2) return headings[j].id;
    return "";
  })();
  return (
    <nav aria-label="On this page" className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-3">
        <p className="label-cond text-[0.95rem] text-ink">On this page</p>
        <span className="font-cond text-[0.9rem] font-bold text-madder">{Math.round(progress)}%</span>
      </div>
      <div className="h-[3px] bg-linen" aria-hidden="true"><div className="h-full bg-madder transition-[width]" style={{ width: `${progress}%` }} /></div>
      <ol className="max-h-[calc(100vh-14rem)] overflow-y-auto px-2 py-3 text-[0.95rem] leading-snug">
        {headings.map((h) => {
          const isActive = h.id === active;
          const inSection = h.depth === 3 && headings.some((x) => x.id === activeParent) && isChildOf(headings, h.id, activeParent);
          if (h.depth === 3 && !inSection && !isActive) return null;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative block rounded-md py-1.5 pr-2 no-underline transition-colors ${h.depth === 3 ? "pl-7 text-[0.9rem]" : "pl-4 font-semibold"} ${
                  isActive ? "bg-madder-tint text-madder-deep before:absolute before:inset-y-1.5 before:left-1 before:w-[3px] before:rounded-full before:bg-madder" : h.depth === 3 ? "text-ink-mute hover:text-madder" : "text-ink-soft hover:bg-cream hover:text-ink"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function isChildOf(headings: Heading[], id: string, parentId: string) {
  const i = headings.findIndex((h) => h.id === id);
  for (let j = i; j >= 0; j--) if (headings[j].depth === 2) return headings[j].id === parentId;
  return false;
}

/** Mobile: sticky bar under the header showing the current section; tap to open the full list. */
export function TocMobileBar({ headings }: { headings: Heading[] }) {
  const h2 = headings.filter((h) => h.depth === 2);
  const active = useActive(h2.map((h) => h.id));
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const current = h2.find((h) => h.id === active)?.text ?? "Contents";
  return (
    <div className="sticky top-[4.25rem] z-30 -mx-4 border-b border-line bg-white/95 backdrop-blur sm:-mx-6 lg:hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 px-4 py-3 text-left sm:px-6">
        <span className="label-cond shrink-0 text-[0.8rem] text-madder">On this page</span>
        <span className="min-w-0 flex-1 truncate text-[0.98rem] font-semibold">{current}</span>
        <span aria-hidden="true" className={`text-madder transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div className="h-[3px] bg-linen" aria-hidden="true"><div className="h-full bg-madder" style={{ width: `${progress}%` }} /></div>
      {open && (
        <ol className="max-h-[60vh] overflow-y-auto border-t border-line px-2 py-2">
          {h2.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} onClick={() => setOpen(false)} className={`block rounded-md px-3 py-2.5 no-underline ${h.id === active ? "bg-madder-tint font-semibold text-madder-deep" : "text-ink"}`}>
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
