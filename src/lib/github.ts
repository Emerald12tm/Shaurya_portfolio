import "server-only";
import { github, projectNotes, type ProjectNote } from "@/content";
import { commitCountFromLink, rankRepos, type RankedRepo, type RepoSignals } from "./ranking";

// How often (seconds) the ranking is rebuilt from live GitHub data.
export const GITHUB_REVALIDATE = 3600;

export type Project = RankedRepo & { note?: ProjectNote };

export type ProjectFeed = {
  projects: Project[];
  /** ISO timestamp of when this ranking was computed. */
  rankedAt: string;
  /** False when GitHub couldn't be reached and curated fallbacks are shown. */
  live: boolean;
};

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  created_at: string;
};

function gh(path: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: set GITHUB_TOKEN in Vercel to lift the 60 req/hour anonymous limit.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: GITHUB_REVALIDATE, tags: ["github"] },
  });
}

async function commitCount(repo: string): Promise<number> {
  const res = await gh(`/repos/${github.user}/${repo}/commits?per_page=1`);
  if (res.status === 409) return 0; // empty repository
  if (!res.ok) throw new Error(`commits ${repo}: ${res.status}`);
  const page = (await res.json()) as unknown[];
  return commitCountFromLink(res.headers.get("link"), page.length);
}

async function languages(repo: string): Promise<Record<string, number>> {
  const res = await gh(`/repos/${github.user}/${repo}/languages`);
  if (!res.ok) throw new Error(`languages ${repo}: ${res.status}`);
  return res.json();
}

function noteFor(name: string): ProjectNote | undefined {
  return projectNotes[name.toLowerCase()];
}

async function fetchLive(): Promise<Project[]> {
  const res = await gh(`/users/${github.user}/repos?per_page=100&type=owner&sort=pushed`);
  if (!res.ok) throw new Error(`repos: ${res.status}`);
  const repos = (await res.json()) as GithubRepo[];

  const hidden = new Set(github.hidden.map((n) => n.toLowerCase()));
  // Only spend API calls on repos that could actually be ranked.
  const candidates = repos.filter((r) => !r.fork && !r.archived && !hidden.has(r.name.toLowerCase()));

  const signals: RepoSignals[] = await Promise.all(
    candidates.map(async (r) => {
      const [commits, langs] = await Promise.all([commitCount(r.name), languages(r.name)]);
      return {
        name: r.name,
        url: r.html_url,
        description: r.description,
        homepage: r.homepage || null,
        language: r.language,
        languages: langs,
        stars: r.stargazers_count,
        forks: r.forks_count,
        fork: r.fork,
        archived: r.archived,
        pushedAt: r.pushed_at,
        createdAt: r.created_at,
        commits,
      };
    }),
  );

  return rankRepos(signals, { hidden: github.hidden }).map((repo) => ({
    ...repo,
    note: noteFor(repo.name),
  }));
}

/** Curated projects in the order written in content.ts, for when GitHub is unreachable. */
function fallback(): Project[] {
  return Object.entries(projectNotes).map(([name, note]) => ({
    name,
    url: `https://github.com/${github.user}/${name}`,
    description: note.summary,
    homepage: note.liveUrl ?? null,
    language: note.stack[0] ?? null,
    languages: {},
    stars: 0,
    forks: 0,
    fork: false,
    archived: false,
    pushedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
    commits: 0,
    score: 0,
    breakdown: { activity: 0, momentum: 0, substance: 0, reach: 0 },
    note,
  }));
}

export async function getProjectFeed(): Promise<ProjectFeed> {
  const rankedAt = new Date().toISOString();
  try {
    const projects = await fetchLive();
    if (projects.length === 0) throw new Error("no rankable repos");
    return { projects, rankedAt, live: true };
  } catch (err) {
    console.error("[github] falling back to curated projects:", err);
    return { projects: fallback(), rankedAt, live: false };
  }
}
