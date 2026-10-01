export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
}

export type SkillCategory =
  | "LANGUAGE"
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "TOOLING";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  sortOrder: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string[];
  sortOrder: number;
}
