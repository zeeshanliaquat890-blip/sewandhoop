import Link from "next/link";
import type { Article } from "@/lib/content";
import { getSilo } from "@/lib/content";
import { IconArrow, SiloIcon } from "./Icons";

/** Under every informational article: sends readers (and link equity) to the commercial pages of the same silo. */
export function MoneyPagesBox({ silo, articles }: { silo: string; articles: Article[] }) {
  const s = getSilo(silo);
  if (!s) return null;
  return (
    <aside aria-labelledby="machines-box" className="not-prose my-14 overflow-hidden rounded-2xl border border-line">
      <div className="weave flex items-center gap-4 p-6 text-white">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10"><SiloIcon name={s.icon} size={32} /></span>
        <div>
          <p className="label-cond text-[0.85rem] text-[#e9a796]">Ready to choose a machine?</p>
          <h2 id="machines-box" className="font-serif text-[1.45rem] font-bold leading-tight text-white">Our {s.name.toLowerCase()} buying guides</h2>
        </div>
      </div>
      <ul className="divide-y divide-line bg-white">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={a.url} className="flex items-center justify-between gap-3 px-6 py-4 font-bold text-ink no-underline hover:bg-cream hover:text-madder">
              <span>{a.fm.title}</span>
              <IconArrow className="shrink-0 text-madder" />
            </Link>
          </li>
        ))}
        <li>
          <Link href={`/${s.slug}/`} className="flex items-center justify-between gap-3 bg-cream px-6 py-3.5 font-bold no-underline">
            <span>All {s.name.toLowerCase()} guides</span>
            <IconArrow className="shrink-0" />
          </Link>
        </li>
      </ul>
    </aside>
  );
}
