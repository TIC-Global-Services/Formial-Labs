#!/usr/bin/env node
/**
 * Assigns a `category` to every scraped blog post based on its content/topic.
 * Reads/writes content/blogs/{slug}.json and content/blogs/index.json in place.
 *
 * Usage: node scripts/categorize-blogs.mjs
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "..", "content", "blogs");

export const CATEGORIES = [
  "Acne",
  "Skincare Routine",
  "Ingredients & Actives",
  "Sun Care",
  "Skin Conditions & Health",
  "Diet & Lifestyle",
  "Personalized & Prescription Skincare",
  "Industry Insights & Myths",
  "Mental Health",
];

// Manually reviewed against each article's title/excerpt/body.
const CATEGORY_MAP = {
  "acne-won-t-heal-itself-here-s-what-happens-if-you-wait-too-long": "Acne",
  "what-is-acne-and-how-to-treat-it-causes-types-effective-solutions": "Acne",
  "the-modern-man-s-guide-to-clear-glowing-skin": "Skincare Routine",
  "the-ultimate-guide-to-choosing-your-sunscreen-everything-you-need-to-know": "Sun Care",
  "skincare-simplified-how-to-start-with-the-best-order": "Skincare Routine",
  "beginner-guide-skincare-for-the-skeptical-beginner": "Skincare Routine",
  "serum-or-moisturizer-first-learn-the-right-order-how-to-apply-serum-properly": "Skincare Routine",
  "why-your-morning-skincare-and-evening-skincare-routine-should-be-different": "Skincare Routine",
  "do-collagen-supplements-really-work-for-skin-science-myths-benefits-explained": "Ingredients & Actives",
  "what-is-the-best-skincare-for-dry-skin": "Skin Conditions & Health",
  "glutathione-for-skin-brightening-is-it-a-path-to-lighter-skin": "Ingredients & Actives",
  "tretinoin-for-sensitive-skin-your-guide-to-safe-glowing-result": "Ingredients & Actives",
  "your-guide-to-balancing-hair-removal-and-active-skincare-1": "Ingredients & Actives",
  "can-you-combine-tretinoin-with-cosmetic-procedures-heres-what-you-should-know": "Ingredients & Actives",
  "pollution-and-your-skin-understanding-the-invisible-threat-and-what-can-be-done-about-it":
    "Skin Conditions & Health",
  "effect-of-thyroid-disorders-on-skin-health": "Skin Conditions & Health",
  "milk-and-acne-could-your-dairy-habit-be-causing-breakouts": "Diet & Lifestyle",
  "choosing-your-skincare-products-packaging-branding-ingredients-price": "Industry Insights & Myths",
  "best-practices-for-storing-your-formial-pump": "Personalized & Prescription Skincare",
  "faqs-on-tretinoin-what-no-one-tells-you-about-acne-aging-and-irritation": "Ingredients & Actives",
  "skin-myths-busted-truth-vs-marketing-in-the-indian-skincare-industry": "Industry Insights & Myths",
  "chemical-peels-for-acne-in-indian-skin-what-works-what-doesn-t-and-what-to-watch-out-for": "Acne",
  "the-hidden-dangers-of-diy-skincare-steroid-abuse-exogenous-ochronosis-and-acne-scarring":
    "Industry Insights & Myths",
  "why-formial-s-prescription-skincare-is-revolutionizing-the-indian-skincare-industry":
    "Personalized & Prescription Skincare",
  "myth-vs-reality-is-fragrance-in-skincare-harmful": "Ingredients & Actives",
  "how-to-build-a-skincare-routine-the-dermatologist-way": "Skincare Routine",
  "unleashing-the-power-of-personalized-skincare-why-online-prescription-skincare-delivers-superior-results":
    "Personalized & Prescription Skincare",
  "korean-beauty-k-beauty-what-does-the-evidence-say": "Industry Insights & Myths",
  "diet-and-acne-an-indian-perspective": "Diet & Lifestyle",
  "skincare-industry-manufacturing-models-why-in-house-compounding-is-the-gold-standar":
    "Personalized & Prescription Skincare",
  "formial-s-personalised-skincare-how-does-it-really-work": "Personalized & Prescription Skincare",
  "the-evolution-of-skincare-in-india-shifting-to-tailored-approaches-with-a-focus-on-doctor-led-skincare":
    "Industry Insights & Myths",
  "the-most-evidence-based-anti-aging-ingredient-retinoids": "Ingredients & Actives",
  "decoding-the-10-step-skincare-routine-necessity-or-overkill": "Skincare Routine",
  "why-does-otc-skincare-fail": "Personalized & Prescription Skincare",
  "beyond-the-chemist-the-power-of-prescription-skincare": "Personalized & Prescription Skincare",
  "is-acne-a-medical-or-a-cosmetic-condition": "Acne",
  "ingredient-transparency-what-you-need-to-know-about-your-formulations":
    "Personalized & Prescription Skincare",
  "reducing-the-environmental-impact-of-skincare": "Industry Insights & Myths",
  "psychosocial-impacts-of-acne-beyond-the-surface": "Mental Health",
};

async function main() {
  const files = (await readdir(CONTENT_DIR)).filter(
    (f) => f.endsWith(".json") && f !== "index.json"
  );

  let updated = 0;
  let missing = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const record = JSON.parse(await readFile(filePath, "utf-8"));
    const category = CATEGORY_MAP[record.slug];
    if (!category) {
      missing.push(record.slug);
      continue;
    }

    const { slug, url, title, date, readTime, excerpt, ...rest } = record;
    const reordered = { slug, url, title, date, readTime, category, excerpt, ...rest };
    await writeFile(filePath, JSON.stringify(reordered, null, 2));
    updated++;
  }

  const indexPath = path.join(CONTENT_DIR, "index.json");
  const index = JSON.parse(await readFile(indexPath, "utf-8"));
  const newIndex = index.map((entry) => {
    const category = CATEGORY_MAP[entry.slug];
    if (!category) missing.push(entry.slug);
    const { slug, url, title, date, readTime, excerpt, ...rest } = entry;
    return { slug, url, title, date, readTime, category, excerpt, ...rest };
  });
  await writeFile(indexPath, JSON.stringify(newIndex, null, 2));

  console.log(`Updated ${updated} post files + index.json.`);
  if (missing.length) {
    console.warn(`Missing category for: ${[...new Set(missing)].join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
