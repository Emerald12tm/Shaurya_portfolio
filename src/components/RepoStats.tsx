"use client";

import { useRepoStats } from "@/hooks/useRepoStats";
import { formatRelativeTime } from "@/lib/repoStats";
import Tooltip from "./Tooltip";
import { StarIcon, ClockIcon } from "./icons";

export default function RepoStats({ repoUrl }: { repoUrl?: string }) {
  const { data, loading, error } = useRepoStats(repoUrl);

  if (!repoUrl || error) return null;

  if (loading && !data) {
    return (
      <div className="mt-3 flex items-center gap-3" aria-hidden="true">
        <span className="h-4 w-10 animate-pulse rounded bg-black/[.06] dark:bg-white/[.08]" />
        <span className="h-4 w-14 animate-pulse rounded bg-black/[.06] dark:bg-white/[.08]" />
        <span className="h-4 w-16 animate-pulse rounded bg-black/[.06] dark:bg-white/[.08]" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
      <Tooltip label="GitHub stars">
        <span className="inline-flex items-center gap-1">
          <StarIcon className="size-3.5" />
          {data.stars}
        </span>
      </Tooltip>

      {data.language && (
        <Tooltip label="Primary language">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            {data.language}
          </span>
        </Tooltip>
      )}

      <Tooltip label={`Last commit: ${new Date(data.updatedAt).toLocaleDateString()}`}>
        <span className="inline-flex items-center gap-1">
          <ClockIcon className="size-3.5" />
          {formatRelativeTime(data.updatedAt)}
        </span>
      </Tooltip>
    </div>
  );
}
