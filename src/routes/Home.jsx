import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { featuredProjects } from "../data/projects.js";

function scrollSectionIntoView(target) {
  const section = document.getElementById(target);
  if (!section) {
    return;
  }

  const nav = document.querySelector(".site-nav");
  const offset = (nav?.offsetHeight ?? 0) + 16;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const requestedSection = location.state?.scrollTo ?? (location.hash ? location.hash.slice(1) : null);

    if (!requestedSection) {
      return;
    }

    const timer = window.setTimeout(() => scrollSectionIntoView(requestedSection), 40);

    if (location.state?.scrollTo) {
      const nextState = { ...location.state };
      delete nextState.scrollTo;
      const hasResidualState = Object.keys(nextState).length > 0;
      navigate(location.pathname, { replace: true, state: hasResidualState ? nextState : null });
    }

    return () => window.clearTimeout(timer);
  }, [location, navigate]);

  return (
    <>
      <Hero />

      <section className="section" id="projects">
        <div className="section__inner">
          <h2 className="section__heading">Featured Projects</h2>
          <div className="project-grid">
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
          <p className="projects__cta">
            <Link to="/projects" className="text-link">
              Explore the full projects catalogue
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--about" id="about">
        <div className="section__inner">
          <div className="about__content">
            <h2 className="section__heading">About</h2>
            <figure className="about__media">
              <img src="/images/about/about-workshop.jpg" alt="Logan casting a quick calibration glance while tuning a drivetrain prototype." loading="lazy" />
            </figure>
            <p>
              I am a Santa Rosa Junior College engineering student focused on sustainable mobility and precision fabrication. I love taking ideas from sketchbook to shop floor, building iteratively with CAD, additive manufacturing, and rapid prototyping tools.
            </p>
            <p>
              Recent work spans designing a wildfire terrain visualization tool, leading Baja SAE drivetrain upgrades, and helping community makerspaces streamline CNC workflows.
            </p>
            <p>
              Toolchain highlights: SolidWorks, Fusion 360, KiCad, Python, MATLAB, and the occasional late-night debugging session in VS Code.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section__inner">
          <h2 className="section__heading">Contact</h2>
          <p>Let's collaborate or talk shop. Reach me via:</p>
          <ul className="contact-list">
            <li>
              <a href="mailto:you@example.com">you@example.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="/resume.pdf">Download resume</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
