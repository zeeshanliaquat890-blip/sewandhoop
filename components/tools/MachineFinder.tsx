"use client";

import { useEffect, useState } from "react";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, Choices, GuideLink, type ToolCtx } from "./ui";

type Project = "garments" | "quilting" | "embroidery" | "heavy" | "crafts" | "mending";
type Level = "new" | "some" | "experienced";
type Budget = "u200" | "200-500" | "500-1000" | "1000+";
type Priority = "easy" | "portable" | "durable" | "features";

type Answers = { project: Project | ""; level: Level | ""; budget: Budget | ""; priority: Priority | "" };

type Result = {
  type: string;
  why: string;
  mustHave: string[];
  niceToHave: string[];
  skip: string[];
  price: string;
  query: string;
  guides: { slug: string; label: string }[];
  hub: string;
  alsoConsider?: string;
};

const budgetLabel: Record<Budget, string> = { u200: "under $200", "200-500": "$200–$500", "500-1000": "$500–$1,000", "1000+": "$1,000+" };

function recommend(a: Required<{ [K in keyof Answers]: Exclude<Answers[K], ""> }>): Result {
  const { project, level, budget, priority } = a;
  const hi = budget === "500-1000" || budget === "1000+";
  const extras: string[] = [];
  if (priority === "portable") extras.push("Under about 15 lb with a carry handle");
  if (priority === "easy") extras.push("Automatic needle threader and a clear drop-in bobbin");
  if (priority === "durable") extras.push("Internal metal frame and a long warranty");
  if (priority === "features") extras.push("Speed control slider and needle up/down button");

  if (project === "embroidery") {
    const type =
      budget === "u200" || budget === "200-500"
        ? "An embroidery-only machine with a 4\" × 4\" hoop"
        : budget === "500-1000"
          ? "A sewing + embroidery combo machine with a 5\" × 7\" hoop"
          : "A combo machine with a large hoop (6\" × 10\" or bigger), or a multi-needle machine if you'll sell your work";
    return {
      type,
      why: "For embroidery, hoop size decides what you can stitch far more than anything else. Buy the biggest hoop your budget allows — you can always stitch small designs in a big hoop, never the reverse.",
      mustHave: ["Hoop size that fits your projects (4×4 for small motifs, 5×7 for most shirts and towels)", "USB or wireless design transfer", "Built-in fonts for monograms", "Automatic thread cutter", ...extras],
      niceToHave: ["Color touchscreen with on-screen editing", "Extra hoops sold separately", hi ? "Sewing functions too, so one machine does both" : "A machine that can be upgraded with a larger hoop later"],
      skip: ["Hundreds of built-in designs — you'll download or buy designs anyway", level === "new" ? "Multi-needle machines for now: they're for production work" : "Tiny 4×4 hoops if you want to do jacket backs or quilt blocks"],
      price: budget === "u200" ? "Embroidery machines rarely start below about $250. Expect to stretch the budget a little or buy a refurbished model." : `Good options exist ${budgetLabel[budget]}.`,
      query: budget === "1000+" ? "embroidery machine large hoop" : budget === "500-1000" ? "sewing and embroidery machine combo 5x7" : "embroidery machine for beginners 4x4",
      guides: [
        { slug: "best-embroidery-machine", label: "Best embroidery machines" },
        { slug: level === "new" ? "embroidery-machine-for-beginners" : "best-embroidery-machine-for-small-business", label: level === "new" ? "Embroidery machines for beginners" : "Embroidery machines for a small business" },
        { slug: "how-much-is-an-embroidery-machine", label: "How much does an embroidery machine cost?" },
      ],
      hub: "/embroidery-machines/",
      alsoConsider: "Stock up on cut-away and tear-away stabilizer and 40 wt embroidery thread before your first project.",
    };
  }

  if (project === "quilting") {
    const big = budget === "1000+";
    return {
      type: big ? "A large-throat quilting machine (9\"–11\" of space to the right of the needle) or a sit-down long-arm" : hi ? "A quilting-friendly computerized machine with a wide throat (around 8\"–9\")" : "A computerized machine with a walking foot and an extension table",
      why: "Quilting is about pushing a lot of fabric under the arm. Throat space and even feeding through thick layers matter more than stitch count.",
      mustHave: ["Walking foot (included or available)", "Needle up/down", "Large extension table", "¼\" piecing foot", "Free-motion / darning foot and drop feed dogs", ...extras],
      niceToHave: ["Knee lifter", "Automatic thread cutter", "Start/stop button for free-motion work", big ? "Stitch regulation for free-motion quilting" : "Adjustable presser-foot pressure"],
      skip: ["Decorative stitch counts in the hundreds", "Embroidery units — unless you also want to embroider"],
      price: budget === "u200" ? "You can piece quilts on a good basic machine; quilting large tops will be a squeeze." : `Plenty of quilting-capable machines ${budgetLabel[budget]}.`,
      query: big ? "long arm quilting machine sit down" : "quilting sewing machine wide throat",
      guides: [
        { slug: "best-sewing-machine-for-quilting", label: "Best sewing machines for quilting" },
        { slug: big ? "best-long-arm-quilting-machine" : "best-quilting-machine-for-beginners", label: big ? "Best long-arm quilting machines" : "Quilting machines for beginners" },
        { slug: "best-quilting-sewing-machine-with-large-throat", label: "Machines with a large throat" },
      ],
      hub: "/quilting-machines/",
    };
  }

  if (project === "heavy") {
    return {
      type: budget === "1000+" ? "A semi-industrial straight-stitch machine" : "A heavy-duty machine with a metal frame and a strong motor",
      why: "Denim seams, canvas and upholstery need piercing power at low speed. A metal frame stops the machine walking across the table and keeps stitches even through thick seams.",
      mustHave: ["Internal metal frame", "Strong motor / high piercing power", "Extra-high presser-foot lift", "Takes size 100/16–110/18 needles", "Adjustable presser-foot pressure", ...extras],
      niceToHave: ["Walking foot for layers that shift", "Speed control so you can go slow over seams", "Free arm for hemming jeans legs"],
      skip: ["Lightweight plastic 'mini' machines", "Paying extra for decorative stitches"],
      price: `Solid heavy-duty home machines are available ${budget === "u200" ? "from about $150" : budgetLabel[budget]}.`,
      query: budget === "1000+" ? "industrial straight stitch sewing machine" : "heavy duty sewing machine metal frame",
      guides: [
        { slug: "best-heavy-duty-sewing-machine", label: "Best heavy-duty sewing machines" },
        { slug: "best-machine-for-sewing-denim", label: "Best machines for sewing denim" },
        { slug: "best-industrial-sewing-machine-for-leather", label: "Industrial machines for leather" },
      ],
      hub: "/sewing-machines/",
    };
  }

  // garments, crafts, mending
  const isNew = level === "new";
  const mechanical = budget === "u200" && (project === "mending" || isNew);
  return {
    type: mechanical
      ? "A simple mechanical machine (dials, not screens)"
      : hi
        ? "A full-featured computerized machine"
        : "A computerized beginner-to-intermediate machine",
    why: mechanical
      ? "For hems, repairs and first projects, a mechanical machine is easy to understand, cheap to service, and does everything you need."
      : project === "garments"
        ? "Clothes need good buttonholes, a free arm for sleeves and cuffs, and a stretch stitch for knits — all standard on a decent computerized machine."
        : "A computerized machine gives you neat buttonholes and easy stitch selection without a steep learning curve.",
    mustHave: [
      mechanical ? "Free arm for sleeves and trouser legs" : "One-step automatic buttonhole",
      "Stretch / zigzag stitches for knits",
      "Adjustable stitch length and width",
      "Zipper foot and buttonhole foot included",
      ...extras,
    ],
    niceToHave: ["Automatic needle threader", "Needle up/down", "Speed control", project === "garments" ? "Twin-needle capability for professional-looking hems" : "Hard cover or carry case"],
    skip: ["200+ decorative stitches — you'll use a handful", isNew ? "Industrial machines for now" : "Mini 'toy' machines"],
    price: `Good choices are easy to find ${budgetLabel[budget]}.`,
    query: mechanical ? "mechanical sewing machine" : project === "garments" ? "computerized sewing machine for clothes" : "computerized sewing machine for beginners",
    guides: [
      { slug: isNew ? "best-sewing-machine-for-beginners" : "best-sewing-machine-for-garments", label: isNew ? "Best sewing machines for beginners" : "Best sewing machines for garments" },
      { slug: mechanical ? "best-mechanical-sewing-machine" : "what-is-a-computerized-sewing-machine", label: mechanical ? "Best mechanical sewing machines" : "What is a computerized sewing machine?" },
      { slug: "best-portable-sewing-machine", label: "Best portable sewing machines" },
    ],
    hub: "/sewing-machines/",
    alsoConsider: project === "garments" && !isNew ? "Once you sew clothes regularly, a serger gives you store-bought seam finishes." : undefined,
  };
}

