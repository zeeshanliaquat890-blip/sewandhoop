"use client";

import { useState } from "react";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, Field, NumberInput, SelectInput, ResultPanel, Stat, Note } from "./ui";

type Piece = { id: number; name: string; w: number; l: number; qty: number };
type Mode = "pieces" | "backing" | "binding";

const WIDTHS = [
  { value: "44", label: "44/45\" (quilting cotton)" },
  { value: "54", label: "54\" (home décor)" },
  { value: "60", label: "58/60\" (apparel, fleece)" },
  { value: "108", label: "108\" (wide backing)" },
];

/** Round up to the nearest 1/8 yard and format like "2 ⅜ yd". */
function yards(inches: number) {
  const eighths = Math.ceil(inches / 36 / 0.125 - 1e-9);
  const whole = Math.floor(eighths / 8);
  const frac = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"][eighths % 8];
  return { value: eighths / 8, text: `${whole ? whole : frac ? "" : "0"}${whole && frac ? " " : ""}${frac} yd` };
}

/** Simple shelf packing across the fabric width. Returns total length in inches. */
function pack(pieces: Piece[], usable: number, allowRotate: boolean) {
  const items: { w: number; l: number }[] = [];
  const tooWide: string[] = [];
  for (const p of pieces) {
    for (let i = 0; i < Math.max(0, Math.round(p.qty)); i++) {
      let w = p.w, l = p.l;
      if (allowRotate && w > usable && l <= usable) [w, l] = [l, w];
      else if (allowRotate && l < w && w <= usable && l <= usable) [w, l] = [l, w]; // keep the long side along the length
      if (w > usable) { tooWide.push(p.name || "piece"); continue; }
      if (w > 0 && l > 0) items.push({ w, l });
    }
  }
  items.sort((a, b) => b.l - a.l);
  const shelves: { used: number; h: number }[] = [];
  for (const it of items) {
    const s = shelves.find((sh) => sh.used + it.w <= usable && it.l <= sh.h);
    if (s) s.used += it.w;
    else shelves.push({ used: it.w, h: it.l });
  }
  return { length: shelves.reduce((n, s) => n + s.h, 0), rows: shelves.length, tooWide: Array.from(new Set(tooWide)) };
}

let nextId = 3;

