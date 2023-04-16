require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const url = `https://webmention.io/api/mentions.jf2?token=${process.env.WEBMENTION_IO_TOKEN}&per-page=10000`;
  return EleventyFetch(url, {
    duration: "4h",
    type: "json",
  });
};
