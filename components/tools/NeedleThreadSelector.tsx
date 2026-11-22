"use client";

import { useState } from "react";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, Field, Choices, ResultPanel, Note } from "./ui";

type Rec = {
  label: string;
  group: string;
  needle: string;
  needleQuery: string;
  thread: string;
  stitch: string;
  foot: string;
  tips: string[];
};

const FABRICS: Record<string, Rec> = {
  sheer: { group: "Lightweight wovens", label: "Chiffon, organza, georgette", needle: "Microtex (sharp) 60/8 – 70/10", needleQuery: "microtex sewing machine needles 70/10", thread: "Fine polyester (60 wt) or silk thread", stitch: "1.5 – 2.0 mm", foot: "Straight-stitch foot with a single-hole needle plate, if you have one", tips: ["Put tissue paper under the fabric so it doesn't get pulled into the plate.", "Hold the thread tails when you start sewing.", "Use a brand-new needle — a burr will snag sheers."] },
  lawn: { group: "Lightweight wovens", label: "Cotton lawn, voile, batiste", needle: "Universal or Microtex 70/10", needleQuery: "universal sewing machine needles 70/10", thread: "All-purpose polyester or 50 wt cotton", stitch: "2.0 – 2.5 mm", foot: "Standard (all-purpose) foot", tips: ["Shorter stitches help stop seams puckering on thin fabric.", "Press seams as you go."] },
  silk: { group: "Lightweight wovens", label: "Silk & satin", needle: "Microtex 60/8 – 70/10", needleQuery: "microtex sewing machine needles 60/8", thread: "Silk or fine polyester thread", stitch: "2.0 mm", foot: "Standard foot; a walking foot helps on slippery satin", tips: ["Pin within the seam allowance only — pin holes can show.", "Lower the presser-foot pressure if your machine allows it."] },
  quilting: { group: "Medium wovens", label: "Quilting cotton, poplin, shirting", needle: "Universal 80/12 (or Quilting 75/11 for piecing)", needleQuery: "universal sewing machine needles 80/12", thread: "50 wt cotton or all-purpose polyester", stitch: "2.0 – 2.5 mm (piecing around 2.0)", foot: "Standard foot; ¼\" foot for piecing quilts", tips: ["Change the needle about every 8 hours of sewing.", "Use the same thread in the top and bobbin for balanced tension."] },
  linen: { group: "Medium wovens", label: "Linen & linen blends", needle: "Universal 80/12 – 90/14", needleQuery: "universal sewing machine needles 90/14", thread: "All-purpose polyester or 50 wt cotton", stitch: "2.5 – 3.0 mm", foot: "Standard foot", tips: ["Linen frays — finish raw edges with zigzag, overlock or French seams.", "Pre-wash: linen shrinks."] },
  flannel: { group: "Medium wovens", label: "Flannel & brushed cotton", needle: "Universal 80/12", needleQuery: "universal sewing machine needles 80/12", thread: "All-purpose polyester", stitch: "2.5 mm", foot: "Walking foot stops the layers creeping", tips: ["Clean lint out of the bobbin area often — flannel sheds a lot."] },
  denim: { group: "Heavy wovens", label: "Denim (light to medium, 8–12 oz)", needle: "Jeans / Denim 90/14 – 100/16", needleQuery: "jeans denim sewing machine needles 100/16", thread: "Heavy-duty polyester for seams; 30 wt topstitch thread for topstitching (with a Topstitch needle)", stitch: "3.0 – 3.5 mm", foot: "Jeans foot; use a hump jumper or folded fabric to climb thick seams", tips: ["Slow down and hand-walk the needle over flat-felled seams.", "Lengthen the stitch for topstitching — 3.5 to 4 mm looks like store-bought jeans."] },
  canvas: { group: "Heavy wovens", label: "Heavy denim, canvas, duck, twill", needle: "Jeans 100/16 – 110/18", needleQuery: "heavy duty sewing machine needles 110/18", thread: "Heavy-duty polyester (Tex 40 / 30 wt)", stitch: "3.0 – 4.0 mm", foot: "Walking foot or heavy-duty foot", tips: ["Check your manual for the thickest needle your machine accepts.", "Use clips instead of pins on many layers."] },
  upholstery: { group: "Heavy wovens", label: "Upholstery fabric & outdoor fabric", needle: "Jeans 100/16 – 110/18", needleQuery: "upholstery sewing machine needles 110/18", thread: "Upholstery or bonded polyester thread (UV-resistant for outdoor use)", stitch: "3.5 – 4.0 mm", foot: "Walking foot", tips: ["Bonded polyester thread resists sun and moisture better than cotton.", "Test on a scrap with the full number of layers first."] },
  leather: { group: "Leather & vinyl", label: "Soft garment leather & suede", needle: "Leather (wedge point) 80/12 – 100/16", needleQuery: "leather sewing machine needles 90/14", thread: "Polyester or nylon — never cotton (the tannins rot it)", stitch: "3.0 – 4.0 mm", foot: "Teflon (non-stick), roller or walking foot", tips: ["Every hole is permanent — test first and don't unpick.", "Use binder clips instead of pins.", "Don't backstitch; tie off threads instead."] },
  vinyl: { group: "Leather & vinyl", label: "Vinyl, faux leather, laminated cotton", needle: "Leather 90/14 or Microtex 90/14 for thin faux leather", needleQuery: "leather sewing machine needles 90/14", thread: "All-purpose or heavy-duty polyester", stitch: "3.0 – 3.5 mm", foot: "Teflon (non-stick) or roller foot", tips: ["A strip of matte tape under a standard foot also stops sticking.", "Long stitches avoid perforating the vinyl like a stamp."] },
  jersey: { group: "Knits", label: "Cotton jersey, T-shirt knit, interlock", needle: "Jersey / Ballpoint 70/10 – 80/12", needleQuery: "ballpoint jersey sewing machine needles 80/12", thread: "All-purpose polyester (it stretches; cotton snaps)", stitch: "Narrow zigzag (0.5–1 mm wide, 2.5 mm long) or your machine's stretch stitch", foot: "Walking foot helps stop wavy seams", tips: ["Don't stretch the fabric as you sew — let the feed dogs do the work.", "A twin needle gives a professional stretchy hem."] },
  stretch: { group: "Knits", label: "Spandex, swimwear, activewear", needle: "Stretch 75/11 – 90/14", needleQuery: "stretch sewing machine needles 75/11", thread: "Polyester; woolly nylon in the bobbin for extra stretch", stitch: "Zigzag or stretch stitch, 2.5 – 3.0 mm", foot: "Walking foot", tips: ["Skipped stitches on spandex almost always mean you need a Stretch needle.", "Stretch the seam after sewing to check it won't pop."] },
  fleece: { group: "Knits", label: "Fleece, sweater knit, sweatshirt", needle: "Jersey / Ballpoint 80/12 – 90/14", needleQuery: "ballpoint sewing machine needles 90/14", thread: "All-purpose polyester", stitch: "3.0 mm straight or narrow zigzag", foot: "Walking foot", tips: ["Fleece doesn't fray, so seams don't need finishing.", "Reduce presser-foot pressure to avoid stretched seams."] },
  minky: { group: "Specialty", label: "Minky, faux fur, plush", needle: "Ballpoint 90/14 or Universal 90/14", needleQuery: "ballpoint sewing machine needles 90/14", thread: "All-purpose polyester", stitch: "3.0 mm", foot: "Walking foot", tips: ["Pin (or clip) every couple of inches — minky slides a lot.", "Cut from the back with small snips so you don't cut the pile."] },
  quiltsandwich: { group: "Specialty", label: "Quilt sandwich (top, batting, backing)", needle: "Quilting 75/11 – 90/14", needleQuery: "quilting sewing machine needles 90/14", thread: "40 – 50 wt cotton or polyester quilting thread", stitch: "3.0 mm for straight-line quilting", foot: "Walking foot (straight lines) or free-motion foot with feed dogs down", tips: ["Start in the center and work outwards.", "Baste generously — spray, pins or thread."] },
  embroidery: { group: "Specialty", label: "Machine embroidery (any fabric + stabilizer)", needle: "Embroidery 75/11 – 90/14 (Ballpoint 75/11 on knits)", needleQuery: "embroidery machine needles 75/11", thread: "40 wt rayon or polyester embroidery thread; 60–90 wt bobbin thread", stitch: "Set by the design", foot: "Embroidery foot", tips: ["Cut-away stabilizer for knits, tear-away for stable wovens, wash-away for freestanding lace.", "Change the needle for every big project."] },
  metallic: { group: "Specialty", label: "Metallic or specialty thread", needle: "Metallic / Metafil 80/12 – 90/14", needleQuery: "metallic sewing machine needles 80/12", thread: "Metallic thread on the top, regular thread in the bobbin", stitch: "Slightly longer than usual; slow speed", foot: "As for the fabric", tips: ["Use a thread stand so the thread unwinds smoothly.", "Lower the top tension a little."] },
};

