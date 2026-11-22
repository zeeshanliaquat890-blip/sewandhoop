import type { ReactNode } from "react";
import type { Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { Stars } from "../Icons";
import { ProductImage } from "./ProductImage";
import { ProsCons } from "./ProsCons";
import { SpecsTable } from "./SpecsTable";

/**
 * Full product block used in roundups. Data comes from the article frontmatter (`products:`),
 * the long write-up comes from the MDX children:
 *   <ProductBox id="model-a">Your review text...</ProductBox>
 */
export function ProductBox({ product, rank, children }: { product: Product; rank?: number; children?: ReactNode }) {
  return (
    <section id={`product-${product.id}`} className="not-prose patch my-12 scroll-mt-24 p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        {rank !== undefined && (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-serif text-lg text-paper" aria-hidden="true">{rank}</span>
        )}
        {product.badge && <span className="woven-label">{product.badge}</span>}
      </div>
      <h3 className="mt-3 font-serif text-[1.75rem] leading-tight sm:text-[2rem]">{product.name}</h3>
      {product.bestFor && (
        <p className="mt-1 text-[1.02rem] text-ink-soft"><strong className="text-ink">Best for:</strong> {product.bestFor}</p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr]">
        <div className="grid content-start gap-4">
          <ProductImage product={product} className="mx-auto max-w-[15rem]" />
          {product.rating && <Stars rating={product.rating} />}
          <AffiliateLink asin={product.asin} query={product.amazonQuery || product.name} variant="button" className="w-full" track={`box-${product.id}`} />
          {product.priceRange && <p className="-mt-1 text-center text-sm text-ink-mute">Typical price: {product.priceRange}</p>}
        </div>
        <div className="grid content-start gap-5">
          {product.summary && <p className="text-[1.08rem] leading-relaxed">{product.summary}</p>}
          <ProsCons pros={product.pros} cons={product.cons} />
          <SpecsTable specs={product.specs} />
        </div>
      </div>

      {children && <div className="prose-sew mt-6 border-t border-dashed border-line pt-6">{children}</div>}
    </section>
  );
}
