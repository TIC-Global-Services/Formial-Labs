#!/usr/bin/env node
/**
 * One-off repair for double-encoded HTML entities (e.g. "&amp;amp;" -> "&amp;")
 * left in title/excerpt/editor/author fields by an earlier version of
 * scrape-blogs.mjs's decodeEntities(). Re-decodes those plain-text fields
 * in place across content/blogs/*.json. bodyHtml is left untouched (it's
 * real HTML, rendered via dangerouslySetInnerHTML, so entities there are
 * correct as-is).
 *
 * Usage: node scripts/fix-entities.mjs
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "..", "content", "blogs");

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

async function main() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".json"));
  let changed = 0;

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    const fix = (record) => {
      if (record.title) record.title = decodeEntities(record.title);
      if (record.excerpt) record.excerpt = decodeEntities(record.excerpt);
      if (record.editor) record.editor = decodeEntities(record.editor);
      if (record.author?.name) record.author.name = decodeEntities(record.author.name);
      if (record.author?.creds) record.author.creds = decodeEntities(record.author.creds);
    };

    if (Array.isArray(data)) {
      data.forEach(fix);
    } else {
      fix(data);
    }

    const updated = JSON.stringify(data, null, 2);
    if (updated !== raw) {
      await writeFile(filePath, updated);
      changed++;
    }
  }

  console.log(`Fixed entities in ${changed}/${files.length} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
