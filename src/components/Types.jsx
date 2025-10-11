import React, { useState } from "react";

const longText = `A modular kitchen design is a style statement and a product
of modern interior designing concept. With kitchen being one of the
most used parts of the home, everyone deserves a glamorous modular
kitchen design that’s affordable. A modular kitchen is made up of
multiple modules or individual parts organized together to create a
completely functional kitchen. In modern times, these modular kitchen
designs have become popular because of their functionality and sleek
style, with appliances, smooth finishes, and customized storage
options for even small spaces. We at Vijay's Modular Kitchen
specialize in creating tailored designs — from L-shaped, U-shaped,
Parallel, Straight, to Island kitchens — combining aesthetics with
practical elegance.`;

export default function Types({ selectedType, onSelectType }) {
  const [expanded, setExpanded] = useState(false);
  const types = [
    { key: "ALL", label: "All" },
    { key: "L", label: "L-shaped" },
    { key: "U", label: "U-shaped" },
    { key: "P", label: "Parallel" },
    { key: "S", label: "Straight" },
    { key: "I", label: "Island" },
  ];

  return (
    <section className="section" id="types">
      <div className="container-1200">
        <div className="title">
          <h2>Modular Kitchen for all styles</h2>
          <div className="divider"></div>
          <p className="font-14" id="kitchenText">
            {expanded ? longText : `${longText.slice(0, 420)}...`}
          </p>

          <button
            className="btn morebtn"
            onClick={() => setExpanded((v) => !v)}
            style={{ marginTop: 8 }}
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <div className="list-type" style={{ marginTop: 24 }}>
            {types.map((t) => (
              <button
                key={t.key}
                onClick={() => onSelectType(t.key)}
                className={`list-box kitchen-type-box ${
                  selectedType === t.key ? "active" : ""
                }`}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 6,
                  cursor: "pointer",
                }}
                aria-pressed={selectedType === t.key}
              >
                <div
                  className="type-img-wrap"
                  style={{ width: 140, height: 140 }}
                >
                  {/* For icons, you can use dedicated small images from /assets/icon*.jpg */}
                  <img
                    src={`/assets/icon${types.indexOf(t) + 1}.jpg`}
                    alt={t.label}
                    className="type-icon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <p className="font-14" style={{ marginTop: 10 }}>
                  {t.label.toUpperCase()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Scoped Styles */}
      <style>{`
        .kitchen-type-box {
          text-align: center;
          text-decoration: none;
          flex: 1 1 160px;
          max-width: 200px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .kitchen-type-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .type-img-wrap {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: border 0.3s ease;
          border: 3px solid transparent;
        }
        .kitchen-type-box:hover .type-img-wrap {
          border: 3px solid #f3601e;
        }
        .type-icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .kitchen-type-box p {
          font-size: 1rem;
          font-weight: 700;
          color: #222;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        @media (min-width: 1400px) {
          .type-img-wrap {
            width: 200px;
            height: 200px;
          }
        }
        @media (max-width: 1024px) {
          .type-img-wrap {
            width: 140px;
            height: 140px;
          }
        }
        @media (max-width: 768px) {
          .list-type {
            flex-wrap: wrap;
            gap: 18px;
            justify-content: center;
          }
          .type-img-wrap {
            width: 120px;
            height: 120px;
          }
        }
        @media (max-width: 480px) {
          .type-img-wrap {
            width: 100px;
            height: 100px;
          }
          .kitchen-type-box p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
