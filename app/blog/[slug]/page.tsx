import { getBlogs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseMarkdown } from "@/lib/markdown";
import { format, parseISO } from "date-fns";
import BackToBlog from "@/components/back-to-blog";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogs = getBlogs();
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${params.slug}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  const htmlContent = await parseMarkdown(content);

  return (
    <article className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <div className="max-w-[45rem] w-full px-4 sm:px-8">
        <BackToBlog />
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
