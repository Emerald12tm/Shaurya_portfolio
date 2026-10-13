"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

type Status = "idle" | "copied" | "error";

/** Copies an address to the clipboard, with a visible + screen-reader status message. */
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), status === "copied" ? 2500 : 6000);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted ring-1 ring-line-strong transition-colors hover:bg-white/[.04] hover:text-foreground"
      >
        {status === "copied" ? (
          <CheckIcon className="size-4 text-accent" />
        ) : (
          <CopyIcon className="size-4" />
        )}
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-xs">
        {status === "copied" && <span className="text-accent">Email copied to your clipboard.</span>}
        {status === "error" && (
          <span className="text-rose-300">
            Couldn&apos;t copy automatically. The address is <span className="select-all font-mono">{email}</span>
          </span>
        )}
      </p>
    </div>
  );
}
