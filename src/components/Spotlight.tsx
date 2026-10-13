"use client";

import type { PointerEvent, ReactNode } from "react";

/** A `.panel` whose soft highlight follows the cursor. Purely decorative. */
export default function Spotlight({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
}) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag data-spotlight="" onPointerMove={onPointerMove} className={`panel ${className}`}>
      {children}
    </Tag>
  );
}
