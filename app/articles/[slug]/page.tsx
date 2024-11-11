import { getArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseMarkdown } from "@/lib/markdown";
import { format, parseISO } from "date-fns";
import BackToArticles from "@/components/back-to-articles";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = getArticles();
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content/articles",
    `${params.slug}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  const htmlContent = await parseMarkdown(content);

  return (
    <article className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <div className="max-w-[45rem] w-full px-4 sm:px-8">
        <BackToArticles />
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-3xl font-bold mb-3">{data.title}</h1>
          <time className="text-gray-600 dark:text-gray-400 mb-8">
            {format(parseISO(data.publishedAt), "MMMM d, yyyy")}
          </time>
          <div
            className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none mb-28"
            dangerouslySetInnerHTML={{
              __html: htmlContent.replace(/<h1>.*?<\/h1>/, ""),
            }}
          />
        </div>
      </div>
    </article>
  );
}
