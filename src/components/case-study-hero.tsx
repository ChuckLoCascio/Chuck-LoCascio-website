import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CaseStudySummary } from "@/lib/portfolio-content";

export interface CaseStudyHeroProps {
  study: CaseStudySummary;
  thumbnailSrc?: string;
  index: number;
}

export function CaseStudyHero({
  study,
  thumbnailSrc,
  index,
}: CaseStudyHeroProps) {
  const href = `/work/${study.slug}`;
  const reverse = index % 2 === 1;

  return (
    <article
      className={cn(
        "border-t border-ch-charcoal",
        index % 2 === 0 ? "bg-ch-page" : "bg-ch-near-black/50"
      )}
    >
      <Link
        href={href}
        aria-label={`${study.title} — view case study`}
        className="group container-page block py-14 md:py-20 lg:py-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ch-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ch-page"
      >
        <div
          className={cn(
            "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14 xl:gap-20",
            reverse && "lg:flex-row-reverse"
          )}
        >
          <div className="relative aspect-[16/10] w-full flex-1 overflow-hidden rounded-ch-card border border-ch-charcoal bg-ch-near-black shadow-ch-sm transition-shadow duration-300 group-hover:shadow-ch-md">
            {thumbnailSrc ? (
              <Image
                src={thumbnailSrc}
                alt={`${study.title} preview`}
                fill
                className="object-cover object-top transition-opacity duration-300 group-hover:opacity-95"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ch-near-black p-8 text-center"
                aria-hidden
              >
                <span className="font-display text-4xl font-medium text-ch-volt">
                  {study.client.slice(0, 1)}
                </span>
                <span className="ch-label !normal-case text-xs">
                  Add images to case study folder
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center lg:max-w-xl xl:max-w-2xl">
            <p className="ch-label">{study.client} · {study.duration}</p>
            <h3 className="mt-4 font-display text-3xl font-medium leading-none tracking-tight text-ch-white transition-colors group-hover:text-ch-volt md:text-4xl lg:text-5xl">
              {study.title}
            </h3>
            <p className="mt-4 text-body-reading">{study.tagline}</p>
            {study.metrics[0] ? (
              <p className="mt-6 border-l-2 border-ch-volt pl-4 text-sm font-medium text-ch-white/90">
                {study.metrics[0]}
              </p>
            ) : null}
            <span className="mt-8 inline-flex items-center text-base font-medium text-ch-volt">
              View case study
              <span
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
