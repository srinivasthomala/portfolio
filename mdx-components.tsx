import { highlight } from "sugar-high";
import React from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className?.replace("language-", "");
  const highlightedCode = highlight(children);

  return (
    <div className="relative w-full max-w-[100vw] sm:max-w-[45rem]">
      <pre className="overflow-x-auto p-4 rounded-lg my-6 bg-gray-100 dark:bg-gray-800">
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

const components = {
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
  // Add other components as needed
};

export default components;
