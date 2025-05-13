import { config } from "dotenv";
import EleventyFetch from "@11ty/eleventy-fetch";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js"

config();
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

export function formatDate(date, format) {
	return dayjs.tz(date).utc().format(format);
}

export async function webmentions(url) {
	const webmentionsUrl = `https://webmention.io/api/mentions.jf2?token=${process.env.WEBMENTION_IO_TOKEN}&per-page=10000`;
	return EleventyFetch(webmentionsUrl, {
		duration: "4h",
		type: "json",
	})
		.then((data) => data.children.filter((w) => w["wm-target"] === url))
		.then((webmentions) => ({
			reactions: webmentions.filter((w) =>
				["like-of", "repost-of", "bookmark-of"].includes(w["wm-property"])
			),
			replies: webmentions.filter((w) => w["wm-property"] === "in-reply-to"),
		}));
}

export function bescape(text) {
	const escapeMap = {
		"\\": "\\u005C",
		"'": "\\u0027",
		'"': "\\u0022",
		">": "\\u003E",
		"<": "\\u003C",
		"&": "\\u0026",
		"=": "\\u003D",
		"-": "\\u002D",
		";": "\\u003B",
	};

	return text.replace(/["'><&=\-;\\]/g, function (ch) {
		return escapeMap[ch];
	});
}

export function getPostAgeInYears(date) {
	const now = new Date();
	const postDate = new Date(date);
	const diff = now - postDate;
	const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	const diffInYears = Math.floor(diffInDays / 365);
	return diffInYears;
}

