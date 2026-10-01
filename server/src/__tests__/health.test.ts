import request from "supertest";
import { describe, expect, it, vi } from "vitest";

vi.mock("../db/prisma.js", () => ({
  prisma: {},
}));

const { createApp } = await import("../app.js");

describe("GET /api/health", () => {
  it("returns ok status", async () => {
    const app = createApp("http://localhost:5173");
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("unknown routes", () => {
  it("returns 404 with a json body", async () => {
    const app = createApp("http://localhost:5173");
    const res = await request(app).get("/api/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});
