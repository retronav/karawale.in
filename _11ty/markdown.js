import { slugifyWithCounter } from "@sindresorhus/slugify";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import rehypeShiftHeading from "rehype-shift-heading";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import { unified } from "unified";
import { toString } from "hast-util-to-string";
import * as path from "path";
import Image from "@11ty/eleventy-img";
import { fromHtml } from "hast-util-from-html";
import { select } from "hast-util-select";
import rehypeParse from "rehype-parse";
import { readFile } from "fs/promises";

const theme = JSON.parse(
	await readFile(path.resolve("./_11ty/synthwave.json"))
);

/**
 * Render markdown to HTML via unified.
 * @returns HTML
 */
export async function render(content) {
	// allowDangerousHtml is set to true to not break templating features
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeShiki, {})
		.use(rehypeSlug)
		.use(rehypeShiftHeading, { shift: 1 })
		.use(rehypeStringify, { allowDangerousHtml: true });

	const html = String(await processor.process(content));
	return html;
}

export async function renderHtml(content) {
	if (!content.length) return "";
	const processor = unified()
		.use(rehypeParse)
		.use(rehypeShiki, { theme })
		.use(rehypeSlug)
		.use(rehypeShiftHeading, { shift: 1 })
		.use(rehypeStringify, { allowDangerousHtml: true });

	const html = String(await processor.process(content));
	return html;
}

function rehypeSlug() {
	const slugger = slugifyWithCounter();
	return (tree) => {
		slugger.reset();
		visit(tree, "element", (node) => {
			if (
				/h[1-6]/.test(node.tagName) &&
				node.properties &&
				!node.properties.id
			) {
				node.properties.id = slugger(toString(node));
			}
		});
	};
}

export function generateImagePreview() {
	return async (tree) => {
		const matches = [];
		visit(tree, "element", (node, index, parent) => {
			if (
				(node.tagName === "img" &&
					node.properties &&
					"src" in node.properties &&
					"dataPreview" in node.properties) === false
			)
				return;
			matches.push([node, index, parent]);
		});

		for await (const [node, index, parent] of matches) {
			let src = node.properties.src;
			const url = new URL(src);
			if (url.hostname === "karawale.in")
				src = path.join("_public", url.pathname);

			const metadata = await Image(src, {
				formats: ["webp"],
				widths: [300],
				outputDir: "_public/uploads/preview",
				urlPath: "/uploads/preview/",
			});
			const imgNode = fromHtml(Image.generateHTML(metadata, node.properties))
				.children[0];
			const linkNode = h("a", { href: node.properties.src }, [imgNode]);
			parent.children.splice(index, 1, linkNode);
		}
	};
}

export function randomAccentColor() {
	const colors = ["#F063A1", "#FB8552", "#FBD352", "#7FDBDA", "#8C54FE"];
	return (tree) => {
		const head = select("head", tree);
		const color = colors[Math.floor(Math.random() * 5)];
		head.children.push(h("style", `:root { --accent: ${color}; }`));
	};
}
