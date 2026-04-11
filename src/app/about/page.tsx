import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonClassName } from "@/components/ui/button";
import {
  experience,
  patentsAndAwards,
  person,
} from "@/lib/portfolio-content";

export const metadata: Metadata = {
  title: "About",
  description: `${person.name} — ${person.title}. Experience across fintech, energy, and consumer products.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <header className="max-w-3xl animate-slide-up">
        <p className="ch-label">Profile</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-ch-white md:text-5xl">
          About
        </h1>
        <p className="mt-6 text-body-reading">{person.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={person.resumePdf}
            download
            className={buttonClassName({ variant: "primary", size: "lg" })}
          >
            Download Resume (PDF)
          </a>
          <a
            href={`mailto:${person.email}`}
            className={buttonClassName({ variant: "outline", size: "lg" })}
          >
            Email
          </a>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="ch-section-heading">Experience</h2>
        <div className="mt-8 space-y-6">
          {experience.map((job) => (
            <Card key={`${job.company}-${job.start}-${job.end}`}>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <CardTitle className="!text-xl md:!text-2xl">{job.company}</CardTitle>
                  <span className="text-sm font-medium text-ch-silver">
                    {job.start} – {job.end}
                  </span>
                </div>
                <p className="text-sm font-semibold text-ch-volt">{job.title}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm font-normal leading-relaxed text-ch-silver">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-ch-volt" aria-hidden>
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="ch-section-heading">Patents &amp; awards</h2>
        <ul className="mt-6 space-y-4">
          {patentsAndAwards.map((item) => (
            <li key={item.name}>
              <Card>
                <CardHeader>
                  <CardTitle className="!text-lg">{item.name}</CardTitle>
                  <p className="text-sm font-normal text-ch-silver">{item.detail}</p>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
