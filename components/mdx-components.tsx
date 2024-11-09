"use client";

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const language = className?.replace("language-", "");

  return (
    <div className="relative w-full max-w-[100vw] sm:max-w-[45rem]">
      <pre className="overflow-x-auto p-4 rounded-lg my-6 bg-gray-100 dark:bg-gray-800">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

const components = {
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
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