const steps = [
  { key: "project", q: "What will you sew most?" },
  { key: "level", q: "How much sewing experience do you have?" },
  { key: "budget", q: "What's your budget?" },
  { key: "priority", q: "What matters most to you?" },
] as const;

export default function MachineFinder({ ctx }: { ctx?: ToolCtx }) {
  const [a, setA] = useState<Answers>({ project: "", level: "", budget: "", priority: "" });
  const [step, setStep] = useState(0);

  // Pre-fill from links like /tools/machine-finder/?project=quilting
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("project");
    const map: Record<string, Project> = { garments: "garments", quilting: "quilting", embroidery: "embroidery", "heavy-duty": "heavy", heavy: "heavy", crafts: "crafts", mending: "mending" };
    if (p && map[p]) {
      setA((x) => ({ ...x, project: map[p] }));
      setStep(1);
    }
  }, []);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((x) => ({ ...x, [k]: v }));
    setStep((s) => Math.min(s + 1, steps.length));
  };

  const done = step >= steps.length && a.project && a.level && a.budget && a.priority;
  const r = done ? recommend(a as Parameters<typeof recommend>[0]) : null;

  return (
    <ToolFrame title="Machine Finder" badge={done ? "Your shortlist" : `Question ${Math.min(step + 1, 4)} of 4`}>
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {steps.map((s, i) => <span key={s.key} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-madder" : i === step ? "bg-madder/40" : "bg-linen-deep"}`} />)}
      </div>

      {!done && (
        <div>
          <p className="font-serif text-[1.45rem] font-bold leading-snug">{steps[step].q}</p>
          <div className="mt-4">
            {step === 0 && (
              <Choices name="project" value={a.project} onChange={(v) => set("project", v)} options={[
                { value: "garments", label: "Clothes", sub: "Dresses, tops, pants" },
                { value: "quilting", label: "Quilts", sub: "Piecing and quilting" },
                { value: "embroidery", label: "Machine embroidery", sub: "Monograms, designs, patches" },
                { value: "heavy", label: "Heavy fabrics", sub: "Denim, canvas, upholstery" },
                { value: "crafts", label: "Crafts & home décor", sub: "Bags, pillows, curtains" },
                { value: "mending", label: "Mending & hems", sub: "Repairs and alterations" },
              ]} />
            )}
            {step === 1 && (
              <Choices name="level" value={a.level} onChange={(v) => set("level", v)} columns={3} options={[
                { value: "new", label: "Brand new", sub: "This is my first machine" },
                { value: "some", label: "Some", sub: "I've sewn a few projects" },
                { value: "experienced", label: "Experienced", sub: "I sew regularly" },
              ]} />
            )}
            {step === 2 && (
              <Choices name="budget" value={a.budget} onChange={(v) => set("budget", v)} columns={4} options={[
                { value: "u200", label: "Under $200" },
                { value: "200-500", label: "$200–$500" },
                { value: "500-1000", label: "$500–$1,000" },
                { value: "1000+", label: "$1,000+" },
              ]} />
            )}
            {step === 3 && (
              <Choices name="priority" value={a.priority} onChange={(v) => set("priority", v)} options={[
                { value: "easy", label: "Easy to use", sub: "Simple threading, clear controls" },
                { value: "portable", label: "Light & portable", sub: "Classes, small spaces" },
                { value: "durable", label: "Built to last", sub: "Metal frame, long warranty" },
                { value: "features", label: "Lots of features", sub: "Room to grow" },
              ]} />
            )}
          </div>
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-5 text-[0.95rem] font-bold text-ink-soft underline underline-offset-4">← Back</button>
          )}
        </div>
      )}

      {r && (
        <div>
          <p className="label-cond text-[0.9rem] text-madder">We recommend</p>
          <p className="mt-1 font-serif text-[1.6rem] font-bold leading-snug">{r.type}</p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">{r.why}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-sage/25 bg-sage-tint p-4">
              <p className="label-cond text-[0.9rem] text-sage">Must-have features</p>
              <ul className="mt-2 grid gap-1.5 text-[0.98rem] leading-snug">{r.mustHave.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-line bg-cream p-4">
                <p className="label-cond text-[0.9rem] text-ink-soft">Nice to have</p>
                <ul className="mt-2 grid gap-1.5 text-[0.98rem] leading-snug">{r.niceToHave.map((x) => <li key={x}>+ {x}</li>)}</ul>
              </div>
              <div className="rounded-xl border border-madder/20 bg-madder-tint p-4">
                <p className="label-cond text-[0.9rem] text-madder">Don&apos;t pay extra for</p>
                <ul className="mt-2 grid gap-1.5 text-[0.98rem] leading-snug">{r.skip.map((x) => <li key={x}>– {x}</li>)}</ul>
              </div>
            </div>
          </div>

          <p className="mt-5 rounded-lg bg-linen px-4 py-3 text-[0.98rem]"><strong>Budget check:</strong> {r.price}</p>
          {r.alsoConsider && <p className="mt-3 rounded-lg bg-linen px-4 py-3 text-[0.98rem]"><strong>Also think about:</strong> {r.alsoConsider}</p>}

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="label-cond text-[0.9rem] text-ink-soft">Read our guides</p>
              <ul className="mt-2 grid gap-1.5">
                {r.guides.map((g) => <li key={g.slug}>→ <GuideLink ctx={ctx} slug={g.slug} fallback={r.hub}>{g.label}</GuideLink></li>)}
              </ul>
            </div>
            <AffiliateLink query={r.query} variant="amazon" track="finder-result">Browse matching machines</AffiliateLink>
          </div>

          <button
            type="button"
            onClick={() => { setA({ project: "", level: "", budget: "", priority: "" }); setStep(0); }}
            className="mt-6 text-[0.95rem] font-bold text-ink-soft underline underline-offset-4"
          >
            ↺ Start over
          </button>
        </div>
      )}
    </ToolFrame>
  );
}
