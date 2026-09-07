"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronsRight, Star } from "lucide-react";
import ContainerLayout from "../Reusable/ContainerLayout";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-screen w-full items-end overflow-hidden pb-16 lg:items-center lg:pb-0"
    >
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/home/hero-banner.png"
          alt="Woman applying personalized skincare"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 z-1 bg-linear-to-t from-black/70 via-black/15 to-transparent lg:bg-linear-to-r lg:from-black/50 lg:via-black/10 lg:to-transparent" />

      <ContainerLayout pt={false} pb={false} className="relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto max-w-md text-center lg:mx-0 lg:max-w-3xl lg:text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="font-aeonik text-4xl leading-tighter tracking-tighter text-white sm:text-6xl  lg:text-[84px]"
          >
            Your skincare &hellip;
            <br />
            Just got personal !
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base text-white/80"
          >
            Endless brands, endless promises, endless guesswork. A formula
            crafted by dermatologists, made specifically for you.
          </motion.p>

          <div className="mt-10 space-y-6">
            {/* Desktop: logo + divider + caption */}
            <motion.div
              variants={itemVariants}
              className="hidden items-center gap-4 lg:flex"
            >
              <Image
                src="/assets/common/trustpilot.png"
                alt="Trustpilot"
                width={420}
                height={102}
                className="h-6 w-auto"
              />
              <span className="h-10 w-px bg-white/30" />
              <p className="text-sm text-white/80">
                4.6 Stars from Verified Reviews
                <br />
                That Speak for Themselves
              </p>
            </motion.div>

            {/* Mobile / tablet: star rating + inline Trustpilot mention */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2 text-center lg:hidden"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    strokeWidth={0}
                    className={i < 4 ? "fill-secondary" : "fill-white/30"}
                  />
                ))}
              </div>
              <p className="flex items-center gap-1.5 text-sm text-white/80">
                10k+ Verified Reviews on
                <Star size={14} strokeWidth={0} className="fill-[#00b67a]" />
                <span className="font-semibold text-white">Trustpilot</span>
              </p>
            </motion.div>

            {/* Mobile / tablet: CTA */}
            <motion.div variants={itemVariants} className="flex justify-center lg:hidden">
              <Link
                href="/solutions"
                className="flex items-center gap-3 rounded-full border-t border-b border-white/80 bg-white/10 py-1 pr-6 pl-1.5 text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/15"
              >
                <Image
                  src="/assets/common/button-bottle.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-10 w-10 shrink-0 rounded-full"
                />
                <span className="font-obviously text-[10px] font-bold uppercase">
                  Find Your Formulation
                </span>
                <ChevronsRight className="h-5 w-5 shrink-0" strokeWidth={2} />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-0.5 lg:flex-row lg:items-center lg:gap-4"
            >
              <span className="font-obviously text-4xl text-secondary font-bold lg:text-3xl">
                50K+
              </span>
              <p className="text-sm text-white/80">
                Personalized Formulations
              </p>
            </motion.div>
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default Hero;
