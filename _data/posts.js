const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
const {
	default: createPageSlug,
	slugifyWithCounter,
} = require("@sindresorhus/slugify");
const dayjs = require("dayjs");

dotenv.config();

const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

/**
 * Recursively fetches all blocks including nested children.
 * @param {string} blockId - Block ID to fetch children for.
 * @returns {Promise<Array>} Array of blocks with their children.
 */
async function fetchBlockChildren(blockId) {
	const blocks = [];
	let cursor;
	while (true) {
		const { results, has_more, next_cursor } =
			await notion.blocks.children.list({
				block_id: blockId,
				start_cursor: cursor || undefined,
			});
		blocks.push(...results);
		if (!has_more) break;
		cursor = next_cursor;
	}

	for (const block of blocks) {
		if (
			block.has_children &&
			[
				"paragraph",
				"bulleted_list_item",
				"numbered_list_item",
				"toggle",
				"quote",
				"callout",
				"synced_block",
				"template",
				"column",
				"column_list",
				"table",
			].includes(block.type)
		) {
			block.children = await fetchBlockChildren(block.id);
		}
	}
	return blocks;
}

/**
 * Extracts plain text from a Notion rich text array.
 * @param {Array} richTextArray - Array of Notion rich text objects.
 * @returns {string} Plain text content.
 */
function richTextToPlainText(richTextArray) {
	if (!richTextArray || richTextArray.length === 0) return "";
	return richTextArray.map((rt) => rt.plain_text).join("");
}

/**
 * Converts a Notion block object to its HTML representation.
 * @param {Object} block - Notion block object.
 * @param {Map<string, string>} pageIdToSlugMap - Map of page IDs to their slugs for internal links.
 * @param {Function} contentSlugifier - An instance of slugifyWithCounter for generating unique heading IDs.
 * @returns {string} HTML representation of the block.
 */
function blockToHtml(block, pageIdToSlugMap, contentSlugifier) {
	if (!block) return "";

	switch (block.type) {
		case "paragraph":
			return `<p>${richTextToHtml(
				block.paragraph.rich_text,
				pageIdToSlugMap
			)}</p>`;
		case "heading_1":
			return `<h1 id="${contentSlugifier(
				richTextToPlainText(block.heading_1.rich_text)
			)}">${richTextToHtml(block.heading_1.rich_text, pageIdToSlugMap)}</h1>`;
		case "heading_2":
			return `<h2 id="${contentSlugifier(
				richTextToPlainText(block.heading_2.rich_text)
			)}">${richTextToHtml(block.heading_2.rich_text, pageIdToSlugMap)}</h2>`;
		case "heading_3":
			return `<h3 id="${contentSlugifier(
				richTextToPlainText(block.heading_3.rich_text)
			)}">${richTextToHtml(block.heading_3.rich_text, pageIdToSlugMap)}</h3>`;
		case "bulleted_list_item":
			return `<li>${richTextToHtml(
				block.bulleted_list_item.rich_text,
				pageIdToSlugMap
			)}${
				block.children
					? `<ul>${blocksToHtml(
							block.children,
							pageIdToSlugMap,
							contentSlugifier
					  )}</ul>`
					: ""
			}</li>`;
		case "numbered_list_item":
			return `<li>${richTextToHtml(
				block.numbered_list_item.rich_text,
				pageIdToSlugMap
			)}${
				block.children
					? `<ol>${blocksToHtml(
							block.children,
							pageIdToSlugMap,
							contentSlugifier
					  )}</ol>`
					: ""
			}</li>`;
		case "to_do":
			return `<div class="todo-item"><input type="checkbox"${
				block.to_do.checked ? " checked" : ""
			} disabled /> <span>${richTextToHtml(
				block.to_do.rich_text,
				pageIdToSlugMap
			)}</span></div>`;
		case "toggle":
			return `<details><summary>${richTextToHtml(
				block.toggle.rich_text,
				pageIdToSlugMap
			)}</summary>${
				block.children
					? blocksToHtml(block.children, pageIdToSlugMap, contentSlugifier)
					: ""
			}</details>`;
		case "code":
			return `<pre><code class="language-${
				block.code.language
			}">${richTextToHtml(block.code.rich_text, pageIdToSlugMap)}</code></pre>`;
		case "quote":
			return `<blockquote>${richTextToHtml(
				block.quote.rich_text,
				pageIdToSlugMap
			)}${
				block.children
					? blocksToHtml(block.children, pageIdToSlugMap, contentSlugifier)
					: ""
			}</blockquote>`;
		case "callout":
			return `<div class="callout">${
				block.callout.icon
					? `<div class="callout-icon">${renderIcon(block.callout.icon)}</div>`
					: ""
			}<div class="callout-content">${richTextToHtml(
				block.callout.rich_text,
				pageIdToSlugMap
			)}${
				block.children
					? blocksToHtml(block.children, pageIdToSlugMap, contentSlugifier)
					: ""
			}</div></div>`;
		case "divider":
			return "<hr>";
		case "image":
			const imageUrl =
				block.image.type === "external"
					? block.image.external.url
					: block.image.file.url;
			const captionText = richTextToPlainText(block.image.caption);
			const figcaption =
				block.image.caption && block.image.caption.length > 0
					? `<figcaption>${richTextToHtml(
							block.image.caption,
							pageIdToSlugMap
					  )}</figcaption>`
					: "";
			return `<figure><img src="${imageUrl}" alt="${
				captionText || "image"
			}" />${figcaption}</figure>`;
		case "table":
			if (!block.children) return "";
			const rows = block.children
				.map((row) => {
					if (row.type !== "table_row") return "";
					const cells = row.table_row.cells
						.map(
							(cellRichTextArray) =>
								`<td>${richTextToHtml(cellRichTextArray, pageIdToSlugMap)}</td>`
						)
						.join("");
					return `<tr>${cells}</tr>`;
				})
				.join("");
			return `<table><tbody>${rows}</tbody></table>`;
		case "column_list":
			return block.children
				? `<div class="column-list">${blocksToHtml(
						block.children,
						pageIdToSlugMap,
						contentSlugifier
				  )}</div>`
				: "";
		case "column":
			return block.children
				? `<div class="column">${blocksToHtml(
						block.children,
						pageIdToSlugMap,
						contentSlugifier
				  )}</div>`
				: "";
		case "link_preview":
			return `<a href="${block.link_preview.url}" class="link-preview" target="_blank">${block.link_preview.url}</a>`;
		case "bookmark":
			const bookmarkCaption =
				block.bookmark.caption && block.bookmark.caption.length > 0
					? richTextToHtml(block.bookmark.caption, pageIdToSlugMap)
					: block.bookmark.url;
			return `<a href="${block.bookmark.url}" class="bookmark" target="_blank">${bookmarkCaption}</a>`;
		default:
			return `<!-- Unsupported block type: ${block.type} -->`;
	}
}

