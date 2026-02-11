#!/usr/bin/env node
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);

const notion = new Client({ auth: process.env.NOTION_API_SECRET });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!process.env.NOTION_API_SECRET) {
  console.error("Environment variable NOTION_API_SECRET is required");
  process.exit(1);
}
if (!DATABASE_ID) {
  console.error("Environment variable NOTION_DATABASE_ID is required");
  process.exit(1);
}

const OUT_ROOT = path.resolve(process.cwd(), "public", "blog-images");

async function queryAllPages() {
  const pages = [];
  let cursor = undefined;
  while (true) {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 100,
      start_cursor: cursor,
    });
    pages.push(...res.results);
    if (!res.has_more) break;
    cursor = res.next_cursor;
  }
  return pages;
}

function tryGetFileUrl(file) {
  if (!file) return null;
  if (file.type === "external") return file.external?.url || null;
  if (file.type === "file") return file.file?.url || null;
  return null;
}

function extractUrlsFromPage(page) {
  const urls = new Set();

  // cover
  if (page.cover) {
    const url = tryGetFileUrl(page.cover);
    if (url) urls.add(url);
  }

  // icon
  if (page.icon) {
    const url = tryGetFileUrl(page.icon);
    if (url) urls.add(url);
  }

  // properties (files)
  if (page.properties) {
    Object.values(page.properties).forEach((prop) => {
      try {
        if (prop.type === "files" && Array.isArray(prop.files)) {
          prop.files.forEach((f) => {
            const u = tryGetFileUrl(f);
            if (u) urls.add(u);
          });
        }
        // rich_textやtitleに直接画像URLが入っているケースを検出
        if (prop.type === "rich_text" && Array.isArray(prop.rich_text)) {
          prop.rich_text.forEach((rt) => {
            if (rt.type === "text" && rt.text && rt.text.content) {
              const matches = rt.text.content.match(
                /https?:\/\/[\w\-\.\/:?=&%]+/g,
              );
              if (matches) matches.forEach((m) => urls.add(m));
            }
          });
        }
      } catch (e) {
        // ignore
      }
    });
  }

  return Array.from(urls);
}

async function extractUrlsFromBlocks(pageId) {
  const urls = new Set();
  let cursor = undefined;
  while (true) {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    });

    for (const block of res.results || []) {
      try {
        if (block.type === "image" && block.image) {
          const u = tryGetFileUrl(block.image);
          if (u) urls.add(u);
        }
        if (
          (block.type === "file" || block.type === "video") &&
          block[block.type]
        ) {
          const u = tryGetFileUrl(block[block.type]);
          if (u) urls.add(u);
        }
        // embed/bookmark may contain external urls
        if (block.type === "bookmark" && block.bookmark && block.bookmark.url) {
          urls.add(block.bookmark.url);
        }
        if (block.type === "embed" && block.embed && block.embed.url) {
          urls.add(block.embed.url);
        }
      } catch (e) {
        // ignore
      }
    }

    if (!res.has_more) break;
    cursor = res.next_cursor;
  }
  return Array.from(urls);
}

function basenameFromUrl(url) {
  try {
    const u = new URL(url);
    const name = path.basename(u.pathname) || "file";
    return decodeURIComponent(name.split("?")[0]) || "file";
  } catch (e) {
    return "file";
  }
}

async function downloadToFile(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await streamPipeline(res.body, fs.createWriteStream(dest));
    return true;
  } catch (err) {
    console.error("download error", url, err.message || err);
    return false;
  }
}

(async () => {
  console.log("Starting Notion image download...");
  const pages = await queryAllPages();
  console.log(`Found ${pages.length} pages in database.`);

  let total = 0;
  let downloaded = 0;

  for (const page of pages) {
    const pageId = page.id;
    const pageDir = path.join(OUT_ROOT, pageId);
    const pageUrls = new Set();

    // page-level
    extractUrlsFromPage(page).forEach((u) => pageUrls.add(u));

    // blocks
    const blockUrls = await extractUrlsFromBlocks(pageId);
    blockUrls.forEach((u) => pageUrls.add(u));

    if (pageUrls.size === 0) continue;

    let idx = 0;
    for (const url of pageUrls) {
      total++;
      const base = basenameFromUrl(url);
      const safeBase = base.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filename = `${idx.toString().padStart(3, "0")}-${safeBase}`;
      const dest = path.join(pageDir, filename);
      const exists = fs.existsSync(dest);
      if (exists) {
        console.log("exists:", dest);
        idx++;
        continue;
      }
      const ok = await downloadToFile(url, dest);
      if (ok) downloaded++;
      idx++;
    }
  }

  console.log(`Done. Total URLs: ${total}, downloaded: ${downloaded}`);
})();
