import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { navLinks } from "@/content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Head back to the portfolio.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-24 sm:px-8">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          This page <span className="text-gradient">doesn&apos;t exist.</span>
        </h1>
        <p className="mt-5 max-w-lg text-muted">
          The link may be old or mistyped. Everything lives on the home page.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background"
          >
            Back to home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center rounded-full px-5 py-3 text-sm font-medium ring-1 ring-line-strong transition-colors hover:bg-white/[.04]"
          >
            See projects
          </Link>
        </div>

        <nav aria-label="Sections" className="mt-14 border-t border-line pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-accent">
                  {l.index} {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Footer />
    </>
  );
}
