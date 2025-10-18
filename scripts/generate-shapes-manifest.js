// ESM-safe version (works when "type": "module" in package.json)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// reconstruct __dirname (not defined in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shapesDir = path.join(__dirname, "..", "public", "assets", "shapes");
const outFile = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "shapes-manifest.json",
);

function walk(dir, base = "") {
  let results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    const rel = path.join(base, f.name);
    if (f.isDirectory()) {
      results = results.concat(walk(full, rel));
    } else if (/\.(jpe?g|png|webp|gif|svg)$/i.test(f.name)) {
      results.push(rel.split(path.sep).join("/"));
    }
  }
  return results;
}

if (!fs.existsSync(shapesDir)) {
  console.error(`❌ Directory not found: ${shapesDir}`);
  process.exit(1);
}

const files = walk(shapesDir);
files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(files, null, 2), "utf8");

console.log(`✅ Wrote ${files.length} entries to ${outFile}`);
