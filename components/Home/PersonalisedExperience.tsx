"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Check, X } from "lucide-react";
import ContainerLayout from "../Reusable/ContainerLayout";

const rows = [
  {
    feature: "Approach",
    conventional: "One-Size-Fits-All Products",
    formial: "Made For Your Skin",
  },
  {
    feature: "Recommendations",
    conventional: "Generic Product Suggestions",
    formial: "Personalized Recommendations",
  },
  {
    feature: "Ingredients",
    conventional: "Standard Formulations",
    formial: "Ingredients Chosen For Your Needs",
  },
  {
    feature: "Expert Guidance",
    conventional: "Limited Or None",
    formial: "Expert-Guided Care",
  },
  {
    feature: "Treatment Plan",
    conventional: "Fixed Routine",
    formial: "Customized Treatment Plan",
  },
  {
    feature: "Progress Tracking",
    conventional: "Self-Managed",
    formial: "Ongoing Support",
  },
  {
    feature: "Experience",
    conventional: "Trial And Error",
    formial: "Data-Driven, Personalized Skincare",
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PersonalisedExperience = () => {
  return (
    <section className="bg-white">
      <ContainerLayout>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="mx-auto max-w-2xl text-center font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl"
        >
          More Than Skincare. <br /> A Personalized Experience.
        </motion.h2>

        {/* Desktop / tablet-landscape: full 3-column comparison table */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={listVariants}
          className="mt-12 hidden grid-cols-3 gap-4 lg:grid lg:gap-6"
        >
          <motion.div
            variants={cardVariants}
            className="col-span-2 grid grid-cols-2 divide-x divide-primary/30 rounded-3xl border border-primary/30 px-4"
          >
            <div className="py-8 px-6">
              <h3 className="text-3xl text-black">Features</h3>
              <div className="mt-4 h-px w-full bg-primary/30" />
              <ul className="mt-6 space-y-5">
                {rows.map((row) => (
                  <li key={row.feature} className="text-xl text-[#525252]">
                    {row.feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 pl-8 pr-6">
              <h3 className="text-3xl text-black">Conventional Skincare</h3>
              <div className="mt-4 h-px w-full bg-primary/30" />
              <ul className="mt-6 space-y-5">
                {rows.map((row) => (
                  <li
                    key={row.feature}
                    className="text-xl text-[#525252]"
                  >
                    {row.conventional}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="rounded-3xl bg-linear-to-br from-[#7A9490]  to-[#E6E6E6] px-6 py-8 shadow-xl"
          >
            <h3 className="text-3xl text-white">Formial Labs</h3>
            <div className="mt-4 h-px w-full bg-white/30" />
            <ul className="mt-6 space-y-5">
              {rows.map((row) => (
                <li
                  key={row.feature}
                  className="text-xl font-medium text-white"
                >
                  {row.formial}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Mobile: bottle comparison + full-width check/x rows */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={listVariants}
          className="mt-10 lg:hidden"
        >
          <motion.div
            variants={cardVariants}
            className="flex items-center justify-center gap-6"
          >
            <div className="flex flex-1 flex-col items-center">
              <Image
                src="/assets/home/formial-bottle.png"
                alt="Formial Labs"
                width={140}
                height={210}
                className="h-auto w-24 object-contain sm:w-32"
              />
            </div>
            <div className="h-24 w-px bg-primary/20 sm:h-32" />
            <div className="flex flex-1 flex-col items-center">
              <Image
                src="/assets/home/sample-bottle.png"
                alt="Other brands"
                width={140}
                height={210}
                className="h-auto w-24 object-contain sm:w-32"
              />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="mt-6 flex items-center justify-center gap-6"
          >
            <p className="flex-1 text-center font-obviously text-sm font-bold uppercase tracking-widest text-primary">
              Formial Labs
            </p>
            <div className="w-px shrink-0" />
            <p className="flex-1 text-center font-obviously text-sm font-bold uppercase tracking-widest text-[#525252]">
              Other Brands
            </p>
          </motion.div>

          <div className="mt-6 h-px w-full bg-primary/20" />

          <ul className="mt-2 divide-y divide-primary/10">
            {rows.map((row) => (
              <motion.li
                key={row.feature}
                variants={rowVariants}
                className="flex items-center justify-between gap-4 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="flex-1 text-center text-base text-[#525252]">
                  {row.formial}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary/30">
                  <X size={16} strokeWidth={3} />
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default PersonalisedExperience;