const groups = Array.from(new Set(Object.values(FABRICS).map((f) => f.group)));

export default function NeedleThreadSelector() {
  const [fabric, setFabric] = useState("quilting");
  const [task, setTask] = useState<"seams" | "topstitch">("seams");
  const r = FABRICS[fabric];

  return (
    <ToolFrame title="Needle & Thread Selector" badge={`${Object.keys(FABRICS).length} fabrics`}>
      <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <Field label="What fabric are you sewing?" htmlFor="nt-fabric">
          <select id="nt-fabric" value={fabric} onChange={(e) => setFabric(e.target.value)}
            className="h-12 w-full cursor-pointer rounded-lg border-2 border-line bg-white px-3 text-[1.05rem] outline-none focus:border-madder">
            {groups.map((g) => (
              <optgroup key={g} label={g}>
                {Object.entries(FABRICS).filter(([, f]) => f.group === g).map(([k, f]) => <option key={k} value={k}>{f.label}</option>)}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Sewing">
          <Choices name="task" value={task} onChange={setTask} options={[{ value: "seams", label: "Seams" }, { value: "topstitch", label: "Topstitching" }]} />
        </Field>
      </div>

      <ResultPanel title={`For ${r.label.toLowerCase()}`}>
        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            ["Needle", task === "topstitch" && !["embroidery", "metallic"].includes(fabric) ? `Topstitch needle, one size up from: ${r.needle}` : r.needle],
            ["Thread", task === "topstitch" ? "Topstitch / 30 wt thread on top, regular thread in the bobbin" : r.thread],
            ["Stitch length", task === "topstitch" ? "3.0 – 4.0 mm (longer looks neater)" : r.stitch],
            ["Presser foot", r.foot],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white p-4">
              <dt className="label-cond text-[0.8rem] text-madder">{k}</dt>
              <dd className="mt-1 font-bold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="label-cond text-[0.8rem] text-madder">Tension</p>
          <p className="mt-1 leading-snug">Start at your machine&apos;s default (often around 4), sew a test seam on a scrap of the same fabric, and adjust the top tension only.</p>
        </div>
        <ul className="mt-4 grid gap-2 text-[0.98rem] leading-snug">
          {r.tips.map((t) => <li key={t} className="flex gap-2"><span className="text-madder">●</span>{t}</li>)}
        </ul>
        <AffiliateLink query={r.needleQuery} variant="amazon" className="mt-5" track={`needle-${fabric}`}>Shop the right needles</AffiliateLink>
      </ResultPanel>
      <Note>Needle sizes are shown as European/US (e.g. 80/12) — the bigger the number, the thicker the needle. These are proven starting points; your machine manual always wins if it says otherwise.</Note>
    </ToolFrame>
  );
}
