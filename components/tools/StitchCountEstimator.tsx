"use client";

import { useState } from "react";
import { ToolFrame, Field, NumberInput, Choices, ResultPanel, Stat, Note, fmtInt } from "./ui";

/** Typical stitches per square inch of design area by style (industry rules of thumb). */
const STYLES = {
  outline: { label: "Outline / running stitch", sub: "Line art, redwork", spi: 250 },
  text: { label: "Text & satin", sub: "Lettering, borders", spi: 900 },
  light: { label: "Light fill", sub: "Open, airy fills", spi: 1200 },
  full: { label: "Full fill", sub: "Solid logos, patches", spi: 1800 },
} as const;
type Style = keyof typeof STYLES;

export default function StitchCountEstimator() {
  const [w, setW] = useState(3.5);
  const [h, setH] = useState(2.5);
  const [coverage, setCoverage] = useState(60);
  const [style, setStyle] = useState<Style>("full");
  const [colors, setColors] = useState(3);
  const [spm, setSpm] = useState(650);
  const [qty, setQty] = useState(1);
  const [heads, setHeads] = useState(1);

  const area = Math.max(0, w) * Math.max(0, h) * (Math.min(100, Math.max(0, coverage)) / 100);
  const stitches = area * STYLES[style].spi;
  const low = stitches * 0.8, high = stitches * 1.2;

  const runMin = stitches / Math.max(1, spm);
  const changeMin = Math.max(0, colors - 1) * 0.5; // ~30 s per color change / trim on a single-needle machine
  const hoopMin = 2;
  const perPiece = runMin + changeMin + hoopMin;
  const total = (perPiece * Math.max(1, qty)) / Math.max(1, heads);
  const fmtTime = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h ${Math.round(m % 60)} min` : `${Math.max(1, Math.round(m))} min`);

  return (
    <ToolFrame title="Stitch Count & Time Estimator" badge="Estimate before you digitize">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Design width" htmlFor="sc-w"><NumberInput id="sc-w" value={w} onChange={setW} step={0.25} suffix="in" /></Field>
        <Field label="Design height" htmlFor="sc-h"><NumberInput id="sc-h" value={h} onChange={setH} step={0.25} suffix="in" /></Field>
        <Field label="How much is stitched?" htmlFor="sc-cov" hint="Part of the box actually covered.">
          <NumberInput id="sc-cov" value={coverage} onChange={setCoverage} step={5} max={100} suffix="%" />
        </Field>
      </div>
      <div className="mt-4">
        <p className="mb-1.5 text-[0.98rem] font-bold">Design style</p>
        <Choices name="style" value={style} onChange={setStyle} columns={4} options={Object.entries(STYLES).map(([k, s]) => ({ value: k as Style, label: s.label, sub: s.sub }))} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        <Field label="Colors" htmlFor="sc-c"><NumberInput id="sc-c" value={colors} onChange={setColors} min={1} /></Field>
        <Field label="Machine speed" htmlFor="sc-spm"><NumberInput id="sc-spm" value={spm} onChange={setSpm} step={50} suffix="spm" /></Field>
        <Field label="Pieces" htmlFor="sc-q"><NumberInput id="sc-q" value={qty} onChange={setQty} min={1} /></Field>
        <Field label="Heads" htmlFor="sc-hd"><NumberInput id="sc-hd" value={heads} onChange={setHeads} min={1} /></Field>
      </div>

      <ResultPanel title="Estimate">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat big label="Stitch count" value={`≈ ${fmtInt(Math.round(stitches / 100) * 100)}`} note={`Likely range ${fmtInt(Math.round(low / 100) * 100)} – ${fmtInt(Math.round(high / 100) * 100)}`} />
          <Stat label="Time per piece" value={fmtTime(perPiece)} note="Stitching + color changes + hooping" />
          <Stat label={`Total for ${Math.max(1, qty)}`} value={fmtTime(total)} note={heads > 1 ? `across ${heads} heads` : undefined} />
        </div>
      </ResultPanel>
      <Note>
        Rules of thumb: about 250 stitches per square inch for outlines, 900 for satin and text, 1,200 for light fills and 1,800 for solid fills. Real counts depend on density, underlay and the digitizer — always check the final file.
      </Note>
    </ToolFrame>
  );
}
