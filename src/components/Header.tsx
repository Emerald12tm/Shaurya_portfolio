"use client";

import { useState } from "react";
import { site } from "@/content";
import { MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/80 backdrop-blur-sm dark:border-white/[.12] dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#top" className="font-semibold tracking-tight">
          {site.name}
        </a>

        <nav className="hidden gap-8 text-sm font-medium text-zinc-600 sm:flex dark:text-zinc-400">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] sm:block dark:hover:bg-[#ccc]"
        >
          Resume
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-black/[.08] px-6 py-4 text-sm font-medium sm:hidden dark:border-white/[.12]">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
