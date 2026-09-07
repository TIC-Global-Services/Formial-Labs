"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "../Reusable/ContainerLayout";

const PointIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M15.835 9.98601C14.2762 11.5448 11.6034 11.3966 11.6034 11.3966C11.6034 11.3966 11.4552 8.71922 13.0139 7.16043C14.5727 5.60164 17.2501 5.74988 17.2501 5.74988C17.2501 5.74988 17.3938 8.42722 15.835 9.98601Z"
      stroke="currentColor"
    />
    <path
      d="M9.98601 7.16504C11.5448 8.72383 11.3966 11.4012 11.3966 11.4012C11.3966 11.4012 8.72371 11.5494 7.16043 9.99062C5.60164 8.43184 5.74988 5.75898 5.74988 5.75898C5.74988 5.75898 8.42722 5.60625 9.98601 7.16504Z"
      stroke="currentColor"
    />
    <path
      d="M7.16462 13.0139C8.72341 11.4552 11.3963 11.6034 11.3963 11.6034C11.3963 11.6034 11.5445 14.2807 9.98571 15.8395C8.42692 17.3983 5.74958 17.2501 5.74958 17.2501C5.74958 17.2501 5.60583 14.5727 7.16462 13.0139Z"
      stroke="currentColor"
    />
    <path
      d="M13.01 15.8346C11.4512 14.2759 11.5995 11.5985 11.5995 11.5985C11.5995 11.5985 14.2768 11.4503 15.8356 13.0091C17.3944 14.5678 17.2462 17.2452 17.2462 17.2452C17.2462 17.2452 14.5733 17.3934 13.01 15.8346Z"
      stroke="currentColor"
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
    <section className="bg-white py-20 lg:py-28">
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
        <div className="relative mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={cardLeftVariants}
            className="rounded-3xl border border-primary/15 bg-white p-8"
          >
            <h3 className="font-obviously text-sm font-bold tracking-wide text-black">
              GENERIC SKINCARE
            </h3>
            <div className="mt-4 h-px w-full bg-primary/15" />
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-6 space-y-5"
            >
              {genericItems.map((item) => (
                <motion.li
                  key={item}
                  variants={rowVariants}
                  className="flex items-start gap-3 text-lg text-primary"
                >
                  <PointIcon className="mt-1.5 text-primary" />
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
              className="h-5 w-auto object-contain"
            />
            <div className="mt-4 h-px w-full bg-white/40" />
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-6 space-y-5"
            >
              {formialItems.map((item) => (
                <motion.li
                  key={item}
                  variants={rowVariants}
                  className="flex items-start gap-3 text-lg text-white"
                >
                  <PointIcon className="mt-1.5 text-white" />
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
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-20 -translate-x-1/2 -translate-y-1/2 xl:w-24"
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
            <h3 className="font-obviously text-xs font-bold tracking-wide text-primary sm:text-sm">
              GENERIC SKINCARE
            </h3>
            <h3 className="font-obviously text-xs font-bold tracking-widest text-primary sm:text-sm">
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
                  <PointIcon className="text-primary" />
                  <p className="mt-2 text-sm leading-snug text-primary">
                    {item}
                  </p>
                </motion.div>
                <motion.div
                  variants={rowVariants}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <PointIcon className="text-primary" />
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
