import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Footer() {
  const PHONE = "919732475787";
  const OWNER = "Vijayrajan";
  const MAP_LINK = "https://maps.app.goo.gl/J1db42qcLngLk2oT9?g_st=iw";
  const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `Hello ${OWNER}! I'm interested in a modular kitchen.`,
  )}`;

  const scrollToContact = (e) => {
    e && e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      el.removeAttribute("tabindex");
    } else {
      window.open(WA_LINK, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="footer-mid" aria-labelledby="footer-heading">
      <div className="container-1200">
        <h2 id="footer-heading" className="small" style={{ marginBottom: 12 }}>
          Get in touch
        </h2>

        <div className="footer-grid">
          <div className="footer-column">
            <span className="footer-head">Our Company</span>
            <nav className="footer-nav">
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
            <nav className="footer-nav">
              <a href="#" onClick={scrollToContact}>
                Contact Us
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="brand-footer"
            >
              Vijay's Modular Kitchen
            </a>

            <div className="other-links">
              <div>
                Owner: <strong>{OWNER}</strong>
              </div>
              <div>
                Phone: <a href={`tel:+91${PHONE}`}>+91-{PHONE.slice(2)}</a>
              </div>
              <div className="small muted">
                © 2015-2025 Vijay's Modular Kitchen. All rights reserved.
              </div>
            </div>
          </div>

          <div className="footer-actions">
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

            <div className="social-row" aria-hidden>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/insta.svg" alt="Instagram" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/facebook.svg" alt="Facebook" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/youtube.svg" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
