const axios = require("axios");
const cheerio = require("cheerio");
const { savePage } = require("./db");
const { URL } = require("url");

// Allow-list of domains to crawl
const ALLOWED_DOMAINS = [
  "example.com",
  // Add more allowed domains as needed
];

function isAllowedUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    // Check if the hostname ends with one of the allowed domains
    return ALLOWED_DOMAINS.some(domain =>
      parsed.hostname === domain ||
      parsed.hostname.endsWith("." + domain)
    );
  } catch (e) {
    return false;
  }
}

const visited = new Set();

async function crawl(url, depth = 1) {
  if (visited.has(url) || depth === 0) return;
  visited.add(url);

    if (!isAllowedUrl(url)) {
      console.warn(`Skipping disallowed URL: ${url}`);
      return;
    }
  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);
    const title = $("title").text();
    const text = $("body").text().replace(/\s+/g, " ").trim();

    savePage({ url, title, text });

    const links = $("a[href]").map((i, el) => $(el).attr("href")).get();
    const absoluteLinks = links
      .filter(href => href.startsWith("http"))
      .slice(0, 5);

    for (const link of absoluteLinks) {
      await crawl(link, depth - 1);
    }
  } catch (err) {
    console.error(`Error crawling ${url}: ${err.message}`);
  }
}

async function crawlBatch(filePath, depth = 1) {
  const fs = require("fs");
  const urls = fs.readFileSync(filePath, "utf-8").split("\n").map(u => u.trim()).filter(Boolean);
  for (const url of urls) {
    await crawl(url, depth);
  }
}

module.exports = { crawlBatch };
