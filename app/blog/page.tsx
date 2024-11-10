import { getBlogs } from "@/lib/mdx";
import BlogCard from "@/components/blog/blog-card";
import SectionHeading from "@/components/section-heading";

export default function BlogPage() {
  const blogs = getBlogs();

  return (
    <div className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <section className="max-w-[45rem] w-full px-4 sm:px-8 mb-28">
        <SectionHeading>Personal Blog</SectionHeading>
        {blogs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No blog posts yet. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
