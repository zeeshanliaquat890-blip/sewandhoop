import type { ArticleFrontmatter, Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { Stars } from "../Icons";
import { ProductImage } from "./ProductImage";

export function VerdictBox({ verdict, product }: { verdict: NonNullable<ArticleFrontmatter["verdict"]>; product?: Product }) {
  return (
    <section aria-label="Our verdict" className="not-prose patch patch-madder my-8 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="woven-label">Our verdict</span>
        {verdict.rating && <Stars rating={verdict.rating} />}
      </div>
      <div className={`mt-4 grid gap-6 ${product ? "sm:grid-cols-[10rem_1fr]" : ""}`}>
        {product && <ProductImage product={product} />}
        <div>
          <p className="font-serif text-[1.6rem] leading-snug sm:text-[1.85rem]">{verdict.headline}</p>
          <p className="mt-3 text-[1.08rem] leading-relaxed text-ink-soft">{verdict.summary}</p>
          {(verdict.bestFor || verdict.skipIf) && (
            <dl className="mt-4 grid gap-3 text-[1rem] sm:grid-cols-2">
              {verdict.bestFor && (
                <div className="rounded-lg bg-paper p-3"><dt className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#3d6b3a]">Buy it if</dt><dd className="mt-1">{verdict.bestFor}</dd></div>
              )}
              {verdict.skipIf && (
                <div className="rounded-lg bg-paper p-3"><dt className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-madder">Skip it if</dt><dd className="mt-1">{verdict.skipIf}</dd></div>
              )}
            </dl>
          )}
          {product && (
            <AffiliateLink asin={product.asin} query={product.amazonQuery || product.name} variant="button" className="mt-5" track="verdict">
              Check today&apos;s price
            </AffiliateLink>
          )}
        </div>
      </div>
    </section>
  );
}
