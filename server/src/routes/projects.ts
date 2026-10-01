import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const projectsRouter = Router();

projectsRouter.get("/", async (req, res, next) => {
  try {
    const featuredOnly = req.query.featured === "true";
    const projects = await prisma.project.findMany({
      where: featuredOnly ? { featured: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

projectsRouter.get("/:slug", async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
});
