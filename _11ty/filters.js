require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.tz.setDefault("UTC");

function formatDate(date, format) {
  return dayjs.tz(date).utc().format(format);
}

async function webmentions(url) {
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

module.exports = { formatDate, webmentions };
