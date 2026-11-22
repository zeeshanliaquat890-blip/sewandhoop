"use client";

import { useEffect, useMemo, useState } from "react";
import { deltaE2000, hexToLab, matchLabel, textOn, type Lab } from "@/lib/color";
import { ToolFrame, Field, SelectInput, Note } from "./ui";

type Color = { code: string; name: string; hex: string; lab: Lab };
type Brand = { id: string; name: string; fiber: string; colors: Color[] };

function useThreads() {
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [source, setSource] = useState("");
  useEffect(() => {
    fetch("/data/threads.json")
      .then((r) => r.json())
      .then((d: { source: string; brands: { id: string; name: string; fiber: string; colors: [string, string, string][] }[] }) => {
        setSource(d.source);
        setBrands(d.brands.map((b) => ({ ...b, colors: b.colors.map(([code, name, hex]) => ({ code, name, hex, lab: hexToLab(hex) })) })));
      })
      .catch(() => setBrands([]));
  }, []);
  return { brands, source };
}

function nearest(brand: Brand, lab: Lab, n = 3) {
  return brand.colors
    .map((c) => ({ c, d: deltaE2000(lab, c.lab) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, n);
}

export default function ThreadColorConverter() {
  const { brands, source } = useThreads();
  const [mode, setMode] = useState<"code" | "color">("code");
  const [fromId, setFromId] = useState("isacord");
  const [code, setCode] = useState("");
  const [hex, setHex] = useState("#b23a26");

  const from = brands?.find((b) => b.id === fromId);
  const picked = useMemo(() => {
    if (!from) return null;
    const q = code.trim().toLowerCase().replace(/^0+(?=\d)/, "");
    if (!q) return null;
    return from.colors.find((c) => c.code.toLowerCase().replace(/^0+(?=\d)/, "") === q) ?? null;
  }, [from, code]);

  const target: { lab: Lab; hex: string; label: string } | null =
    mode === "code" ? (picked ? { lab: picked.lab, hex: picked.hex, label: `${from!.name} ${picked.code} · ${picked.name}` } : null)
      : /^#?[0-9a-f]{6}$/i.test(hex) ? { lab: hexToLab(hex.replace("#", "")), hex: hex.replace("#", ""), label: `Color ${hex.toUpperCase()}` } : null;

  const suggestions = useMemo(() => {
    if (!from) return [];
    const q = code.trim().toLowerCase();
    if (!q || picked) return [];
    return from.colors.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [from, code, picked]);

  return (
    <ToolFrame title="Thread Color Converter" badge={brands ? `${brands.length} thread lines` : "Loading…"}>
      <div role="tablist" className="mb-5 inline-flex rounded-full bg-linen p-1">
        {([["code", "Convert a thread number"], ["color", "Match any color"]] as const).map(([m, l]) => (
          <button key={m} role="tab" aria-selected={mode === m} type="button" onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2 text-[0.95rem] font-bold ${mode === m ? "bg-white text-ink shadow" : "text-ink-soft"}`}>{l}</button>
        ))}
      </div>

      {mode === "code" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Thread brand you have" htmlFor="tc-from">
            <SelectInput id="tc-from" value={fromId} onChange={(v) => { setFromId(v); setCode(""); }} options={(brands ?? []).map((b) => ({ value: b.id, label: b.name }))} />
          </Field>
          <Field label="Color number or name" htmlFor="tc-code" hint={from ? `e.g. ${from.colors.slice(0, 3).map((c) => c.code).join(", ")}` : undefined}>
            <div className="relative">
              <input id="tc-code" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" placeholder="Type a number or color name"
                className="h-12 w-full rounded-lg border-2 border-line bg-white px-3 text-[1.05rem] outline-none focus:border-madder" />
              {suggestions.length > 0 && (
                <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-lg border-2 border-ink bg-white shadow-lg">
                  {suggestions.map((c) => (
                    <li key={c.code}>
                      <button type="button" onClick={() => setCode(c.code)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-cream">
                        <span className="h-6 w-6 shrink-0 rounded-full border border-line" style={{ background: `#${c.hex}` }} />
                        <span className="font-bold">{c.code}</span> <span className="text-ink-soft">{c.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
          <Field label="Pick a color" htmlFor="tc-picker">
            <input id="tc-picker" type="color" value={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-12 w-24 cursor-pointer rounded-lg border-2 border-line bg-white p-1" />
          </Field>
          <Field label="…or type a hex code" htmlFor="tc-hex">
            <input id="tc-hex" value={hex} onChange={(e) => setHex(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)} className="h-12 w-full rounded-lg border-2 border-line bg-white px-3 font-mono text-[1.05rem] outline-none focus:border-madder" />
          </Field>
        </div>
      )}

      {target && brands && (
        <div className="mt-6" aria-live="polite">
          <div className="flex items-center gap-4 rounded-xl p-4" style={{ background: `#${target.hex}`, color: textOn(target.hex) }}>
            <span className="label-cond text-[0.85rem] opacity-80">Starting color</span>
            <span className="font-bold">{target.label}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {brands.filter((b) => mode === "color" || b.id !== fromId).map((b) => {
              const [best, ...alts] = nearest(b, target.lab);
              if (!best) return null;
              const m = matchLabel(best.d);
              return (
                <div key={b.id} className="overflow-hidden rounded-xl border border-line bg-white">
                  <div className="flex items-center gap-3 p-3">
                    <span className="h-12 w-12 shrink-0 rounded-lg border border-line" style={{ background: `#${best.c.hex}` }} />
                    <div className="min-w-0 flex-1">
                      <p className="label-cond text-[0.78rem] text-ink-mute">{b.name} <span className="opacity-70">· {b.fiber}</span></p>
                      <p className="truncate font-bold"><span className="font-cond text-[1.25rem]">{best.c.code}</span> {best.c.name}</p>
                    </div>
                    <span className={`label-cond shrink-0 rounded-full px-2 py-0.5 text-[0.72rem] ${m.cls}`}>{m.text}</span>
                  </div>
                  <div className="flex gap-2 border-t border-line bg-cream px-3 py-2 text-[0.85rem] text-ink-soft">
                    <span className="shrink-0">Also close:</span>
                    {alts.map((x) => (
                      <span key={x.c.code} className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded-full border border-line" style={{ background: `#${x.c.hex}` }} />{x.c.code}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {mode === "code" && code && from && !picked && suggestions.length === 0 && (
        <p className="mt-4 rounded-lg bg-madder-tint px-4 py-3 text-[0.95rem]">We couldn&apos;t find “{code}” in {from.name}. Check the number on the spool label.</p>
      )}

      <Note>
        Matches are calculated from published color values, so treat them as a starting point — screens and dye lots vary. For a critical match (logos, brand colors), check the real spools side by side. {source}
      </Note>
    </ToolFrame>
  );
}
