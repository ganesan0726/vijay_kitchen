import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Footer() {
  const PHONE = "919732475787";
  const OWNER = "Vijayrajan";
  const MAP_LINK = "https://maps.app.goo.gl/J1db42qcLngLk2oT9?g_st=iw";
  const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `Hello ${OWNER}! I'm interested in your services.`,
  )}`;

  const scrollToContact = (e) => {
    e && e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.open(WA_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <footer
      className="footer-mid"
      aria-labelledby="footer-heading"
      style={{
        background: "#fff",
        borderTop: "1px solid #eee",
        padding: "24px 0",
      }}
    >
      <div className="container-1200">
        <h2 id="footer-heading" className="small" style={{ marginBottom: 12 }}>
          Get in touch
        </h2>

        <div
          className="footer-grid"
          style={{ display: "flex", justifyContent: "space-between", gap: 24 }}
        >
          <div className="footer-column">
            <span className="footer-head">Our Company</span>
            <nav
              className="footer-nav"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 8,
              }}
            >
              <a href="#" onClick={scrollToContact}>
                Book a Consultation
              </a>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                Find us on map
              </a>
              <a href={`tel:+91${PHONE}`}>Call: +91-{PHONE.slice(2)}</a>
            </nav>
          </div>

          <div className="footer-column">
            <span className="footer-head">Need Help</span>
            <nav
              className="footer-nav"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 8,
              }}
            >
              <a href="#" onClick={scrollToContact}>
                Contact Us
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            </nav>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <div className="footer-left">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="brand-footer"
            >
              Vijay's Smart Kitchen
            </a>
            <div style={{ marginTop: 8 }}>
              <div>
                Owner: <strong>{OWNER}</strong>
              </div>
              <div>
                Phone: <a href={`tel:+91${PHONE}`}>+91-{PHONE.slice(2)}</a>
              </div>
              <div className="small muted">
                © 2015-2025 Vijay's Smart Kitchen. All rights reserved.
              </div>
            </div>
          </div>

          <div
            className="footer-actions"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <a
              className="btn btn-primary btn-sm"
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-ghost"
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location"
            >
              <FaMapLocationDot style={{ marginRight: 8 }} /> Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
