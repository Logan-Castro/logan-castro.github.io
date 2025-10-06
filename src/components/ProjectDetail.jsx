import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

function normalizeSections(project) {
  if (Array.isArray(project.body)) {
    return project.body;
  }

  const legacyBody = project.body ?? {};
  const sections = [];

  if (legacyBody.overview) {
    sections.push({
      type: "text",
      title: "Overview",
      paragraphs: [legacyBody.overview],
    });
  }

  if (Array.isArray(legacyBody.highlights) && legacyBody.highlights.length > 0) {
    sections.push({
      type: "list",
      title: "Highlights",
      items: legacyBody.highlights,
    });
  }

  if (legacyBody.nextSteps) {
    sections.push({
      type: "text",
      title: "Next Steps",
      paragraphs: [legacyBody.nextSteps],
    });
  }

  return sections;
}

export default function ProjectDetail({ project }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const sections = normalizeSections(project);

  return (
    <article className="section project-page">
      <div className="section__inner project-page__inner">
        <nav className="project-page__breadcrumb">
          <Link to="/projects">Back to catalog</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/">Home</Link>
        </nav>

        <header className="project-page__header">
          <p className="eyebrow">{project.category}</p>
          <h1 className="project-page__title">{project.title}</h1>
          <p className="project-page__summary">{project.summary}</p>
          <ul className="project-page__tags">
            <li>Status: {project.status}</li>
            {project.tags?.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        {project.image && (
          <figure className="project-page__media">
            <img src={project.image} alt={project.imageAlt ?? `${project.title} hero`} loading="lazy" />
          </figure>
        )}

        {sections.length > 0 && (
          <section className="project-page__body">
            {sections.map((section, index) => {
              const key = section.id ?? `${section.title ?? "section"}-${index}`;
              const sectionType = section.type ?? "text";
              const layout = section.layout ?? null;
              const layoutClass = layout ? ` project-section__layout--${layout}` : "";
              const hasMedia = Array.isArray(section.media) && section.media.length > 0;
              const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
              const items = Array.isArray(section.items) ? section.items : [];
              const inlineMedia = Array.isArray(section.inlineMedia) ? section.inlineMedia : [];

              return (
                <section key={key} className={`project-section project-section--${sectionType}`}>
                  {section.title && <h2 className="project-section__title">{section.title}</h2>}
                  {section.subtitle && <p className="project-section__subtitle">{section.subtitle}</p>}
                  <div className={`project-section__layout${layoutClass}`}>
                    {sectionType === "list" ? (
                      <ul className="project-page__list">
                        {items.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="project-section__content">
                        {paragraphs.map(paragraph => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {inlineMedia.length > 0 && (
                          <div className="project-section__inline-media">
                            {inlineMedia.map(media => (
                              <figure key={media.src ?? media.alt} className="project-section__inline-media-item">
                                <img src={media.src} alt={media.alt ?? ""} loading="lazy" />
                                {media.caption && <figcaption>{media.caption}</figcaption>}
                              </figure>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {hasMedia && (
                      <div className="project-section__media-grid">
                        {section.media.map(media => (
                          <figure key={media.src ?? media.alt} className="project-section__media">
                            <img src={media.src} alt={media.alt ?? ""} loading="lazy" />
                            {media.caption && <figcaption>{media.caption}</figcaption>}
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </section>
        )}
      </div>
    </article>
  );
}
