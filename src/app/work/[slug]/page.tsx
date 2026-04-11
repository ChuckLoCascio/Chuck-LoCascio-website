import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyImageGallery } from "@/components/case-study-image-gallery";
import { CaseStudyVideoSection } from "@/components/case-study-video-section";
import { buttonClassName } from "@/components/ui/button";
import {
  CASE_STUDY_IMAGE_FOLDER,
  CASE_STUDY_VIDEO_FOLDER,
  CASE_STUDY_VIDEOS,
  getCaseStudyImages,
  getCaseStudyVideos,
  orderCaseStudyVideos,
} from "@/lib/case-study-media";
import { getCaseStudyDetail, caseStudies } from "@/lib/portfolio-content";

function filenameFromMediaSrc(src: string): string {
  try {
    const pathPart = src.split("/").pop() ?? "";
    return decodeURIComponent(pathPart).replace(/\.[^.]+$/, "") || "Case study";
  } catch {
    return "Case study image";
  }
}

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cs = getCaseStudyDetail(params.slug);
  if (!cs) return { title: "Case study" };
  return {
    title: cs.title,
    description: cs.tagline,
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const { slug } = params;
  const cs = getCaseStudyDetail(slug);
  if (!cs) notFound();

  const images = getCaseStudyImages(slug);
  const videos = orderCaseStudyVideos(slug, getCaseStudyVideos(slug));

  const problemTitle = cs.problemHeading ?? "Challenge";
  const showQuoteHeading = cs.showQuoteHeading !== false;
  const deliveredPrototypeLayout = Boolean(
    cs.prototypePrimary && cs.prototypeUrl
  );

  return (
    <article className="pb-24">
      <header className="border-b border-ch-charcoal bg-ch-near-black/30">
        <div className="container-page py-12 md:py-16">
          <Link
            href="/"
            className="text-sm font-semibold text-ch-volt transition-colors hover:text-ch-volt-pale"
          >
            ← Home
          </Link>
          <p className="ch-label mt-8">
            {cs.client} · {cs.role} · {cs.duration}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-none tracking-tight text-ch-white md:text-5xl lg:text-6xl">
            {cs.title}
          </h1>
          <p className="mt-6 max-w-2xl text-body-reading">{cs.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {deliveredPrototypeLayout ? (
              <>
                <a
                  href={cs.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({
                    variant: "primary",
                    size: "lg",
                  })}
                >
                  Delivered Prototype
                </a>
                {cs.liveUrl ? (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName({
                      variant: "secondary",
                      size: "lg",
                    })}
                  >
                    View live
                  </a>
                ) : null}
              </>
            ) : (
              <>
                {cs.liveUrl ? (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName({
                      variant: "primary",
                      size: "lg",
                    })}
                  >
                    View live
                  </a>
                ) : null}
                {cs.prototypeUrl ? (
                  <a
                    href={cs.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName({
                      variant: "outline",
                      size: "lg",
                    })}
                  >
                    Prototype
                  </a>
                ) : null}
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container-page py-14">
        <div className="mx-auto max-w-3xl space-y-12">
          <section>
            <h2 className="ch-section-heading">{problemTitle}</h2>
            <div className="mt-4 space-y-4 text-body-reading">
              {cs.problem.map((p) => (
                <p key={p} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
          <section>
            <h2 className="ch-section-heading">Approach</h2>
            <ul className="mt-4 space-y-4 text-body-reading">
              {cs.approach.map((p) => (
                <li key={p} className="leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          </section>
          {cs.principles.length > 0 ? (
            <section>
              <h2 className="ch-section-heading">Design principles</h2>
              <ul className="mt-4 space-y-3">
                {cs.principles.map((p) => (
                  <li key={p} className="flex gap-3 text-body-reading">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ch-volt" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {cs.quote ? (
            <section>
              {showQuoteHeading ? (
                <h2 className="ch-section-heading">Quote</h2>
              ) : null}
              <blockquote
                className={
                  showQuoteHeading
                    ? "mt-4 border-l-2 border-ch-volt/60 pl-6"
                    : "border-l-2 border-ch-volt/60 pl-6"
                }
              >
                <p className="text-[28px] font-normal italic leading-snug text-ch-white/95">
                  &ldquo;{cs.quote.text}&rdquo;
                </p>
                <footer className="mt-5 text-sm font-semibold text-ch-silver">
                  — {cs.quote.attribution}
                </footer>
              </blockquote>
            </section>
          ) : null}
          <section>
            <h2 className="ch-section-heading">Outcomes</h2>
            {cs.outcomeTiles && cs.outcomeTiles.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {cs.outcomeTiles.map((tile) => (
                  <li key={`${tile.value}-${tile.description}`}>
                    <div className="flex h-full flex-col gap-2 rounded-ch-card border border-ch-charcoal bg-ch-near-black/40 px-5 py-5 transition-colors hover:border-ch-volt/45 hover:bg-ch-near-black/60">
                      <span className="font-display text-[28px] font-medium leading-none tracking-tight text-ch-volt">
                        {tile.value}
                      </span>
                      <span className="text-sm font-normal leading-snug text-ch-silver">
                        {tile.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 space-y-3 text-body-reading">
                {cs.metrics.map((m) => (
                  <li key={m} className="leading-relaxed">
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {videos.length > 0 ? (
          <section className="mt-16">
            <h2 className="ch-section-heading">Video</h2>
            <p className="mt-2 font-mono text-sm text-ch-silver">
              <span className="text-ch-silver">public/{CASE_STUDY_VIDEOS}/</span>
              {CASE_STUDY_VIDEO_FOLDER[slug] ?? slug}
              <span className="mx-2 text-ch-deep-charcoal">·</span>
              <span className="text-ch-volt">
                URL /{CASE_STUDY_VIDEOS}/
                {encodeURIComponent(CASE_STUDY_VIDEO_FOLDER[slug] ?? slug)}
              </span>
            </p>
            <CaseStudyVideoSection
              videos={videos}
              autoplayInView={
                slug === "eq-sight" ||
                slug === "blackrock-advisor-center" ||
                slug === "grabbi-food-truck-self-checkout-platform"
              }
            />
          </section>
        ) : null}

        {images.length > 0 ? (
          <section className="mt-16">
            <h2 className="ch-section-heading">Design Mockups</h2>
            <CaseStudyImageGallery
              images={images.map((src) => ({
                src,
                alt: filenameFromMediaSrc(src),
              }))}
            />
          </section>
        ) : (
          <section className="mt-16 rounded-ch-card border border-dashed border-ch-charcoal bg-ch-near-black/30 px-6 py-10 text-center">
            <p className="text-sm font-normal text-ch-silver">
              Add files under{" "}
              <code className="rounded-ch bg-ch-page px-1.5 py-0.5 font-mono text-xs text-ch-volt">
                public/case-study-images/{CASE_STUDY_IMAGE_FOLDER[slug] ?? slug}
              </code>{" "}
              and{" "}
              <code className="rounded-ch bg-ch-page px-1.5 py-0.5 font-mono text-xs text-ch-volt">
                public/case-study-videos/{CASE_STUDY_VIDEO_FOLDER[slug] ?? slug}
              </code>
              . Public URLs use these folder names (encoded in the path) — see{" "}
              <code className="rounded-ch bg-ch-page px-1.5 py-0.5 font-mono text-xs text-ch-volt">
                src/lib/case-study-media.ts
              </code>
              .
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
