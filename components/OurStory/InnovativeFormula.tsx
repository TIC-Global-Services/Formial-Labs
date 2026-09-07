"use client";
import Image from "next/image";
import ContainerLayout from "../Reusable/ContainerLayout";
import { motion, Variants } from "framer-motion";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const bubbleContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// glassmorphism lifted from FloatingFormulationButton's floating-button treatment
const glassClass =
  "bg-white/40 backdrop-blur-md border-t border-b border-white/80 shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.25)]";

const FloatCards = [
  {
    content: "The strengths are picked to work for you alone.",
    desktop: "left-[14%] top-[26%] w-[26%]",
  },
  {
    content: "The actives are chosen for your skin now.",
    desktop: "left-[73%] top-[30%] w-[27%]",
  },
  {
    content: "Built on our proprietary, patent-pending base.",
    desktop: "left-0 top-[60%] w-[33%]",
  },
];

const InnovativeFormula = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">

      <ContainerLayout>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:text-left"
        >
          <h2 className="max-w-xl font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-6xl">
            Innovative formula, designed for you
          </h2>
          <div className="max-w-md">
            <p className="text-lg font-medium text-primary sm:text-xl">
              Your Details. Your Seasons. Your Life.
            </p>
            <p className="mt-2 text-base text-[#333] sm:text-lg">
              It all adds up to create a prescription-grade formula. One
              that&rsquo;s backed by evidence-based, potent ingredients,
              designed to be accessible to you.
            </p>
          </div>
        </motion.div>

        {/* Desktop / tablet-landscape: art-directed collage */}
        <div className="relative mt-16 hidden h-[560px] w-full max-w-[1400px] lg:mx-auto lg:block xl:h-[720px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={imageVariants}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-[61%]"
          >
            <Image
              src="/assets/our-story/formulated_plan.png"
              alt="Ishita's skincare plan for month 1, with her serum bottle and a close-up of her skin"
              width={1700}
              height={1629}
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={bubbleContainerVariants}
            className="absolute inset-0"
          >
            {FloatCards.map((card, index) => (
              <motion.div
                key={card.content}
                variants={bubbleVariants}
                className={`absolute z-20 ${card.desktop}`}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className={`rounded-[2rem] px-6 py-4 text-center text-lg leading-snug text-primary ${glassClass}`}
                >
                  {card.content}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="mt-12 flex flex-col items-center gap-6 lg:hidden">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={imageVariants}
            className="w-full max-w-sm"
          >
            <Image
              src="/assets/our-story/formulated_plan.png"
              alt="Ishita's skincare plan for month 1, with her serum bottle and a close-up of her skin"
              width={1700}
              height={1629}
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={bubbleContainerVariants}
            className="flex w-full max-w-sm flex-col gap-4"
          >
            {FloatCards.map((card) => (
              <motion.div
                key={card.content}
                variants={bubbleVariants}
                className={`rounded-[2rem] px-6 py-4 text-center text-sm md:text-base leading-snug text-primary ${glassClass}`}
              >
                {card.content}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default InnovativeFormula;
