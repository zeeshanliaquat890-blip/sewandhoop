import type { Article } from "@/lib/content";
import { getMoneyPages, getRelated } from "@/lib/content";
import { ArticleHeader } from "./ArticleHeader";
import { TocDesktop, TocMobile } from "@/components/Toc";
import { Faq } from "@/components/Faq";
import { AuthorBox } from "@/components/AuthorBox";
import { MoneyPagesBox } from "@/components/MoneyPagesBox";
import { RelatedArticles } from "@/components/RelatedArticles";

/** How-to / what-is: sticky TOC on desktop, collapsible TOC on mobile, steps, FAQ, money-page box. */
export function InformationalTemplate({ article, content }: { article: Article; content: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto grid max-w-site gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] xl:grid-cols-[13rem_minmax(0,46rem)_13rem] xl:justify-center">
        <div className="hidden xl:block" aria-hidden="true" />
        <article className="mx-auto w-full max-w-prose min-w-0">
          <ArticleHeader article={article} />
          <TocMobile headings={article.headings} />
          <div className="prose-sew mt-8">{content}</div>
          <Faq items={article.fm.faq ?? []} />
          <MoneyPagesBox silo={article.silo} articles={getMoneyPages(article.silo, article.slug)} />
          <AuthorBox />
        </article>
        <aside className="hidden pt-2 lg:block">
          <TocDesktop headings={article.headings} />
        </aside>
      </div>
      <RelatedArticles articles={getRelated(article)} />
    </>
  );
}
