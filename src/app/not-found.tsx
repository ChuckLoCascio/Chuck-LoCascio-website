import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-7xl font-medium leading-none text-ch-volt">
        404
      </p>
      <h1 className="mt-4 font-sans text-2xl font-bold tracking-tight text-ch-white">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-ch-silver">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className={buttonClassName({
          variant: "primary",
          size: "lg",
          className: "mt-8",
        })}
      >
        ← Back to home
      </Link>
    </div>
  );
}
