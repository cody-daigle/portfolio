import type { Experience, Project, Skill } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getProjects(): Promise<Project[]> {
  return request<Project[]>("/projects");
}

export function getSkills(): Promise<Skill[]> {
  return request<Skill[]>("/skills");
}

export function getExperience(): Promise<Experience[]> {
  return request<Experience[]>("/experience");
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function sendContactMessage(payload: ContactPayload): Promise<{ id: string }> {
  return request<{ id: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
