"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, VolumeOffIcon, VolumeOnIcon } from "./icons";

/**
 * Muted, looping project video that only plays while on screen.
 * - Doesn't download until it's about to play (preload="none" + poster).
 * - Never autoplays for visitors who prefer reduced motion.
 * - Visible pause and sound controls (WCAG 2.2.2: moving content >5s must be pausable).
 * - Once the visitor pauses it, scrolling won't restart it.
 */
export default function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          // Browsers may still block autoplay (e.g. data saver); the play button covers that case.
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  }

  const button =
    "grid size-11 cursor-pointer place-items-center rounded-full bg-background/75 text-foreground ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-background";

  return (
    <div className="absolute inset-0">
      <video
        ref={ref}
        className="size-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute right-3 bottom-3 flex gap-2">
        <button type="button" onClick={togglePlay} className={button} aria-label={playing ? "Pause video" : "Play video"}>
          {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          className={button}
          aria-label="Sound"
          aria-pressed={!muted}
        >
          {muted ? <VolumeOffIcon className="size-4" /> : <VolumeOnIcon className="size-4" />}
        </button>
      </div>
    </div>
  );
}
