import { codeToHtml } from "shiki/bundle/web";

export async function highlightCode(code: string, lang: string) {
  try {
    return await codeToHtml(code, {
      lang,
      theme: "github-dark",
    });
  } catch (e) {
    // Fallback if language is not supported
    return await codeToHtml(code, {
      lang: "text",
      theme: "github-dark",
    });
  }
}
