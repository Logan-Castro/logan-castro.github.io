import ProjectDetail from "../../components/ProjectDetail.jsx";
import { getProjectBySlug } from "../../data/projects.js";

export default function createProjectPage(slug) {
  return function ProjectPage() {
    const project = getProjectBySlug(slug);
    return <ProjectDetail project={project} />;
  };
}
