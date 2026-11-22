"use client";

import { useState } from "react";
import { machines, type Machine } from "@/data/machines";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, Field, SelectInput, GuideLink, Note, type ToolCtx } from "./ui";

type Row = { label: string; get: (m: Machine) => string | number | boolean | undefined; better?: "higher" | "lower" | "yes"; fmt?: (v: never) => string };

const ROWS: Row[] = [
  { label: "Sew Score", get: (m) => m.score, better: "higher" },
  { label: "Type", get: (m) => m.type },
  { label: "Price range", get: (m) => m.priceRange },
  { label: "Built-in stitches", get: (m) => m.stitches, better: "higher" },
  { label: "Buttonhole", get: (m) => m.buttonhole },
  { label: "Max speed", get: (m) => m.maxSpeed, better: "higher", fmt: ((v: number) => `${v.toLocaleString()} spm`) as (v: never) => string },
  { label: "Throat space", get: (m) => m.throat, better: "higher", fmt: ((v: number) => `${v}″`) as (v: never) => string },
  { label: "Embroidery field", get: (m) => m.hoop },
  { label: "Weight", get: (m) => m.weight, better: "lower", fmt: ((v: number) => `${v} lb`) as (v: never) => string },
  { label: "Automatic needle threader", get: (m) => m.autoThreader, better: "yes" },
  { label: "Needle up/down", get: (m) => m.needleUpDown, better: "yes" },
  { label: "Speed control", get: (m) => m.speedControl, better: "yes" },
  { label: "Free arm", get: (m) => m.freeArm, better: "yes" },
  { label: "Metal frame", get: (m) => m.metalFrame, better: "yes" },
  { label: "Warranty", get: (m) => m.warranty },
];

function show(r: Row, m: Machine) {
  const v = r.get(m);
  if (v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "✓ Yes" : "✕ No";
  return r.fmt ? r.fmt(v as never) : String(v);
}

function winner(r: Row, a: Machine, b: Machine): 0 | 1 | -1 {
  const va = r.get(a), vb = r.get(b);
  if (!r.better || va === undefined || vb === undefined || va === vb) return -1;
  if (r.better === "yes") return va === true && vb !== true ? 0 : vb === true && va !== true ? 1 : -1;
  const na = Number(va), nb = Number(vb);
  if (r.better === "higher") return na > nb ? 0 : 1;
  return na < nb ? 0 : 1;
}

export default function MachineComparison({ ctx }: { ctx?: ToolCtx }) {
  const [aId, setAId] = useState(machines[0]?.id ?? "");
  const [bId, setBId] = useState(machines[1]?.id ?? "");
  if (machines.length < 2) {
    return <ToolFrame title="Machine Comparison"><p>Our machine database is being built. Check back soon.</p></ToolFrame>;
  }
  const a = machines.find((m) => m.id === aId)!, b = machines.find((m) => m.id === bId)!;
  const opts = machines.map((m) => ({ value: m.id, label: m.name }));
  const wins = [0, 0];
  for (const r of ROWS) { const w = winner(r, a, b); if (w >= 0) wins[w]++; }
  const rows = ROWS.filter((r) => r.get(a) !== undefined || r.get(b) !== undefined);

  return (
    <ToolFrame title="Machine Comparison" badge={machines.some((m) => m.demo) ? "Demo data" : `${machines.length} machines`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Machine 1" htmlFor="mc-a"><SelectInput id="mc-a" value={aId} onChange={setAId} options={opts} /></Field>
        <Field label="Machine 2" htmlFor="mc-b"><SelectInput id="mc-b" value={bId} onChange={setBId} options={opts} /></Field>
      </div>

      {aId === bId ? (
        <p className="mt-5 rounded-lg bg-linen px-4 py-3">Pick two different machines to compare.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border-2 border-ink">
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[11rem_1fr_1fr]">
            <div className="hidden bg-ink sm:block" />
            {[a, b].map((m, k) => (
              <div key={m.id} className={`p-4 ${k === 0 ? "bg-ink text-white" : "bg-ink-2 text-white"}`}>
                <p className="font-serif text-[1.08rem] font-bold leading-snug text-white">{m.name}</p>
                <p className="label-cond mt-1 text-[0.8rem] text-[#e9a796]">Wins {wins[k]} of {rows.filter((r) => r.better).length} rows</p>
              </div>
            ))}
          </div>
          <dl className="divide-y divide-line bg-white text-[0.98rem]">
            {rows.map((r) => {
              const w = winner(r, a, b);
              return (
                <div key={r.label} className="grid grid-cols-2 sm:grid-cols-[11rem_1fr_1fr]">
                  <dt className="col-span-2 bg-cream px-4 pt-2 text-[0.82rem] font-bold text-ink-mute sm:col-span-1 sm:py-3 sm:text-[0.95rem]">{r.label}</dt>
                  {[a, b].map((m, k) => (
                    <dd key={m.id} className={`px-4 py-2.5 sm:py-3 ${w === k ? "bg-sage-tint font-bold text-sage" : ""}`}>{show(r, m)}{w === k && <span className="sr-only"> (better)</span>}</dd>
                  ))}
                </div>
              );
            })}
          </dl>
          <div className="grid grid-cols-2 gap-px bg-line">
            {[a, b].map((m) => (
              <div key={m.id} className="grid gap-2 bg-white p-4">
                <AffiliateLink asin={m.asin} query={m.amazonQuery || m.name} variant="amazon" className="!min-h-[2.6rem] !px-3 !text-[0.9rem]" track={`compare-${m.id}`}>Check price</AffiliateLink>
                {m.reviewSlug && <p className="text-center text-[0.9rem]"><GuideLink ctx={ctx} slug={m.reviewSlug} fallback="/sewing-machines/">Read review</GuideLink></p>}
              </div>
            ))}
          </div>
        </div>
      )}
      <Note>Green marks the better spec in each row. More isn&apos;t always better for you — a lighter machine or fewer stitches can be exactly right for a beginner.</Note>
    </ToolFrame>
  );
}
