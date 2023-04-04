import { getHighlighter } from "shiki";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import rehypeShiftHeading from "rehype-shift-heading";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@retronav/rehype-shiki";
import { unified } from "unified";
import { toString } from "hast-util-to-string";
import * as path from "path";
import Image from "@11ty/eleventy-img";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fromHtml } from "hast-util-from-html";

const highlighter = await getHighlighter({ theme: "gruvbox-dark-hard" });

/**
 * Render markdown to HTML via unified.
 * @returns HTML
 */
export async function render(content) {
  // allowDangerousHtml is set to true to not break templating features
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, { highlighter })
    .use(rehypeSlug)
    .use(rehypeShiftHeading, { shift: 1 })
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify, { allowDangerousHtml: true });

  const html = String(await processor.process(content));
  return html;
}

function rehypeSlug() {
  const slugger = slugifyWithCounter();
  return (tree) => {
    slugger.reset();
    visit(tree, "element", (node) => {
      if (
        /h[1-6]/.test(node.tagName) &&
        node.properties &&
        !node.properties.id
      ) {
        node.properties.id = slugger(toString(node));
      }
    });
  };
}

export function rehypeImage() {
  return async (tree) => {
    const matches = [];
    visit(tree, "element", (node, index, parent) => {
      if (
        (node.tagName === "img" &&
          node.properties &&
          "src" in node.properties &&
          "dataPreview" in node.properties) === false
      )
        return;
      matches.push([node, index, parent]);
    });

    for await (const [node, index, parent] of matches) {
      let src = node.properties.src;
      const url = new URL(src);
      if (url.hostname === "karawale.in")
        src = path.join("_public", url.pathname);

      const metadata = await Image(src, {
        formats: ["webp"],
        widths: [300],
        outputDir: "_public/uploads/preview",
        urlPath: "/uploads/preview/",
      });
      const imgNode = fromHtml(Image.generateHTML(metadata, node.properties))
        .children[0];
      const linkNode = h("a", { href: node.properties.src }, [imgNode]);
      parent.children.splice(index, 1, linkNode);
    }
  };
}
