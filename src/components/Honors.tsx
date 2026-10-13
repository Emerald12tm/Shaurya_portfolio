import { honors } from "@/content";

export default function Honors() {
  return (
    <div className="reveal mt-16">
      <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Honors</h3>
      <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {honors.map((h) => (
          <li key={h.title} className="bg-background p-5 transition-colors hover:bg-[#080b12]">
            <span className="font-mono text-accent" aria-hidden="true">◆</span>
            <p className="mt-3 text-sm font-semibold leading-5">{h.title}</p>
            <p className="mt-1 text-xs text-faint">{h.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
