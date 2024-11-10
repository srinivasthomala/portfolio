import { getArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { parseMarkdown } from "@/lib/markdown";
import { format } from "date-fns";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
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

  const fullPath = path.join(
    process.cwd(),
    "content/articles",
    `${params.slug}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const htmlContent = await parseMarkdown(content);

  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy");

  return (
    <article className="max-w-[45rem] mx-auto px-4 sm:px-8">
      <BackToArticles />

      <div className="mt-16">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-medium mb-2">
            {article.title}
          </h1>
          <time className="text-gray-700 dark:text-gray-300">
            {formattedDate}
          </time>
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map(
              (
                tag:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined,
                index: Key | null | undefined
              ) => (
                <span
                  key={index}
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </header>

        <div
          className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none mb-28"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}
