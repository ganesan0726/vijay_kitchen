import React, { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Types from "./components/Types";
import Projects from "./components/Projects";
import About from "./components/About";
import Brands from "./components/Brands";
import ContactBlock from "./components/ContactBlock";
import Footer from "./components/Footer";

export default function App() {
  // selectedType: "ALL" | "L" | "U" | "P" | "S" | "I"
  const [selectedType, setSelectedType] = useState("ALL");

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Types selectedType={selectedType} onSelectType={setSelectedType} />
        <Projects selectedType={selectedType} />
        <About />
        <Brands />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
