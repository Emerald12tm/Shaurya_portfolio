export type RepoStats = {
  stars: number;
  language: string | null;
  updatedAt: string;
};

type CacheEntry = { data: RepoStats; fetchedAt: number };

const CACHE_PREFIX = "gh-repo-stats:";
const STALE_MS = 60 * 60 * 1000; // re-fetch in the background after an hour

export function parseGithubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

function cacheKey(owner: string, repo: string) {
  return `${CACHE_PREFIX}${owner}/${repo}`;
}

export function readCache(owner: string, repo: string): CacheEntry | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(cacheKey(owner, repo));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

export function writeCache(owner: string, repo: string, data: RepoStats) {
  if (typeof window === "undefined") return;
  const entry: CacheEntry = { data, fetchedAt: Date.now() };
  window.localStorage.setItem(cacheKey(owner, repo), JSON.stringify(entry));
}

export function isStale(entry: CacheEntry): boolean {
  return Date.now() - entry.fetchedAt > STALE_MS;
}

export async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const json = await res.json();
  return {
    stars: json.stargazers_count ?? 0,
    language: json.language ?? null,
    updatedAt: json.pushed_at ?? json.updated_at,
  };
}

export function formatRelativeTime(iso: string): string {
  const diffSec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
}
