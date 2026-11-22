import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ProductImage } from "./ProductImage";

/** Desktop: a real table. Mobile: stacked cards (no sideways scrolling). */
export function ComparisonTable({ products, columns }: { products: Product[]; columns?: string[] }) {
  if (!products.length) return null;
  const cols = columns ?? Array.from(new Set(products.flatMap((p) => Object.keys(p.specs ?? {})))).slice(0, products.some((p) => p.score !== undefined) ? 3 : 4);
  const hasScore = products.some((p) => p.score !== undefined);
  return (
    <section id="comparison" aria-labelledby="comparison-h" className="not-prose my-12 scroll-mt-28">
      <p className="kicker">Side by side</p>
      <h2 id="comparison-h" className="mb-5 font-serif text-[1.9rem]">Comparison table</h2>

      <div className="card hidden overflow-hidden md:block">
        <table className="w-full border-collapse text-left text-[0.97rem]">
          <thead className="weave text-white">
            <tr>
              <th scope="col" className="label-cond px-4 py-3 text-[0.9rem] font-bold">Machine</th>
              {hasScore && <th scope="col" className="label-cond px-3 py-3 text-center text-[0.9rem] font-bold">Score</th>}
              {cols.map((c) => <th key={c} scope="col" className="label-cond px-3 py-3 text-[0.9rem] font-bold">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p, i) => (
              <tr key={p.id} className={i === 0 ? "bg-madder-tint/50" : "bg-white"}>
                <th scope="row" className="min-w-[15rem] px-4 py-4 align-middle font-normal">
                  <div className="flex items-center gap-3">
                    <div className="w-14 shrink-0"><ProductImage product={p} small /></div>
                    <div className="leading-snug">
                      {p.badge && <span className="label-cond block text-[0.78rem] text-madder">{p.badge}</span>}
                      <a href={`#product-${p.id}`} className="block font-bold leading-snug text-ink no-underline hover:text-madder">{p.name}</a>
                      <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="amazon" className="mt-2 !min-h-[2.2rem] whitespace-nowrap !px-3 !text-[0.85rem]" track={`table-${p.id}`}>Check price</AffiliateLink>
                    </div>
                  </div>
                </th>
                {hasScore && (
                  <td className="px-3 py-4 text-center align-middle">
                    <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-ink font-cond text-[1.15rem] font-bold text-white">{p.score ?? "—"}</span>
                  </td>
                )}
                {cols.map((c) => <td key={c} className="px-3 py-4 align-middle">{p.specs?.[c] ?? "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="grid gap-4 md:hidden">
        {products.map((p, i) => (
          <li key={p.id} className={`card overflow-hidden ${i === 0 ? "ring-2 ring-madder" : ""}`}>
            <div className="flex items-center gap-3 border-b border-line p-4">
              <div className="w-16 shrink-0"><ProductImage product={p} small /></div>
              <div className="min-w-0 flex-1">
                {p.badge && <span className="label-cond block text-[0.78rem] text-madder">{p.badge}</span>}
                <a href={`#product-${p.id}`} className="font-bold leading-snug text-ink no-underline">{p.name}</a>
              </div>
              {p.score !== undefined && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-cond text-[1.15rem] font-bold text-white">{p.score}</span>}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 text-[0.98rem]">
              {cols.map((c) => (
                <div key={c}>
                  <dt className="text-[0.82rem] text-ink-mute">{c}</dt>
                  <dd className="font-semibold">{p.specs?.[c] ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="px-4 pb-4">
              <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="amazon" className="w-full" track={`table-m-${p.id}`}>Check price on Amazon</AffiliateLink>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
