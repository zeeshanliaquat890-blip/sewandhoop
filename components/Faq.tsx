import type { Faq as FaqT } from "@/lib/content";

/** Accordion built on <details> — zero JavaScript. */
export function Faq({ items, title = "Frequently asked questions" }: { items: FaqT[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <section id="faq" aria-labelledby="faq-h" className="not-prose my-14 scroll-mt-28">
      <p className="kicker">FAQ</p>
      <h2 id="faq-h" className="font-serif text-[1.9rem]">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((f, i) => (
          <details key={f.q} className="group card !rounded-xl" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-[1.08rem] font-bold leading-snug [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-lg leading-none text-madder transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="border-t border-line px-5 pb-5 pt-4 text-[1.04rem] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
