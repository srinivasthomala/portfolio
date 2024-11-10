import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string) {
  try {
    return await codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });
  } catch (e) {
    // Fallback if language is not supported
    return await codeToHtml(code, {
      lang: "text",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });
  }
}
