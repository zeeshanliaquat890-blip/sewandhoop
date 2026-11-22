import type { Heading } from "@/lib/content";

function List({ headings }: { headings: Heading[] }) {
  return (
    <ol className="grid gap-1.5 text-[0.98rem] leading-snug">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a href={`#${h.id}`} className={`block border-l-2 border-transparent py-1 pl-3 no-underline hover:border-madder hover:text-madder ${h.depth === 3 ? "text-ink-mute" : "text-ink-soft"}`}>
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Mobile: collapsible box above the article. */
export function TocMobile({ headings }: { headings: Heading[] }) {
  const h2 = headings.filter((h) => h.depth === 2);
  if (h2.length < 2) return null;
  return (
    <details className="group my-6 rounded-xl border border-line bg-linen lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 font-bold [&::-webkit-details-marker]:hidden">
        In this guide
        <span aria-hidden="true" className="text-madder transition-transform group-open:rotate-180">▾</span>
      </summary>
      <nav aria-label="Table of contents" className="border-t border-line px-2 py-3">
        <List headings={h2} />
      </nav>
    </details>
  );
}

/** Desktop: sticky in the side column. */
export function TocDesktop({ headings }: { headings: Heading[] }) {
  if (headings.filter((h) => h.depth === 2).length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block">
      <p className="kicker mb-3">In this guide</p>
      <List headings={headings} />
    </nav>
  );
}
