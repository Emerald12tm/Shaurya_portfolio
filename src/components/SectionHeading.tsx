import type { ReactNode } from "react";

export default function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <span>{index}</span>
        <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
        <span className="text-muted">{label}</span>
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-base leading-7 text-muted">{children}</div>}
    </div>
  );
}
