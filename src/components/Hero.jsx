import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const typedMessage = "Prototyping resilient systems for high-stakes terrain.";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = event => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState(() => (prefersReducedMotion ? typedMessage : ""));

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(typedMessage);
      return;
    }

    let index = 0;
    setTypedText("");
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(typedMessage.slice(0, index));

      if (index >= typedMessage.length) {
        window.clearInterval(interval);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const isTyping = !prefersReducedMotion && typedText.length < typedMessage.length;

  return (
    <header className="hero" id="home">
      <span className="hero__topo" aria-hidden />
      <div className="hero__inner">
        <h1 className="hero__title">Logan Castro</h1>
        <p className="eyebrow">Mechanical Engineer | Baja SAE | Design and Fabrication</p>
        <p className="hero__typed" aria-live="polite">
          <span className={`hero__typed-text${isTyping ? " hero__typed-text--active" : ""}`}>{typedText}</span>
        </p>
        <p className="hero__lead">
          I build reliable prototypes that survive real-world abuse - from wildfire visualization tools to electric drivetrain upgrades.
        </p>
        <div className="hero__actions">
          <Link className="button button--outline" to="/projects">Explore projects</Link>
          <Link className="button button--outline" to="/collaborate">Let's collaborate</Link>
          <Link className="button button--outline" to="/resume">
            View resume
          </Link>
        </div>
      </div>
    </header>
  );
}

