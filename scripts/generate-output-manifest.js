// scripts/generate-output-manifest.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// target folder
const outputDir = path.join(__dirname, "..", "public", "assets", "output");
const manifestFile = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "output-manifest.json",
);

// valid extensions
const exts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      // relative path inside /assets/output
      const rel = path.relative(outputDir, full).replace(/\\/g, "/");
      results.push(rel);
    }
  }
  return results;
}

if (!fs.existsSync(outputDir)) {
  console.error("❌ No folder found:", outputDir);
  process.exit(1);
}

const files = walk(outputDir).sort();
fs.writeFileSync(manifestFile, JSON.stringify(files, null, 2));
console.log(`✅ Generated ${manifestFile} with ${files.length} items.`);
