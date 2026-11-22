import type { Article } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ articles, title = "Keep reading" }: { articles: Article[]; title?: string }) {
  if (!articles.length) return null;
  return (
    <section aria-labelledby="related" className="mt-20 border-t border-line bg-cream py-14">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <p className="kicker">From the same section</p>
        <h2 id="related" className="font-serif text-[2rem]">{title}</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => <ArticleCard key={a.slug} article={a} showSilo={false} />)}
        </div>
      </div>
    </section>
  );
}
