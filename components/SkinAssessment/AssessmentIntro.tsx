"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const AssessmentIntro = ({
  name,
  onNameChange,
  agreed,
  onAgreedChange,
  onStart,
}: {
  name: string;
  onNameChange: (value: string) => void;
  agreed: boolean;
  onAgreedChange: (value: boolean) => void;
  onStart: () => void;
}) => {
  const canStart = agreed && name.trim() !== "";


  return (
    <ContainerLayout px py={false} className="mx-auto max-w-5xl text-center">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl"
      >
        Advanced science, <br /> personalised for your skin.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-6 h-80 w-full max-w-md sm:h-70"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/assets/home/formial-new-bottle-cropped.png"
            alt="Formial Labs"
            width={356}
            height={399}
            priority
            className="h-full w-full object-contain drop-shadow-xl"
          />
        </motion.div>

      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mx-auto mt-8 max-w-md text-2xl tracking-tighter  text-primary"
      >
       Hey, before we begin, <br />
what should we call you?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto mt-6 max-w-md"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your first name"
          className="w-full border border-primary/30 px-4 py-3 text-lg text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none"
        />
      </motion.div>

      <motion.label
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-4 flex cursor-pointer items-center justify-center gap-2 text-xs md:text-sm text-[#525252]"
      >
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms-of-service" className="font-semibold text-primary underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/telehealth-consent" className="font-semibold text-primary underline">
            Telehealth Consent
          </Link>{" "}
          *
        </span>
      </motion.label>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        type="button"
        onClick={onStart}
        disabled={!canStart}
        className="mx-auto mt-8 flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border-t border-b border-white/80 bg-white/20 py-1 pr-6 pl-1.5 text-primary shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Image
          src="/assets/common/button-bottle.png"
          alt=""
          width={80}
          height={80}
          className="h-10 w-10 shrink-0 rounded-full"
        />
        <span className="font-obviously text-[10px] font-bold uppercase">
          Get Your Formulation Now
        </span>
        <ChevronsRight className="h-5 w-5 shrink-0" strokeWidth={2} />
      </motion.button>
    </ContainerLayout>
  );
};

export default AssessmentIntro;
