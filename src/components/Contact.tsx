import { site } from "@/content";
import { ArrowUpRightIcon, GithubIcon, LinkedInIcon, MailIcon } from "./icons";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
};

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div className="reveal panel relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <p className="relative font-mono text-xs tracking-[0.2em] text-accent uppercase">06 · Contact</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s build something <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-muted">
            Research mentorship, robotics, collaboration, or questions about my work. My inbox is
            open.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5"
          >
            <MailIcon className="size-4" /> {site.email}
          </a>

          <ul className="relative mt-8 flex items-center justify-center gap-6 text-sm">
            {site.socials
              .filter((s) => s.label !== "Email")
              .map((social) => {
                const Icon = iconFor[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
                    >
                      {Icon && <Icon className="size-4" />}
                      {social.label}
                      <ArrowUpRightIcon className="size-3.5" />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-[11px] text-faint sm:flex-row sm:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Next.js · Tailwind · projects re-ranked hourly from GitHub</span>
        </div>
      </footer>
    </section>
  );
}
