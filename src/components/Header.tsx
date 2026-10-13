"use client";

import { useState } from "react";
import { site } from "@/content";
import { MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "#projects", label: "Projects", index: "01" },
  { href: "#trajectory", label: "Trajectory", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#education", label: "Education", index: "04" },
  { href: "#skills", label: "Toolkit", index: "05" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 font-mono text-xs font-semibold text-accent ring-1 ring-accent/30 transition-shadow group-hover:shadow-[0_0_20px_-4px_var(--accent)]">
            SG
          </span>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group transition-colors hover:text-foreground">
              <span className="mr-1.5 font-mono text-[10px] text-faint transition-colors group-hover:text-accent">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-1 p-1 text-muted hover:text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-line px-4 py-3 text-sm md:hidden"
          aria-label="Mobile"
        >
          {[...links, { href: "#contact", label: "Contact", index: "06" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-muted hover:bg-white/[.04] hover:text-foreground"
            >
              <span className="mr-3 font-mono text-[11px] text-accent">{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
