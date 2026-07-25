import { site } from "@/content";
import Tooltip from "./Tooltip";
import { GithubIcon, LinkedInIcon, MailIcon } from "./icons";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-black/[.08] dark:border-white/[.12]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s Connect</h2>
        <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          Reach out about internships, research, collaboration, or just to say hi.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-block text-lg font-medium hover:underline"
        >
          {site.email}
        </a>

        <div className="mt-8 flex items-center justify-center gap-6">
          {site.socials.map((social) => {
            const Icon = iconFor[social.label];
            return (
              <Tooltip key={social.label} label={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {Icon ? <Icon className="size-6" /> : social.label}
                </a>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-black/[.08] px-6 py-6 text-center text-xs text-zinc-500 dark:border-white/[.12] dark:text-zinc-400">
        © {new Date().getFullYear()} {site.name}. Built with Next.js & Tailwind CSS.
      </footer>
    </section>
  );
}
