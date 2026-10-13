import { site, stats, trajectory } from "@/content";
import type { ProjectFeed } from "@/lib/github";
import RelativeTime from "./RelativeTime";
import Tooltip from "./Tooltip";
import { ArrowDownIcon, GithubIcon, LinkedInIcon, MailIcon } from "./icons";

const iconFor: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
};

function StatusPanel({ feed }: { feed: ProjectFeed }) {
  const top = feed.projects[0];
  const latest = feed.live
    ? [...feed.projects].sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))[0]
    : undefined;
  const commits = feed.projects.reduce((sum, p) => sum + p.commits, 0);
  const focus = trajectory
    .filter((m) => m.status === "active")
    .map((m) => m.title.split(" — ")[0])
    .join(" · ");

  const rows: { key: string; value: React.ReactNode }[] = [
    { key: "focus", value: focus },
    { key: "top_repo", value: top && <>{top.note?.title ?? top.name} <span className="text-accent">#01</span></> },
    ...(feed.live
      ? [
          { key: "commits", value: `${commits} across ranked repos` },
          {
            key: "last_push",
            value: latest && (
              <>
                <RelativeTime iso={latest.pushedAt} /> <span className="text-faint">· {latest.name}</span>
              </>
            ),
          },
        ]
      : []),
    { key: "team", value: "FTC 26936 · AgileBlast" },
    { key: "location", value: site.location },
  ];

  return (
    <div className="panel enter overflow-hidden shadow-2xl shadow-black/50" style={{ "--i": 4 } as React.CSSProperties}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-3 font-mono text-[11px] text-faint">shaurya@agileblast: ~/status</span>
        {feed.live && (
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-accent">
            <span className="pulse-dot" aria-hidden="true" /> LIVE
          </span>
        )}
      </div>
      <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
        <p className="text-muted">
          <span className="text-accent">$</span> status --now
        </p>
        <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2">
          {rows.map((row) => (
            <div key={row.key} className="contents">
              <dt className="text-faint">{row.key}</dt>
              <dd className="min-w-0 text-foreground/90">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="pt-1 text-muted">
          <span className="text-accent">$</span> <span className="caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

export default function Hero({ feed }: { feed: ProjectFeed }) {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
      <div>
        <p className="enter inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted">
          <span className="pulse-dot" aria-hidden="true" />
          {site.classOf} · {site.availability}
        </p>

        <h1 className="enter mt-7 text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="sr-only">{site.name}. </span>
          {site.headline.map((line, i) => (
            <span key={line} className={`block ${i === site.headline.length - 1 ? "text-gradient" : ""}`}>
              {line}
            </span>
          ))}
        </h1>

        <p className="enter mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8" style={{ "--i": 2 } as React.CSSProperties}>
          {site.tagline}
        </p>

        <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background shadow-[0_0_32px_-8px_var(--accent)] transition-transform hover:-translate-y-0.5"
          >
            See my work <ArrowDownIcon className="size-4" />
          </a>
          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-3 text-sm font-medium ring-1 ring-line-strong transition-colors hover:bg-white/[.04]"
            >
              Resume
            </a>
          )}
          <div className="ml-1 flex items-center gap-1">
            {site.socials.map((social) => {
              const Icon = iconFor[social.label];
              return (
                <Tooltip key={social.label} label={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[.05] hover:text-foreground"
                  >
                    {Icon ? <Icon className="size-5" /> : social.label}
                  </a>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <dl className="enter mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line" style={{ "--i": 4 } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end px-3 py-4 first:pl-0 sm:px-4">
              <dt className="mt-1 font-mono text-[10px] tracking-wider text-faint uppercase">{s.label}</dt>
              <dd className="text-lg font-semibold tracking-tight whitespace-nowrap sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <StatusPanel feed={feed} />
    </section>
  );
}
