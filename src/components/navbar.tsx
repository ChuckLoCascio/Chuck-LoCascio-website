"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";
import { person } from "@/lib/portfolio-content";

function IconMail({ className }: { className?: string }): JSX.Element {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }): JSX.Element {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconClass = "h-4 w-4 shrink-0";

export function Navbar(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass =
    "inline-flex items-center gap-2 rounded-ch px-3 py-2 text-[15px] font-semibold text-ch-white transition-colors hover:bg-ch-near-black hover:text-ch-volt";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ch-charcoal bg-ch-page/95 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 font-semibold text-ch-white transition-colors hover:text-ch-volt"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-ch border border-ch-charcoal bg-ch-near-black">
            <Image
              src={person.imageSrc}
              alt=""
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </span>
          <span className="truncate text-[15px] sm:text-base">{person.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <IconLinkedIn className={iconClass} />
            LinkedIn
          </a>
          <a href={`mailto:${person.email}`} className={linkClass}>
            <IconMail className={iconClass} />
            Email
          </a>
          <a
            href={person.resumePdf}
            download
            className={cn(
              buttonClassName({ variant: "secondary", size: "sm" }),
              "gap-2"
            )}
          >
            <IconDownload className={iconClass} />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-ch p-2 text-ch-silver hover:bg-ch-near-black hover:text-ch-volt md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "container-page overflow-hidden border-b border-ch-charcoal transition-all duration-200 md:hidden",
          mobileOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-2 pt-2">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <IconLinkedIn className={iconClass} />
            LinkedIn
          </a>
          <a
            href={`mailto:${person.email}`}
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            <IconMail className={iconClass} />
            Email
          </a>
          <a
            href={person.resumePdf}
            download
            className={cn(
              buttonClassName({
                variant: "secondary",
                size: "sm",
                className: "w-full justify-center gap-2",
              })
            )}
            onClick={() => setMobileOpen(false)}
          >
            <IconDownload className={iconClass} />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
