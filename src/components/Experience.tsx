import { experience } from "@/content";
import Honors from "./Honors";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <SectionHeading index="03" label="Experience" title="Leadership, robotics, and shipping.">
          <p>Six years of building with teams, from LEGO League to FTC to software real students use.</p>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {experience.map((item) => (
            <Spotlight key={`${item.role}-${item.org}`} as="article" className="reveal flex flex-col p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-wider text-faint uppercase">{item.dates}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.org}</h3>
              <p className="text-sm text-accent">{item.role}</p>

              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {item.awards && (
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Awards">
                  {item.awards.map((award) => (
                    <li
                      key={award}
                      className="rounded-md bg-accent-2/10 px-2 py-1 font-mono text-[11px] text-accent-2 ring-1 ring-accent-2/25"
                    >
                      {award}
                    </li>
                  ))}
                </ul>
              )}
            </Spotlight>
          ))}
        </div>

        <Honors />
      </div>
    </section>
  );
}
