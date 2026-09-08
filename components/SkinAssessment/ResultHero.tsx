"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCheck, ChevronsRight, Share2 } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { PLAN } from "./assessmentData";

const ResultHero = ({
  firstName,
  copied,
  onShare,
}: {
  firstName: string;
  copied: boolean;
  onShare: () => void;
}) => {
  return (
    <section className=" min-h-screen bg-brand-gradient flex items-center justify-center py-16 lg:py-24">
      <ContainerLayout px py={false} className="mx-auto max-w-4xl text-center">
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
          className="mx-auto mt-4 max-w-xl text-base text-[#525252]"
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
          className="mx-auto mt-10 flex h-56 items-center justify-center sm:h-72"
        >
          <Image
            src={PLAN.image}
            alt={PLAN.name}
            width={220}
            height={330}
            className="h-full w-auto -rotate-12 object-contain drop-shadow-xl"
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
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-lg leading-tight">Includes 2-Month Formula</span>
                <span className="truncate text-2xl font-semibold leading-tight">
                  + Expert Guidance
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

          <p className="mt-3 text-sm text-[#525252] min-[1200px]:hidden">
            Includes 2-Month Formula + Expert Guidance
          </p>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ResultHero;
