"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function videoLabelFromSrc(src: string): string {
  try {
    const pathPart = src.split("/").pop() ?? "";
    return decodeURIComponent(pathPart).replace(/\.[^.]+$/, "") || "Video";
  } catch {
    return "Video";
  }
}

export interface CaseStudyVideoSectionProps {
  videos: string[];
  /** Autoplay (muted) when the player scrolls into view; pause when it leaves. */
  autoplayInView?: boolean;
}

function IconSpeaker({ muted }: { muted: boolean }): JSX.Element {
  if (muted) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L19.5 10.94l-1.72-1.72Z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.826a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 2.828 2.828 0 0 0 4-4 .75.75 0 1 1 1.06-1.06 4.328 4.328 0 0 1-6.116 6.116.75.75 0 0 1 0-1.06 2.828 2.828 0 0 0 0-4 4.328 4.328 0 0 1 0-6.116.75.75 0 0 1 0-1.06Z" />
      <path d="M15.932 7.974a.75.75 0 0 1 1.061 0 4.547 4.547 0 0 1 0 6.435.75.75 0 1 1-1.06-1.06 3.047 3.047 0 0 0 0-4.315.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

export function CaseStudyVideoSection({
  videos,
  autoplayInView = false,
}: CaseStudyVideoSectionProps): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSrc = videos[activeIndex] ?? videos[0];

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
    el.muted = muted;
  }, [volume, muted, activeSrc]);

  useEffect(() => {
    if (!autoplayInView) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [autoplayInView, activeSrc]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (m && volume === 0) {
        setVolume(0.85);
      }
      return !m;
    });
  }, [volume]);

  const onVolumeChange = useCallback((value: number) => {
    setVolume(value);
    if (value === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }, []);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-ch-card border border-ch-charcoal bg-ch-page shadow-ch-sm"
      >
        <video
          key={activeSrc}
          ref={videoRef}
          className="aspect-video w-full"
          controls
          playsInline
          muted={muted}
          preload="metadata"
        >
          <source src={activeSrc} />
          Your browser does not support the video tag.
        </video>
        {autoplayInView ? (
          <div className="pointer-events-none absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
            <div className="pointer-events-auto flex flex-col items-stretch gap-2 rounded-ch border border-ch-charcoal/90 bg-ch-page/90 px-2 py-2 shadow-ch-sm backdrop-blur-sm sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ch text-ch-silver transition-colors hover:bg-ch-near-black hover:text-ch-volt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ch-volt"
                aria-label={muted ? "Turn sound on" : "Mute video"}
              >
                <IconSpeaker muted={muted} />
              </button>
              {!muted ? (
                <label className="flex min-w-[7rem] cursor-pointer items-center gap-2 px-1">
                  <span className="sr-only">Volume</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) =>
                      onVolumeChange(parseFloat(e.target.value))
                    }
                    className="h-1.5 w-full min-w-[5rem] cursor-pointer accent-ch-volt"
                    aria-label="Video volume"
                  />
                </label>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {videos.length > 1 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <span className="ch-label shrink-0 pt-1">More clips</span>
          <div
            className="flex min-w-0 flex-1 flex-wrap gap-2"
            role="radiogroup"
            aria-label="Choose which video plays above"
          >
            {videos.map((src, index) => {
              const label = videoLabelFromSrc(src);
              const selected = index === activeIndex;
              return (
                <button
                  key={src}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={`${label}, video ${index + 1} of ${videos.length}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "max-w-full truncate rounded-ch border px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                    selected
                      ? "border-ch-volt bg-ch-near-black text-ch-volt shadow-ch-neon"
                      : "border-ch-charcoal bg-ch-near-black/50 text-ch-silver hover:border-ch-volt/50 hover:text-ch-white"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
