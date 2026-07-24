import { education, activities, coreCompetencies } from "@/content";

export default function Education() {
  return (
    <section id="education" className="border-t border-black/[.08] dark:border-white/[.12]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Education & Involvement
        </h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Education
            </h3>
            <div className="mt-3 space-y-1 text-sm">
              <p className="font-medium">{education.school}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{education.location}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{education.graduation}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Weighted GPA: {education.weightedGpa}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Unweighted GPA: {education.unweightedGpa}
              </p>
              <p className="mt-2 font-medium">{education.honor}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Activities & Community
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Core Competencies
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {coreCompetencies.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/[.08] px-3 py-1.5 text-sm dark:border-white/[.12]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
