import { getArticles } from "@/lib/mdx";
import ArticleCard from "@/components/articles/article-card";
import SectionHeading from "@/components/section-heading";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="max-w-[45rem] w-full px-4 sm:px-8 fixed top-24 sm:top-28">
        <SectionHeading>Technical Articles</SectionHeading>
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>
    </main>
  );
}
