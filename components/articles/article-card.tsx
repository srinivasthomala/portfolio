"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

type ArticleCardProps = {
  title: string;
  summary: string;
  slug: string;
  tags: string[];
};

export default function ArticleCard({
  title,
  summary,
  slug,
  tags,
}: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <Link href={`/articles/${slug}`}>
        <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
          <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10">
            <h3 className="text-2xl font-medium">{title}</h3>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
              {summary}
            </p>
            <div className="flex flex-wrap mt-4 gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-gray-700 dark:text-white/70">
              <span className="text-sm">Read More</span>
              <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </section>
      </Link>
    </motion.article>
  );
}
