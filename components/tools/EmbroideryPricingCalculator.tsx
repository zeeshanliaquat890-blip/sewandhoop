"use client";

import { useState } from "react";
import { ToolFrame, Field, NumberInput, ResultPanel, Stat, Note, fmtMoney, fmtInt } from "./ui";

const TIERS = [
  { min: 1, off: 0 },
  { min: 12, off: 0.1 },
  { min: 24, off: 0.15 },
  { min: 48, off: 0.2 },
  { min: 144, off: 0.25 },
];

export default function EmbroideryPricingCalculator() {
  const [stitches, setStitches] = useState(8000);
  const [rate, setRate] = useState(1);
  const [minimum, setMinimum] = useState(6);
  const [qty, setQty] = useState(12);
  const [blank, setBlank] = useState(8);
  const [markup, setMarkup] = useState(40);
  const [setup, setSetup] = useState(0);
  const [useTiers, setUseTiers] = useState(true);
  const [spm, setSpm] = useState(700);
  const [heads, setHeads] = useState(1);

  const q = Math.max(1, Math.round(qty));
  const tier = [...TIERS].reverse().find((t) => q >= t.min)!;
  const discount = useTiers ? tier.off : 0;

  const stitchPrice = Math.max(minimum, (stitches / 1000) * rate) * (1 - discount);
  const blankPrice = blank * (1 + markup / 100);
  const perPiece = stitchPrice + blankPrice;
  const total = perPiece * q + setup;

  // Machine time: real-world throughput is lower than top speed (trims, color changes, hooping).
  const efficiency = 0.65;
  const minutesPerPiece = stitches / (Math.max(1, spm) * efficiency);
  const totalMinutes = (minutesPerPiece * q) / Math.max(1, heads);
  const embroideryRevenue = stitchPrice * q + setup;
  const perHour = totalMinutes > 0 ? embroideryRevenue / (totalMinutes / 60) : 0;

  return (
    <ToolFrame title="Embroidery Pricing Calculator" badge="For small embroidery businesses">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Stitch count per piece" htmlFor="ep-st" hint="From your design software. A left-chest logo is often 5,000–10,000.">
          <NumberInput id="ep-st" value={stitches} onChange={setStitches} step={500} suffix="stitches" />
        </Field>
        <Field label="Price per 1,000 stitches" htmlFor="ep-rate" hint="Many shops charge $0.75–$1.50.">
          <NumberInput id="ep-rate" value={rate} onChange={setRate} step={0.05} prefix="$" />
        </Field>
        <Field label="Minimum embroidery charge per piece" htmlFor="ep-min">
          <NumberInput id="ep-min" value={minimum} onChange={setMinimum} step={0.5} prefix="$" />
        </Field>
        <Field label="Quantity" htmlFor="ep-q">
          <NumberInput id="ep-q" value={qty} onChange={setQty} min={1} suffix="pieces" />
        </Field>
        <Field label="Blank item cost (each)" htmlFor="ep-blank" hint="Set to 0 if the customer supplies the garment.">
          <NumberInput id="ep-blank" value={blank} onChange={setBlank} step={0.5} prefix="$" />
        </Field>
        <Field label="Markup on blanks" htmlFor="ep-mu">
          <NumberInput id="ep-mu" value={markup} onChange={setMarkup} step={5} suffix="%" />
        </Field>
        <Field label="One-time setup / digitizing fee" htmlFor="ep-setup">
          <NumberInput id="ep-setup" value={setup} onChange={setSetup} step={5} prefix="$" />
        </Field>
        <Field label="Machine speed & heads" htmlFor="ep-spm" hint="Used for the time estimate only.">
          <div className="grid grid-cols-2 gap-2">
            <NumberInput id="ep-spm" value={spm} onChange={setSpm} step={50} suffix="spm" />
            <NumberInput id="ep-heads" label="Number of machine heads" value={heads} onChange={setHeads} min={1} suffix="heads" />
          </div>
        </Field>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-3 text-[0.98rem]">
        <input type="checkbox" checked={useTiers} onChange={(e) => setUseTiers(e.target.checked)} className="h-5 w-5 accent-[#b23a26]" />
        Apply quantity discounts on embroidery (12+: 10%, 24+: 15%, 48+: 20%, 144+: 25%)
      </label>

      <ResultPanel title="Quote">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat big label="Price per piece" value={fmtMoney(perPiece)} />
          <Stat big label={`Order total (${q})`} value={fmtMoney(total)} note={setup ? `includes ${fmtMoney(setup)} setup` : undefined} />
          <Stat label="Machine time" value={totalMinutes >= 60 ? `${(totalMinutes / 60).toFixed(1)} h` : `${Math.ceil(totalMinutes)} min`} note={`≈ ${minutesPerPiece.toFixed(1)} min per piece`} />
        </div>
        <table className="mt-4 w-full overflow-hidden rounded-lg bg-white text-[0.98rem]">
          <tbody className="divide-y divide-line">
            <tr><td className="px-4 py-2.5">Embroidery ({fmtInt(stitches)} stitches{discount ? `, −${Math.round(discount * 100)}%` : ""})</td><td className="px-4 py-2.5 text-right font-bold">{fmtMoney(stitchPrice)}</td></tr>
            <tr><td className="px-4 py-2.5">Blank item incl. markup</td><td className="px-4 py-2.5 text-right font-bold">{fmtMoney(blankPrice)}</td></tr>
            <tr><td className="px-4 py-2.5">Embroidery earnings per machine hour</td><td className="px-4 py-2.5 text-right font-bold">{fmtMoney(perHour)}</td></tr>
          </tbody>
        </table>
        {(stitches / 1000) * rate < minimum && <p className="mt-3 text-[0.92rem] text-madder">The minimum charge applies — this design is small enough that the per-stitch price would be lower.</p>}
      </ResultPanel>
      <Note>Time assumes the machine runs at about 65% of its top speed on average, to allow for trims, color changes and hooping. Check local sales tax rules before sending a quote.</Note>
    </ToolFrame>
  );
}
