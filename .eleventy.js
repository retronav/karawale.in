import EleventySassPlugin from "eleventy-sass";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { absoluteUrl, convertHtmlToAbsoluteUrls, dateToRfc3339, dateToRfc822 } from "@11ty/eleventy-plugin-rss";
import EleventyPluginToc from "@uncenter/eleventy-plugin-toc";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { formatDate, webmentions, bescape, getPostAgeInYears } from "./_11ty/filters.js";
import { parse } from "yaml";

/**
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns
 */
export default function (eleventyConfig) {
	const serveMode = process.argv.includes("--serve");
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
	if (!serveMode) // for some reason this plugin breaks serve mode
		eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
			urlPath: "/media/",
		});
	eleventyConfig.addPlugin(EleventyPluginToc, {
		ul: true,
		tags: ["h1", "h2", "h3", "h4"],
	});
	eleventyConfig.addFilter("absoluteUrl", absoluteUrl);
	eleventyConfig.addFilter(
		"htmlToAbsoluteUrls",
		convertHtmlToAbsoluteUrls
	);
	eleventyConfig.addFilter("dateToRfc3339", dateToRfc3339);
	eleventyConfig.addFilter("dateToRfc822", dateToRfc822);
	eleventyConfig.addFilter("formatDate", formatDate);
	eleventyConfig.addFilter("webmentions", webmentions);
	eleventyConfig.addFilter("bescape", bescape);
	eleventyConfig.addFilter("getPostAgeInYears", getPostAgeInYears);
	eleventyConfig.addDataExtension("yml", (content) => parse(content));
	eleventyConfig.setLibrary("md", {
		set: () => {},
		disable: () => {},
		render: (str) =>
			import("./_11ty/markdown.js").then(({ render }) => render(str)),
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
					"./_11ty/markdown.js"
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
