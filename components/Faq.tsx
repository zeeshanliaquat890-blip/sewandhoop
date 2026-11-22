import type { Faq as FaqT } from "@/lib/content";

/** Accordion built on <details> — zero JavaScript. */
export function Faq({ items, title = "Frequently asked questions" }: { items: FaqT[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="faq" className="not-prose my-14">
      <h2 id="faq" className="font-serif text-[1.85rem]">{title}</h2>
      <div className="mt-5 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[1.1rem] font-bold leading-snug [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pr-10 text-[1.05rem] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
