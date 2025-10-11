import React, { useState, useMemo } from "react";
import ProjectModal from "./ProjectModel";
import { SHAPES } from "../data/shapes";

function filenameToTitle(fname) {
  // remove file extension
  const name = fname.replace(/\.(webp|jpg|jpeg|png)$/i, "");

  // remove trailing codes like "-L1", "_U2", etc.
  const cleaned = name
    .replace(/[-_]\w*[-_]*[LUPSI]\d*$/i, "")
    .replace(/[-_]+/g, " ");

  // convert to Title Case (first letter of each word uppercase)
  return cleaned
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
function matchesType(fname, typeKey) {
  if (typeKey === "ALL") return true;
  const re = new RegExp(`${typeKey}\\d`, "i");
  return re.test(fname);
}

export default function Projects({ selectedType = "ALL" }) {
  const [open, setOpen] = useState(null);

  const items = useMemo(() => {
    const filtered = SHAPES.filter((f) => matchesType(f, selectedType));
    return filtered.slice(0, 8).map((f, idx) => ({
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
