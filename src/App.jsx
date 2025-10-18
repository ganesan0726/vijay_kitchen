import React, { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Services from "./components/Service";
import Projects from "./components/Projects";
import About from "./components/About";
import Brands from "./components/Brands";
import ContactBlock from "./components/ContactBlock";
import Footer from "./components/Footer";
import OutputGallery from "./components/OutputGalary";

export default function App() {
  const [selectedService, setSelectedService] = useState("All");
  const [selectedType, setSelectedType] = useState("ALL");

  return (
    <>
      <Navbar
        onSelectService={(k) => {
          setSelectedService(k);
        }}
      />
      <main>
        <Hero />
        <Services
          selectedService={selectedService}
          onSelectService={(k) => setSelectedService(k)}
          selectedType={selectedType}
          onSelectType={(t) => setSelectedType(t)}
        />
        <Projects
          selectedService={selectedService}
          selectedType={selectedType}
        />
        <About />
        <Brands />
        <ContactBlock />
        <OutputGallery />
      </main>
      <Footer />
    </>
  );
}
