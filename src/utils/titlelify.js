// src/utils/titleify.js
export function filenameToTitle(filepath) {
  if (!filepath) return "";

  // 1. Get filename (last path part)
  const parts = filepath.split("/").filter(Boolean);
  const basename = parts[parts.length - 1];

  // 2. Remove extension
  let s = basename.replace(/\.(webp|jpg|jpeg|png|gif)$/i, "");

  // 3. Replace separators
  s = s.replace(/[_]+/g, " ").replace(/[-]+/g, " ");

  // 4. Remove trailing codes like -P1, _L3, -I7, _w5, etc.
  s = s.replace(/\b([lupsiwbtad])\d+\b/gi, ""); // remove codes (L,U,P,S,I,W,B,T,A,D)
  s = s.replace(/\b(p|pattern)\b/gi, ""); // remove explicit 'pattern' if appears as suffix or standalone
  s = s.replace(/\bcopy\b|\bfinal\b|\bedit\b/gi, ""); // optional junk cleanup
  s = s.replace(/\s+\b(w|b|d|t)\d+\b/i, ""); // just in case code remains after space

  // 5. Trim leftover multiple spaces or dangling hyphens
  s = s
    .replace(/\s{2,}/g, " ")
    .replace(/\s+-\s+/g, " ")
    .trim();

  // 6. Token map for acronyms and known words
  const tokenMap = {
    "3d": "3D",
    tv: "TV",
    puja: "Puja",
    cnc: "CNC",
    mdf: "MDF",
    uv: "UV",
  };

  // 7. Title case each word, respecting the tokenMap
  const words = s.split(" ").map((w) => {
    const low = w.toLowerCase();
    if (tokenMap[low]) return tokenMap[low];
    // keep “and”, “with”, “of” lower-case unless first word
    const smallWords = ["and", "with", "of", "in", "for", "to", "the"];
    if (smallWords.includes(low)) return low;
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });

  // 8. Join and clean spacing
  let title = words.join(" ").replace(/\s+/g, " ").trim();

  return title;
}
