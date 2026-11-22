import type { ReactNode } from "react";
import claimsData from "@/data/claims.json";
import insightsData from "@/data/insights.json";
import { IconCheck, IconX } from "./Icons";

const CLAIMS = claimsData as Record<string, { status: string; sourceUrl: string }>;
const INSIGHTS = insightsData as Record<string, { frequency: string }>;

/**
 * <Cite id="C0012" /> — ties the figure just before it to a row in the claim ledger.
 * Renders nothing; the id stays in the MDX source for the audit. An unknown id fails the build,
 * so a page can never cite a fact that isn't in the ledger.
 */
export function Cite({ id }: { id: string }) {
  if (!CLAIMS[id]) throw new Error(`Cite: unknown claim id "${id}" — add it to product-master/claim-ledger.csv and run scripts/build_data.py`);
  return null;
}

/** <Owners id="R0007">Several owners describe…</Owners> — an owner-reported pattern from review-insights.csv. */
export function Owners({ id, children }: { id: string; children: ReactNode }) {
  if (!INSIGHTS[id]) throw new Error(`Owners: unknown insight id "${id}" — add it to product-master/review-insights.csv`);
  return <span className="decoration-ink-mute/50 underline decoration-dotted underline-offset-4">{children}</span>;
}

/** The short answer, at the top of buying guides and reviews. */
export function KeyTakeaways({ points, title = "The short answer" }: { points: string[]; title?: string }) {
  return (
    <aside className="not-prose my-8 overflow-hidden rounded-2xl border-2 border-ink">
      <p className="label-cond bg-ink px-5 py-2.5 text-[0.95rem] text-white">{title}</p>
      <ul className="grid gap-3 bg-cream p-5">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-[1.04rem] leading-snug">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-madder" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Final recommendation: <Verdict buyIf="…" skipIf="…">Text…</Verdict> */
export function Verdict({ buyIf, skipIf, title = "Our verdict", children }: { buyIf?: string; skipIf?: string; title?: string; children?: ReactNode }) {
  return (
    <section className="not-prose my-12 overflow-hidden rounded-2xl border border-line">
      <div className="weave p-6 text-white sm:p-7">
        <span className="ribbon">{title}</span>
        {children && <div className="mt-4 text-[1.08rem] leading-relaxed text-white/90 [&_a]:text-[#ffd9cf] [&_p+p]:mt-3">{children}</div>}
      </div>
      {(buyIf || skipIf) && (
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {buyIf && <div className="flex gap-3 bg-sage-tint p-5"><IconCheck className="mt-1 shrink-0 text-sage" /><div><p className="label-cond text-[0.9rem] text-sage">Buy it if</p><p className="mt-1">{buyIf}</p></div></div>}
          {skipIf && <div className="flex gap-3 bg-madder-tint p-5"><IconX className="mt-1 shrink-0 text-madder" /><div><p className="label-cond text-[0.9rem] text-madder">Skip it if</p><p className="mt-1">{skipIf}</p></div></div>}
        </div>
      )}
    </section>
  );
}

/** "Buy this if / skip this if" pair at the end of each product section. */
export function BuySkip({ buy, skip }: { buy: string; skip: string }) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      <p className="rounded-xl bg-sage-tint p-4 text-[1rem] leading-snug"><strong className="label-cond block text-[0.85rem] text-sage">Buy this if</strong>{buy}</p>
      <p className="rounded-xl bg-madder-tint p-4 text-[1rem] leading-snug"><strong className="label-cond block text-[0.85rem] text-madder">Skip this if</strong>{skip}</p>
    </div>
  );
}
