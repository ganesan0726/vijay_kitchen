// src/components/Projects.jsx
import React, { useEffect, useState } from "react";
import ProjectModal from "./ProjectModel";
import { loadShapesManifest, tagsForFilename } from "../data/shapes";
import { filenameToTitle } from "../utils/titlelify"; // keep your existing import

export default function Projects({
  selectedService = "All",
  selectedType = "ALL",
}) {
  const [gallery, setGallery] = useState([]);
  const [open, setOpen] = useState(null);

  // pagination state
  const INITIAL_COUNT = 8;
  const LOAD_MORE_COUNT = 4;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await loadShapesManifest(); // entries: 'shapes/...'
      const items = list.map((p) => {
        const normalized = p.split("\\").join("/"); // windows safe
        const publicPath = encodeURI(`/assets/${normalized}`); // final img src
        const title = filenameToTitle(normalized); // human friendly title
        return {
          src: publicPath,
          filename: normalized,
          tags: tagsForFilename(normalized),
          title,
        };
      });
      if (mounted) setGallery(items);
    })();
    return () => (mounted = false);
  }, []);

  // reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [selectedService, selectedType]);

  // filtering logic
  const filtered = gallery.filter((it) => {
    // SERVICE filter
    if (selectedService && selectedService !== "All") {
      if (selectedService === "Modular Kitchen") {
        const hasMod = it.tags.some((t) =>
          ["L", "U", "P", "S", "I"].includes(t),
        );
        if (!hasMod) return false;
      } else if (selectedService === "TV Unit") {
        if (!it.tags.includes("T")) return false;
      } else if (selectedService === "Bedroom") {
        if (!it.tags.includes("B")) return false;
      } else if (selectedService === "Wardrobes") {
        if (!it.tags.includes("W")) return false;
      } else if (selectedService === "Doors & Puja") {
        if (!it.tags.includes("D")) return false;
      }
    }

    // TYPE filter (applies across modular images)
    if (selectedType && selectedType !== "ALL") {
      return it.tags.includes(selectedType);
    }
    return true;
  });

  // visible slice
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // fallback image (in case one is missing). Put a small placeholder in public/assets/placeholder.png
  const placeholder = "/assets/placeholder.png";

  const handleLoadMore = () => {
    setVisibleCount((v) => Math.min(v + LOAD_MORE_COUNT, filtered.length));
  };

  return (
    <section id="projects" className="section">
      <div className="container-1200">
        <h2>Design Ideas</h2>
        <p className="font-14">
          Browse designs. Click any image for quick view.
        </p>

        <div className="grid" style={{ marginTop: 18 }}>
          {visibleItems.length === 0 && (
            <div style={{ padding: 24 }}>
              No images found for this selection.
            </div>
          )}

          {visibleItems.map((it, idx) => (
            <div className="grid-item" key={`${it.filename}-${idx}`}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(it);
                }}
              >
                <figure>
                  <img
                    src={it.src}
                    alt={it.filename}
                    loading="lazy"
                    onError={(e) => {
                      console.warn("Image failed:", it.src);
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholder;
                    }}
                  />
                </figure>
                <div className="text-overflow">
                  <p className="font-14 name">{it.title}</p>
                  <span className="quick-view">QUICK VIEW</span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Load more area */}
        {filtered.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            {hasMore ? (
              <button className="btn btn-primary" onClick={handleLoadMore}>
                Load more
              </button>
            ) : (
              // optionally show a subtle message when everything is loaded
              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                You’ve reached the end.
              </div>
            )}
          </div>
        )}
      </div>

      {open && <ProjectModal item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
