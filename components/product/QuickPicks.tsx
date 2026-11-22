import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ScoreRing } from "../Score";
import { ProductImage } from "./ProductImage";

/** "Our top picks" — every product with a `badge` in the frontmatter, max 4. */
export function QuickPicks({ products }: { products: Product[] }) {
  const picks = products.filter((p) => p.badge).slice(0, 4);
  if (!picks.length) return null;
  return (
    <section id="quick-picks" aria-labelledby="quick-picks-h" className="not-prose my-10 scroll-mt-28">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="kicker">The short version</p>
          <h2 id="quick-picks-h" className="font-serif text-[1.9rem]">Our top picks</h2>
        </div>
        <a href="#comparison" className="hidden text-[0.95rem] font-bold sm:inline">Compare all ↓</a>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {picks.map((p, i) => (
          <li key={p.id} className={`card relative flex flex-col overflow-hidden ${i === 0 ? "ring-2 ring-madder" : ""}`}>
            <div className="flex items-center justify-between gap-2 px-4 pt-4">
              <span className={`ribbon ${i === 0 ? "" : "ribbon-ink"}`}>{p.badge}</span>
              {p.score !== undefined && <ScoreRing score={p.score} size={54} label="" />}
            </div>
            <div className="flex gap-4 px-4 pt-3">
              <div className="w-24 shrink-0"><ProductImage product={p} small /></div>
              <div className="min-w-0">
                <a href={`#product-${p.id}`} className="font-serif text-[1.2rem] font-bold leading-snug text-ink no-underline hover:text-madder">{p.name}</a>
                {p.bestFor && <p className="mt-1 text-[0.93rem] leading-snug text-ink-soft">{p.bestFor}</p>}
              </div>
            </div>
            <div className="mt-auto grid gap-2 p-4 pt-4">
              <AffiliateLink asin={p.asin} query={p.amazonQuery || p.name} variant="amazon" className="!min-h-[2.75rem] !text-[0.95rem]" track={`quickpick-${p.id}`}>
                Check price on Amazon
              </AffiliateLink>
              <a href={`#product-${p.id}`} className="text-center text-[0.9rem] font-bold no-underline">Read our review ↓</a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
