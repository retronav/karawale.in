const EleventySassPlugin = require("eleventy-sass");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginToc = require("@uncenter/eleventy-plugin-toc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const filters = require("./_11ty/filters");
const postKinds = require("./postKinds");
const yaml = require("yaml");
const dayjs = require("dayjs");

/**
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns
 */
module.exports = function (eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addCollection("tags", (collectionApi) => {
		const allUniquePosts = collectionApi.getAll()[0].data.posts;

		const tagsMap = {};

		if (allUniquePosts && Array.isArray(allUniquePosts)) {
			allUniquePosts.forEach((post) => {
				if (post && post.tags && Array.isArray(post.tags)) {
					const uniqueNormalizedTagsForPost = new Set();
					post.tags.forEach((tagString) => {
						if (typeof tagString === "string" && tagString.trim() !== "") {
							uniqueNormalizedTagsForPost.add(tagString.trim());
						}
					});

					uniqueNormalizedTagsForPost.forEach((normalizedTag) => {
						if (!tagsMap[normalizedTag]) {
							tagsMap[normalizedTag] = {
								name: normalizedTag,
								posts: [],
							};
						}
						tagsMap[normalizedTag].posts.push(post);
					});
				}
			});
		}

		const tagsArray = Object.values(tagsMap);

		tagsArray.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});

		return tagsArray;
	});

	eleventyConfig.addPlugin(EleventySassPlugin);
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		urlPath: "/media/"
	});
	eleventyConfig.addPlugin(EleventyPluginToc, {
		ul: true,
		tags: ["h1", "h2", "h3", "h4"],
	});
	eleventyConfig.addFilter("absoluteUrl", EleventyPluginRss.absoluteUrl);
	eleventyConfig.addFilter(
		"htmlToAbsoluteUrls",
		EleventyPluginRss.convertHtmlToAbsoluteUrls
	);
	eleventyConfig.addFilter("dateToRfc3339", EleventyPluginRss.dateToRfc3339);
	eleventyConfig.addFilter("dateToRfc822", EleventyPluginRss.dateToRfc822);
	eleventyConfig.addFilter("formatDate", filters.formatDate);
	eleventyConfig.addFilter("webmentions", filters.webmentions);
	eleventyConfig.addFilter("bescape", filters.bescape);
	eleventyConfig.addFilter("getPostAgeInYears", filters.getPostAgeInYears);
	eleventyConfig.addDataExtension("yml", (content) => yaml.parse(content));
	eleventyConfig.setLibrary("md", {
		set: () => { },
		disable: () => { },
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
			} else return content;
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
			output: process.env.ELEVENTY_OUTPUT ?? "dist",
		},
	};
};
