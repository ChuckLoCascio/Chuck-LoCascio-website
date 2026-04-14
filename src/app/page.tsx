import Image from "next/image";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseStudyHero } from "@/components/case-study-hero";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ToolsOfChoice } from "@/components/tools-of-choice";
import { getCaseStudyThumbnail } from "@/lib/case-study-media";
import {
  aiPatent,
  caseStudies,
  person,
  testimonials,
} from "@/lib/portfolio-content";

/** Patent / technical document — folded page with code brackets (stroke icon, matches navbar). */
function IconDocumentCode({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 13 2 2-2 2" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="container-page py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in order-2 lg:order-1">
            <Badge variant="secondary" className="mb-6 border-ch-charcoal">
              {person.title}
            </Badge>
            <h1 className="font-display text-4xl font-medium leading-none tracking-[-0.04em] text-ch-white sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1]">
              {person.name}
            </h1>
            <p className="mt-6 max-w-xl text-body-reading">{person.tagline}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#selected-work"
                className={buttonClassName({ variant: "primary", size: "lg" })}
              >
                View case studies
              </Link>
              <a
                href={person.resumePdf}
                download
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-lg overflow-hidden rounded-ch-card">
              <Image
                src={person.heroCollageSrc}
                alt={`${person.name} — photo collage`}
                width={person.heroCollageWidth}
                height={person.heroCollageHeight}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 512px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ch-charcoal bg-ch-page">
        <div className="container-page py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <a
              href={aiPatent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block min-h-[200px] w-full overflow-hidden rounded-ch-card border border-ch-charcoal bg-ch-near-black shadow-ch-sm outline-none transition-opacity hover:opacity-[0.97] focus-visible:ring-2 focus-visible:ring-ch-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ch-page sm:min-h-[260px] lg:min-h-[min(52vh,440px)] lg:max-h-[min(72vh,600px)]"
              aria-label="View AI patent — explanation-driven reasoning engine (opens in new tab)"
            >
              <Image
                src={aiPatent.thumbnailSrc}
                alt=""
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </a>
            <div className="flex max-w-xl flex-col justify-center lg:pl-2">
              <Badge
                variant="secondary"
                className="w-fit gap-1.5 border-ch-charcoal py-1 pl-2 pr-2.5"
              >
                <IconDocumentCode className="h-3.5 w-3.5 shrink-0" />
                AI Patent Holder
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-ch-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                {aiPatent.title}
              </h2>
              <p className="mt-6 text-body-reading">{aiPatent.description}</p>
              <a
                href={aiPatent.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName({
                  variant: "primary",
                  size: "lg",
                  className: "mt-10 w-fit",
                })}
              >
                View AI Patent
              </a>
            </div>
          </div>
        </div>
      </section>

      <ToolsOfChoice />

      <section id="selected-work" className="border-t border-ch-charcoal scroll-mt-20">
        <div className="container-page border-b border-ch-charcoal py-14 md:py-16">
          <p className="ch-label">Portfolio</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-ch-white md:text-5xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-2xl text-body-reading">
            Engagements spanning fintech, energy, and startup consumer technology.
            Demonstrating the breadth and range of experience.
          </p>
        </div>

        {caseStudies.map((cs, index) => (
          <CaseStudyHero
            key={cs.slug}
            study={cs}
            index={index}
            thumbnailSrc={getCaseStudyThumbnail(cs.slug)}
          />
        ))}
      </section>

      <section className="border-t border-ch-charcoal">
        <div className="container-page py-14 md:py-16">
          <h2 className="font-display text-3xl font-medium leading-none tracking-tight text-ch-white md:text-4xl">
            Testimonials
          </h2>
          <TestimonialsCarousel items={testimonials} className="mt-10" />
        </div>
      </section>

      <section className="border-t border-ch-charcoal bg-ch-deep-charcoal/40 py-20">
        <div className="container-page flex flex-col items-center text-center">
          <h2 className="max-w-3xl font-display text-3xl font-medium leading-none tracking-tight text-ch-white sm:text-4xl md:text-5xl">
            Let&apos;s build products and ship features together.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-normal text-ch-silver">
            Available for product design leadership, AI-native product design,
            design systems, and founder-led teams in San Francisco, CA.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://calendly.com/locascio-chuck/intro-call-let-s-talk-design"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({
                variant: "primary",
                size: "lg",
              })}
            >
              Book Time with Chuck
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
