"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ResultTeam = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <ContainerLayout px py={false} className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-aeonik text-2xl font-bold leading-tight tracking-tighter text-primary sm:text-4xl"
          >
            Meet The Experts
            <br />
            Behind Your Skin Journey
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-10 rounded-3xl bg-[#B5CBC9] p-3 sm:p-4"
          >
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/team/team.jpg"
                alt="The Formial Labs dermatology team"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 rounded-2xl bg-white p-6 sm:p-8">
              <p className="mx-auto max-w-4xl text-base leading-tight text-primary sm:text-lg">
                &ldquo;We believe great skincare starts with truly
                understanding your skin. At Formial, we look beyond the
                surface, combining clinical expertise and evidence-based care
                to create a treatment that evolves with you.&rdquo;
              </p>
            </div>
          </motion.div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ResultTeam;
