import { useEffect } from "react";

export default function Resume() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Use a relative URL so it works under subpaths (e.g., GitHub Pages)
  const resumeUrl = "Logan_Castro_Resume_10-10-25_5.pdf";

  return (
    <section className="section" id="resume">
      <div className="section__inner resume-page">
        <header className="resume-page__header">
          <div className="resume-page__header-row">
            <p className="eyebrow">Resume</p>
            <a className="button button--outline" href={resumeUrl} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </div>
          <h1 className="sr-only">Logan Castro resume</h1>
        </header>

        <div className="resume-page__viewer" role="region" aria-label="Embedded resume PDF">
          <div className="resume-page__frame">
            <iframe
              src={`${resumeUrl}#view=Fit`}
              title="Logan Castro resume"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
