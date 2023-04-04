const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const filters = require("./_11ty/filters");
const postKinds = require("./postKinds");
const yaml = require("yaml");

/**
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns
 */
module.exports = function (eleventyConfig) {
  postKinds.map((kind) =>
    eleventyConfig.addCollection(kind, (collectionApi) =>
      collectionApi
        .getFilteredByGlob(`./content/${kind}/**/*.md`)
        .filter((post) => !Boolean(post.data.draft))
    )
  );
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob(postKinds.map((k) => `./content/${k}/**/*.md`))
      .filter((post) => !Boolean(post.data.draft))
  );

  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addFilter("formatDate", filters.formatDate);
  eleventyConfig.addDataExtension("yml", (content) => yaml.parse(content));
  eleventyConfig.setLibrary("md", {
    set: () => {},
    disable: () => {},
    render: (str) =>
      import("./_11ty/markdown.mjs").then(({ render }) => render(str)),
  });
  
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy({ _public: "." });

  eleventyConfig.addTransform("preview-images", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html") === false) return;
    const unified = (await import("unified")).unified;
    const rehypeParse = (await import("rehype-parse")).default;
    const rehypeStringify = (await import("rehype-stringify")).default;
    const rehypeImage = (await import("./_11ty/markdown.mjs")).rehypeImage;

    const processor = unified()
      .use(rehypeParse)
      .use(rehypeImage)
      .use(rehypeStringify);

    return String(await processor.process(content));
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../_includes",
      layouts: "../_includes/layouts",
      data: "../_data",
      output: "dist",
    },
  };
};
