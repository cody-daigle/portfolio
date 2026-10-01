import { useEffect, useState } from "react";
import { getExperience, getProjects, getSkills } from "../api/client";
import type { Experience, Project, Skill } from "../types";

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
}

interface PortfolioState {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

export function usePortfolioData(): PortfolioState {
  const [state, setState] = useState<PortfolioState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([getProjects(), getSkills(), getExperience()])
      .then(([projects, skills, experience]) => {
        if (!cancelled) {
          setState({ data: { projects, skills, experience }, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load portfolio data";
          setState({ data: null, loading: false, error: message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
