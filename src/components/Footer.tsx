import Link from "next/link";
import { navLinks, site } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-md bg-accent/10 font-mono text-[10px] font-semibold text-accent ring-1 ring-accent/30"
            >
              SG
            </span>
            <span className="font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {site.role}. {site.location}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm sm:grid-cols-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center font-mono text-[11px] text-faint sm:flex-row sm:px-8 sm:text-left">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Projects re-ranked hourly from GitHub</span>
        </div>
      </div>
    </footer>
  );
}
