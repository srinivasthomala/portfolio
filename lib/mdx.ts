import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getArticles() {
  const articlesDir = path.join(process.cwd(), "content/articles");

  // Create directory if it doesn't exist
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
    return []; // Return empty array if no articles exist
  }

  const files = fs.readdirSync(articlesDir);

  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(".mdx", "");

      return {
        title: data.title,
        publishedAt: data.publishedAt,
        summary: data.summary,
        tags: data.tags,
        slug,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return articles;
}

export function getBlogs() {
  const blogDir = path.join(process.cwd(), "content/blog");

  // Create directory if it doesn't exist
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    return []; // Return empty array if no posts exist
  }

  const files = fs.readdirSync(blogDir);

  const blogs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(".mdx", "");

      return {
        title: data.title,
        publishedAt: data.publishedAt,
        summary: data.summary,
        tags: data.tags,
        slug,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return blogs;
}
