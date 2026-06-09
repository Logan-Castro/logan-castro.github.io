import { Link } from "react-router-dom";

export default function ProjectCard({ title, summary, image, imageAlt, tags = [], slug, category, status }) {
  const destination = slug ? `/project/${slug}` : null;

  const eyebrowText = [category, status].filter(Boolean).join(" | ");

  const cardContent = (
    <>
      {image && (
        <figure className="card__media">
          <img src={image} alt={imageAlt ?? `${title} preview`} loading="lazy" />
        </figure>
      )}

      <div className="card__content">
        {eyebrowText && <p className="card__eyebrow">{eyebrowText}</p>}
        <h3 className="card__title">{title}</h3>
        {summary && <p className="card__summary">{summary}</p>}
        {tags.length > 0 && (
          <ul className="card__tags">
            {tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      {destination && <span className="card__cta">View project</span>}
    </>
  );

  if (destination) {
    return (
      <Link className="card card--interactive" to={destination} data-slug={slug} aria-label={`View ${title}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="card" data-slug={slug}>
      {cardContent}
    </article>
  );
}
