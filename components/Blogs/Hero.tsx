"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import ContainerLayout from "../Reusable/ContainerLayout";
import blogIndex from "@/content/blogs/index.json";
import { useBlogsSearch } from "./SearchProvider";
import { formatBlogDate } from "@/lib/blogFormat";
import { cardShapeMaskStyle } from "./cardShape";

const FEATURED_SLUG = "acne-won-t-heal-itself-here-s-what-happens-if-you-wait-too-long";
const TRENDING_SLUGS = [
  "why-your-morning-skincare-and-evening-skincare-routine-should-be-different",
  "what-is-acne-and-how-to-treat-it-causes-types-effective-solutions",
  "skincare-simplified-how-to-start-with-the-best-order",
];

const Hero = () => {
  const { query, setQuery } = useBlogsSearch();

  const featured = blogIndex.find((post) => post.slug === FEATURED_SLUG) ?? blogIndex[0];
  const trending = TRENDING_SLUGS.map((slug) => blogIndex.find((post) => post.slug === slug)).filter(
    (post): post is (typeof blogIndex)[number] => Boolean(post)
  );

  if (!featured) return null;

  return (
    <section className="bg-brand-gradient w-full">
      <ContainerLayout pt={false} className="pt-24 md:pt-28">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h1 className="font-aeonik text-5xl tracking-tighter text-primary sm:text-6xl lg:text-7xl">
            Clarity Lab Notes
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("blog-results")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex w-full items-center gap-3 md:w-auto"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Our Blog"
              className="w-full min-w-0 rounded-full border-t border-b border-white/80 bg-white/40 p-3.5 pl-6 text-primary placeholder:text-primary/50 outline-none backdrop-blur-md shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] md:w-70"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex aspect-square shrink-0 items-center justify-center rounded-full border-t border-b border-white/80 bg-white/40 p-4 text-primary backdrop-blur-md shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] transition-colors duration-300 ease-in-out hover:bg-white/60"
            >
              <Search className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Link
            href={`/blogs/${featured.slug}`}
            className="group relative block aspect-1/1 overflow-hidden rounded-4xl lg:aspect-auto lg:h-full"
          >
            <Image
              src={featured.heroImage}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 ">
              {/* clipped glass background only — the notch reveals the photo behind it */}
              <div
                className="absolute inset-0 rounded-b-2xl bg-white/50 backdrop-blur-md"
                style={cardShapeMaskStyle}
              />

              {/* unclipped content layer, so the notch label isn't clipped away too */}
              <div className="relative p-5 pt-14 sm:p-7 sm:pt-36">
             
                <h2 className="font-aeonik text-2xl leading-tight tracking-tight text-primary sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm sm:text-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="shrink-0 text-lg text-primary">
                    {formatBlogDate(featured.date)}
                  </span>
                  <span className="h-px w-full bg-primary/20" />
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium font-obviously uppercase tracking-tighter text-primary">
                    Read More
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div>
            <div className="flex items-center gap-4">
              <h3 className="font-obviously text-xl font-medium uppercase leading-tight tracking-tighter text-primary sm:text-2xl text-center sm:text-left">
                What&apos;s Trending Right Now
              </h3>
              <span className="h-px flex-1 bg-primary/20" />
            </div>

            <div className="mt-6 space-y-3 rounded-4xl border border-primary/10 bg-primary/5 p-3">
              {trending.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex items-start gap-4 rounded-3xl bg-white p-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col items-start justify-center gap-1 py-1 text-start">
                    <h4 className="font-aeonik text-base leading-snug text-primary line-clamp-2 sm:text-xl">
                      {post.title}
                    </h4>
                    <p className="line-clamp-2 text-sm text-primary/60 sm:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default Hero;
