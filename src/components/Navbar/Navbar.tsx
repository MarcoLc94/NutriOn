import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-text">NutriOn</span>
          <span className="material-symbols-outlined">mode_off_on</span>
        </Link>
      </div>

      <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link
          to="/"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Inicio
        </Link>
        <Link
          to="/plan-nutricional"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Planes
        </Link>
        <Link
          to="/recetas"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Recetas
        </Link>
        <Link
          to="/blog"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Blog
        </Link>
        <Link
          to="/contacto"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contacto
        </Link>
      </div>
      <div className="navbar-cta">
        <button className="cta-button">Iniciar Consulta</button>
      </div>

      <div
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </div>
    </nav>
  );
};

export default Navbar;
