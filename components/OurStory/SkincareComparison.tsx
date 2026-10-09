"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "../Reusable/ContainerLayout";

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <circle cx="10" cy="10" r="9.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.75 6.75L13.25 13.25M13.25 6.75L6.75 13.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TickIcon = ({
  className = "",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <circle
      cx="10"
      cy="10"
      r="9.25"
      fill={filled ? "currentColor" : "white"}
      stroke={filled ? "currentColor" : "white"}
      strokeWidth="1.5"
    />
    <path
      d="M6 10.25L8.75 13L14 7.5"
      stroke={filled ? "white" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const genericItems = [
  "Standard Formulations, Rarely Tested Beyond Cosmetic Claims.",
  "Standardised Ingredients That Leave The Guesswork To You",
  "Multi-Step Routine With Varying Actives",
  "Friend Recommendations And Trial-And-Error",
  "Complicated Routines With Varied Result Time",
];

const formialItems = [
  "A Patent-Pending Formula, Currently Undergoing Clinical Study And Peer Review.",
  "USP-Grade, 100% Pure Ingredients With Testing Protocols",
  "Every Active You Need, In One Formula",
  "Dermatologist Guidance, With Support",
  "Simplified Routine, Visible Results In 6 Weeks",
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const cardRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const bottleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const SkincareComparison = () => {
  return (
    <section className="bg-white py-10 lg:py-28">
      <ContainerLayout>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="mx-auto max-w-3xl text-center font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-5xl lg:text-6xl"
        >
          Skincare,
          <br />
          The Usual Way vs. Formial
        </motion.h2>

        {/* Desktop / tablet: two cards side by side with the bottle sketch between them */}
        <div className="relative mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-40 xl:gap-72">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardLeftVariants}
            className="rounded-3xl border border-primary/15 bg-white p-8"
          >
            <h3 className="font-obviously text-lg font-bold  text-black">
              GENERIC SKINCARE
            </h3>
            <div className="mt-4 h-px w-full bg-primary/15" />
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-6 space-y-5 max-w-lg"
            >
              {genericItems.map((item) => (
                <motion.li
                  key={item}
                  variants={rowVariants}
                  className="flex items-start gap-3 text-2xl text-primary"
                >
                  <CrossIcon className="mt-1.5 text-primary" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardRightVariants}
            className="rounded-3xl bg-gradient-to-br from-[#7A9490] to-[#E6E6E6] p-8"
          >
            <Image
              src="/assets/logo/logo_wordmark_white.png"
              alt="Formial Labs"
              width={831}
              height={120}
              className="h-8 w-auto object-contain"
            />
            <div className="mt-4 h-px w-full bg-white/40" />
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-6 space-y-5 max-w-lg"
            >
              {formialItems.map((item) => (
                <motion.li
                  key={item}
                  variants={rowVariants}
                  className="flex items-start gap-3 text-2xl text-white"
                >
                  <TickIcon className="mt-1.5 text-primary" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            variants={bottleVariants}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-36 -translate-x-1/2 -translate-y-1/2 xl:w-52"
          >
            <Image
              src="/assets/our-story/sketch-bottle.png"
              alt=""
              width={320}
              height={700}
              className="h-auto w-full object-contain"
            />
          </motion.div>
        </div>

        {/* Mobile: single combined card, paired rows */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          variants={listVariants}
          className="mt-12 rounded-3xl bg-gradient-to-br from-[#7A9490] to-[#E6E6E6] p-4 sm:p-6 lg:hidden"
        >
          <div className="grid grid-cols-2 gap-3">
            <h3 className="text-center font-obviously text-xs font-bold tracking-wide text-primary sm:text-sm">
              GENERIC SKINCARE
            </h3>
            <h3 className="text-center font-obviously text-xs font-bold tracking-widest text-primary sm:text-sm">
              FORMIAL&#8212;LABS
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {genericItems.map((item, index) => (
              <div key={item} className="grid grid-cols-2 gap-3">
                <motion.div
                  variants={rowVariants}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <CrossIcon className="text-primary" />
                  <p className="mt-2 text-sm leading-snug text-primary">
                    {item}
                  </p>
                </motion.div>
                <motion.div
                  variants={rowVariants}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <TickIcon filled className="text-primary" />
                  <p className="mt-2 text-sm leading-snug text-primary">
                    {formialItems[index]}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default SkincareComparison;
