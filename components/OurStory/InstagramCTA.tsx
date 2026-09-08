"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "../Reusable/ContainerLayout";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const InstagramCTA = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <ContainerLayout>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="flex flex-col items-center gap-10 rounded-3xl bg-gradient-to-br from-[#7A9490] to-[#E6E6E6] px-6 py-12 text-center sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:text-right"
        >
          <motion.div
            variants={containerVariants}
            className="flex w-full shrink-0 items-center justify-center gap-4 sm:gap-6 lg:w-[55%]"
          >
            <motion.div
              variants={imageVariants}
              className="relative w-full overflow-hidden rounded-2xl shadow-xl "
            >
              <Image
                src="/assets/our-story/insta-card1.png"
                alt="Formial Labs Instagram post"
                width={1200}
                height={1440}
                className="h-auto w-full object-contain"
              />
            </motion.div>
            <motion.div
              variants={imageVariants}
              className="relative w-full overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="/assets/our-story/insta-card2.png"
                alt="Formial Labs Instagram post"
                width={1200}
                height={1440}
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center gap-6 sm:gap-12 lg:items-end"
          >
            <Image
              src="/assets/our-story/instgram-wordmark.png"
              alt="Instagram"
              width={200}
              height={266}
              className=" object-contain"
            />
            <div>
              <h3 className="max-w-sm font-aeonik text-3xl leading-tight tracking-tighter text-white sm:text-5xl lg:text-6xl">
                Step Into a Calmer Space
              </h3>
              <Link
                href="https://www.instagram.com/formiallabs"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border-t border-b border-white/80 bg-white/10 px-8 py-3 font-obviously text-sm font-bold tracking-wide text-primary uppercase backdrop-blur-md shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-white/20"
              >
                Follow Us Now
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default InstagramCTA;
