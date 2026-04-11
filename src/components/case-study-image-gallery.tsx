"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface CaseStudyImageItem {
  src: string;
  alt: string;
}

export interface CaseStudyImageGalleryProps {
  images: CaseStudyImageItem[];
}

function IconClose(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CaseStudyImageGallery({
  images,
}: CaseStudyImageGalleryProps): JSX.Element {
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  const close = useCallback(() => setOpenSrc(null), []);

  useEffect(() => {
    if (!openSrc) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openSrc, close]);

  return (
    <>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {images.map(({ src, alt }) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenSrc(src)}
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-ch-card border border-ch-charcoal bg-ch-near-black text-left transition-colors hover:border-ch-volt/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ch-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ch-page"
            aria-label={`Open ${alt} full screen`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain transition-opacity group-hover:opacity-95"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </button>
        ))}
      </div>

      {openSrc ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ch-page/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image full screen"
        >
          <div className="flex shrink-0 justify-end p-3 sm:p-4">
            <button
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-ch border border-ch-charcoal bg-ch-near-black text-ch-white transition-colors hover:border-ch-volt/50 hover:bg-ch-page hover:text-ch-volt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ch-volt"
              aria-label="Close full screen image"
            >
              <IconClose />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-8 pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- modal needs intrinsic full-size without layout shift */}
            <img
              src={openSrc}
              alt={
                images.find((item) => item.src === openSrc)?.alt ??
                "Case study image"
              }
              className="max-h-[calc(100vh-6rem)] max-w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
