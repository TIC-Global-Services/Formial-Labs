"use client";

import { useEffect } from "react";
import Link from "next/link";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ContainerLayout
      as="main"
      pt={false}
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-32 text-center md:pt-40"
    >
      <p className="font-obviously text-sm uppercase tracking-widest text-primary/50">
        Something Broke
      </p>
      <h1 className="font-obviously text-5xl uppercase text-primary sm:text-7xl">
        An Unexpected Reaction
      </h1>
      <p className="max-w-md text-primary/70">
        Something went wrong while loading this page. Please try again.
      </p>
      {process.env.NODE_ENV === "development" && (
        <p className="max-w-md rounded-lg bg-primary/5 px-4 py-2 text-xs text-primary/60">
          {error.message}
        </p>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-80"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border border-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-primary transition-opacity hover:opacity-70"
        >
          Back to Home
        </Link>
      </div>
    </ContainerLayout>
  );
}
