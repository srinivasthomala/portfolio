import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang: string = "text") {
  try {
    return await codeToHtml(code, {
      lang,
      theme: "github-dark",
      transformers: [],
    });
  } catch (e) {
    return code;
  }
}
