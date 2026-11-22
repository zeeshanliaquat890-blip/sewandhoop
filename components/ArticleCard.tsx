import Link from "next/link";
import type { Article } from "@/lib/content";
import { getSilo, templateLabel } from "@/lib/content";
import { SiloIcon, IconArrow } from "./Icons";

export function ArticleCard({ article, showSilo = true }: { article: Article; showSilo?: boolean }) {
  const silo = getSilo(article.silo);
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-ink">
      <div className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ink-mute">
        {silo && showSilo && <SiloIcon name={silo.icon} size={20} className="text-ink-soft" />}
        <span className="text-madder">{templateLabel[article.fm.template]}</span>
        {silo && showSilo && <span>· {silo.short}</span>}
      </div>
      <h3 className="mt-3 font-serif text-[1.3rem] leading-snug">
        <Link href={article.url} className="text-ink no-underline after:absolute after:inset-0 group-hover:text-madder">
          {article.fm.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[1rem] leading-relaxed text-ink-soft">{article.fm.dek || article.fm.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-bold text-madder">
        Read the guide <IconArrow size={16} />
      </span>
    </article>
  );
}
