"use client";

import { useState } from "react";
import productsData from "@/data/products.json";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, Field, SelectInput, GuideLink, Note, type ToolCtx } from "./ui";

/** Every machine in the product ledger (product-master/product-master.csv → data/products.json). */
type Machine = {
  id: string; name: string; type?: string; priceRange?: string | null; score?: number | null;
  specs?: Record<string, string>; asin?: string | null; amazonQuery?: string | null; supersededBy?: string | null;
};
const machines = (Object.values(productsData) as Machine[]).filter((m) => !m.supersededBy).sort((a, b) => a.name.localeCompare(b.name));

const HIGHER = ["Built-in stitches", "Max speed", "Throat space", "Embroidery field"];
const LOWER = ["Weight"];
const YESNO = ["Needle threader", "Needle up/down", "Speed control", "Free arm", "Metal frame"];

type Row = { label: string; get: (m: Machine) => string | undefined; better?: "higher" | "lower" | "yes" };

function rowsFor(a: Machine, b: Machine): Row[] {
  const labels = Array.from(new Set([...Object.keys(a.specs ?? {}), ...Object.keys(b.specs ?? {})]));
  return [
    { label: "Sew Score", get: (m) => (m.score ? String(m.score) : undefined), better: "higher" },
    { label: "Price range", get: (m) => m.priceRange ?? undefined },
    ...labels.map((l) => ({
      label: l,
      get: (m: Machine) => m.specs?.[l],
      better: HIGHER.includes(l) ? ("higher" as const) : LOWER.includes(l) ? ("lower" as const) : YESNO.includes(l) ? ("yes" as const) : undefined,
    })),
  ];
}

const firstNum = (v?: string) => {
  const m = v?.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : NaN;
};
const show = (r: Row, m: Machine) => r.get(m) || "—";
const isYes = (v?: string) => !!v && /^(yes|y|✓|included)/i.test(v.trim());

function winner(r: Row, a: Machine, b: Machine): 0 | 1 | -1 {
  const va = r.get(a), vb = r.get(b);
  if (!r.better || !va || !vb || va === vb) return -1;
  if (r.better === "yes") return isYes(va) && !isYes(vb) ? 0 : isYes(vb) && !isYes(va) ? 1 : -1;
  const na = firstNum(va), nb = firstNum(vb);
  if (Number.isNaN(na) || Number.isNaN(nb) || na === nb) return -1;
  if (r.better === "higher") return na > nb ? 0 : 1;
  return na < nb ? 0 : 1;
}

export default function MachineComparison({ ctx }: { ctx?: ToolCtx }) {
  const [aId, setAId] = useState(machines[0]?.id ?? "");
  const [bId, setBId] = useState(machines[1]?.id ?? "");
  if (machines.length < 2) {
    return (
      <ToolFrame title="Machine Comparison" badge="Coming soon">
        <p className="font-serif text-[1.35rem] font-bold">Our machine database is being built.</p>
        <p className="mt-2 text-ink-soft">Every machine we research gets added here with its checked specs. Once there are at least two, you can compare them side by side.</p>
      </ToolFrame>
    );
  }
  const a = machines.find((m) => m.id === aId)!, b = machines.find((m) => m.id === bId)!;
  const ROWS = rowsFor(a, b);
  const opts = machines.map((m) => ({ value: m.id, label: m.name }));
  const wins = [0, 0];
  for (const r of ROWS) { const w = winner(r, a, b); if (w >= 0) wins[w]++; }
  const rows = ROWS.filter((r) => r.get(a) !== undefined || r.get(b) !== undefined);

  return (
    <ToolFrame title="Machine Comparison" badge={`${machines.length} machines`}>
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
                <AffiliateLink asin={m.asin ?? undefined} query={m.amazonQuery ?? m.name} variant="amazon" className="!min-h-[2.6rem] !px-3 !text-[0.9rem]" track={`compare-${m.id}`}>Check price</AffiliateLink>
                {ctx?.reviews?.[m.id] && <p className="text-center text-[0.9rem]"><GuideLink ctx={ctx} slug={ctx.reviews[m.id]} fallback="/sewing-machines/">Read our review</GuideLink></p>}
              </div>
            ))}
          </div>
        </div>
      )}
      <Note>Green marks the better spec in each row. More isn&apos;t always better for you — a lighter machine or fewer stitches can be exactly right for a beginner.</Note>
    </ToolFrame>
  );
}
