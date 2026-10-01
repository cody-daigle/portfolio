import type { Skill, SkillCategory } from "../types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  LANGUAGE: "Languages",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Data",
  DEVOPS: "DevOps",
  TOOLING: "Tooling",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "LANGUAGE",
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "TOOLING",
];

function groupByCategory(skills: Skill[]): Map<SkillCategory, Skill[]> {
  const groups = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const bucket = groups.get(skill.category) ?? [];
    bucket.push(skill);
    groups.set(skill.category, bucket);
  }
  return groups;
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = groupByCategory(skills);

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
        Skills
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ORDER.filter((category) => grouped.has(category)).map((category) => (
          <div key={category}>
            <h3 className="mb-3 font-medium text-slate-200">{CATEGORY_LABELS[category]}</h3>
            <ul className="space-y-2">
              {grouped.get(category)!.map((skill) => (
                <li key={skill.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-400">{skill.name}</span>
                  <span
                    className="flex gap-1"
                    role="img"
                    aria-label={`Proficiency ${skill.proficiency} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-4 rounded-full ${
                          i < skill.proficiency ? "bg-accent" : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
