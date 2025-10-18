import React from "react";

export default function About() {
  const features = [
    {
      img: "/assets/customer.svg",
      title: "1000+ happy customers",
      alt: "Happy modular kitchen customers",
    },
    {
      img: "/assets/pen.svg",
      title: "1000+ designs",
      alt: "Creative modular kitchen designs",
    },
    {
      img: "/assets/warranty.svg",
      title: "Up to 10-years warranty",
      alt: "Warranty for kitchen materials",
    },
    {
      img: "/assets/wallet.svg",
      title: "Price match guarantee",
      alt: "Affordable modular kitchen pricing",
    },
    {
      img: "/assets/check-list.svg",
      title: "Strict quality checks",
      alt: "Quality checked modular kitchens",
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container-1200">
        <div className="title">
          <h2>Smart Modular Designs</h2>
          <p className="font-14">
            Explore an extensive range of modular designswith stylish, durable,
            and affordable solutions.
          </p>
        </div>

        <ul className="about-grid">
          {features.map((item, index) => (
            <li key={index} className="about-card">
              <div className="about-icon">
                <img src={item.img} alt={item.alt} loading="lazy" />
              </div>
              <p className="about-text">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
