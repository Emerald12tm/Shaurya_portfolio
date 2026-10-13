"use client";

import { useSyncExternalStore } from "react";
import { formatRelativeTime, formatShortDate } from "@/lib/time";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, MINUTE);
  return () => window.clearInterval(id);
}

// Snapshot at minute granularity so it stays stable between ticks.
const getMinute = () => Math.floor(Date.now() / MINUTE);
const getServerMinute = () => null;

/** Server renders an absolute date; the client upgrades it to "3h ago" without a hydration mismatch. */
export default function RelativeTime({ iso, className }: { iso: string; className?: string }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  return (
    <time dateTime={iso} title={new Date(iso).toUTCString()} className={className}>
      {minute === null ? formatShortDate(iso) : formatRelativeTime(iso, minute * MINUTE)}
    </time>
  );
}
