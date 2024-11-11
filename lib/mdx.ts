import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseISO } from "date-fns";

export function getArticles() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(articlesDir);

  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(".mdx", "");

      const publishedAt = data.publishedAt.includes("T")
        ? data.publishedAt
        : `${data.publishedAt}T12:00:00.000Z`;

      return {
        title: data.title,
        publishedAt,
        summary: data.summary,
        tags: data.tags,
        slug,
      };
    })
    .sort(
      (a, b) =>
        parseISO(b.publishedAt).getTime() - parseISO(a.publishedAt).getTime()
    );

  return articles;
}

export function getBlogs() {
  const blogDir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(blogDir);

  const blogs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(".mdx", "");

      const publishedAt = data.publishedAt.includes("T")
        ? data.publishedAt
        : `${data.publishedAt}T12:00:00.000Z`;

      return {
        title: data.title,
        publishedAt,
        summary: data.summary,
        tags: data.tags,
        slug,
      };
    })
    .sort(
      (a, b) =>
        parseISO(b.publishedAt).getTime() - parseISO(a.publishedAt).getTime()
    );

  return blogs;
}
