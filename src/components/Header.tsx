"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/content";
import { MenuIcon, CloseIcon } from "./icons";

const sectionLinks = navLinks.filter((l) => l.label !== "Contact");

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape, and if the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 font-mono text-xs font-semibold text-accent ring-1 ring-accent/30 transition-shadow group-hover:shadow-[0_0_20px_-4px_var(--accent)]"
          >
            SG
          </span>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex" aria-label="Primary">
          {sectionLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group transition-colors hover:text-foreground">
              <span
                aria-hidden="true"
                className="mr-1.5 font-mono text-[10px] text-faint transition-colors group-hover:text-accent"
              >
                {link.index}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent md:block"
        >
          Get in touch
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid size-11 place-items-center rounded-lg text-muted hover:text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 py-3 text-base md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-lg px-2 py-3 text-muted hover:bg-white/[.04] hover:text-foreground"
                >
                  <span aria-hidden="true" className="mr-3 font-mono text-[11px] text-accent">
                    {link.index}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
