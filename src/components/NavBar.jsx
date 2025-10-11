import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // smooth scroll to section
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      el.removeAttribute("tabindex");
    }
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "scrolled" : "transparent"}`}
    >
      <div className="container-1200 nav">
        <a
          href="#hero"
          className="brand"
          onClick={(e) => handleNavClick(e, "hero")}
        >
          <strong className="brand-name">Vijay's Modular Kitchen</strong>
        </a>

        <nav aria-label="Primary navigation" className={open ? "open" : ""}>
          {/* animated hamburger */}
          <button
            className={`hamburger ${open ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <ul className={`nav-links ${open ? "open" : ""}`}>
            <li>
              <a href="#hero" onClick={(e) => handleNavClick(e, "hero")}>
                Home
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
              >
                Projects
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
