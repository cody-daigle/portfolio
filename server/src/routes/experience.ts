import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const experienceRouter = Router();

experienceRouter.get("/", async (_req, res, next) => {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
    });
    res.json(experience);
  } catch (err) {
    next(err);
  }
});
