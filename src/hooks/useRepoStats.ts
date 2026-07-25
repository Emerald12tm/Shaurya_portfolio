"use client";

import { useEffect, useState } from "react";
import {
  fetchRepoStats,
  isStale,
  parseGithubRepo,
  readCache,
  writeCache,
  type RepoStats,
} from "@/lib/repoStats";

export function useRepoStats(repoUrl: string | undefined) {
  const parsed = repoUrl ? parseGithubRepo(repoUrl) : null;
  const [data, setData] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(Boolean(parsed));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!parsed) return;
    const { owner, repo } = parsed;
    let cancelled = false;

    (async () => {
      const cached = readCache(owner, repo);
      if (cancelled) return;

      if (cached) {
        // Optimistically show the last-known value while we silently revalidate.
        setData(cached.data);
        setLoading(false);
      }

      if (!cached || isStale(cached)) {
        try {
          const fresh = await fetchRepoStats(owner, repo);
          if (cancelled) return;
          writeCache(owner, repo, fresh);
          setData(fresh);
          setError(false);
        } catch {
          if (!cancelled && !cached) setError(true);
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoUrl]);

  return { data, loading, error };
}
