import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

export function parseMarkdown(content: string) {
  return micromark(content, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
}
