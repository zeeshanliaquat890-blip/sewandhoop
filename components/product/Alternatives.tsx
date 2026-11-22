import Link from "next/link";
import type { ArticleFrontmatter } from "@/lib/content";
import { AffiliateLink } from "../AffiliateLink";

export function Alternatives({ items }: { items: NonNullable<ArticleFrontmatter["alternatives"]> }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="alternatives" className="not-prose my-12 scroll-mt-28" id="alternatives-wrap">
      <h2 id="alternatives" className="scroll-mt-28 font-serif text-[1.9rem]">Alternatives worth a look</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((a) => (
          <li key={a.name} className="card flex flex-col p-5">
            <p className="font-serif text-[1.25rem] leading-snug">{a.name}</p>
            <p className="mt-2 flex-1 text-[1rem] leading-relaxed text-ink-soft">{a.why}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(a.asin || a.amazonQuery) && (
                <AffiliateLink asin={a.asin} query={a.amazonQuery} variant="amazon" className="!min-h-[2.6rem] !text-[0.92rem]" track="alternative">Check price</AffiliateLink>
              )}
              {a.href && <Link href={a.href} className="btn btn-ghost !min-h-[2.6rem] !text-[0.92rem]">Read review</Link>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
