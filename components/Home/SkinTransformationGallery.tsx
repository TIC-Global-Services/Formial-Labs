"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "../Reusable/ContainerLayout";
import CustomerResultCard from "../Reusable/CustomerResultCard";
import { CustomerResults } from "../Constants/CustomerResults";

const useCardsPerView = () => {
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const smQuery = window.matchMedia("(min-width: 640px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setCardsPerView(lgQuery.matches ? 3 : smQuery.matches ? 2 : 1);
    };

    update();
    smQuery.addEventListener("change", update);
    lgQuery.addEventListener("change", update);
    return () => {
      smQuery.removeEventListener("change", update);
      lgQuery.removeEventListener("change", update);
    };
  }, []);

  return cardsPerView;
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const SkinTransformationGallery = () => {
  const cardsPerView = useCardsPerView();
  const pageCount = Math.ceil(CustomerResults.length / cardsPerView);
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setActivePage(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [cardsPerView]);

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
      let closest = 0;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.offsetLeft - container.scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActivePage(Math.floor(closest / cardsPerView));
    });
  };

  const scrollToPage = (index: number) => {
    itemRefs.current[index * cardsPerView]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
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
          className="flex flex-col  justify-between gap-6 lg:flex-row items-center"
        >
          <h2 className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
            Skin Transformation Gallery
          </h2>

          <div className="flex items-center gap-4">
            <Image
              src="/assets/common/trustpilot_black.png"
              alt="Trustpilot"
              width={160}
              height={32}
              className="h-6 w-auto object-contain sm:h-7"
            />
            <div className="h-9 w-px bg-primary/20" />
            <p className="text-sm leading-snug text-black">
              4.6 Stars from Verified Reviews
              <br />
              That Speak for Themselves
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={gridVariants}
          className="mt-10"
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none"
          >
            {CustomerResults.map((result, index) => (
              <motion.div
                key={`${result.type}-${result.name}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                variants={cardVariants}
                className="shrink-0 snap-start flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <CustomerResultCard {...result} desc={undefined} />
              </motion.div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {(() => {
                const maxDots = 5;
                const windowStart =
                  pageCount <= maxDots
                    ? 0
                    : Math.min(
                        Math.max(activePage - Math.floor(maxDots / 2), 0),
                        pageCount - maxDots,
                      );
                const visibleCount = Math.min(maxDots, pageCount);

                return Array.from({ length: visibleCount }, (_, i) => windowStart + i).map(
                  (pageIndex) => (
                    <button
                      key={pageIndex}
                      type="button"
                      aria-label={`Go to page ${pageIndex + 1}`}
                      onClick={() => scrollToPage(pageIndex)}
                      className={`h-2 rounded-full bg-primary transition-all duration-300 ${
                        pageIndex === activePage ? "w-10 opacity-100" : "w-4 opacity-30"
                      }`}
                    />
                  ),
                );
              })()}
            </div>
          )}
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default SkinTransformationGallery;