/**
 * Converts a Notion rich text array to its HTML representation.
 * @param {Array} richTextArray - Array of Notion rich text objects.
 * @param {Map<string, string>} pageIdToSlugMap - Map of page IDs to their slugs for internal links.
 * @returns {string} HTML representation of the rich text.
 */
function richTextToHtml(richTextArray, pageIdToSlugMap) {
	if (!richTextArray || richTextArray.length === 0) return "";
	return richTextArray
		.map((richText) => {
			let content = richText.plain_text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");

			if (richText.type === "mention") {
				if (richText.mention.type === "page") {
					const mentionedPageId = richText.mention.page.id;
					const mentionedPageSlug = pageIdToSlugMap.get(mentionedPageId);
					if (mentionedPageSlug) {
						return `<a href="/posts/${mentionedPageSlug}/" class="page-mention">${content}</a>`;
					}
					return `<span class="page-mention-unresolved" data-page-id="${mentionedPageId}">${content} (Unresolved mention)</span>`;
				}
				if (richText.mention.type === "user") {
					return `<span class="user-mention">@User</span>`;
				}
				if (richText.mention.type === "date") {
					const { start, end, time_zone } = richText.mention.date;
					return `<time datetime="${start}${end ? `/${end}` : ""}">${start}${
						end ? ` to ${end}` : ""
					}${time_zone ? ` (${time_zone})` : ""}</time>`;
				}
				return content;
			}

			if (richText.type === "equation") {
				return `<span class="equation">${richText.equation.expression}</span>`;
			}

			if (richText.annotations) {
				if (richText.annotations.bold) content = `<strong>${content}</strong>`;
				if (richText.annotations.italic) content = `<em>${content}</em>`;
				if (richText.annotations.strikethrough)
					content = `<del>${content}</del>`;
				if (richText.annotations.underline) content = `<u>${content}</u>`;
				if (richText.annotations.code) content = `<code>${content}</code>`;
				if (
					richText.annotations.color &&
					richText.annotations.color !== "default"
				) {
					content = `<span class="color-${richText.annotations.color}">${content}</span>`;
				}
			}

			if (richText.href) {
				content = `<a href="${richText.href}" target="_blank">${content}</a>`;
			}
			return content;
		})
		.join("");
}

