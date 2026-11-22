import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ProductImage } from "./ProductImage";

/**
 * Desktop: a real table. Mobile: stacked cards (no sideways scrolling).
 * Columns = the union of spec keys (first 4) from the products' frontmatter, or `columns` if given.
 */
export function ComparisonTable({ products, columns }: { products: Product[]; columns?: string[] }) {
  if (!products.length) return null;
  const cols = columns ?? Array.from(new Set(products.flatMap((p) => Object.keys(p.specs ?? {})))).slice(0, 4);
  return (
    <section id="comparison" aria-labelledby="comparison-h" className="not-prose my-12 scroll-mt-24">
      <h2 id="comparison-h" className="mb-4 font-serif text-[1.6rem]">Side-by-side comparison</h2>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border-2 border-ink md:block">
        <table className="w-full border-collapse text-left text-[0.98rem]">
          <thead className="bg-ink text-paper">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Machine</th>
              {cols.map((c) => (
                <th key={c} scope="col" className="px-3 py-3 font-bold">{c}</th>
              ))}
              <th scope="col" className="px-4 py-3"><span className="sr-only">Buy</span></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} className={i % 2 ? "bg-linen/60" : "bg-paper"}>
                <th scope="row" className="px-4 py-4 align-middle font-normal">
                  <div className="flex items-center gap-3">
                    <div className="w-14 shrink-0"><ProductImage product={p} className="!p-1" /></div>
                    <div>
                      {p.badge && <span className="block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-madder">{p.badge}</span>}
                      <a href={`#product-${p.id}`} className="font-bold text-ink no-underline hover:text-madder">{p.name}</a>
                    </div>
                  </div>
                </th>
                {cols.map((c) => (
                  <td key={c} className="px-3 py-4 align-middle">{p.specs?.[c] ?? "—"}</td>
                ))}
                <td className="px-4 py-4 text-right align-middle">
                  <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="button" className="!min-h-[2.5rem] whitespace-nowrap !px-4 !text-[0.9rem]" track={`table-${p.id}`}>
                    Check price
                  </AffiliateLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ol className="grid gap-4 md:hidden">
        {products.map((p, i) => (
          <li key={p.id} className="rounded-xl border-2 border-ink bg-paper">
            <div className="flex items-center gap-3 border-b border-line p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-serif text-paper">{i + 1}</span>
              <div className="w-14 shrink-0"><ProductImage product={p} className="!p-1" /></div>
              <div className="min-w-0">
                {p.badge && <span className="block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-madder">{p.badge}</span>}
                <a href={`#product-${p.id}`} className="font-bold leading-snug text-ink no-underline">{p.name}</a>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 text-[0.98rem]">
              {cols.map((c) => (
                <div key={c}>
                  <dt className="text-[0.82rem] text-ink-mute">{c}</dt>
                  <dd className="font-bold">{p.specs?.[c] ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="px-4 pb-4">
              <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="button" className="w-full" track={`table-m-${p.id}`}>
                Check price on Amazon
              </AffiliateLink>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
