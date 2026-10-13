// Pure ranking logic for "which of my repos matter most right now".
// No framework imports, so it can be unit-tested with plain `node --test`.

export type RepoSignals = {
  name: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  languages: Record<string, number>;
  stars: number;
  forks: number;
  fork: boolean;
  archived: boolean;
  pushedAt: string;
  createdAt: string;
  commits: number;
};

export type ScoreBreakdown = {
  /** How much work went in: commit count, log-scaled. */
  activity: number;
  /** How recently it was worked on: decays with a ~3-month time constant. */
  momentum: number;
  /** How much code there is: bytes of source, log-scaled. */
  substance: number;
  /** Signs other people use it: stars, forks, a live deployment. */
  reach: number;
};

export type RankedRepo = RepoSignals & {
  score: number;
  breakdown: ScoreBreakdown;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export const WEIGHTS = {
  perCommitDoubling: 10,
  momentumMax: 30,
  momentumDecayDays: 90,
  perCodeDecade: 4,
  star: 5,
  fork: 3,
  liveSite: 6,
  description: 3,
} as const;

export function codeBytes(repo: Pick<RepoSignals, "languages">): number {
  return Object.values(repo.languages).reduce((sum, n) => sum + n, 0);
}

export function scoreRepo(repo: RepoSignals, now: number = Date.now()): RankedRepo {
  const daysSincePush = Math.max(0, (now - new Date(repo.pushedAt).getTime()) / DAY_MS);

  const breakdown: ScoreBreakdown = {
    activity: WEIGHTS.perCommitDoubling * Math.log2(1 + repo.commits),
    momentum: WEIGHTS.momentumMax * Math.exp(-daysSincePush / WEIGHTS.momentumDecayDays),
    substance: WEIGHTS.perCodeDecade * Math.log10(1 + codeBytes(repo)),
    reach:
      WEIGHTS.star * repo.stars +
      WEIGHTS.fork * repo.forks +
      (repo.homepage ? WEIGHTS.liveSite : 0) +
      (repo.description ? WEIGHTS.description : 0),
  };

  const score = breakdown.activity + breakdown.momentum + breakdown.substance + breakdown.reach;
  return { ...repo, score: Math.round(score * 10) / 10, breakdown };
}

/**
 * Drops forks, archived and empty repos plus anything in `hidden`, then sorts
 * the rest by score (highest first). Ties go to the more recently pushed repo.
 */
export function rankRepos(
  repos: RepoSignals[],
  { hidden = [], now = Date.now() }: { hidden?: string[]; now?: number } = {},
): RankedRepo[] {
  const hiddenSet = new Set(hidden.map((name) => name.toLowerCase()));

  return repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !hiddenSet.has(repo.name.toLowerCase()) &&
        codeBytes(repo) > 0,
    )
    .map((repo) => scoreRepo(repo, now))
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
    );
}

/** Parses the commit total out of GitHub's `Link` header on a `per_page=1` request. */
export function commitCountFromLink(link: string | null, pageLength: number): number {
  if (!link) return pageLength;
  const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return match ? Number(match[1]) : pageLength;
}
