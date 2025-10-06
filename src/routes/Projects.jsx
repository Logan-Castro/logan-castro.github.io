import { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects, getProjectCategories, getProjectStatuses } from "../data/projects.js";

const ALL_OPTION = "All";
const STATUS_ORDER = ["In Progress", "Ongoing", "Completed"];

function buildSearchIndex(project) {
  const tokens = [project.title, project.summary, project.category, project.status, ...(project.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return tokens;
}

function sortStatuses(statuses) {
  return [...statuses].sort((a, b) => {
    const aIndex = STATUS_ORDER.indexOf(a);
    const bIndex = STATUS_ORDER.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }

    return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
  });
}

export default function Projects() {
  const categories = useMemo(() => [ALL_OPTION, ...getProjectCategories()], []);
  const statuses = useMemo(() => [ALL_OPTION, ...sortStatuses(getProjectStatuses())], []);
  const [activeCategory, setActiveCategory] = useState(ALL_OPTION);
  const [activeStatus, setActiveStatus] = useState(ALL_OPTION);
  const [searchTerm, setSearchTerm] = useState("");

  const projectStats = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter(project => project.status === "Ongoing" || project.status === "In Progress").length,
      completed: projects.filter(project => project.status === "Completed").length,
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter(project => {
      const matchesCategory = activeCategory === ALL_OPTION || project.category === activeCategory;
      const matchesStatus = activeStatus === ALL_OPTION || project.status === activeStatus;
      const matchesQuery = query.length === 0 || buildSearchIndex(project).includes(query);

      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [activeCategory, activeStatus, searchTerm]);

  return (
    <section className="section" id="catalog">
      <div className="section__inner projects-page">
        <header className="projects-page__header">
          <p className="eyebrow">Projects</p>
          <h1>Projects Catalog</h1>
          <p className="projects-page__lead">
            Browse every build currently on the bench - filter by project type, status, or keyword to jump straight to the work that matters to you.
          </p>

          <dl className="projects-page__stats">
            <div>
              <dt>Total builds</dt>
              <dd>{projectStats.total}</dd>
            </div>
            <div>
              <dt>Ongoing / In Progress</dt>
              <dd>{projectStats.active}</dd>
            </div>
            <div>
              <dt>Completed</dt>
              <dd>{projectStats.completed}</dd>
            </div>
          </dl>

          <div className="projects-page__toolbar">
            <div>
              <p className="projects-page__filter-label">Category</p>
              <div className="projects-page__filters" role="toolbar" aria-label="Filter projects by category">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-chip${activeCategory === category ? " filter-chip--active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="projects-page__filter-label">Status</p>
              <div className="projects-page__filters" role="toolbar" aria-label="Filter projects by status">
                {statuses.map(status => (
                  <button
                    key={status}
                    type="button"
                    className={`filter-chip${activeStatus === status ? " filter-chip--active" : ""}`}
                    onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <label className="projects-page__search" htmlFor="projects-search">
              <span className="projects-page__filter-label">Search</span>
              <input
                id="projects-search"
                type="search"
                value={searchTerm}
                placeholder="Search titles, tags, and descriptions"
                onChange={event => setSearchTerm(event.target.value)}
              />
            </label>
          </div>

          <p className="projects-page__result-count" role="status">
            Showing {visibleProjects.length} of {projectStats.total} builds
          </p>
        </header>

        {visibleProjects.length > 0 ? (
          <div className="project-grid">
            {visibleProjects.map(project => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        ) : (
          <p className="projects-page__empty">No projects match that combo yet - try clearing a filter.</p>
        )}
      </div>
    </section>
  );
}
