import { skills } from "@/content";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <SectionHeading index="05" label="Toolkit" title="What I build with." />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.category} className="reveal bg-background p-6">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{group.category}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
