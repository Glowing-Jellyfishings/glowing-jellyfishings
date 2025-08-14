const axios = require("axios");
const cheerio = require("cheerio");
const { savePage } = require("./db");

const visited = new Set();

async function crawl(url, depth = 1) {
  if (visited.has(url) || depth === 0) return;
  visited.add(url);

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
