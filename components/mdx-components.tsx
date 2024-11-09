"use client";

import Image from "next/image";

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative my-6">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className="rounded-lg mx-auto"
        quality={90}
        loading="lazy"
      />
      {alt && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          {alt}
        </p>
      )}
    </div>
  );
};

const components = {
  pre: ({ children, ...props }: { children: React.ReactNode }) => {
    return (
      <pre
        className="overflow-x-auto p-4 rounded-lg my-6 bg-[#0d1117]"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    if (!className) {
      return (
        <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 text-gray-900 dark:text-gray-200">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  img: CustomImage,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
};

export default components;
