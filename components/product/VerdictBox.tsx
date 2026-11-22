import type { ArticleFrontmatter, Product } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";
import { ScoreRing, scoreWord } from "../Score";
import { ProductImage } from "./ProductImage";

export function VerdictBox({ verdict, product }: { verdict: NonNullable<ArticleFrontmatter["verdict"]>; product?: Product }) {
  const score = product?.score;
  return (
    <section id="verdict" aria-label="Our verdict" className="not-prose my-8 scroll-mt-28 overflow-hidden rounded-2xl">
      <div className="weave p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="ribbon">Our verdict</span>
          {score !== undefined && (
            <div className="flex items-center gap-3">
              <span className="label-cond text-[0.95rem] text-[#9fd0a5]">{scoreWord(score)}</span>
              <ScoreRing score={score} size={70} label="" onDark />
            </div>
          )}
        </div>
        <p className="mt-5 font-serif text-[1.6rem] font-bold leading-snug text-white sm:text-[1.95rem]">{verdict.headline}</p>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-white/80">{verdict.summary}</p>
      </div>
      <div className="grid gap-px bg-line sm:grid-cols-2">
        {verdict.bestFor && (
          <div className="bg-sage-tint p-5"><p className="label-cond text-[0.9rem] text-sage">Buy it if</p><p className="mt-1">{verdict.bestFor}</p></div>
        )}
        {verdict.skipIf && (
          <div className="bg-madder-tint p-5"><p className="label-cond text-[0.9rem] text-madder">Skip it if</p><p className="mt-1">{verdict.skipIf}</p></div>
        )}
      </div>
      {product && (
        <div className="flex flex-wrap items-center gap-4 border border-t-0 border-line bg-white p-5 sm:rounded-b-2xl">
          <div className="w-20 shrink-0"><ProductImage product={product} small /></div>
          <p className="min-w-0 flex-1 font-serif text-[1.15rem] font-bold">{product.name}</p>
          <AffiliateLink asin={product.asin} query={product.amazonQuery || product.name} variant="amazon" className="w-full sm:w-auto" track="verdict">Check today&apos;s price</AffiliateLink>
        </div>
      )}
    </section>
  );
}
