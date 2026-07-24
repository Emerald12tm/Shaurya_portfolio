import { coursework, leadership, achievements } from "@/content";

export default function Education() {
  return (
    <section id="education" className="border-t border-black/[.08] dark:border-white/[.12]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Education & Leadership
        </h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Relevant Coursework
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Clubs & Roles
            </h3>
            <ul className="mt-3 space-y-3 text-sm">
              {leadership.map((item) => (
                <li key={item.role}>
                  <p className="font-medium">{item.role}</p>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Hackathons & Competitions
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
