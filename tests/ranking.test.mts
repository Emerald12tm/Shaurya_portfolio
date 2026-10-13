import { test } from "node:test";
import assert from "node:assert/strict";
import { commitCountFromLink, rankRepos, scoreRepo, type RepoSignals } from "../src/lib/ranking.ts";

const NOW = Date.parse("2026-10-12T00:00:00Z");
const daysAgo = (d: number) => new Date(NOW - d * 86_400_000).toISOString();

function repo(overrides: Partial<RepoSignals>): RepoSignals {
  return {
    name: "repo",
    url: "https://github.com/x/repo",
    description: null,
    homepage: null,
    language: "JavaScript",
    languages: { JavaScript: 10_000 },
    stars: 0,
    forks: 0,
    fork: false,
    archived: false,
    pushedAt: daysAgo(30),
    createdAt: daysAgo(100),
    commits: 10,
    ...overrides,
  };
}

test("forks, archived, empty and hidden repos are excluded", () => {
  const ranked = rankRepos(
    [
      repo({ name: "keep" }),
      repo({ name: "forked", fork: true }),
      repo({ name: "old", archived: true }),
      repo({ name: "empty", languages: {} }),
      repo({ name: "Secret" }),
    ],
    { hidden: ["secret"], now: NOW },
  );
  assert.deepEqual(ranked.map((r) => r.name), ["keep"]);
});

test("sustained, recent, substantial work outranks a tiny one-off", () => {
  const ranked = rankRepos(
    [
      repo({ name: "one-off", commits: 1, languages: { HTML: 400 }, pushedAt: daysAgo(60) }),
      repo({ name: "flagship", commits: 73, languages: { Java: 147_000 }, pushedAt: daysAgo(0) }),
      repo({ name: "app", commits: 30, languages: { JavaScript: 140_000 }, pushedAt: daysAgo(43) }),
    ],
    { now: NOW },
  );
  assert.deepEqual(ranked.map((r) => r.name), ["flagship", "app", "one-off"]);
});

test("a stale project drops below an active one of similar size", () => {
  const ranked = rankRepos(
    [
      repo({ name: "abandoned", commits: 40, pushedAt: daysAgo(400) }),
      repo({ name: "active", commits: 25, pushedAt: daysAgo(2) }),
    ],
    { now: NOW },
  );
  assert.equal(ranked[0].name, "active");
});

test("stars and a live deployment add reach", () => {
  const base = scoreRepo(repo({}), NOW);
  const popular = scoreRepo(repo({ stars: 4, homepage: "https://x.dev" }), NOW);
  assert.equal(popular.breakdown.reach - base.breakdown.reach, 4 * 5 + 6);
});

test("momentum never exceeds its cap, even for future timestamps", () => {
  const s = scoreRepo(repo({ pushedAt: new Date(NOW + 86_400_000).toISOString() }), NOW);
  assert.ok(s.breakdown.momentum <= 30);
});

test("commit count is read from the Link header", () => {
  const link =
    '<https://api.github.com/repositories/1/commits?per_page=1&page=2>; rel="next", <https://api.github.com/repositories/1/commits?per_page=1&page=73>; rel="last"';
  assert.equal(commitCountFromLink(link, 1), 73);
  assert.equal(commitCountFromLink(null, 1), 1);
  assert.equal(commitCountFromLink(null, 0), 0);
});
