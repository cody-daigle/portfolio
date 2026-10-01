import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const findMany = vi.fn();
const findUnique = vi.fn();

vi.mock("../db/prisma.js", () => ({
  prisma: {
    project: {
      findMany: (...args: unknown[]) => findMany(...args),
      findUnique: (...args: unknown[]) => findUnique(...args),
    },
  },
}));

const { createApp } = await import("../app.js");

const sampleProject = {
  id: "1",
  title: "Sample",
  slug: "sample",
  summary: "A sample project",
  description: "Longer description",
  techStack: ["TypeScript"],
  githubUrl: null,
  liveUrl: null,
  imageUrl: null,
  featured: true,
  sortOrder: 1,
};

beforeEach(() => {
  findMany.mockReset();
  findUnique.mockReset();
});

describe("GET /api/projects", () => {
  it("returns all projects ordered by sortOrder", async () => {
    findMany.mockResolvedValue([sampleProject]);
    const app = createApp("http://localhost:5173");

    const res = await request(app).get("/api/projects");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([sampleProject]);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined })
    );
  });

  it("filters to featured projects when ?featured=true", async () => {
    findMany.mockResolvedValue([sampleProject]);
    const app = createApp("http://localhost:5173");

    await request(app).get("/api/projects?featured=true");

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { featured: true } })
    );
  });
});

describe("GET /api/projects/:slug", () => {
  it("returns 404 when the project does not exist", async () => {
    findUnique.mockResolvedValue(null);
    const app = createApp("http://localhost:5173");

    const res = await request(app).get("/api/projects/missing");

    expect(res.status).toBe(404);
  });

  it("returns the project when found", async () => {
    findUnique.mockResolvedValue(sampleProject);
    const app = createApp("http://localhost:5173");

    const res = await request(app).get("/api/projects/sample");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleProject);
  });
});
