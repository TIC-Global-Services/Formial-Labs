"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContainerLayout from "../Reusable/ContainerLayout";
import blogIndex from "@/content/blogs/index.json";
import { useBlogsSearch } from "./SearchProvider";
import BlogCard from "./BlogCard";

const ALL_CATEGORY = "All";
const PAGE_SIZE = 8;

const Explore = () => {
  const { query } = useBlogsSearch();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of blogIndex) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return [
      { name: ALL_CATEGORY, count: blogIndex.length },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogIndex.filter((post) => {
      const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;
      const matchesQuery =
        q === "" || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  // Reset to page 1 whenever the filter changes — adjusting state during
  // render (React's documented pattern) instead of an effect, so it happens
  // before paint rather than triggering a second render pass.
  const filterKey = `${activeCategory}|${query}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagedResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (n: number) => {
    setPage(n);
    document.getElementById("blog-results")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="blog-results" className="w-full bg-white py-16 scroll-mt-24 md:py-20">
      <ContainerLayout pt={false} pb={false}>
        <div className="flex flex-col justify-between gap-6 py-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-aeonik text-4xl leading-tight tracking-tight text-primary sm:text-6xl">
              Explore what
              <br />
              matters to your skin
            </h2>
          </div>
          <p className="min-w-0 text-sm md:max-w-xl md:text-lg">
            From everyday skincare to deeper skin concerns, explore insights backed by research,
            clinical understanding, and real-world experience.
          </p>
        </div>

        {/* Mobile/tablet: horizontally scrollable category tabs replace the sidebar */}
        <div className="-mx-6 mt-8 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          <div className="flex w-max gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ease-in-out ${
                  activeCategory === cat.name
                    ? "border-t border-b border-white/80 bg-white/10 font-semibold text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-md"
                    : "bg-primary/5 text-primary/60 hover:bg-primary/10"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-primary/40">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[30%_1fr] lg:items-start">
          <aside className="sticky top-24 hidden self-start rounded-2xl bg-linear-to-b from-[#B5CBC9] to-[#EBEBEB] p-3 lg:block">
            <ul className="flex flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex w-full items-center justify-between rounded-full px-6 py-3 text-left text-xl transition-colors duration-200 ease-in-out ${
                      activeCategory === cat.name
                        ? "border-t border-b border-white/80 bg-white/10 font-semibold text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-md"
                        : "text-primary/60 hover:bg-white/60"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-base text-primary/40">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            {query.trim() !== "" && (
              <p className="mb-6 text-sm text-primary/60">
                {results.length} result{results.length === 1 ? "" : "s"} for{" "}
                <span className="font-semibold text-primary">&ldquo;{query.trim()}&rdquo;</span>
              </p>
            )}

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/20 py-20 text-center">
                <p className="text-lg font-semibold text-primary">No blogs found</p>
                <p className="text-sm text-primary/60">Try a different search term or category.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                  {pagedResults.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>

                {pageCount > 1 && (
                  <nav
                    aria-label="Blog pagination"
                    className="mt-12 flex items-center justify-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-200 ease-in-out hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                    </button>

                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => goToPage(n)}
                        aria-current={n === currentPage ? "page" : undefined}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm transition-colors duration-200 ease-in-out cursor-pointer ${
                          n === currentPage
                            ? "bg-primary font-semibold text-white"
                            : "text-primary/60 hover:bg-primary/5"
                        }`}
                      >
                        {n}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === pageCount}
                      aria-label="Next page"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-200 ease-in-out hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default Explore;
