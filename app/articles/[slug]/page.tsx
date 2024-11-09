import { getArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { parseMarkdown } from "@/lib/markdown";

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

  const fullPath = path.join(
    process.cwd(),
    "content/articles",
    `${params.slug}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const htmlContent = parseMarkdown(content);

  return (
    <article className="max-w-[45rem] mx-auto px-4 sm:px-8 pt-28 sm:pt-36">
      <Link
        href="/articles"
        className="group mb-8 flex items-center gap-2 text-gray-700 dark:text-white/70 hover:text-gray-950 dark:hover:text-white"
      >
        <BsArrowLeft className="group-hover:-translate-x-1 transition" />
        Back to Articles
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-medium mb-2">
          {article.title}
        </h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none mb-28"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
