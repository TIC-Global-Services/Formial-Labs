"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomerResultCard from "../Reusable/CustomerResultCard";
import { CustomerResults } from "../Constants/CustomerResults";
import ContainerLayout from "../Reusable/ContainerLayout";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_VISIBLE_COUNT = 3;
const DESKTOP_GAP = 32; // px, matches gap-8

const TYPE_ORDER = ["Acne", "Scarring", "Hyperpigmentation", "Anti Aging", "Skin-glow"];

const CustomerReviews = () => {
  const types = useMemo(() => {
    const present = new Set(CustomerResults.map((result) => result.type));
    return ["All", ...TYPE_ORDER.filter((type) => present.has(type))];
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const typesRef = useRef<HTMLDivElement | null>(null);
  const desktopCarouselRef = useRef<HTMLDivElement | null>(null);
  const desktopViewportRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const isFirstMobileRender = useRef(true);
  const prevActiveType = useRef<string | null>(null);

  const activeType = types[activeIndex];
  const visibleResults =
    activeType === "All"
      ? CustomerResults
      : CustomerResults.filter((result) => result.type === activeType);

  const maxDesktopIndex = Math.max(
    0,
    visibleResults.length - DESKTOP_VISIBLE_COUNT,
  );

  const goToDesktopIndex = (dir: 1 | -1) => {
    setDesktopIndex((prev) => Math.min(Math.max(prev + dir, 0), maxDesktopIndex));
  };

  useEffect(() => {
    setActiveSlide(0);
    setDesktopIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [activeType]);

  // Measure the desktop viewport so each card is exactly 1/3 of it, gap included.
  useEffect(() => {
    const el = desktopViewportRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      if (!width) return;
      setCardWidth(
        (width - DESKTOP_GAP * (DESKTOP_VISIBLE_COUNT - 1)) /
          DESKTOP_VISIBLE_COUNT,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Entrance reveal, runs once when the section scrolls into view.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [
        headingRef.current,
        typesRef.current,
        desktopCarouselRef.current,
        mobileCarouselRef.current,
      ].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 24 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Desktop carousel: slide by exactly one card width per step. Jumps
  // straight to position when the category swaps out the card set.
  useEffect(() => {
    if (!desktopTrackRef.current || cardWidth === 0) return;
    const targetX = -(desktopIndex * (cardWidth + DESKTOP_GAP));

    if (prevActiveType.current !== activeType) {
      gsap.set(desktopTrackRef.current, { x: targetX });
    } else {
      gsap.to(desktopTrackRef.current, {
        x: targetX,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    prevActiveType.current = activeType;
  }, [desktopIndex, cardWidth, activeType]);

  // Mobile carousel: fade the track in whenever the category changes.
  useEffect(() => {
    if (isFirstMobileRender.current) {
      isFirstMobileRender.current = false;
      return;
    }
    if (!scrollRef.current) return;
    gsap.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );
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

  const handleDesktopPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleDesktopPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta < -60) goToDesktopIndex(1);
    else if (delta > 60) goToDesktopIndex(-1);
  };

  const renderTypeButtons = () =>
    types.map((type, index) => {
      const isActive = index === activeIndex;
      return (
        <button
          key={type}
          type="button"
          onClick={() => setActiveIndex(index)}
          className={`cursor-pointer rounded-xl px-5 py-2.5 font-obviously text-[10px] md:text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
            isActive
              ? "bg-primary bg-cover bg-center text-white"
              : "border border-primary text-primary hover:border-primary/40"
          }`}
        >
          {type}
        </button>
      );
    });

  return (
    <section className="bg-white" ref={sectionRef}>
      <ContainerLayout>
        <div
          ref={headingRef}
          className="mx-auto flex w-full flex-col items-center gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
        >
          <h2 className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl lg:text-6xl">
            Not Filtered.  <br />Not Faked. Just Formial
          </h2>
          <p className="max-w-xl text-base text-black sm:text-lg lg:text-xl leading-tight">
            Formial transforms your skincare journey with a formula custom
            made for <span className=" text-primary">you-effective, simple, and proven </span> to work.
          </p>
        </div>

        {/* Types selector above the cards */}
        <div
          ref={typesRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 px-2 lg:mt-10"
        >
          {renderTypeButtons()}
        </div>

        {/* Desktop: sliding 3-card carousel */}
        <div ref={desktopCarouselRef} className="mt-10 hidden lg:block">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => goToDesktopIndex(-1)}
              disabled={desktopIndex <= 0}
              className="flex h-10 w-10 shrink-0 items-center cursor-pointer justify-center rounded-xl border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div ref={desktopViewportRef} className="flex-1 overflow-hidden">
              <div
                ref={desktopTrackRef}
                onPointerDown={handleDesktopPointerDown}
                onPointerUp={handleDesktopPointerUp}
                onPointerLeave={() => {
                  dragStartX.current = null;
                }}
                className="flex cursor-grab gap-8 active:cursor-grabbing"
              >
                {visibleResults.map((result) => (
                  <div
                    key={`${result.type}-${result.name}`}
                    style={{ width: cardWidth || undefined }}
                    className="shrink-0"
                  >
                    <CustomerResultCard {...result} desc={undefined} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => goToDesktopIndex(1)}
              disabled={desktopIndex >= maxDesktopIndex}
              className="flex h-10 w-10 shrink-0 items-center cursor-pointer justify-center rounded-xl border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile / tablet: swipeable carousel, active card wider */}
        <div ref={mobileCarouselRef} className="relative mt-10 lg:hidden">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
            disabled={activeSlide <= 0}
            className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-primary/30 bg-white text-primary shadow-md transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 scrollbar-none md:-mx-12 md:px-12"
          >
            {visibleResults.map((result, index) => (
              <div
                key={`${result.type}-${result.name}`}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="w-full shrink-0 snap-center sm:w-[62%]"
              >
                <CustomerResultCard {...result} desc={undefined} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next reviews"
            onClick={() =>
              scrollToSlide(Math.min(activeSlide + 1, visibleResults.length - 1))
            }
            disabled={activeSlide >= visibleResults.length - 1}
            className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border border-primary/30 bg-white text-primary shadow-md transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default CustomerReviews;
