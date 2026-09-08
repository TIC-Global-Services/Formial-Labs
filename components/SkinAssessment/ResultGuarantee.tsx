"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import CustomerResultCard from "@/components/Reusable/CustomerResultCard";
import { CustomerResults } from "@/components/Constants/CustomerResults";

const TYPES = Array.from(new Set(CustomerResults.map((r) => r.type)));

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ResultGuarantee = () => {
  const [activeType, setActiveType] = useState(TYPES[0]);
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

  const results = CustomerResults.filter((r) => r.type === activeType).slice(0, 2);

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    setActiveCard(0);
    scrollRef.current?.scrollTo({ left: 0 });
  };

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
          className="rounded-3xl bg-[#B5CBC9] p-6 text-center shadow-xl sm:p-10 z-50"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/skin-test/money-back.png"
                alt="100% Money Back Guarantee"
                width={300}
                height={300}
                className="mx-auto w-[180px] object-contain sm:w-[220px]"
              />
            </motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 font-aeonik text-2xl leading-tight font-semibold text-primary sm:text-5xl"
          >
            Results you can see, <br /> or Get Your Money Back
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {TYPES.map((type) => (
              <motion.button
                key={type}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => handleTypeChange(type)}
                className={`cursor-pointer rounded-full  px-5 py-2 font-obviously text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                  activeType === type
                    ? " bg-white text-primary"
                    : "border border-white/50 text-white hover:border-white"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible"
            >
              <AnimatePresence mode="popLayout">
                {results.map((result, i) => (
                  <motion.div
                    key={`${result.type}-${result.name}`}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[85%] shrink-0 snap-start sm:w-auto"
                  >
                    <CustomerResultCard {...result} desc={undefined} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {results.length > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
                {results.map((result, i) => (
                  <span
                    key={`${result.type}-${result.name}-dot`}
                    className={`h-2 rounded-full bg-white transition-all duration-300 ${
                      i === activeCard ? "w-6 opacity-100" : "w-2 opacity-40"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-4xl text-xl text-white"
          >
            We&apos;re committed to personalised, evidence-based skincare. If
            your skin isn&apos;t responding, we&apos;ll reformulate at no extra
            cost. Still not satisfied? Get your money back.
          </motion.p>

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
            <p className="flex items-center gap-1.5 text-base text-white">
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

export default ResultGuarantee;
