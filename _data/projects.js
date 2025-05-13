import { Client } from "@notionhq/client";
import { NotionDatabaseManager, properties } from "@retronav/rosette";
import { z } from "zod";
import Fetch from "@11ty/eleventy-fetch";
import { default as slugify } from "@sindresorhus/slugify";
import { renderHtml } from "../_11ty/markdown.js";

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

export default Fetch(
	async function () {
		const notion = new Client({
			auth: process.env.NOTION_API_KEY,
		});
		const databaseId = "1f0aa550f57680e5a88bdd587c59e591";
		const notionDatabase = new NotionDatabaseManager(
			notion,
			schema,
			databaseId
		);

		const data = await notionDatabase.process({
			slugger: (p) => slugify(p.name),
		});
		return await Promise.all(
			Array.from(data.entries()).map(async ([id, post]) => ({
				...post.properties,
				id,
				slug: post.slug,
				content: await renderHtml(post.content),
				url: `/projects/${post.slug}`,
			}))
		);
	},
	{
		duration: "1h",
		type: "json",
		requestId: "notion-projects",
	}
);
