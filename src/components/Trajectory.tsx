import { trajectory, type Milestone } from "@/content";
import SectionHeading from "./SectionHeading";

const STATUS: Record<Milestone["status"], { label: string; className: string; dot: string }> = {
  active: {
    label: "In progress",
    className: "text-accent ring-accent/30 bg-accent/10",
    dot: "bg-accent shadow-[0_0_12px_var(--accent)]",
  },
  next: {
    label: "Up next",
    className: "text-accent-2 ring-accent-2/30 bg-accent-2/10",
    dot: "bg-background ring-2 ring-accent-2",
  },
  done: {
    label: "Done",
    className: "text-muted ring-line-strong bg-white/[.04]",
    dot: "bg-muted",
  },
};

export default function Trajectory() {
  return (
    <section id="trajectory" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="02" label="Trajectory" title={<>Where I&apos;m headed next.</>}>
            <p>
              What I&apos;m actively building toward through 2027. Research, competition, and
              getting the things I&apos;ve already shipped into real hands.
            </p>
          </SectionHeading>
        </div>

        <ol className="relative space-y-4 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-accent-2/40 before:to-transparent">
          {trajectory.map((m) => {
            const s = STATUS[m.status];
            return (
              <li key={m.title} className="reveal relative pl-10">
                <span className={`absolute top-6 left-0 size-[15px] rounded-full ${s.dot}`} aria-hidden="true" />
                <div className="panel p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ring-1 ${s.className}`}>
                      {s.label}
                    </span>
                    <span className="font-mono text-[11px] text-faint">{m.when}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{m.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
