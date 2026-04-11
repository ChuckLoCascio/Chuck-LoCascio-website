"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Match `max-[450px]` — swipe to change page on small phones only */
const SWIPE_BREAKPOINT_PX = 450;
const MIN_SWIPE_PX = 48;

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  date?: string;
}

export interface TestimonialsCarouselProps {
  items: readonly TestimonialItem[];
  className?: string;
}

const PAGE_SIZE = 2;

export function TestimonialsCarousel({
  items,
  className,
}: TestimonialsCarouselProps) {
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const [page, setPage] = useState(0);
  const [swipeEnabled, setSwipeEnabled] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SWIPE_BREAKPOINT_PX}px)`);
    const sync = (): void => {
      setSwipeEnabled(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const visible = useMemo(
    () => items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [items, page]
  );

  const goPrev = useCallback(() => {
    setPage((p) => (p <= 0 ? pageCount - 1 : p - 1));
  }, [pageCount]);

  const goNext = useCallback(() => {
    setPage((p) => (p >= pageCount - 1 ? 0 : p + 1));
  }, [pageCount]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!swipeEnabled || pageCount <= 1) return;
      const t = e.touches[0];
      if (!t) return;
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    },
    [swipeEnabled, pageCount]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!swipeEnabled || pageCount <= 1 || !touchStartRef.current) return;
      const start = touchStartRef.current;
      touchStartRef.current = null;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (
        Math.abs(dx) < MIN_SWIPE_PX ||
        Math.abs(dx) < Math.abs(dy)
      ) {
        return;
      }
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    },
    [swipeEnabled, pageCount, goPrev, goNext]
  );

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "grid gap-6 md:grid-cols-2",
          swipeEnabled && pageCount > 1 && "touch-pan-y"
        )}
        role="region"
        aria-label={`Testimonials page ${page + 1} of ${pageCount}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visible.map((t, i) => (
          <blockquote
            key={page * PAGE_SIZE + i}
            className="rounded-ch-card border border-ch-charcoal bg-ch-near-black/40 p-6 shadow-ch-sm md:p-8"
          >
            <p className="text-body-reading italic text-ch-white/95">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-5 space-y-1 text-sm text-ch-silver">
              <div className="font-semibold">
                <span className="text-ch-white">{t.author}</span>
                {t.role ? (
                  <>
                    <span className="text-ch-deep-charcoal"> · </span>
                    <span className="font-normal">{t.role}</span>
                  </>
                ) : null}
              </div>
              {t.date ? (
                <p className="text-xs font-normal text-ch-deep-charcoal">
                  {t.date}
                </p>
              ) : null}
            </footer>
          </blockquote>
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className={buttonClassName({
                variant: "outline",
                size: "md",
                className: "min-w-[2.75rem] px-3",
              })}
              aria-label="Previous testimonials"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className={buttonClassName({
                variant: "outline",
                size: "md",
                className: "min-w-[2.75rem] px-3",
              })}
              aria-label="Next testimonials"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
          <div className="flex items-center gap-2" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={
                  i === page
                    ? `Page ${i + 1}, current`
                    : `Go to testimonials page ${i + 1}`
                }
                onClick={() => setPage(i)}
                className={cn(
                  "h-2.5 rounded-full transition-colors duration-150",
                  i === page
                    ? "w-8 bg-ch-volt"
                    : "w-2.5 bg-ch-charcoal hover:bg-ch-deep-charcoal"
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
