import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
        Projects
      </h2>
      {projects.length === 0 ? (
        <p className="text-slate-500">No projects yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
