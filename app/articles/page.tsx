import { getArticles } from "@/lib/mdx";
import ArticleCard from "@/components/articles/article-card";
import SectionHeading from "@/components/section-heading";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <section className="max-w-[45rem] w-full px-4 sm:px-8 mb-28">
        <SectionHeading>Technical Articles</SectionHeading>
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
}
