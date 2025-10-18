import React, { useState } from "react";
import Types from "./Types"; // reuse your existing Types component

const longText = `We design beautiful, functional spaces across the home — not just kitchens.
Vijay's Smart Kitchen offers end-to-end design & installation for Modular Kitchens,
TV Units, Bedrooms, Wardrobes, Doors and Puja units. Our approach balances
aesthetic finishes, smart storage, and durable hardware to create spaces that
look great and work harder every day.`;

export default function Services({
  selectedService = "All",
  onSelectService = () => {},
  selectedType = "ALL",
  onSelectType = () => {},
}) {
  const [expanded, setExpanded] = useState(false);

  const services = [
    { key: "All", label: "All Designs" },
    { key: "Modular Kitchen", label: "Modular Kitchen" },
    { key: "TV Unit", label: "TV Unit" },
    { key: "Bedroom", label: "Bedroom" },
    { key: "Wardrobes", label: "Wardrobes" },
    { key: "Doors & Puja", label: "Doors & Puja" },
  ];

  return (
    <section id="services" className="section">
      <div className="container-1200">
        <div className="title">
          <h2>Designs for every room</h2>
          <div className="divider" />
          <p className="font-14" id="servicesText">
            {expanded ? longText : `${longText.slice(0, 240)}...`}
          </p>

          <button
            className="btn morebtn"
            onClick={() => setExpanded((v) => !v)}
            style={{ marginTop: 8 }}
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <div className="list-type">
            {services.map((s) => (
              <button
                key={s.key}
                onClick={() => onSelectService(s.key)}
                className={`list-box kitchen-type-box ${
                  selectedService === s.key ? "active" : ""
                }`}
                style={{
                  border:
                    selectedService === s.key
                      ? "2px solid var(--accent)"
                      : "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 50,
                  background:
                    selectedService === s.key
                      ? "rgba(243,96,30,0.06)"
                      : "transparent",
                  padding: "10px 18px",
                  cursor: "pointer",
                  minWidth: 160,
                  textAlign: "center",
                }}
                aria-pressed={selectedService === s.key}
              >
                <p className="font-14" style={{ margin: 0, fontWeight: 700 }}>
                  {s.label.toUpperCase()}
                </p>
              </button>
            ))}
          </div>

          {/* When Modular Kitchen is selected: show the modular Types selector */}
          {selectedService === "Modular Kitchen" && (
            <Types selectedType={selectedType} onSelectType={onSelectType} />
          )}
        </div>
      </div>

      {/* Inline styles for the service buttons (minimal; keeps existing look) */}
      <style>{`
        .kitchen-type-box { transition: transform 0.18s ease, box-shadow 0.18s ease; display: inline-flex; align-items: center; justify-content: center; }
        .kitchen-type-box:hover { transform: translateY(-4px); box-shadow: 0 8px 18px rgba(0,0,0,0.06); }
        @media (max-width: 768px) {
          .list-type { gap: 12px; align-items: center; display: flex; justify-content: center; }
          .kitchen-type-box { min-width: 140px; padding: 8px 12px; }
        }
      `}</style>
    </section>
  );
}
