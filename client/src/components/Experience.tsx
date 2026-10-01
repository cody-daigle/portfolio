import type { Experience as ExperienceEntry } from "../types";

function formatRange(startDate: string, endDate: string | null): string {
  const format = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return `${format(startDate)} — ${endDate ? format(endDate) : "Present"}`;
}

export default function Experience({ experience }: { experience: ExperienceEntry[] }) {
  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light">
        Experience
      </h2>
      <ol className="space-y-8 border-l border-slate-800 pl-6">
        {experience.map((entry) => (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold text-slate-100">
                {entry.role} · {entry.company}
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {formatRange(entry.startDate, entry.endDate)}
              </span>
            </div>
            {entry.location && <p className="text-sm text-slate-500">{entry.location}</p>}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
              {entry.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
