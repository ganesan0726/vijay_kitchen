import React, { useState, useMemo } from "react";
import ProjectModal from "./ProjectModel";
import { SHAPES } from "../data/shapes";

// utility: derive title from filename
function filenameToTitle(fname) {
  // remove extension
  const name = fname.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  // remove trailing code tokens like -L1 or -P3 or _L1 etc.
  const cleaned = name
    .replace(/[-_]\w*[-_]*[LUPS I]\d*$/i, "")
    .replace(/[-_]+/g, " ");
  // fallback: replace dashes with spaces and trim
  return cleaned.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

// helper to detect type code in filename
function matchesType(fname, typeKey) {
  if (typeKey === "ALL") return true;
  // detect letter before number like -L1, _L3 or -L-1 or ... we'll search for 'L' followed by a digit
  const re = new RegExp(`${typeKey}\\d`, "i");
  return re.test(fname);
}

export default function Projects({ selectedType = "ALL" }) {
  const [open, setOpen] = useState(null);

  // compute items (memoized)
  const items = useMemo(() => {
    const filtered = SHAPES.filter((f) => matchesType(f, selectedType));
    // pick up to 6 items (you can change limit)
    return filtered.slice(0, 6).map((f, idx) => ({
      id: idx + 1,
      title: filenameToTitle(f),
      img: `/assets/shapes/${f}`,
      filename: f,
    }));
  }, [selectedType]);

  return (
    <section id="projects" className="section">
      <div className="container-1200">
        <h2>Our Projects</h2>
        <p className="font-14">Preview of recent modular kitchen installs.</p>

        <div className="grid" style={{ marginTop: 18 }}>
          {items.length === 0 && (
            <div style={{ padding: 24 }}>
              No projects found for this category.
            </div>
          )}

          {items.map((it) => (
            <div className="grid-item" key={it.filename}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(it);
                }}
              >
                <figure>
                  <img src={it.img} alt={it.title} loading="lazy" />
                </figure>
                <div className="text-overflow">
                  <p className="font-14 name">{it.title}</p>
                  <span className="quick-view">QUICK VIEW</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {open && <ProjectModal item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
