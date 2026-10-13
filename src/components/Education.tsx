import { activities, education } from "@/content";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <SectionHeading index="04" label="Education" title={education.school}>
          <p>
            {education.location} · {education.graduation}
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal panel grid grid-cols-2 items-center divide-x divide-line">
            <div className="p-6 sm:p-8">
              <p className="text-5xl font-semibold tracking-tight">{education.unweightedGpa}</p>
              <p className="mt-2 font-mono text-[11px] tracking-wider text-faint uppercase">GPA · unweighted</p>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-gradient text-5xl font-semibold tracking-tight">{education.weightedGpa}</p>
              <p className="mt-2 font-mono text-[11px] tracking-wider text-faint uppercase">GPA · weighted</p>
            </div>
          </div>

          <div className="reveal panel p-6 sm:p-8">
            <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Coursework</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li key={course} className="rounded-md bg-white/[.04] px-2.5 py-1.5 text-sm text-foreground/85 ring-1 ring-line">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-5 panel p-6 sm:p-8">
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Beyond the classroom</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <li key={a.name} className="border-l border-line-strong pl-4">
                <p className="text-sm font-medium">{a.name}</p>
                <p className="mt-0.5 text-xs text-faint">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