/**
 * Converts an array of Notion blocks to their HTML representation.
 * @param {Array} blocks - Array of Notion block objects.
 * @param {Map<string, string>} pageIdToSlugMap - Map of page IDs to their slugs for internal links.
 * @param {Function} contentSlugifier - An instance of slugifyWithCounter for generating unique heading IDs.
 * @returns {string} HTML representation of the blocks.
 */
function blocksToHtml(blocks, pageIdToSlugMap, contentSlugifier) {
	if (!blocks || blocks.length === 0) return "";
	let html = "";
	let listType = null;

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const nextBlock = blocks[i + 1] || null;

		if (block.type === "bulleted_list_item") {
			if (listType !== "ul") {
				if (listType) html += `</${listType}>`;
				html += "<ul>";
				listType = "ul";
			}
		} else if (block.type === "numbered_list_item") {
			if (listType !== "ol") {
				if (listType) html += `</${listType}>`;
				html += "<ol>";
				listType = "ol";
			}
		} else if (listType) {
			html += `</${listType}>`;
			listType = null;
		}

		html += blockToHtml(block, pageIdToSlugMap, contentSlugifier);

		const currentBlockIsList =
			block.type === "bulleted_list_item" ||
			block.type === "numbered_list_item";
		const nextBlockIsSameList = nextBlock && nextBlock.type === block.type;

		if (listType && currentBlockIsList && !nextBlockIsSameList) {
			html += `</${listType}>`;
			listType = null;
		}
	}

	if (listType) {
		html += `</${listType}>`;
	}
	return html;
}

/**
 * Renders a Notion icon object to HTML.
 * @param {Object} icon - Notion icon object.
 * @returns {string} HTML representation of the icon.
 */
function renderIcon(icon) {
	if (!icon) return "";
	if (icon.type === "emoji") return icon.emoji;
	if (icon.type === "file")
		return `<img src="${icon.file.url}" class="icon" alt="Icon" />`;
	if (icon.type === "external")
		return `<img src="${icon.external.url}" class="icon" alt="Icon" />`;
	return "";
}

/**
 * Fetches and processes Notion data for Eleventy.
 * Retrieves entries from a Notion database, converts their content to HTML,
 * and structures them for Eleventy's data cascade.
 */
module.exports = async () => {
	try {
		const databaseId = process.env.NOTION_DATABASE_ID;
		const { results: dbEntries } = await notion.databases.query({
			database_id: databaseId,
			// sorts: [{ property: "Date", direction: "descending" }],
		});

		console.log(`Found ${dbEntries.length} entries in the database.`);

		const pageIdToSlugMap = new Map();
		for (const entry of dbEntries) {
			const title =
				entry.properties.Title?.title?.[0]?.plain_text || "Untitled";
			pageIdToSlugMap.set(entry.id, createPageSlug(title));
		}

		const allPosts = [];
		for (const entry of dbEntries) {
			const title =
				entry.properties.Title?.title?.[0]?.plain_text || "Untitled";
			const pageSlug = pageIdToSlugMap.get(entry.id);
			const contentSlugifier = slugifyWithCounter(); // Instance for unique heading IDs per post

			console.log(
				`Processing entry: ${title} (ID: ${entry.id}, Slug: ${pageSlug})`
			);

			const blocks = await fetchBlockChildren(entry.id);
			const htmlContent = blocksToHtml(
				blocks,
				pageIdToSlugMap,
				contentSlugifier
			);

			const summary =
				entry.properties.Summary?.rich_text?.[0]?.plain_text || "";
			const date = dayjs(entry.created_time).toDate();
			const tags =
				entry.properties.Tags?.multi_select?.map((tag) => tag.name) || [];

			allPosts.push({
				id: entry.id,
				title,
				slug: pageSlug,
				url: `/posts/${pageSlug}/`,
				summary,
				content: htmlContent,
				date,
				updated: dayjs(entry.last_edited_time).toDate(),
				tags,
			});
		}

		console.log(`Successfully processed ${allPosts.length} posts.`);

		return allPosts;
	} catch (error) {
		console.error("Error fetching or processing Notion data:", error);
		return []; // Return empty array on error to prevent build failure
	}
};
