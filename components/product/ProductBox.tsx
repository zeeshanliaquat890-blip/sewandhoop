import type { ReactNode } from "react";
import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ScoreRing, ScoreBars, scoreWord } from "../Score";
import { ProductImage } from "./ProductImage";
import { ProsCons } from "./ProsCons";
import { SpecsTable } from "./SpecsTable";

/**
 * Full product review block used in roundups. Data comes from frontmatter (`products:`),
 * the long write-up from the MDX children:  <ProductBox id="model-a">Review…</ProductBox>
 */
export function ProductBox({ product, rank, children }: { product: Product; rank?: number; children?: ReactNode }) {
  return (
    <section id={`product-${product.id}`} className="not-prose card my-14 scroll-mt-28 overflow-hidden">
      {/* header strip */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-cream px-5 py-3 sm:px-7">
        {rank !== undefined && <span className="font-cond text-[1.5rem] font-bold leading-none text-madder">#{rank}</span>}
        {product.badge && <span className="ribbon">{product.badge}</span>}
        {product.priceRange && <span className="ml-auto label-cond text-[0.85rem] text-ink-mute">Price range: <span className="text-ink">{product.priceRange}</span></span>}
      </div>

      <div className="grid gap-7 p-5 sm:p-7 md:grid-cols-[17rem_1fr]">
        <div className="grid content-start gap-4">
          <ProductImage product={product} className="mx-auto max-w-[17rem]" />
          <AffiliateLink asin={product.asin} query={product.amazonQuery || product.name} variant="amazon" className="w-full" track={`box-${product.id}`} />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[1.7rem] leading-tight sm:text-[2rem]">{product.name}</h3>
          {product.bestFor && <p className="mt-1.5 text-[1.02rem] text-ink-soft"><strong className="text-ink">Best for:</strong> {product.bestFor}</p>}
          {product.score !== undefined && (
            <div className="mt-5 grid items-center gap-5 rounded-xl border border-line p-4 sm:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                <ScoreRing score={product.score} size={84} />
                <span className="label-cond text-[0.9rem] text-sage sm:mt-1">{scoreWord(product.score)}</span>
              </div>
              <ScoreBars scores={product.scores} />
            </div>
          )}
          {product.summary && <p className="mt-5 text-[1.08rem] leading-relaxed">{product.summary}</p>}
        </div>
      </div>

      <div className="grid gap-5 px-5 pb-6 sm:px-7 md:grid-cols-2">
        <div className="md:col-span-2"><ProsCons pros={product.pros} cons={product.cons} /></div>
        {product.specs && <div className="md:col-span-2"><SpecsTable specs={product.specs} columns /></div>}
      </div>

      {children && <div className="prose-sew border-t border-line px-5 py-6 sm:px-7">{children}</div>}
    </section>
  );
}
