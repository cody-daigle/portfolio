import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../types";

const baseProject: Project = {
  id: "1",
  title: "Sample Project",
  slug: "sample-project",
  summary: "A short summary",
  description: "A longer description",
  techStack: ["React", "TypeScript"],
  githubUrl: "https://github.com/example/sample",
  liveUrl: null,
  imageUrl: null,
  featured: true,
  sortOrder: 1,
};

describe("ProjectCard", () => {
  it("renders title, summary, and tech stack", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("Sample Project")).toBeInTheDocument();
    expect(screen.getByText("A short summary")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("shows a Featured badge only when featured", () => {
    const { rerender } = render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();

    rerender(<ProjectCard project={{ ...baseProject, featured: false }} />);
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("only renders links that are present", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Code →")).toBeInTheDocument();
    expect(screen.queryByText("Live →")).not.toBeInTheDocument();
  });
});
