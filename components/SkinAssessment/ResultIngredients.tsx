"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Droplet, Star } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const INGREDIENTS = [
  {
    name: "Prescription-Strength Retinoids",
    desc: "Speeds up skin cell turnover to smooth texture, fade marks, and soften fine lines over time.",
  },
  {
    name: "Niacinamide",
    desc: "Calms inflammation, strengthens your skin barrier, and helps even out tone.",
  },
  {
    name: "Clindamycin",
    desc: "A targeted antibiotic that clears the bacteria behind active breakouts.",
  },
  {
    name: "Possible Other Ingredients",
    desc: "Your dermatologist may add further actives based on your specific assessment.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ResultIngredients = () => {
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

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
      setActiveCard(closest);
    });
  };

  return (
    <section className="relative overflow-hidden bg-white pb-16 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,71,99,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,99,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <ContainerLayout px py={false} className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="rounded-3xl bg-[#B5CBC9] p-6 text-center shadow-xl sm:p-10"
        >
          <motion.h2
            variants={itemVariants}
            className="font-aeonik text-2xl font-bold leading-tight tracking-tighter text-primary sm:text-4xl"
          >
            What&apos;s In Your Formula?
          </motion.h2>
          <motion.p variants={itemVariants} className="mx-auto mt-3 max-w-xl text-lg md:text-2xl leading-tight text-white/90">
            Your custom made formula may contain the following medical grade
            ingredients.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible"
            >
              {INGREDIENTS.map((item, i) => (
                <div
                  key={item.name}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="w-[85%] shrink-0 snap-start rounded-2xl bg-white p-6 text-left sm:w-auto"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/40">
                    <Droplet size={22} strokeWidth={1.75} className="text-primary" />
                  </span>
                  <h3 className="mt-4 font-aeonik text-xl md:text-2xl tracking-tight font-medium text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-1 md:text-lg leading-tight tracking-tight text-[#525252]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
              {INGREDIENTS.map((item, i) => (
                <span
                  key={`${item.name}-dot`}
                  className={`h-2 rounded-full bg-primary transition-all duration-300 ${
                    i === activeCard ? "w-8 opacity-100" : "w-4 opacity-30"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/payments"
              className="mx-auto mt-8 block w-fit rounded-full bg-[#7A9490] px-16 py-4 text-center font-obviously text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Purchase Now
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={16} strokeWidth={0} className="fill-secondary" />
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-base leading-tight text-white">
              10k+ Verified Reviews on
              <Star size={14} strokeWidth={0} className="fill-[#00b67a]" />
              <span className="font-semibold text-white">Trustpilot</span>
            </p>
          </motion.div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ResultIngredients;
