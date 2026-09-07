"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import CustomerResultCard from "../Reusable/CustomerResultCard";
import { CustomerResults } from "../Constants/CustomerResults";
import ContainerLayout from "../Reusable/ContainerLayout";

const ROTATE_INTERVAL = 6000;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const typesRowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.15 } },
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

const CustomerReviews = () => {
  const isDesktop = useIsDesktop();
  const types = useMemo(
    () => Array.from(new Set(CustomerResults.map((result) => result.type))),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
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

  const renderTypeButtons = () =>
    types.map((type, index) => {
      const isActive = index === activeIndex;
      const activeSize = isDesktop ? 28 : 16;
      const inactiveSize = isDesktop ? 14 : 11;
      return (
        <motion.button
          key={type}
          type="button"
          onClick={() => setActiveIndex(index)}
          animate={{
            fontSize: `${isActive ? activeSize : inactiveSize}px`,
            opacity: isActive ? 1 : 0.45,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-obviously font-bold uppercase tracking-wide text-primary"
        >
          {type}
        </motion.button>
      );
    });

  const activeType = types[activeIndex];
  const visibleResults = CustomerResults.filter(
    (result) => result.type === activeType,
  );

  useEffect(() => {
    setActiveSlide(0);
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
    <section className="bg-white">
      <ContainerLayout>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="mx-auto flex w-full flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
        >
          <h2 className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl lg:text-6xl">
            Real stories. <br /> Real transformations.
          </h2>
          <p className="max-w-md text-base text-primary/70 sm:text-lg lg:text-xl">
            Formial transforms your skincare journey with a formula custom
            made for you-effective, simple, and proven to work.
          </p>
        </motion.div>

        {/* Mobile / tablet: types selector above the cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={typesRowVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-2 lg:hidden"
        >
          {renderTypeButtons()}
        </motion.div>

        {/* Desktop: 3-column grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={headingVariants}
          className="mt-10 hidden lg:block"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-3 gap-8"
            >
              {visibleResults.map((result) => (
                <motion.div
                  key={`${result.type}-${result.name}`}
                  variants={cardVariants}
                >
                  <CustomerResultCard {...result} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Desktop: types selector below the cards */}
          <motion.div
            variants={typesRowVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {renderTypeButtons()}
          </motion.div>
        </motion.div>

        {/* Mobile / tablet: swipeable carousel, active card wider */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={headingVariants}
          className="mt-10 lg:hidden"
        >
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
                {visibleResults.map((result, index) => {
                  const isActive = index === activeSlide;
                  return (
                    <motion.div
                      key={`${result.type}-${result.name}`}
                      ref={(el) => {
                        slideRefs.current[index] = el;
                      }}
                      variants={cardVariants}
                      className={`shrink-0 snap-center transition-[width] duration-500 ease-out ${
                        isActive ? "w-[82%] sm:w-[62%]" : "w-[68%] sm:w-[46%]"
                      }`}
                    >
                      <CustomerResultCard {...result} />
                    </motion.div>
                  );
                })}
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
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default CustomerReviews;
