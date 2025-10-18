// src/components/OutputGallery.jsx
import React, { useEffect, useState, useRef } from "react";

export default function OutputGallery({ title = "Our Work — Output Gallery" }) {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/assets/output-manifest.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("manifest not found");
        const list = await res.json();
        if (!Array.isArray(list)) throw new Error("manifest must be an array");
        if (mounted) {
          const mapped = list.map((p) => {
            const cleaned = String(p).replace(/^\/+/, "");
            return {
              src: encodeURI(`/assets/output/${cleaned}`),
              name: cleaned,
            };
          });
          setItems(mapped);
        }
      } catch (err) {
        console.warn(
          "Could not load output-manifest.json — falling back to none",
          err,
        );
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // autoplay: optional, change interval if you want
  useEffect(() => {
    if (!items.length) return;
    autoplayRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(autoplayRef.current);
  }, [items]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items]);

  const prev = () => {
    if (!items.length) return;
    setIdx((i) => (i - 1 + items.length) % items.length);
    resetAutoplay();
  };
  const next = () => {
    if (!items.length) return;
    setIdx((i) => (i + 1) % items.length);
    resetAutoplay();
  };
  const openLightbox = (i) => {
    setIdx(i);
    setLightboxOpen(true);
    resetAutoplay();
  };
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setIdx((i) => (i + 1) % items.length);
      }, 6000);
    }
  };

  // adaptively set objectFit: prefer 'cover' for wide images, but let browser handle; we'll center and contain via CSS
  return (
    <section id="output-gallery" className="section">
      <div className="container-1200">
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2>{title}</h2>
          <p className="font-14">
            Real project outputs — click an image to view larger.
          </p>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            Loading gallery…
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            No output images found. Place files in{" "}
            <code>/public/assets/output/</code>
            and an array manifest at{" "}
            <code>/public/assets/output-manifest.json</code>.
          </div>
        ) : (
          <>
            <div className="output-main">
              <button
                aria-label="Previous"
                className="arrow left"
                onClick={prev}
                type="button"
              >
                ‹
              </button>

              <div
                className="image-frame"
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(idx)}
                title="Open lightbox"
              >
                <img
                  src={items[idx].src}
                  alt={items[idx].name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.opacity = 0.4;
                    e.currentTarget.alt = "Image not available";
                  }}
                />
              </div>

              <button
                aria-label="Next"
                className="arrow right"
                onClick={next}
                type="button"
              >
                ›
              </button>
            </div>

            <div className="thumbs" aria-hidden={lightboxOpen}>
              {items.map((it, i) => (
                <button
                  key={it.name + i}
                  className={`thumb ${i === idx ? "active" : ""}`}
                  onClick={() => {
                    setIdx(i);
                    resetAutoplay();
                  }}
                  type="button"
                  aria-pressed={i === idx}
                  title={it.name}
                >
                  <img src={it.src} alt={it.name} loading="lazy" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && items[idx] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lb-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <button
              className="lb-prev"
              onClick={() =>
                setIdx((i) => (i - 1 + items.length) % items.length)
              }
              aria-label="Previous"
            >
              ‹
            </button>
            <img src={items[idx].src} alt={items[idx].name} />
            <button
              className="lb-next"
              onClick={() => setIdx((i) => (i + 1) % items.length)}
              aria-label="Next"
            >
              ›
            </button>
            <div className="lb-caption">{items[idx].name}</div>
          </div>
        </div>
      )}

      {/* Scoped styles */}
      <style>{`
        /* gallery layout */
        .output-main {
          display: grid;
          grid-template-columns: 56px 1fr 56px;
          gap: 12px;
          align-items: center;
          justify-items: center;
          margin-bottom: 14px;
        }
        .arrow {
          background: rgba(0,0,0,0.06);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          font-size: 28px;
          display: inline-grid;
          place-items: center;
          cursor: pointer;
        }
        .arrow:hover { transform: translateY(-2px); background: rgba(0,0,0,0.09); }

        .image-frame {
          width: 100%;
          max-height: 520px;
          border-radius: 12px;
          overflow: hidden;
          display:flex;
          align-items:center;
          justify-content:center;
          background: #f7f7f7;
          cursor: zoom-in;
        }
        .image-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 520px;
          display: block;
        }

        /* thumbnails */
        .thumbs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 8px 6px;
          align-items: center;
          justify-content: flex-start;
          scrollbar-width: thin;
          margin-top: 8px;
        }
        .thumb {
          border: none;
          padding: 0;
          background: transparent;
          border-radius: 8px;
          flex: 0 0 auto;
          width: 110px;
          height: 70px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .thumb.active {
          box-shadow: 0 10px 28px rgba(0,0,0,0.12);
          outline: 3px solid rgba(243,96,30,0.12);
        }

        /* lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 28px;
        }
        .lightbox-inner {
          position: relative;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-inner img {
          width: 100%;
          height: auto;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          display: block;
        }
        .lb-close, .lb-prev, .lb-next {
          position: absolute;
          background: rgba(0,0,0,0.4);
          border: none;
          color: #fff;
          font-size: 18px;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          cursor: pointer;
        }
        .lb-close { top: -12px; right: -12px; transform: translate(0,-50%); }
        .lb-prev { left: -56px; top: 50%; transform: translateY(-50%); }
        .lb-next { right: -56px; top: 50%; transform: translateY(-50%); }
        .lb-caption {
          margin-top: 8px;
          color: #fff;
          text-align: center;
          font-size: 14px;
        }

        /* responsive */
        @media (max-width: 900px) {
          .output-main { grid-template-columns: 44px 1fr 44px; }
          .thumb { width: 90px; height: 60px; }
        }
        @media (max-width: 520px) {
          .output-main { grid-template-columns: 36px 1fr 36px; }
          .thumb { width: 72px; height: 54px; }
          .image-frame { max-height: 360px; }
        }
      `}</style>
    </section>
  );
}
