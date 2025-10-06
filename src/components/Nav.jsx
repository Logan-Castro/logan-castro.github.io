import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { type: "section", target: "projects", label: "Featured" },
  { type: "section", target: "about", label: "About" },
  { type: "section", target: "contact", label: "Contact" },
  { type: "route", to: "/projects", label: "Projects" },
  { type: "route", to: "/collaborate", label: "Collaborate" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBrandClick = event => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionClick = target => {
    setMenuOpen(false);

    const scrollToSection = () => {
      const section = document.getElementById(target);
      if (!section) {
        return;
      }

      const nav = document.querySelector(".site-nav");
      const offset = (nav?.offsetHeight ?? 0) + 16;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: target } });
      return;
    }

    scrollToSection();
  };

  return (
    <nav className="site-nav" aria-label="Primary">
      <Link className="site-nav__brand" to="/" onClick={handleBrandClick}>
        Logan Castro
      </Link>

      <button
        type="button"
        className="site-nav__toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span className="sr-only">Toggle navigation</span>
        <span aria-hidden className="site-nav__toggle-bar" />
        <span aria-hidden className="site-nav__toggle-bar" />
        <span aria-hidden className="site-nav__toggle-bar" />
      </button>

      <ul
        id="primary-navigation"
        className={`site-nav__links${menuOpen ? " site-nav__links--open" : ""}`}
      >
        {navLinks.map(link => (
          <li key={link.label}>
            {link.type === "section" ? (
              <a
                href={`#${link.target}`}
                onClick={event => {
                  event.preventDefault();
                  handleSectionClick(link.target);
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
