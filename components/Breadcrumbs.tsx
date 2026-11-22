import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.92rem]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-mute">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.url} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="line-clamp-1 text-ink-soft">{it.name}</span>
              ) : (
                <>
                  <Link href={it.url} className="font-bold text-ink-soft no-underline hover:text-madder">{it.name}</Link>
                  <span aria-hidden="true" className="text-madder">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
