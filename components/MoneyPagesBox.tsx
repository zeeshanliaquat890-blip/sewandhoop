import Link from "next/link";
import type { Article } from "@/lib/content";
import { getSilo } from "@/lib/content";
import { IconArrow, SiloIcon } from "./Icons";

/**
 * Shown under every informational article: sends readers (and link equity) to the
 * commercial pages of the same silo. Falls back to the hub if none are published yet.
 */
export function MoneyPagesBox({ silo, articles }: { silo: string; articles: Article[] }) {
  const s = getSilo(silo);
  if (!s) return null;
  return (
    <aside aria-labelledby="machines-box" className="not-prose patch my-14 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <SiloIcon name={s.icon} size={34} className="text-ink" />
        <div>
          <p className="kicker">Ready to choose a machine?</p>
          <h2 id="machines-box" className="font-serif text-[1.5rem] leading-tight">Related machine guides</h2>
        </div>
      </div>
      <ul className="mt-5 grid gap-2">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={a.url} className="flex items-center justify-between gap-3 rounded-lg bg-paper px-4 py-3.5 font-bold text-ink no-underline hover:text-madder">
              <span>{a.fm.title}</span>
              <IconArrow className="shrink-0 text-madder" />
            </Link>
          </li>
        ))}
        <li>
          <Link href={`/${s.slug}/`} className="flex items-center justify-between gap-3 rounded-lg px-4 py-3 font-bold no-underline">
            <span>All {s.name.toLowerCase()} guides</span>
            <IconArrow className="shrink-0" />
          </Link>
        </li>
      </ul>
    </aside>
  );
}
