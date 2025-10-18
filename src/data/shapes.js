// src/data/shapes.js
export async function loadShapesManifest() {
  try {
    const res = await fetch("/assets/shapes-manifest.json", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("Could not load shapes-manifest.json:", res.status);
      return [];
    }
    const list = await res.json(); // array of relative paths, maybe with or without 'shapes/' prefix
    // Normalize: ensure each entry starts with 'shapes/' and use forward slashes
    return list.map((p) => {
      const pp = p.split("\\").join("/"); // windows-safe
      return pp.startsWith("shapes/") ? pp : `shapes/${pp}`;
    });
  } catch (err) {
    console.error("Error loading shapes manifest:", err);
    return [];
  }
}

// tagsForFilename unchanged (your existing tagging function)
export function tagsForFilename(fname) {
  const low = fname.toLowerCase();
  const tags = [];

  if (/\b(l-|l_|l-shaped|\bl\b)/i.test(low) || /-l\d/i.test(low))
    tags.push("L");
  if (/\b(u-|u_|u-shaped|\bu\b)/i.test(low) || /-u\d/i.test(low))
    tags.push("U");
  if (/\b(p-|parallel|parallel-modular|\bp\b)/i.test(low) || /-p\d/i.test(low))
    tags.push("P");
  if (/\b(s-|straight|straight-modular|\bs\b)/i.test(low) || /-s\d/i.test(low))
    tags.push("S");
  if (/\b(i-|island|island-modular|\bi\b)/i.test(low) || /-i\d/i.test(low))
    tags.push("I");

  if (/\btv\b|television|tv[-_\s]?unit/i.test(low) || low.includes("/tv unit/"))
    tags.push("T");
  if (/\bbedroom\b|bed[-_\s]?room/i.test(low) || low.includes("/bedroom unit/"))
    tags.push("B");
  if (
    /\bwardrobe\b|warerod|wardrobes/i.test(low) ||
    low.includes("/warerodes/")
  )
    tags.push("W");
  if (
    /\bdoor\b|puja|puja[-_\s]?door|door unit/i.test(low) ||
    low.includes("/door unit/")
  )
    tags.push("D");

  if (tags.length === 0) tags.push("P");
  return Array.from(new Set(tags));
}
