const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginToc = require('eleventy-plugin-toc')
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
  eleventyConfig.setUseGitIgnore(false);

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
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyPluginToc, {
    ul: true
  });
  eleventyConfig.addFilter("absoluteUrl", EleventyPluginRss.absoluteUrl);
  eleventyConfig.addFilter(
    "htmlToAbsoluteUrls",
    EleventyPluginRss.convertHtmlToAbsoluteUrls
  );
  eleventyConfig.addFilter("dateToRfc3339", EleventyPluginRss.dateToRfc3339);
  eleventyConfig.addFilter("dateToRfc822", EleventyPluginRss.dateToRfc822);
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

  eleventyConfig.addTransform(
    "postprocess-html-xml",
    async (content, outputPath) => {
      if (outputPath.endsWith(".html")) {
        const unified = (await import("unified")).unified;
        const rehypeParse = (await import("rehype-parse")).default;
        const rehypeStringify = (await import("rehype-stringify")).default;
        const { generateImagePreview, randomAccentColor } = await import(
          "./_11ty/markdown.mjs"
        );

        const processor = unified()
          .use(rehypeParse)
          .use(generateImagePreview)
          .use(randomAccentColor)
          .use(rehypeStringify);

        return String(await processor.process(content));
      } else if (outputPath.endsWith(".xml")) return content;
    }
  );

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
