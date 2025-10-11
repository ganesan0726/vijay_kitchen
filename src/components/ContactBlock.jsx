import React from "react";

export default function ContactBlock() {
  const PHONE = "919732475787"; // country code + number
  const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hello Vijay! I'm interested in a modular kitchen.",
  )}`;

  return (
    <section
      aria-labelledby="contact-heading"
      className="contact-block-wrapper"
    >
      <div className="container-1200 contact-block" id="contact">
        <h3 id="contact-heading" className="sr-only">
          Contact Vijay's Modular Kitchen
        </h3>

        <div className="contact-left">
          <p className="contact-kicker">Ready to renovate?</p>
          <p className="contact-sub">
            Free consultation · Design estimate · On-site measurement
          </p>
        </div>

        <div className="contact-ctas" role="group" aria-label="Contact options">
          <a
            href={WA_LINK}
            className="btn consultation-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Vijay on WhatsApp"
          >
            Message on WhatsApp
          </a>

          <span className="contact-or" aria-hidden>
            OR
          </span>

          <a
            href={`tel:+91${PHONE}`}
            className="btn call-us"
            aria-label={`Call Vijay on phone +91 ${PHONE.slice(2)}`}
          >
            <span className="call-text">Call Us</span>
            <strong className="call-number">+91-{PHONE.slice(2)}</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
