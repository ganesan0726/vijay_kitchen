import React from "react";

export default function Hero() {
  const PHONE = "919732475787";
  const wa = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hello Vijay! I am interested in your design services.",
  )}`;

  return (
    <section id="hero" className="hero">
      <div className="hero-inner container-1200">
        <h6>WELCOME TO OUR WORLD</h6>
        <h1>Vijay's Smart Kitchen — Designs for every room</h1>
        <p className="lead">
          Modular kitchens, TV units, wardrobes, bedrooms and custom doors — we
          design beautiful, functional spaces for modern homes.
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
