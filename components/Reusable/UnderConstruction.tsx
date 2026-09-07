"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Construction } from "lucide-react";
import ContainerLayout from "./ContainerLayout";
import { Navlinks } from "../Navigation/constants/links";

type UnderConstructionProps = {
  title?: string;
  message?: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const UnderConstruction = ({
  title = "Under Construction",
  message = "We're working on something great here. Check back soon.",
}: UnderConstructionProps) => {
  return (
    <ContainerLayout
      as="main"
      pt={false}
      className="flex min-h-screen flex-col items-center justify-center gap-6 pt-28 pb-16 text-center md:pt-32"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex flex-col items-center gap-6"
      >
        <motion.div variants={itemVariants}>
          <motion.span
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Construction size={28} strokeWidth={1.5} />
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-obviously text-4xl uppercase text-primary sm:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-md text-primary/70">
          {message}
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
};

export default UnderConstruction;
