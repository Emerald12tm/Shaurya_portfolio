import { site } from "@/content";
import { GithubIcon, LinkedInIcon, MailIcon, ArrowDownIcon } from "./icons";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
};

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:px-8 sm:pt-28">
      <p className="mb-4 inline-flex items-center rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.12] dark:text-zinc-400">
        {site.location} · {site.availability}
      </p>

      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Hi, I&apos;m {site.name}.
      </h1>
      <p className="mt-2 max-w-2xl text-2xl font-medium text-zinc-500 sm:text-3xl dark:text-zinc-400">
        {site.role}
      </p>

      <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {site.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          View My Projects
        </a>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/[.08] px-5 py-3 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Download Resume
          <ArrowDownIcon className="size-4" />
        </a>
      </div>

      <div className="mt-10 flex items-center gap-5">
        {site.socials.map((social) => {
          const Icon = iconFor[social.label];
          return (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {Icon ? <Icon className="size-6" /> : social.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
