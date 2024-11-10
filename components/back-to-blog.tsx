"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function BackToBlog() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-24 sm:top-28 z-10 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/blog"
        className="group flex items-center gap-2 text-gray-700 dark:text-white/70 hover:text-gray-950 dark:hover:text-white"
      >
        <BsArrowLeft className="group-hover:-translate-x-1 transition" />
        Back to Blog
      </Link>
    </div>
  );
}
