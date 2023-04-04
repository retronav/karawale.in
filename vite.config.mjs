import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { rehypeImage } from "./_11ty/markdown.mjs";

export default {
  plugins: [
    {
      name: "optimize-images",
      async transform(src, id) {
        if (!/\.(html)$/.test(id)) return;
        const processor = unified()
          .use(rehypeParse)
          .use(rehypeImage)
          .use(rehypeStringify);
        const html = String(await processor.process(src));
        return { code: html, map: null };
      },
    },
  ],
};
