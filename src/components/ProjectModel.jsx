import React from "react";

export default function ProjectModal({ item, onClose }) {
  const PHONE = "919732475787";
  const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hello Vijay! I'm interested in a modular kitchen. I liked: " + item.title,
  )}`;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 120,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
        onClick={onClose}
      />
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "min(920px,95%)",
          zIndex: 121,
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: 380,
              height: 260,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <p className="font-14">
              Beautiful modular design — custom cabinetry, smart storage and
              premium finishes.
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <a
                className="btn btn-primary"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                Contact on WhatsApp
              </a>
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
              Filename: {item.filename}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
