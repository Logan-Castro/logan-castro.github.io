import { useEffect } from "react";

export default function Collaborate() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <section className="section" id="collaborate">
      <div className="section__inner collaborate-page">
        <header className="collaborate-page__header">
          <h1>Let's Build Something Together</h1>
          <p>
            From wildfire resilience tools to rapid prototyping inside scrappy shops, I partner with teams that need momentum. Share a little context and I'll reply within two business days.
          </p>
        </header>

        <div className="collaborate-page__grid">
          <section className="collaborate-card">
            <h2>Project Fit</h2>
            <ul>
              <li>Hardware prototyping and fabrication support</li>
              <li>Field-ready visualization and data capture workflows</li>
              <li>Design-for-manufacture feedback for student or community teams</li>
            </ul>
          </section>

          <section className="collaborate-card">
            <h2>Share Your Brief</h2>
            <p className="collaborate-card__lead">Email works best - include timelines, constraints, or napkin sketches.</p>
            <a className="button" href="mailto:loganacastro@gmail.com">loganacastro@gmail.com</a>
            <p className="collaborate-card__note">Prefer a quick intro call? Mention it and I'll send a Calendly invite.</p>
          </section>

          <section className="collaborate-card">
            <h2>Other Channels</h2>
            <ul className="collaborate-card__links">
              <li>
                <a href="https://www.linkedin.com/in/logan-castro-45b198325/" target="_blank" rel="noreferrer">
                  LinkedIn updates &amp; messages
                </a>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  Download resume
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
