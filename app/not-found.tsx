"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { Navlinks } from "@/components/Navigation/constants/links";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function NotFound() {
  return (
    <ContainerLayout
      as="main"
      pt={false}
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden pt-28 pb-16 text-center md:pt-32"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-obviously text-[10rem] leading-none text-primary/5 sm:text-[16rem]"
      >
        404
      </span>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative flex flex-col items-center gap-6"
      >
        <motion.p
          variants={itemVariants}
          className="font-obviously text-sm uppercase tracking-widest text-primary/50"
        >
          Error 404
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-obviously text-6xl uppercase text-primary sm:text-8xl"
        >
          Lost in the Lab
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-md text-primary/70">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-80"
          >
            Back to Home
          </Link>
        </motion.div>

        <motion.nav
          variants={itemVariants}
          aria-label="Quick links"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-primary/10 pt-6"
        >
          {Navlinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-wide text-primary/60 transition-opacity hover:opacity-70"
            >
              {link.name}
            </Link>
          ))}
        </motion.nav>
      </motion.div>
    </ContainerLayout>
  );
}
