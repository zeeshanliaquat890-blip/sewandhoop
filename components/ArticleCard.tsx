import Link from "next/link";
import type { Article } from "@/lib/content";
import { getSilo, templateLabel } from "@/lib/content";
import { SiloIcon, IconArrow } from "./Icons";
import { MachineIllustration } from "./Illustration";
import { fmtDate } from "@/templates/ArticleHeader";

export function ArticleCard({ article, showSilo = true }: { article: Article; showSilo?: boolean }) {
  const silo = getSilo(article.silo);
  const t = article.fm.template;
  const n = article.fm.products?.length ?? 0;
  const photo = article.fm.image ?? article.fm.products?.find((p) => p.image)?.image;
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_14px_34px_-14px_rgba(30,26,23,.35)]">
      <div className={`relative grid aspect-[16/9] place-items-center overflow-hidden ${t === "informational" ? "bg-linen" : "bg-gradient-to-br from-cream to-linen-deep"}`}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" loading="lazy" className={article.fm.image ? "h-full w-full object-cover" : "h-full w-full bg-white object-contain p-5 transition-transform group-hover:scale-105"} />
        ) : t === "informational" ? (
          silo && <SiloIcon name={silo.icon} size={84} className="text-ink/80 transition-transform group-hover:scale-105" />
        ) : (
          <MachineIllustration className="w-3/5 transition-transform group-hover:scale-105" />
        )}
        <span className={`ribbon absolute left-0 top-4 ${t === "informational" ? "ribbon-ink" : ""}`}>{templateLabel[t]}</span>
        {n > 1 && <span className="label-cond absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.8rem] text-ink">{n} picks</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {silo && showSilo && <p className="label-cond text-[0.82rem] text-ink-mute">{silo.name}</p>}
        <h3 className="mt-1 font-serif text-[1.28rem] font-bold leading-snug">
          <Link href={article.url} className="text-ink no-underline after:absolute after:inset-0 group-hover:text-madder">{article.fm.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{article.fm.dek || article.fm.description}</p>
        <div className="mt-4 flex items-center justify-between text-[0.88rem] text-ink-mute">
          <span>{fmtDate(article.fm.updated || article.fm.published)}</span>
          <span className="inline-flex items-center gap-1 font-bold text-madder">Read <IconArrow size={15} /></span>
        </div>
      </div>
    </article>
  );
}
