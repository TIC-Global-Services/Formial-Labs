#!/usr/bin/env node
/**
 * Scrapes all blog articles from https://formial.in/blogs/skindeep
 * Downloads every image referenced by an article into
 *   public/assets/blogs/{slug}/
 * and writes structured data into
 *   content/blogs/{slug}.json
 *   content/blogs/index.json  (summary of all posts)
 *
 * Usage: node scripts/scrape-blogs.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "public", "assets", "blogs");
const CONTENT_DIR = path.join(ROOT, "content", "blogs");

const SITE = "https://formial.in";
const SITEMAP_URL = `${SITE}/sitemap_blogs_1.xml`;
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; FormialBlogScraper/1.0)" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function decodeEntities(str = "") {
  let prev = str;
  for (let i = 0; i < 3; i++) {
    const next = prev
      .replace(/&#39;/g, "'")
      .replace(/&#8217;/g, "’")
      .replace(/&#8216;/g, "‘")
      .replace(/&#8220;/g, "“")
      .replace(/&#8221;/g, "”")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ");
    if (next === prev) break;
    prev = next;
  }
  return prev.trim();
}

function slugFromUrl(url) {
  return url.replace(/\/$/, "").split("/").pop();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function getArticleUrls() {
  const xml = await fetchText(SITEMAP_URL);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls.filter((u) => /\/blogs\/skindeep\/.+/.test(u));
}

// Balanced-tag extraction: returns the inner HTML of the div starting at
// `startIdx` (index of the opening "<div") up to (not including) its
// matching closing "</div>".
function extractDivInner(html, startIdx) {
  const openTagEnd = html.indexOf(">", startIdx) + 1;
  let depth = 1;
  const re = /<div\b|<\/div>/gi;
  re.lastIndex = openTagEnd;
  let match;
  while ((match = re.exec(html))) {
    if (match[0].toLowerCase() === "<div" || match[0].toLowerCase().startsWith("<div")) {
      depth++;
    } else {
      depth--;
    }
    if (depth === 0) {
      return html.slice(openTagEnd, match.index);
    }
  }
  return html.slice(openTagEnd);
}

function findDivByClass(html, className) {
  const marker = `class="${className}"`;
  const classIdx = html.indexOf(marker);
  if (classIdx === -1) return null;
  const divStart = html.lastIndexOf("<div", classIdx);
  if (divStart === -1) return null;
  return extractDivInner(html, divStart);
}

function extractImages(html) {
  return [...html.matchAll(/<img\s+[^>]*?src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*>/gi)].map(
    (m) => {
      // alt may appear before src; re-check within the whole tag
      const tag = m[0];
      const altMatch = tag.match(/alt="([^"]*)"/i);
      return { src: m[1], alt: altMatch ? decodeEntities(altMatch[1]) : "" };
    }
  );
}

function normalizeSrc(src) {
  if (src.startsWith("//")) return `https:${src}`;
  if (src.startsWith("/")) return `${SITE}${src}`;
  return src;
}

// Third-party widget assets (e.g. Trustpilot stars in CTA blocks) aren't
// part of the article content and shouldn't be mirrored per-blog.
function isContentImage(src) {
  return !/cdn\.trustpilot\.net/i.test(src);
}

function filenameFromSrc(src, usedNames) {
  const noQuery = src.split("?")[0];
  let base = decodeURIComponent(path.basename(noQuery));
  if (!base) base = "image";
  let candidate = base;
  let i = 1;
  while (usedNames.has(candidate.toLowerCase())) {
    const ext = path.extname(base);
    const stem = base.slice(0, base.length - ext.length);
    candidate = `${stem}-${i}${ext}`;
    i++;
  }
  usedNames.add(candidate.toLowerCase());
  return candidate;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Image fetch failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

function parseArticle(html, url) {
  const slug = slugFromUrl(url);

  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1];
  const title = decodeEntities(ogTitle || h1 || slug);

  const excerpt = decodeEntities(
    html.match(/<meta property="og:description" content="([^"]*)"/)?.[1] || ""
  );

  const heroImageRemote = html.match(
    /<meta property="og:image:secure_url" content="([^"]*)"/
  )?.[1];

  const metaBlock = html.match(/class="blog-meta">([\s\S]*?)<\/p>/)?.[1] || "";
  const metaParts = metaBlock
    .split("|")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const date = metaParts[0] || "";
  const readTime = metaParts.find((p) => /read/i.test(p)) || metaParts[1] || "";

  const authorBox = html.match(/<div class="author-box">([\s\S]*?)<\/div>\s*<\/div>/)?.[1] || "";
  const authorImage = authorBox.match(/<img src="([^"]+)"/)?.[1] || "";
  const authorName = decodeEntities(
    authorBox.match(/class="author-name">([^<]*)</)?.[1] || ""
  );
  const authorCreds = decodeEntities(
    authorBox.match(/class="author-creds">([^<]*)</)?.[1] || ""
  );

  const editorBlock = html.match(/<div class="editor">([\s\S]*?)<\/div>/)?.[1] || "";
  const editor = decodeEntities(editorBlock.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));

  const bodyHtml = findDivByClass(html, "blog-content") || "";
  const bodyImages = extractImages(bodyHtml).map((img) => ({
    ...img,
    src: normalizeSrc(img.src),
  }));

  return {
    slug,
    url,
    title,
    date,
    readTime,
    excerpt,
    author: { name: authorName, creds: authorCreds, image: authorImage ? normalizeSrc(authorImage) : "" },
    editor,
    heroImage: heroImageRemote ? normalizeSrc(heroImageRemote) : "",
    bodyHtml,
    bodyImages,
  };
}

async function processArticle(url) {
  console.log(`Fetching ${url}`);
  const html = await fetchText(url);
  const article = parseArticle(html, url);

  const blogDir = path.join(ASSETS_DIR, article.slug);
  await mkdir(blogDir, { recursive: true });

  const usedNames = new Set();
  const remoteToLocal = new Map();

  const allImages = [
    ...(article.heroImage ? [article.heroImage] : []),
    ...(article.author.image ? [article.author.image] : []),
    ...article.bodyImages.map((i) => i.src),
  ].filter(isContentImage);

  for (const remoteUrl of [...new Set(allImages)]) {
    const filename = filenameFromSrc(remoteUrl, usedNames);
    const destPath = path.join(blogDir, filename);
    const localPath = `/assets/blogs/${article.slug}/${filename}`;
    try {
      await downloadImage(remoteUrl, destPath);
      remoteToLocal.set(remoteUrl, localPath);
      console.log(`  saved ${filename}`);
    } catch (err) {
      console.warn(`  FAILED image ${remoteUrl}: ${err.message}`);
    }
    await sleep(100);
  }

  const heroImageLocal = remoteToLocal.get(article.heroImage) || article.heroImage;
  const authorImageLocal = remoteToLocal.get(article.author.image) || article.author.image;

  let localBodyHtml = article.bodyHtml;
  for (const [remoteUrl, localPath] of remoteToLocal) {
    localBodyHtml = localBodyHtml.split(remoteUrl).join(localPath);
  }

  const record = {
    slug: article.slug,
    url: article.url,
    title: article.title,
    date: article.date,
    readTime: article.readTime,
    excerpt: article.excerpt,
    author: { ...article.author, image: authorImageLocal },
    editor: article.editor,
    heroImage: heroImageLocal,
    bodyHtml: localBodyHtml,
    images: [...remoteToLocal.values()],
  };

  await writeFile(
    path.join(CONTENT_DIR, `${article.slug}.json`),
    JSON.stringify(record, null, 2)
  );

  return {
    slug: record.slug,
    url: record.url,
    title: record.title,
    date: record.date,
    readTime: record.readTime,
    excerpt: record.excerpt,
    heroImage: record.heroImage,
  };
}

async function main() {
  await mkdir(ASSETS_DIR, { recursive: true });
  await mkdir(CONTENT_DIR, { recursive: true });

  let urls = await getArticleUrls();
  console.log(`Found ${urls.length} articles.`);
  const limit = process.env.SCRAPE_LIMIT ? Number(process.env.SCRAPE_LIMIT) : null;
  if (limit) urls = urls.slice(0, limit);

  const summaries = [];
  for (const url of urls) {
    try {
      const summary = await processArticle(url);
      summaries.push(summary);
    } catch (err) {
      console.error(`FAILED article ${url}: ${err.message}`);
    }
    await sleep(200);
  }

  summaries.sort((a, b) => new Date(b.date) - new Date(a.date));
  await writeFile(
    path.join(CONTENT_DIR, "index.json"),
    JSON.stringify(summaries, null, 2)
  );

  console.log(`\nDone. ${summaries.length}/${urls.length} articles scraped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
