import { github } from "@/content";
import type { Project, ProjectFeed } from "@/lib/github";
import ProjectVisual, { languageColor } from "./ProjectVisual";
import RelativeTime from "./RelativeTime";
import SectionHeading from "./SectionHeading";
import SignalMeter, { SignalLegend } from "./SignalMeter";
import Spotlight from "./Spotlight";
import { ArrowUpRightIcon, GithubIcon } from "./icons";

function prettyName(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function rankLabel(i: number) {
  return `#${String(i + 1).padStart(2, "0")}`;
}

function Meta({ project, live }: { project: Project; live: boolean }) {
  if (!live) return null;
  return (
    <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
      {project.language && (
        <div className="inline-flex">
          <dt className="sr-only">Language</dt>
          <dd className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: languageColor(project.language) }} />
            {project.language}
          </dd>
        </div>
      )}
      <div className="inline-flex gap-1">
        <dt className="sr-only">Commits</dt>
        <dd>
          {project.commits} {project.commits === 1 ? "commit" : "commits"}
        </dd>
      </div>
      <div className="inline-flex gap-1">
        <dt>pushed</dt>
        <dd>
          <RelativeTime iso={project.pushedAt} />
        </dd>
      </div>
      {project.stars > 0 && (
        <div className="inline-flex gap-1">
          <dt className="sr-only">Stars</dt>
          <dd>★ {project.stars}</dd>
        </div>
      )}
    </dl>
  );
}

function Links({ project, title }: { project: Project; title: string }) {
  const live = project.note?.liveUrl ?? project.homepage;
  return (
    <div className="flex items-center gap-2">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} live site`}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent ring-1 ring-accent/25 transition-colors hover:bg-accent/20"
        >
          Live <ArrowUpRightIcon className="size-3.5" />
        </a>
      )}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} source on GitHub`}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted ring-1 ring-line transition-colors hover:text-foreground hover:ring-line-strong"
      >
        <GithubIcon className="size-3.5" /> Code
      </a>
    </div>
  );
}

function FeaturedCard({
  project,
  index,
  max,
  live,
}: {
  project: Project;
  index: number;
  max: number;
  live: boolean;
}) {
  const note = project.note;
  const title = note?.title ?? prettyName(project.name);
  return (
    <Spotlight as="article" className="reveal group flex flex-col overflow-hidden">
      <div className="relative border-b border-line">
        <ProjectVisual
          name={project.name}
          title={title}
          language={project.language}
          image={note?.image}
          video={note?.video}
          priority={index === 0}
        />
        <span className="absolute top-3 right-3 rounded-full bg-background/70 px-2.5 py-1 font-mono text-xs text-accent ring-1 ring-accent/30 backdrop-blur">
          {rankLabel(index)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          {note?.kicker && (
            <p className="font-mono text-[11px] tracking-widest text-accent/90 uppercase">{note.kicker}</p>
          )}
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{note?.summary ?? project.description}</p>
        </div>

        {note && note.highlights.length > 0 && (
          <ul className="space-y-2 text-sm leading-6 text-foreground/85">
            {note.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {note && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {note.stack.map((s) => (
              <li key={s} className="rounded-md bg-white/[.04] px-2 py-1 font-mono text-[11px] text-muted ring-1 ring-line">
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto space-y-4 border-t border-line pt-4">
          {live && <SignalMeter score={project.score} breakdown={project.breakdown} max={max} />}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Meta project={project} live={live} />
            <Links project={project} title={title} />
          </div>
        </div>
      </div>
    </Spotlight>
  );
}

function CompactRow({
  project,
  index,
  max,
  live,
}: {
  project: Project;
  index: number;
  max: number;
  live: boolean;
}) {
  const title = project.note?.title ?? prettyName(project.name);
  const summary = project.note?.summary ?? project.description;
  return (
    <Spotlight as="li" className="reveal grid gap-4 p-5 sm:grid-cols-[3rem_1fr_14rem] sm:items-center sm:p-6">
      <span className="font-mono text-sm text-faint">{rankLabel(index)}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <Meta project={project} live={live} />
        </div>
        {summary && <p className="mt-1.5 text-sm leading-6 text-muted">{summary}</p>}
      </div>
      <div className="flex flex-col gap-3 sm:items-end">
        {live && (
          <div className="w-full">
            <SignalMeter score={project.score} breakdown={project.breakdown} max={max} />
          </div>
        )}
        <Links project={project} title={title} />
      </div>
    </Spotlight>
  );
}

export default function Projects({ feed }: { feed: ProjectFeed }) {
  const shown = feed.projects.slice(0, github.limit);
  const featured = shown.slice(0, github.featured);
  const rest = shown.slice(github.featured);
  const max = shown[0]?.score ?? 0;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <SectionHeading index="01" label="Projects" title={<>Ranked live from GitHub.</>}>
        <p>
          Not hand-picked. Every original repo I own is scored on commit history, recent activity,
          volume of code, and reach. The list re-ranks itself every hour, so whatever I&apos;m
          building hardest right now rises to the top.
        </p>
      </SectionHeading>

      <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-surface px-4 py-3 font-mono text-xs text-muted">
        {feed.live ? (
          <>
            <span className="inline-flex items-center gap-2.5 text-accent">
              <span className="pulse-dot" aria-hidden="true" /> LIVE
            </span>
            <span>
              ranked <RelativeTime iso={feed.rankedAt} />
            </span>
            <span>{feed.projects.length} repos scored</span>
          </>
        ) : (
          <span>Showing a saved snapshot. GitHub is unreachable right now.</span>
        )}
        <a
          href={`https://github.com/${github.user}/Shaurya_portfolio/blob/main/src/lib/ranking.ts`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-accent"
        >
          ranking.ts <ArrowUpRightIcon className="size-3.5" />
        </a>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {featured.map((project, i) => (
          <FeaturedCard key={project.name} project={project} index={i} max={max} live={feed.live} />
        ))}
      </div>

      {rest.length > 0 && (
        <ol className="mt-6 grid gap-4" start={github.featured + 1}>
          {rest.map((project, i) => (
            <CompactRow
              key={project.name}
              project={project}
              index={i + github.featured}
              max={max}
              live={feed.live}
            />
          ))}
        </ol>
      )}

      {feed.live && (
        <div className="reveal mt-8">
          <SignalLegend />
        </div>
      )}
    </section>
  );
}
