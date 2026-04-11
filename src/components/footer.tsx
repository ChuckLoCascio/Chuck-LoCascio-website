import Link from "next/link";
import { person } from "@/lib/portfolio-content";

export function Footer() {
  return (
    <footer className="border-t border-ch-charcoal bg-ch-page">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-12 sm:flex-row sm:items-start">
        <div>
          <p className="font-semibold text-ch-white">{person.name}</p>
          <p className="mt-1 max-w-sm text-sm font-normal text-ch-silver">
            {person.title} · San Francisco
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-semibold">
          <a
            href={person.linkedin}
            className="text-ch-silver transition-colors hover:text-ch-volt"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${person.email}`}
            className="text-ch-silver transition-colors hover:text-ch-volt"
          >
            {person.email}
          </a>
          <Link
            href="/#selected-work"
            className="text-ch-silver transition-colors hover:text-ch-volt"
          >
            Work
          </Link>
        </nav>
      </div>
      <div className="border-t border-ch-charcoal py-6">
        <p className="text-center text-xs font-normal text-ch-silver">
          © {new Date().getFullYear()} {person.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
