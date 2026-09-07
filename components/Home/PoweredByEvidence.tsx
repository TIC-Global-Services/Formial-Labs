"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "../Reusable/ContainerLayout";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardContents = [
  {
    title: "Evidence-Based Ingredients",
    desc: "Every active ingredient is selected for its clinically studied effectiveness, safety, and suitability for your skin.",
    img: "/assets/home/evidence.png",
    textColor: "text-[#1A1A1A]",
  },
  {
    title: "Research-Driven Formulations",
    desc: "We build formulations using scientific literature and established dermatological principles—not trends or guesswork.",
    img: "/assets/home/rd-formulations.png",
    textColor: "text-white",
  },
  {
    title: "Personalized Application",
    desc: "Clinical evidence is combined with your unique skin profile to create a treatment that's tailored to your needs.",
    img: "/assets/home/personalized-application.png",
    textColor: "text-[#1A1A1A]",
  },
];

const PoweredByEvidence = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

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
            Powered by Science. <br />
            Supported by Evidence.
          </h2>
          <p className="max-w-3xl text-base text-primary/70 sm:text-lg lg:text-xl">
            Every ingredient we use is carefully selected based on published
            clinical research and its proven role in addressing specific skin
            concerns. Our formulations combine scientific evidence with
            personalized care to deliver treatments designed around your skin.
          </p>
        </motion.div>

        {/* Desktop: side-by-side row, width grows on hover */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={gridVariants}
          className="mt-12 hidden lg:flex gap-6"
        >
          {cardContents.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              layout
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                flexGrow:
                  hoveredIndex === null ? 1 : hoveredIndex === index ? 2.2 : 0.7,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative z-0 h-[620px] w-full basis-0 overflow-hidden rounded-3xl"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="34vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div
                className={`absolute inset-x-0 bottom-0 p-8 ${card.textColor}`}
              >
                <h3 className="font-aeonik text-4xl leading-tight">
                  {card.title}
                </h3>
                <p className="mt-2 max-w-2xl text-xl leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / tablet: swipeable carousel, active card wider */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={gridVariants}
          className="mt-10 lg:hidden"
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-6 pb-2 scrollbar-none md:-mx-12 md:px-12"
          >
            {cardContents.map((card, index) => {
              const isActive = index === activeSlide;
              return (
                <motion.div
                  key={card.title}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  variants={cardVariants}
                  className={`relative h-[420px] shrink-0 snap-center overflow-hidden rounded-3xl transition-[width] duration-500 ease-out sm:h-[480px] ${
                    isActive ? "w-[82%] sm:w-[62%]" : "w-[68%] sm:w-[46%]"
                  }`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(min-width: 640px) 60vw, 82vw"
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 ${card.textColor}`}
                  >
                    <h3 className="font-aeonik text-2xl leading-tight sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed sm:text-base">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {cardContents.map((card, index) => (
              <button
                key={card.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full bg-primary transition-all duration-300 ${
                  index === activeSlide ? "w-10 opacity-100" : "w-4 opacity-30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default PoweredByEvidence;
