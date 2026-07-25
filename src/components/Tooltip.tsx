export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative inline-flex focus-within:outline-none">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-50 opacity-0 shadow-md transition-opacity delay-100 duration-150 group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {label}
      </span>
    </span>
  );
}
