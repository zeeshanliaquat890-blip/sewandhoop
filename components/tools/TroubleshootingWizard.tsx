"use client";

import { useState } from "react";
import { AffiliateLink } from "../AffiliateLink";
import { ToolFrame, GuideLink, Note, type ToolCtx } from "./ui";

type Step = { t: string; d: string };
type Symptom = { id: string; label: string; sub: string; steps: Step[]; guide?: { slug: string; label: string }; shop?: { q: string; label: string } };

const UNPLUG = "Switch off and unplug the machine first.";

const SYMPTOMS: Symptom[] = [
  {
    id: "nest", label: "Thread bunching underneath", sub: "A tangle or \"bird's nest\" under the fabric",
    steps: [
      { t: "Rethread the top thread with the presser foot UP", d: "This is the cause most of the time. With the foot down, the tension discs are closed and the thread can't seat between them, so there's no top tension and the thread piles up underneath. Raise the foot, remove the top thread completely and thread it again." },
      { t: "Check the thread goes through the take-up lever", d: "Turn the hand wheel toward you until the take-up lever is at its highest point, then make sure the thread passes through its eye." },
      { t: "Hold both thread tails for the first few stitches", d: "Pull the top and bobbin threads behind the presser foot and hold them lightly for the first 2–3 stitches." },
      { t: "Re-insert the bobbin", d: "Check the bobbin turns the direction shown in your manual and that the thread is pulled into the bobbin tension slot." },
      { t: "Lower the presser foot before you sew", d: "Sewing with the foot up is the other common way to get a nest." },
    ],
    guide: { slug: "why-does-my-sewing-machine-keep-jamming", label: "Why does my sewing machine keep jamming?" },
  },
  {
    id: "skip", label: "Skipped stitches", sub: "Gaps where stitches are missing",
    steps: [
      { t: "Put in a new needle", d: "A slightly bent or dull needle is the number-one cause. Needles are cheap — change it first." },
      { t: "Use the right needle type", d: "Knits need a Ballpoint/Jersey needle, spandex needs a Stretch needle, and thick fabric needs a Jeans needle. A Universal needle often skips on stretchy fabric." },
      { t: "Check the needle is fully up and facing the right way", d: `${UNPLUG} Loosen the clamp, push the needle up as far as it goes, with the flat side facing the direction your manual shows, then tighten.` },
      { t: "Rethread top and bobbin", d: "Rethread with the presser foot up, then re-insert the bobbin." },
      { t: "Clean the bobbin area", d: `${UNPLUG} Remove the needle plate and brush out lint around the feed dogs and hook.` },
    ],
    shop: { q: "sewing machine needles assorted", label: "Shop assorted needles" },
  },
  {
    id: "break", label: "Top thread keeps breaking", sub: "Snaps or shreds while sewing",
    steps: [
      { t: "Rethread the whole top path", d: "Raise the presser foot and rethread. A thread that skipped a guide gets extra drag and snaps." },
      { t: "Check the spool", d: "Use the right size spool cap and make sure the thread isn't catching on the notch in the spool's end. Cross-wound spools often unwind better from a vertical pin." },
      { t: "Put in a new needle in the right size", d: "Thick thread through a small needle eye shreds. Go up a size (e.g. from 70/10 to 80/12) or use a Topstitch needle for heavy thread." },
      { t: "Lower the top tension slightly", d: "Turn the tension dial down one number and test on a scrap." },
      { t: "Try fresh thread", d: "Old or cheap thread gets brittle. Good polyester all-purpose thread is a reliable test." },
    ],
  },
  {
    id: "needle", label: "Needles keep breaking", sub: "Snapping or bending",
    steps: [
      { t: "Stop pulling the fabric", d: "Pulling or pushing the fabric bends the needle into the plate. Let the feed dogs move it; just guide." },
      { t: "Use a thicker needle", d: "Use 90/14 or larger for denim and canvas — thin needles deflect and break." },
      { t: "Remove pins before they reach the needle", d: "Sewing over pins is a classic needle breaker." },
      { t: "Check the foot and stitch match", d: "Zigzag or a twin needle with a straight-stitch foot or straight-stitch plate will hit the foot. Use the all-purpose foot." },
      { t: "Tighten the needle clamp", d: `${UNPLUG} Make sure the needle is pushed all the way up and the clamp screw is tight.` },
    ],
    shop: { q: "heavy duty sewing machine needles 100/16", label: "Shop heavy-duty needles" },
  },
  {
    id: "feed", label: "Fabric won't move", sub: "Stitches pile up in one place",
    steps: [
      { t: "Check the stitch length isn't 0", d: "Set it to around 2.5." },
      { t: "Raise the feed dogs", d: "If you did free-motion quilting or darning, the feed dogs may still be lowered. Raise them, then turn the hand wheel one full turn." },
      { t: "Lower the presser foot", d: "Without foot pressure, the feed dogs can't grip the fabric." },
      { t: "Clean lint from the feed dogs", d: `${UNPLUG} Remove the needle plate and brush out packed lint between the teeth.` },
      { t: "Use a walking foot for sticky or thick layers", d: "Vinyl, leather, many layers and quilts can need a walking or Teflon foot." },
    ],
  },
  {
    id: "loops", label: "Loops or loose stitches", sub: "Loops on the bottom or the top of the fabric",
    steps: [
      { t: "Loops on the BOTTOM → fix the top thread", d: "Loops underneath mean the top thread has no tension. Rethread the top with the presser foot up, then test. If it's still loose, raise the top tension a little." },
      { t: "Bobbin thread showing on TOP → lower top tension", d: "If you can see bobbin thread dots on top, the top tension is too tight. Turn the dial down one number at a time." },
      { t: "Re-seat the bobbin", d: "Make sure the bobbin thread is clicked into the tension spring of the bobbin case." },
      { t: "Use the same thread weight top and bottom", d: "Different weights pull unevenly." },
      { t: "Adjust bobbin tension only as a last step", d: "Only if your manual says it's user-adjustable — and turn the screw by tiny amounts." },
    ],
    guide: { slug: "bobbin-thread-showing-on-top", label: "Bobbin thread showing on top: the fix" },
  },
  {
    id: "pucker", label: "Puckered seams", sub: "Fabric gathers or ripples along the seam",
    steps: [
      { t: "Lower the top tension", d: "Too-tight thread draws the fabric up. Turn it down one number and test." },
      { t: "Shorten the stitch length on thin fabric", d: "Try 2.0 mm on lightweight fabric." },
      { t: "Use a finer needle and thread", d: "A 70/10 Microtex needle and lighter thread for sheers and shirting." },
      { t: "Support the fabric", d: "Put tissue paper or tear-away stabilizer underneath on very thin fabric." },
      { t: "Don't stretch the fabric while sewing", d: "Let the feed dogs pull it through evenly." },
    ],
  },
  {
    id: "jam", label: "Machine is stuck or noisy", sub: "Hand wheel won't turn, or grinding / clunking",
    steps: [
      { t: "Unplug and remove the fabric gently", d: `${UNPLUG} Cut the threads and lift the fabric out — don't yank it.` },
      { t: "Take out the bobbin and bobbin case", d: "Remove the needle plate if your manual shows how." },
      { t: "Clear thread and lint from the hook area", d: "Look for thread wrapped around the hook or stuck under the plate. Use tweezers and a brush." },
      { t: "Turn the hand wheel TOWARD you only", d: "Turning it backwards can make a jam worse." },
      { t: "Oil only if your manual says so", d: "Many modern machines are sealed. If yours needs oil, use sewing machine oil only — never household oil." },
    ],
    shop: { q: "sewing machine oil", label: "Shop sewing machine oil" },
  },
  {
    id: "motor", label: "Motor runs but needle doesn't move", sub: "You hear it, but nothing sews",
    steps: [
      { t: "Disengage the bobbin winder", d: "Most machines stop the needle while the bobbin winder spindle is pushed across. Push it back." },
      { t: "Tighten the hand-wheel clutch", d: "On older machines, the small inner knob of the hand wheel releases the needle for bobbin winding. Turn it toward you to tighten." },
      { t: "Check the needle isn't jammed", d: `${UNPLUG} Look for a thread jam in the bobbin area (see 'Machine is stuck').` },
    ],
  },
  {
    id: "power", label: "Won't turn on or won't start", sub: "No lights, or nothing happens",
    steps: [
      { t: "Check every connection", d: "Power cord into the wall and the machine, foot pedal cord fully pushed in. Try another outlet." },
      { t: "Lower the presser foot", d: "Many computerized machines won't sew with the foot up — check the screen for a message." },
      { t: "Check the buttonhole lever and bobbin winder", d: "A raised buttonhole lever or an engaged winder can block sewing in some modes." },
      { t: "Let it cool down", d: "If it stopped after long sewing, the motor's overheat protection may have tripped. Wait 15–20 minutes." },
    ],
  },
];

