import { skills } from "@/content";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-black/[.08] dark:border-white/[.12]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Skills & Technologies</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/[.08] px-3 py-1.5 text-sm dark:border-white/[.12]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
