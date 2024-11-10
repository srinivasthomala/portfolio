import { getBlogs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseMarkdown } from "@/lib/markdown";
import { format } from "date-fns";
import BackToBlog from "@/components/back-to-blog";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogs = getBlogs();
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const fullPath = path.join(
    process.cwd(),
    "content/blog",
    `${params.slug}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const htmlContent = await parseMarkdown(content);
  const formattedDate = format(new Date(blog.publishedAt), "MMMM d, yyyy");

  return (
    <article className="max-w-[45rem] mx-auto px-4 sm:px-8">
      <BackToBlog />

      <div className="mt-16">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-medium mb-2">
            {blog.title}
          </h1>
          <time className="text-gray-700 dark:text-gray-300">
            {formattedDate}
          </time>
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map(
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
