import { Client } from "@notionhq/client";
import { NotionDatabaseManager, properties } from "@retronav/rosette";
import { z } from "zod";
import dayjs from "dayjs";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import Fetch from "@11ty/eleventy-fetch";
import { renderHtml } from "../_11ty/markdown.js";

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

export default Fetch(
	async function () {
		const notion = new Client({
			auth: process.env.NOTION_API_KEY,
		});
		const databaseId = process.env.NOTION_DATABASE_ID;
		const notionDatabase = new NotionDatabaseManager(
			notion,
			schema,
			databaseId
		);
		const slugger = slugifyWithCounter();

		const data = await notionDatabase.process({
			filter: { property: "Published", checkbox: { equals: true } },
			slugger: (p) => slugger(dayjs(p.date).format("YYYY-MM-DD") + p.title),
		});

		return await Promise.all(
			Array.from(data.entries()).map(async ([id, post]) => ({
				...post.properties,
				id,
				slug: post.slug,
				content: await renderHtml(post.content),
				url: `/posts/${post.slug}`,
			}))
		);
	},
	{
		duration: "1h",
		type: "json",
		requestId: "notion-posts",
	}
);