export default function TroubleshootingWizard({ ctx }: { ctx?: ToolCtx }) {
  const [sid, setSid] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [all, setAll] = useState(false);
  const s = SYMPTOMS.find((x) => x.id === sid);
  const reset = () => { setSid(null); setI(0); setFixed(false); setAll(false); };

  return (
    <ToolFrame title="Troubleshooting Wizard" badge={s ? `Step ${Math.min(i + 1, s.steps.length)} of ${s.steps.length}` : `${SYMPTOMS.length} common problems`}>
      {!s && (
        <>
          <p className="font-serif text-[1.4rem] font-bold">What&apos;s going wrong?</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {SYMPTOMS.map((x) => (
              <button key={x.id} type="button" onClick={() => { setSid(x.id); setI(0); setFixed(false); }} className="rounded-xl border-2 border-line bg-white px-4 py-3 text-left hover:border-madder hover:bg-madder-tint">
                <span className="block font-bold">{x.label}</span>
                <span className="block text-[0.88rem] text-ink-mute">{x.sub}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {s && !fixed && i < s.steps.length && !all && (
        <div aria-live="polite">
          <p className="label-cond text-[0.85rem] text-madder">{s.label}</p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {s.steps.map((_, k) => <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-madder" : "bg-linen-deep"}`} />)}
          </div>
          <div className="mt-5 flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-madder font-cond text-[1.4rem] font-bold text-madder">{i + 1}</span>
            <div>
              <p className="font-serif text-[1.35rem] font-bold leading-snug">{s.steps[i].t}</p>
              <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-soft">{s.steps[i].d}</p>
            </div>
          </div>
          <p className="mt-6 font-bold">Sew a test seam on a scrap. Did that fix it?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => setFixed(true)} className="btn bg-sage text-white hover:bg-[#335a39]">Yes, it&apos;s fixed</button>
            <button type="button" onClick={() => setI((k) => k + 1)} className="btn btn-ghost">No, still happening</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
            <button type="button" onClick={reset} className="font-bold text-ink-soft underline underline-offset-4">← Different problem</button>
            <button type="button" onClick={() => setAll(true)} className="font-bold text-ink-soft underline underline-offset-4">Show all steps</button>
          </div>
        </div>
      )}

      {s && all && !fixed && (
        <div>
          <p className="font-serif text-[1.35rem] font-bold">{s.label}: all fixes, most likely first</p>
          <ol className="mt-4 grid gap-3">
            {s.steps.map((st, k) => (
              <li key={st.t} className="flex gap-3 rounded-lg bg-cream p-4"><span className="font-cond text-[1.3rem] font-bold text-madder">{k + 1}</span><span><strong>{st.t}.</strong> <span className="text-ink-soft">{st.d}</span></span></li>
            ))}
          </ol>
          <button type="button" onClick={reset} className="mt-4 font-bold text-ink-soft underline underline-offset-4">← Different problem</button>
        </div>
      )}

      {s && fixed && (
        <div className="rounded-xl bg-sage-tint p-5">
          <p className="font-serif text-[1.4rem] font-bold text-sage">Great — happy sewing!</p>
          <p className="mt-1 text-ink-soft">Tip: most problems come back when a needle gets old. Change it every 8 hours of sewing or at the start of each big project.</p>
          {s.shop && <AffiliateLink query={s.shop.q} variant="amazon" className="mt-4" track={`wizard-${s.id}`}>{s.shop.label}</AffiliateLink>}
          <button type="button" onClick={reset} className="mt-4 block font-bold text-ink-soft underline underline-offset-4">Fix another problem</button>
        </div>
      )}

      {s && !fixed && !all && i >= s.steps.length && (
        <div className="rounded-xl bg-madder-tint p-5">
          <p className="font-serif text-[1.4rem] font-bold text-madder-deep">Time for a professional look</p>
          <p className="mt-1 text-ink-soft">If none of these worked, the timing or an internal part may need adjusting. A service technician can usually fix it quickly — and a yearly service keeps a machine running for decades.</p>
          <p className="mt-3">→ <GuideLink ctx={ctx} slug="where-to-get-sewing-machine-serviced" fallback="/troubleshooting/">Where to get a sewing machine serviced</GuideLink></p>
          <button type="button" onClick={reset} className="mt-4 font-bold text-ink-soft underline underline-offset-4">← Start again</button>
        </div>
      )}

      {s?.guide && <p className="mt-5 text-[0.98rem]">Read more: <GuideLink ctx={ctx} slug={s.guide.slug} fallback="/troubleshooting/">{s.guide.label}</GuideLink></p>}
      <Note>Always check your machine&apos;s manual — threading paths, needle direction and oiling points differ between models.</Note>
    </ToolFrame>
  );
}
