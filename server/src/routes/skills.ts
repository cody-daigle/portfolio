import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const skillsRouter = Router();

skillsRouter.get("/", async (_req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    res.json(skills);
  } catch (err) {
    next(err);
  }
});
