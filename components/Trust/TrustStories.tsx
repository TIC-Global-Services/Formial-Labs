"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import CustomerResultCard from "@/components/Reusable/CustomerResultCard";
import { CustomerResults } from "@/components/Constants/CustomerResults";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const ROTATE_INTERVAL = 6000;

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

const TrustStories = () => {
  const types = useMemo(() => {
    const unique = Array.from(new Set(CustomerResults.map((result) => result.type)));
    // "Acne" leads by default regardless of data order.
    return unique.sort((a, b) => (a === "Acne" ? -1 : b === "Acne" ? 1 : 0));
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (types.length < 2) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % types.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [types.length]);

  const activeType = types[activeIndex];
  const visibleResults = CustomerResults.filter((result) => result.type === activeType);

  const DESKTOP_PAGE_SIZE = 3;
  const desktopPageCount = Math.ceil(visibleResults.length / DESKTOP_PAGE_SIZE);
  const desktopPageResults = visibleResults.slice(
    desktopPage * DESKTOP_PAGE_SIZE,
    desktopPage * DESKTOP_PAGE_SIZE + DESKTOP_PAGE_SIZE
  );

  useEffect(() => {
    // Resets the DOM scroll position when the type filter changes — the
    // setState here is tightly coupled to that same external scroll reset.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSlide(0);
    setDesktopPage(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [activeType]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleScroll = () => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const container = scrollRef.current;
      if (!container) return;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveSlide(closest);
    });
  };

  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section className="bg-brand-gradient py-20 lg:py-28">
      <ContainerLayout>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <h1 className="font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-5xl lg:text-7xl">
            Real Skin. Real Stories.
            <br />
            Real Results.
          </h1>

          <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
            <p className="max-w-lg text-sm text-primary/70 sm:text-base lg:text-xl">
              Thousands have simplified their skincare journey with
              personalized, dermatologist-designed formulations.
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/common/trustpilot_black.png"
                alt="Trustpilot"
                width={160}
                height={32}
                className="h-6 w-auto object-contain sm:h-7"
              />
              <span className="h-8 w-px bg-primary/20" />
              <p className="text-sm text-[#525252] sm:text-base text-start">
                <span className="font-bold text-primary">4.7</span> Stars from
                Verified Reviews
                <br /> That Speak for Themselves
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 w-full"
        >
          {types.map((type, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-xl px-5 py-2.5 font-obviously text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "bg-[url('/assets/common/button-bg.png')] bg-cover bg-center text-primary "
                    : "bg-white text-primary/60 hover:border-primary/40"
                }`}
              >
                {type}
              </button>
            );
          })}
        </motion.div>

        {/* Desktop: 3-column grid, paginated when a type has more than 3 */}
        <div className="mt-10 hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeType}-${desktopPage}`}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-3 gap-8"
            >
              {desktopPageResults.map((result) => (
                <motion.div key={`${result.type}-${result.name}`} variants={cardVariants}>
                  <CustomerResultCard {...result} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {desktopPageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: desktopPageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  onClick={() => setDesktopPage(i)}
                  className={`h-2 cursor-pointer rounded-full bg-primary transition-all duration-300 ${
                    i === desktopPage ? "w-10 opacity-100" : "w-4 opacity-30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile / tablet: swipeable carousel, dot pagination */}
        <div className="mt-10 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 scrollbar-none md:-mx-12 md:px-12"
              >
                {visibleResults.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.name}`}
                    ref={(el) => {
                      slideRefs.current[index] = el;
                    }}
                    variants={cardVariants}
                    className="w-full shrink-0 snap-center sm:w-[62%]"
                  >
                    <CustomerResultCard {...result} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {visibleResults.map((result, index) => (
                  <button
                    key={`${result.type}-${result.name}-dot`}
                    type="button"
                    aria-label={`Go to review ${index + 1}`}
                    onClick={() => scrollToSlide(index)}
                    className={`h-2 rounded-full bg-primary transition-all duration-300 ${
                      index === activeSlide ? "w-10 opacity-100" : "w-4 opacity-30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default TrustStories;
