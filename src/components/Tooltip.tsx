export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group/tip relative inline-flex focus-within:outline-none">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line-strong bg-[#0d1119] px-2 py-1 font-mono text-[11px] text-foreground opacity-0 shadow-lg shadow-black/40 transition-opacity delay-100 duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
