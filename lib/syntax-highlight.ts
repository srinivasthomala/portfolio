import shiki from "shiki";

let highlighter: any = null;

export async function initHighlighter() {
  highlighter = await shiki.getHighlighter({
    theme: "github-dark",
  });
}

export function highlightCode(code: string, lang: string = "text") {
  if (!highlighter) {
    return code;
  }
  try {
    return highlighter.codeToHtml(code, { lang });
  } catch (e) {
    return code;
  }
}
