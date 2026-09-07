"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronsRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const COPY =
  "In fact, we look at your photos with real care (zooming in is our love language). It keeps us honest on our mission: clear skin and clarity for you, period";

const Hero = () => {
  return (
    <section className="bg-brand-gradient relative min-h-screen w-full overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative hidden min-h-screen w-full lg:block"
      >
        <motion.h1
          variants={itemVariants}
          className="absolute top-[14%] left-8 z-0 max-w-xl font-aeonik text-5xl leading-[0.95] tracking-tighter text-primary xl:left-16 xl:max-w-2xl xl:text-7xl 2xl:text-8xl"
        >
          We See What
          <br />
          Your Skin Needs
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-0 left-1/2 z-10 h-[92%] w-[46%] -translate-x-1/2 xl:w-[44%]"
        >
          <Image
            src="/assets/our-story/model2.png"
            alt="Model with eyes closed, touching her face"
            fill
            priority
            sizes="(min-width: 1024px) 38vw"
            className="object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="absolute top-[55%] right-8 z-20 max-w-xs text-center text-base leading-relaxed text-primary xl:right-16 xl:max-w-sm xl:text-lg 2xl:text-xl"
        >
          {COPY}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative flex min-h-screen w-full flex-col items-center gap-6 pt-16 pb-12 text-center lg:hidden"
      >
        <motion.h1
          variants={itemVariants}
          className="px-6 font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-6xl pt-10"
        >
          We See What
          <br />
          Your Skin Needs
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-md px-6 text-base leading-relaxed text-primary sm:text-lg"
        >
          {COPY}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="absolute inset-x-0 bottom-0 z-0 h-[65%] w-full sm:h-[70%]"
        >
          <Image
            src="/assets/our-story/model2.png"
            alt="Model with eyes closed, touching her face"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#e6e6e6] to-transparent" />
        </motion.div>

        <motion.div variants={itemVariants} className="relative z-10 mt-auto px-6">
          <Link
            href="/solutions"
            className="flex items-center gap-3 rounded-full border-t border-b border-white/80 bg-white/40 py-1.5 pr-6 pl-1.5 text-primary backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/60"
          >
            <Image
              src="/assets/common/button-bottle.png"
              alt=""
              width={80}
              height={80}
              className="h-11 w-11 shrink-0 rounded-full"
            />
            <span className="font-obviously text-xs font-bold uppercase">
              Find Your Formulation
            </span>
            <ChevronsRight className="h-5 w-5 shrink-0" strokeWidth={2} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
