import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition hover:border-slate-700">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
        {project.featured && (
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-light">
            Featured
          </span>
        )}
      </div>
      <p className="text-sm text-slate-400">{project.summary}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded bg-slate-800 px-2 py-1 text-xs font-mono text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-4 pt-3 text-sm">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-light hover:underline"
          >
            Code →
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-light hover:underline"
          >
            Live →
          </a>
        )}
      </div>
    </article>
  );
}
