import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ProductImage } from "./ProductImage";

/** "Our quick picks" — every product that has a `badge` in the frontmatter, max 4. */
export function QuickPicks({ products }: { products: Product[] }) {
  const picks = products.filter((p) => p.badge).slice(0, 4);
  if (!picks.length) return null;
  return (
    <section aria-labelledby="quick-picks" className="not-prose my-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 id="quick-picks" className="font-serif text-[1.6rem]">Our quick picks</h2>
        <a href="#comparison" className="text-[0.95rem] font-bold">Compare all</a>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {picks.map((p) => (
          <li key={p.id} className="relative flex gap-4 rounded-xl border-2 border-ink bg-paper p-4 shadow-[4px_4px_0_0_#26221e]">
            <div className="w-24 shrink-0 sm:w-28">
              <ProductImage product={p} className="!p-1.5" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="woven-label self-start !text-[0.66rem]">{p.badge}</span>
              <a href={`#product-${p.id}`} className="mt-2 font-serif text-[1.18rem] leading-snug text-ink no-underline hover:text-madder">{p.name}</a>
              {p.bestFor && <p className="mt-1 line-clamp-2 text-[0.92rem] leading-snug text-ink-soft">{p.bestFor}</p>}
              <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="button" className="mt-3 !min-h-[2.6rem] !px-4 !text-[0.92rem]" track={`quickpick-${p.id}`}>
                See on Amazon
              </AffiliateLink>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
