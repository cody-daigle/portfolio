import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const create = vi.fn();

vi.mock("../db/prisma.js", () => ({
  prisma: {
    contactMessage: {
      create: (...args: unknown[]) => create(...args),
    },
  },
}));

const { createApp } = await import("../app.js");

beforeEach(() => {
  create.mockReset();
});

describe("POST /api/contact", () => {
  it("rejects a missing email", async () => {
    const app = createApp("http://localhost:5173");

    const res = await request(app)
      .post("/api/contact")
      .send({ name: "Ada", message: "Hello" });

    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    const app = createApp("http://localhost:5173");

    const res = await request(app)
      .post("/api/contact")
      .send({ name: "Ada", email: "not-an-email", message: "Hello" });

    expect(res.status).toBe(400);
  });

  it("saves a valid message and returns its id", async () => {
    create.mockResolvedValue({ id: "abc123" });
    const app = createApp("http://localhost:5173");

    const res = await request(app)
      .post("/api/contact")
      .send({ name: "Ada Lovelace", email: "ada@example.com", message: "Great site!" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: "abc123" });
    expect(create).toHaveBeenCalledWith({
      data: { name: "Ada Lovelace", email: "ada@example.com", message: "Great site!" },
    });
  });
});
