import type { ScoreBreakdown } from "@/lib/ranking";
import Tooltip from "./Tooltip";

const PARTS: { key: keyof ScoreBreakdown; label: string; color: string; hint: string }[] = [
  { key: "activity", label: "Activity", color: "var(--accent)", hint: "commit history" },
  { key: "momentum", label: "Momentum", color: "#a5f3fc", hint: "how recently it was pushed" },
  { key: "substance", label: "Substance", color: "var(--accent-2)", hint: "amount of code" },
  { key: "reach", label: "Reach", color: "#f0abfc", hint: "stars, forks, live site" },
];

/** Stacked bar showing what drove a repo's rank, scaled against the top-ranked repo. */
export default function SignalMeter({
  score,
  breakdown,
  max,
}: {
  score: number;
  breakdown: ScoreBreakdown;
  max: number;
}) {
  const scale = max > 0 ? 100 / max : 0;
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-white/[.06]"
        role="img"
        aria-label={`Rank score ${score.toFixed(0)}: ${PARTS.map((p) => `${p.label} ${breakdown[p.key].toFixed(0)}`).join(", ")}`}
      >
        {PARTS.map((p) => (
          <span
            key={p.key}
            className="h-full first:rounded-l-full"
            style={{ width: `${breakdown[p.key] * scale}%`, background: p.color }}
          />
        ))}
      </div>
      <Tooltip
        label={PARTS.map((p) => `${p.label} ${breakdown[p.key].toFixed(0)}`).join(" · ")}
      >
        <span tabIndex={0} className="cursor-help font-mono text-xs text-muted tabular-nums">
          {score.toFixed(0)}
        </span>
      </Tooltip>
    </div>
  );
}

export function SignalLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted">
      {PARTS.map((p) => (
        <li key={p.key} className="inline-flex items-center gap-2" title={p.hint}>
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          {p.label}
          <span className="text-faint">· {p.hint}</span>
        </li>
      ))}
    </ul>
  );
}