export default function FabricYardageCalculator() {
  const [mode, setMode] = useState<Mode>("pieces");
  const [width, setWidth] = useState("44");
  const [shrink, setShrink] = useState(5);
  const [extra, setExtra] = useState(true);
  const [directional, setDirectional] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([
    { id: 1, name: "Front panel", w: 18, l: 24, qty: 2 },
    { id: 2, name: "Strap", w: 4, l: 30, qty: 2 },
  ]);
  const [qw, setQw] = useState(60);
  const [ql, setQl] = useState(72);
  const [stripW, setStripW] = useState(2.5);

  const fabricW = Number(width);
  const usable = (fabricW - (fabricW >= 100 ? 2 : 1)) * (1 - shrink / 100); // minus selvages and shrinkage

  let resultYd = { value: 0, text: "" };
  let detail: React.ReactNode = null;

  if (mode === "pieces") {
    const r = pack(pieces, usable, !directional);
    const len = r.length * (1 + shrink / 100) * (extra ? 1.1 : 1);
    resultYd = yards(len);
    detail = (
      <>
        <p>Laid out in {r.rows} row{r.rows === 1 ? "" : "s"} across a {usable.toFixed(1)}&quot; usable width.</p>
        {r.tooWide.length > 0 && <p className="mt-2 text-madder">Too wide for this fabric, even turned: {r.tooWide.join(", ")}. Choose a wider fabric or piece it.</p>}
      </>
    );
  } else if (mode === "backing") {
    const W = qw + 8, L = ql + 8; // 4" extra on every side for quilting
    if (W <= usable || L <= usable) {
      const len = W <= usable ? L : W;
      resultYd = yards(len);
      detail = <p>One width of fabric, no seams. Includes 4&quot; extra on every side.</p>;
    } else {
      const vert = Math.ceil(W / usable) * L;
      const horiz = Math.ceil(L / usable) * W;
      const best = Math.min(vert, horiz);
      const n = vert <= horiz ? Math.ceil(W / usable) : Math.ceil(L / usable);
      resultYd = yards(best);
      detail = <p>{n} lengths sewn together with {vert <= horiz ? "vertical" : "horizontal"} seams ({n - 1} seam{n - 1 === 1 ? "" : "s"}). Includes 4&quot; extra on every side.</p>;
    }
  } else {
    const perimeter = 2 * (qw + ql) + 12;
    const strips = Math.ceil(perimeter / (usable - 0.5));
    resultYd = yards(strips * stripW);
    detail = <p>{strips} strips cut {stripW}&quot; wide across the fabric ({perimeter}&quot; of binding including 12&quot; for joins and corners).</p>;
  }

  const upd = (id: number, k: keyof Piece, v: string | number) => setPieces((ps) => ps.map((p) => (p.id === id ? { ...p, [k]: v } : p)));

  return (
    <ToolFrame title="Fabric Yardage Calculator" badge="Rounded up to ⅛ yard">
      <div role="tablist" className="mb-5 flex flex-wrap gap-1 rounded-2xl bg-linen p-1 sm:inline-flex sm:rounded-full">
        {([["pieces", "My pattern pieces"], ["backing", "Quilt backing"], ["binding", "Quilt binding"]] as const).map(([m, l]) => (
          <button key={m} role="tab" aria-selected={mode === m} type="button" onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2 text-[0.95rem] font-bold ${mode === m ? "bg-white text-ink shadow" : "text-ink-soft"}`}>{l}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Fabric width" htmlFor="fy-w"><SelectInput id="fy-w" value={width} onChange={setWidth} options={WIDTHS} /></Field>
        <Field label="Shrinkage allowance" htmlFor="fy-s" hint="Cotton often shrinks 3–5% when pre-washed. Use 0 for polyester.">
          <NumberInput id="fy-s" value={shrink} onChange={setShrink} step={1} max={15} suffix="%" />
        </Field>
      </div>

      {mode === "pieces" && (
        <div className="mt-5">
          <p className="mb-2 text-[0.98rem] font-bold">Pieces to cut (inches, including seam allowance)</p>
          <div className="grid gap-2">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] gap-2 px-1 text-[0.82rem] text-ink-mute sm:grid">
              <span>Name</span><span>Width</span><span>Length</span><span>Qty</span><span className="w-10" />
            </div>
            {pieces.map((p) => (
              <div key={p.id} className="grid grid-cols-3 gap-2 rounded-lg border border-line p-2 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] sm:border-0 sm:p-0">
                <input aria-label="Piece name" value={p.name} onChange={(e) => upd(p.id, "name", e.target.value)} className="col-span-3 h-11 rounded-lg border-2 border-line px-3 outline-none focus:border-madder sm:col-span-1" />
                <NumberInput id={`w${p.id}`} label={`${p.name} width`} value={p.w} onChange={(v) => upd(p.id, "w", v)} step={0.5} suffix="W" />
                <NumberInput id={`l${p.id}`} label={`${p.name} length`} value={p.l} onChange={(v) => upd(p.id, "l", v)} step={0.5} suffix="L" />
                <NumberInput id={`q${p.id}`} label={`${p.name} quantity`} value={p.qty} onChange={(v) => upd(p.id, "qty", v)} min={1} suffix="×" />
                <button type="button" onClick={() => setPieces((ps) => ps.filter((x) => x.id !== p.id))} className="col-span-3 h-10 rounded-lg text-[0.92rem] font-bold text-ink-mute hover:bg-madder-tint hover:text-madder sm:col-span-1 sm:h-11 sm:w-10"><span className="sm:hidden">Remove</span><span className="sr-only hidden sm:inline">Remove</span><span className="hidden sm:inline" aria-hidden="true">✕</span></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setPieces((ps) => [...ps, { id: nextId++, name: `Piece ${ps.length + 1}`, w: 10, l: 10, qty: 1 }])} className="mt-3 rounded-lg border-2 border-dashed border-line px-4 py-2 font-bold text-ink-soft hover:border-madder hover:text-madder">+ Add a piece</button>
          <div className="mt-4 grid gap-2 text-[0.98rem]">
            <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={directional} onChange={(e) => setDirectional(e.target.checked)} className="h-5 w-5 accent-[#b23a26]" />Directional print or nap (pieces can&apos;t be turned)</label>
            <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={extra} onChange={(e) => setExtra(e.target.checked)} className="h-5 w-5 accent-[#b23a26]" />Add 10% for pattern matching and mistakes</label>
          </div>
        </div>
      )}

      {(mode === "backing" || mode === "binding") && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Quilt width" htmlFor="fy-qw"><NumberInput id="fy-qw" value={qw} onChange={setQw} suffix="in" /></Field>
          <Field label="Quilt length" htmlFor="fy-ql"><NumberInput id="fy-ql" value={ql} onChange={setQl} suffix="in" /></Field>
          {mode === "binding" && <Field label="Strip width" htmlFor="fy-sw" hint="2½″ is standard double-fold."><NumberInput id="fy-sw" value={stripW} onChange={setStripW} step={0.25} suffix="in" /></Field>}
        </div>
      )}

      <ResultPanel title="You need">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat big label="Buy" value={resultYd.text} note={`${resultYd.value.toFixed(3)} yards · ${(resultYd.value * 0.9144).toFixed(2)} m`} />
          <div className="rounded-lg bg-white p-4 text-[0.98rem] leading-snug">{detail}</div>
        </div>
        <AffiliateLink query={mode === "pieces" ? "fabric by the yard" : mode === "backing" ? "108 inch wide quilt backing fabric" : "quilting cotton fat quarters"} variant="amazon" className="mt-4" track={`yardage-${mode}`}>Shop fabric</AffiliateLink>
      </ResultPanel>
      <Note>This calculator packs rectangles across the fabric in rows — a real layout with curved pattern pieces may fit a little tighter. When the pattern envelope gives a yardage, use the larger of the two.</Note>
    </ToolFrame>
  );
}
