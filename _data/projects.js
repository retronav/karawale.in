const { Client } = require("@notionhq/client");
const { NotionDatabaseManager, properties } = require("@retronav/rosette");
const { z } = require("zod");
const dayjs = require("dayjs");
const { AssetCache } = require("@11ty/eleventy-fetch");
const { default: slugify } = require("@sindresorhus/slugify");

const schema = z
	.object({
		Name: properties.title,
		Summary: properties.text.default(""),
		Technologies: properties.multiSelect,
		Status: properties.select,
		Image: properties.files.optional(),
		Type: properties.select,
		"Project URL": properties.url.optional(),
	})
	.transform((data) => ({
		name: data.Name,
		summary: data.Summary,
		technologies: data.Technologies,
		status: data.Status,
		image: data.Image[0],
		type: data.Type,
		projectUrl: data["Project URL"],
	}));

module.exports = async function () {
	let asset = new AssetCache("notion-projects");;
	let projects = [];
	if (asset.isCacheValid("6h")) {
		projects = await asset.getCachedValue();
		return projects;
	}

	const { renderHtml } = await import("../_11ty/markdown.mjs");
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});
	const databaseId = "1f0aa550f57680e5a88bdd587c59e591";
	const notionDatabase = new NotionDatabaseManager(notion, schema, databaseId);

	const data = await notionDatabase.process({
		slugger: (p) => slugify(p.name),
	});
	projects = await Promise.all(
		Array.from(data.entries()).map(async ([id, post]) => ({
			...post.properties,
			id,
			slug: post.slug,
			content: await renderHtml(post.content),
			url: `/projects/${post.slug}`,
		}))
	);
	await asset.save(projects, "json");
	return projects;
};
