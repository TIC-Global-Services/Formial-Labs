"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import ContainerLayout from "../Reusable/ContainerLayout";
import QuestionnaireIcon from "./icons/QuestionnaireIcon";
import FormulaIcon from "./icons/FormulaIcon";
import RoutineIcon from "./icons/RoutineIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
}

const steps = [
  {
    number: "01",
    title: "Take The Questionnaire",
    desc: "Answer a few simple questions about your skin, concerns, and goals.",
    Icon: QuestionnaireIcon,
  },
  {
    number: "02",
    title: "Get Your Formula",
    desc: "We use your profile to select ingredients and create a personalised skincare formula.",
    Icon: FormulaIcon,
  },
  {
    number: "03",
    title: "Start Your Routine",
    desc: "Your personalised formula is prepared and delivered, ready to become part of your daily routine.",
    Icon: RoutineIcon,
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const stepListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
};

const stepItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const circlePathD = (cx: number, cy: number, r: number) => {
  const k = 0.5522847498;
  return `M ${cx - r} ${cy} C ${cx - r} ${cy - r * k} ${cx - r * k} ${cy - r} ${cx} ${cy - r} C ${cx + r * k} ${cy - r} ${cx + r} ${cy - r * k} ${cx + r} ${cy} C ${cx + r} ${cy + r * k} ${cx + r * k} ${cy + r} ${cx} ${cy + r} C ${cx - r * k} ${cy + r} ${cx - r} ${cy + r * k} ${cx - r} ${cy} Z`;
};

const iconStartShapes: Record<number, string> = {
  0: circlePathD(45.5, 47, 22),
  1: circlePathD(35.5, 50, 24),
  2: circlePathD(46, 44, 22),
};

const HowItWorks = () => {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return;

        const mainPaths = el.querySelectorAll<SVGPathElement>(".icon-main-path");
        const detailPaths = el.querySelectorAll<SVGPathElement>(".icon-detail-path");
        if (mainPaths.length === 0) return;

        const originalDs = Array.from(mainPaths).map((p) => p.getAttribute("d") ?? "");
        const startShape = iconStartShapes[index];

        gsap.set(mainPaths, { morphSVG: startShape });
        if (detailPaths.length > 0) {
          gsap.set(detailPaths, { opacity: 0, scale: 0, transformOrigin: "center" });
        }

        const revealTl = gsap.timeline({ paused: true, delay: index * 0.15 });
        mainPaths.forEach((path, i) => {
          revealTl.to(
            path,
            {
              morphSVG: {
                shape: originalDs[i],
                type: "rotational",
                map: "complexity",
              },
              duration: 0.9,
              ease: "power2.out",
            },
            i * 0.08,
          );
        });
        if (detailPaths.length > 0) {
          revealTl.to(
            detailPaths,
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              stagger: 0.015,
            },
            0.4,
          );
        }

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => revealTl.restart(),
          onEnterBack: () => revealTl.restart(),
          onLeaveBack: () => revealTl.pause(0),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <div className="flex flex-1 items-center py-10 lg:py-24">
        <ContainerLayout py={false} className="w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            variants={headingVariants}
          >
            <h2 className=" mx-auto lg:mx-0 max-w-xl text-center font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-6xl lg:text-left">
              From skin analysis to your formula
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center leading-tight text-lg text-[#525252] sm:text-xl lg:mx-0 lg:text-left">
              Your skin journey begins with an online analysis, followed by
              expert review and a custom formula, evolving with your skin
              over time.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            variants={stepListVariants}
            className="mt-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepItemVariants}
                className={`flex gap-5 py-6 sm:gap-6 ${
                  index !== steps.length - 1 ? "border-b border-primary/10" : ""
                }`}
              >
                <div
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center text-primary sm:h-[70px] sm:w-[70px]"
                >
                  <step.Icon />
                </div>
                <div className="min-w-0">
                  <p className="font-obviously text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                    Step {step.number}
                  </p>
                  <h3 className="mt-1 font-aeonik text-xl text-black sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-tight text-[#525252] sm:text-xl max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ContainerLayout>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={imageVariants}
        className="relative h-[380px] w-full sm:h-[480px] lg:h-auto lg:w-1/2"
      >
        <Image
          src="/assets/home/blue_leaf.png"
          alt="Botanical ingredient close-up"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
};

export default HowItWorks;
