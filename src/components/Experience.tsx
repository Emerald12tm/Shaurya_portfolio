import { experience } from "@/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-black/[.08] dark:border-white/[.12]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>

        <div className="mt-10 space-y-8">
          {experience.map((item) => (
            <div
              key={`${item.role}-${item.org}`}
              className="rounded-2xl border border-black/[.08] p-6 dark:border-white/[.12]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold">
                  {item.role} — {item.org}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.dates}
                </span>
              </div>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {item.award && (
                <p className="mt-3 inline-flex rounded-full bg-black/[.04] px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-400">
                  🏆 {item.award}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
