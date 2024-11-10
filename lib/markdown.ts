import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { highlightCode } from "./syntax-highlight";

export async function parseMarkdown(content: string) {
  let html = micromark(content, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });

  // Replace code blocks with syntax highlighted versions
  html = await replaceCodeBlocks(html);

  return html;
}

async function replaceCodeBlocks(html: string) {
  const codeBlockRegex =
    /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g;

  let lastIndex = 0;
  let result = "";

  let match;
  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, lang, code] = match;
    const index = match.index;

    // Add the text before this code block
    result += html.slice(lastIndex, index);

    // Add the highlighted code block
    const decodedCode = decodeHTML(code);
    const highlightedCode = await highlightCode(decodedCode, lang);
    result += highlightedCode;

    lastIndex = index + fullMatch.length;
  }

  // Add any remaining text
  result += html.slice(lastIndex);

  return result;
}

function decodeHTML(html: string) {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}
