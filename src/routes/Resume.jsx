import { useEffect } from "react";

export default function Resume() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <section className="section" id="resume">
      <div className="section__inner resume-page">
        <header className="resume-page__header">
          <div className="resume-page__header-row">
            <p className="eyebrow">Resume</p>
            <a className="button button--outline" href="/Logan_Castro_Resume_10-10-25_5.pdf" target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </div>
          <h1 className="sr-only">Logan Castro resume</h1>
        </header>

        <div className="resume-page__viewer" role="region" aria-label="Embedded resume PDF">
          <div className="resume-page__frame">
            <iframe src="/Logan_Castro_Resume_10-10-25_5.pdf#view=Fit" title="Logan Castro resume" loading="lazy" allow="fullscreen"></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
