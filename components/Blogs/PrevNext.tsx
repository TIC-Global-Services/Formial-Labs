import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogSummary } from "@/lib/blogs";

type PrevNextProps = {
  previous: BlogSummary | null;
  next: BlogSummary | null;
};

const PrevNext = ({ previous, next }: PrevNextProps) => {
  if (!previous && !next) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/blogs/${previous.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-primary/10 p-4 transition-colors duration-300 ease-in-out hover:bg-primary/5"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image src={previous.heroImage} alt={previous.title} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary/50">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
              Previous
            </span>
            <p className="mt-1 truncate font-aeonik text-base text-primary">{previous.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blogs/${next.slug}`}
          className="group flex items-center justify-end gap-4 rounded-2xl border border-primary/10 p-4 text-right transition-colors duration-300 ease-in-out hover:bg-primary/5 sm:flex-row-reverse sm:text-left"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image src={next.heroImage} alt={next.title} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wide text-primary/50 sm:justify-start">
              Next
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <p className="mt-1 truncate font-aeonik text-base text-primary">{next.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PrevNext;
