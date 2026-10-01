import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.js";
import { experienceRouter } from "./routes/experience.js";
import { projectsRouter } from "./routes/projects.js";
import { skillsRouter } from "./routes/skills.js";

export function createApp(clientOrigin: string) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/projects", projectsRouter);
  app.use("/api/skills", skillsRouter);
  app.use("/api/experience", experienceRouter);
  app.use("/api/contact", contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
