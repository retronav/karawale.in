const { Client } = require("@notionhq/client");
const { NotionDatabaseManager, properties } = require("@retronav/rosette");
const { z } = require("zod");
const dayjs = require("dayjs");
const { slugifyWithCounter } = require("@sindresorhus/slugify");
const { AssetCache } = require("@11ty/eleventy-fetch");

const schema = z
	.object({
		Title: properties.title,
		Summary: properties.text,
		Tags: properties.multiSelect,
		Date: properties.date,
		Updated: properties.lastEditedTime,
	})
	.transform((data) => ({
		title: data.Title,
		summary: data.Summary,
		tags: data.Tags,
		date: data.Date,
		updated: data.Updated,
	}));

module.exports = async function () {
	let asset = new AssetCache("notion-posts");
    let posts = [];
	if (asset.isCacheValid("6h")) {
		posts = await asset.getCachedValue();
		for (const post of posts) {
			post.date = dayjs(post.date).toDate();
			post.updated = dayjs(post.updated).toDate();
		}
		return posts;
	}

	const { renderHtml } = await import("../_11ty/markdown.mjs");
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});
	const databaseId = process.env.NOTION_DATABASE_ID;
	const notionDatabase = new NotionDatabaseManager(notion, schema, databaseId);
	const slugger = slugifyWithCounter();

	const data = await notionDatabase.process({
		filter: { property: "Published", checkbox: { equals: true } },
		slugger: (p) => slugger(dayjs(p.date).format("YYYY-MM-DD") + p.title),
	});
	posts = await Promise.all(
		Array.from(data.entries()).map(async ([id, post]) => ({
			...post.properties,
			id,
			slug: post.slug,
			content: await renderHtml(post.content),
			url: `/posts/${post.slug}`,
		}))
	);
	await asset.save(posts, "json");
	return posts;
};
