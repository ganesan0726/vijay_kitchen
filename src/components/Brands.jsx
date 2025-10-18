import React from "react";

export default function Brands() {
  const logos = [
    "/assets/brand1.jpg",
    "/assets/brand2.jpg",
    "/assets/brand3.jpg",
    "/assets/brand4.jpg",
    "/assets/brand5.jpg",
    "/assets/brand6.jpg",
  ];

  return (
    <section
      className="section kitchen-brands"
      aria-labelledby="brands-heading"
    >
      <div className="container-1200">
        <div className="title">
          <h2 id="brands-heading">Top Brands We Deal In</h2>
          <p className="font-14">
            Trusted appliance and hardware brands we partner with.
          </p>
        </div>

        <ul className="brand-logos">
          {logos.map((src, i) => (
            <li key={i} className="brand-item">
              <img src={src} alt={`Brand ${i + 1}`} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
