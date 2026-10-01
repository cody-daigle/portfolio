import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skills from "../components/Skills";
import type { Skill } from "../types";

const skills: Skill[] = [
  { id: "1", name: "TypeScript", category: "LANGUAGE", proficiency: 5, sortOrder: 1 },
  { id: "2", name: "React", category: "FRONTEND", proficiency: 4, sortOrder: 1 },
];

describe("Skills", () => {
  it("groups skills under their category heading", () => {
    render(<Skills skills={skills} />);

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("omits categories with no skills", () => {
    render(<Skills skills={skills} />);
    expect(screen.queryByText("DevOps")).not.toBeInTheDocument();
  });
});
