import { site } from "@/content";
import CopyEmail from "./CopyEmail";
import { ArrowUpRightIcon, GithubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./icons";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
};

export default function Contact() {
  const telHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : undefined;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div className="reveal panel relative overflow-hidden px-5 py-14 text-center sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] max-w-[200%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <p className="relative font-mono text-xs tracking-[0.2em] text-accent uppercase">06 · Contact</p>
          <h2
            id="contact-heading"
            className="relative mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Let&apos;s build something <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-muted">
            Research mentorship, robotics, collaboration, or questions about my work. My inbox is
            open.
          </p>

          <div className="relative mt-9 flex flex-col items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold break-all text-background shadow-[0_0_40px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5"
            >
              <MailIcon className="size-4 shrink-0" aria-hidden="true" /> {site.email}
            </a>
            <CopyEmail email={site.email} />
          </div>

          <ul className="relative mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {telHref && (
              <li>
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-foreground"
                >
                  <PhoneIcon className="size-4" /> {site.phone}
                </a>
              </li>
            )}
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
                      className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-foreground"
                    >
                      {Icon && <Icon className="size-4" aria-hidden="true" />}
                      {social.label}
                      <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
