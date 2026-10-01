import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../db/prisma.js";
import { HttpError } from "../middleware/errorHandler.js";

export const contactRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

contactRouter.post("/", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues[0]?.message ?? "Invalid request body");
    }

    const saved = await prisma.contactMessage.create({ data: parsed.data });
    res.status(201).json({ id: saved.id });
  } catch (err) {
    next(err);
  }
});
