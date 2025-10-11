import React from "react";

export default function Hero() {
  const PHONE = "919732475787";
  const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hello Vijay! I'm interested in a modular kitchen.",
  )}`;
  return (
    <section id="hero" className="hero">
      <div className="hero-inner container-1200">
        <h6>WELCOME TO OUR WORLD</h6>
        <h1>
          Perfect Modular Kitchen Designs
          <br />
          for your Home.
        </h1>
        <p className="lead">
          Custom layouts, sleek finishes, expert installation.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a className="btn btn-primary" href="#contact">
            Book Free Consultant
          </a>
          <a
            className="btn btn-outline"
            href={wa}
            target="_blank"
            rel="noreferrer"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
