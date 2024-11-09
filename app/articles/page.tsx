import { getArticles } from "@/lib/mdx";
import ArticleCard from "@/components/articles/article-card";
import SectionHeading from "@/components/section-heading";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <section className="mb-28 max-w-[45rem] mx-auto px-4 sm:px-8 pt-28 sm:pt-36">
      <SectionHeading>Technical Articles</SectionHeading>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
