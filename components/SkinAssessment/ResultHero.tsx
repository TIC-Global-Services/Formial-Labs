"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCheck, ChevronsRight, Share2 } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { AssessmentAnswers, getFormulationIngredients, PLAN } from "./assessmentData";

const BottleModel = dynamic(() => import("./BottleModel"), { ssr: false });

const ResultHero = ({
  firstName,
  copied,
  onShare,
  answers,
}: {
  firstName: string;
  copied: boolean;
  onShare: () => void;
  answers: AssessmentAnswers;
}) => {
  const [modelReady, setModelReady] = useState(false);
  const formulationIngredients = useMemo(() => getFormulationIngredients(answers), [answers]);
  return (
    <section className=" min-h-screen bg-brand-gradient flex items-center justify-center py-16 lg:py-24 px-4">
      <ContainerLayout px py={false} className="mx-auto w-full min-w-0 max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-6xl"
        >
          {firstName}, you&apos;re about to get your first custom formula.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-tight text-black"
        >
          Thanks for sharing about your skin. You&apos;re almost there! Just 1&ndash;2
          more steps for our dermatologist to review and recommend the right
          formula and plan for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          type="button"
          onClick={onShare}
          className="mx-auto mt-6 flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-opacity hover:opacity-70"
        >
          {copied ? (
            <>
              <CheckCheck size={15} strokeWidth={2} />
              Link copied
            </>
          ) : (
            <>
              <Share2 size={15} strokeWidth={2} />
              Share your results
            </>
          )}
        </motion.button>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto mt-10 h-72 w-full max-w-xs sm:h-96"
        >
          {/* Static bottle shown until the 3D model is ready */}
          <Image
            src={PLAN.image}
            alt={PLAN.name}
            width={220}
            height={330}
            className={`absolute inset-0 h-full w-full -rotate-12 object-contain drop-shadow-xl transition-opacity duration-500 ${modelReady ? "opacity-0" : "opacity-100"}`}
          />
          <BottleModel
            className="h-full w-full"
            name={firstName === "there" ? "" : firstName}
            ingredients={formulationIngredients}
            onReady={() => setModelReady(true)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex  flex-col items-center justify-center"
        >
          <a
            href="#plan"
            aria-label="Get My Formula"
            className="mx-auto flex h-auto  justify-center items-center gap-3 overflow-hidden rounded-full border-t border-b border-white/80 bg-white/10 py-1 pr-6 pl-1.5 text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/15 min-[1200px]:h-20 min-[1200px]:w-full min-[1200px]:justify-between min-[1200px]:gap-4 min-[1200px]:py-0 min-[1200px]:pl-2 min-[1200px]:pr-8"
          >
            {/* compact pill — mobile & tablet */}
            <Image
              src="/assets/common/button-bottle.png"
              alt=""
              width={80}
              height={80}
              className="h-10 w-10 shrink-0 rounded-full min-[1200px]:hidden"
            />
            <span className="font-obviously text-sm font-bold uppercase tracking-wide min-[1200px]:hidden">
              Get My Formula
            </span>
            <ChevronsRight className="h-5 w-5 shrink-0 min-[1200px]:hidden" strokeWidth={2} />

            {/* full bar — desktop only */}
            <div className="hidden min-w-0 items-center gap-4 min-[1200px]:flex">
              <Image
                src="/assets/common/button-bottle.png"
                alt=""
                width={80}
                height={80}
                className="h-16 w-16 shrink-0 rounded-full"
              />
              <span className="flex min-w-0 flex-col text-black text-start items-start">
                <span className="truncate text-lg  leading-tight">Includes 2-Month</span>
                <span className="truncate text-2xl  leading-tight">
                  Formula + Expert Guidance
                </span>
              </span>
            </div>

            <div className="hidden shrink-0 items-center gap-3 min-[1200px]:flex">
              <span className="flex flex-col items-end leading-tight">
                <span className="font-obviously text-sm font-medium uppercase tracking-wide">
                  Get
                </span>
                <span className="font-obviously text-sm font-bold uppercase tracking-wide">
                  My Formula
                </span>
              </span>
              <ChevronsRight className="h-7 w-7 shrink-0" strokeWidth={2} />
            </div>
          </a>

          <p className="mt-3 text-sm leading-tight text-[#525252] min-[1200px]:hidden">
            Includes 2-Month Formula + Expert Guidance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative mx-auto mt-10 max-w-md overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-[#f7f8f8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-[#f7f8f8] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-3 whitespace-nowrap">
            {[...formulationIngredients, ...formulationIngredients].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-3 text-lg md:text-xl font-medium tracking-tight text-primary/70"
              >
                {item}
                <span aria-hidden className="h-1 w-1 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ResultHero;
