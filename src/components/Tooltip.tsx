// Hidden tooltips use display:none (not just opacity) so they never widen the
// page and cause horizontal scrolling on narrow screens.
export default function Tooltip({
  label,
  children,
  align = "center",
}: {
  label: string;
  children: React.ReactNode;
  /** "end" anchors the tooltip's right edge to the trigger, for triggers near the screen edge. */
  align?: "center" | "end";
}) {
  const position = align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  return (
    <span className="group/tip relative inline-flex focus-within:outline-none">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full z-20 mb-2 hidden whitespace-nowrap rounded-md border border-line-strong bg-[#0d1119] px-2 py-1 font-mono text-[11px] text-foreground shadow-lg shadow-black/40 group-hover/tip:block group-focus-within/tip:block ${position}`}
      >
        {label}
      </span>
    </span>
  );
}
