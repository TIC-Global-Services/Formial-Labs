"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AssessmentAnswers,
  CONCERN_OPTIONS,
  DURATION_OPTIONS,
  labelFor,
  OTHER_CONCERN_OPTIONS,
  PRODUCTS_USED_OPTIONS,
  SKIN_TYPE_OPTIONS,
  summarizeList,
} from "./assessmentData";

const TRANSIENT_MS = 2200;
const IDLE_FIRST_MS = 5000;
const IDLE_NEXT_MS = 3000;

const S = ({ children }: { children: ReactNode }) => (
  <span className="font-minion-pro text-[1.15em] italic">{children}</span>
);

const ALL_CONCERNS = [...CONCERN_OPTIONS, ...OTHER_CONCERN_OPTIONS];

// What the current step is "about", so a change in it can trigger a reaction.
// Text inputs (steps 7+) are deliberately excluded so typing never flickers.
const selectionFor = (step: number, a: AssessmentAnswers): { key: string; subject: string } => {
  switch (step) {
    case 0: {
      const labels = a.concerns.map((v) => labelFor(CONCERN_OPTIONS, v));
      return { key: a.concerns.join(","), subject: summarizeList(labels) };
    }
    case 1: {
      const labels = a.otherConcerns.map((v) => labelFor(OTHER_CONCERN_OPTIONS, v));
      return { key: a.otherConcerns.join(","), subject: summarizeList(labels) };
    }
    case 2:
      return { key: a.skinType, subject: labelFor(SKIN_TYPE_OPTIONS, a.skinType) };
    case 3:
      return { key: a.duration, subject: labelFor(DURATION_OPTIONS, a.duration) };
    case 4:
      return {
        key: a.sensitivity === null ? "" : String(a.sensitivity),
        subject: a.sensitivity === "not-sure" ? "not sure" : `${a.sensitivity} out of 5`,
      };
    case 5: {
      const labels = a.productsUsed.map((v) => labelFor(PRODUCTS_USED_OPTIONS, v));
      return { key: a.productsUsed.join(","), subject: summarizeList(labels) };
    }
    default:
      return { key: "", subject: "" };
  }
};

// True while the step still needs the user's pick, so we can nudge them.
// Free-text steps are excluded on purpose: nudging while someone types is noise.
const isPending = (step: number, a: AssessmentAnswers): boolean => {
  switch (step) {
    case 0: return a.concerns.length === 0;
    case 1: return a.otherConcerns.length === 0;
    case 2: return a.skinType === "";
    case 3: return a.duration === "";
    case 4: return a.sensitivity === null;
    case 5: return a.productsUsed.length === 0;
    case 6: return a.onMedication === null || a.hasAllergy === null || a.pregnantOrBreastfeeding === null;
    case 8: return a.hearAboutUs === "";
    default: return false;
  }
};

// Rotated one at a time while the user hesitates. {n} = first name, if known.
const NUDGES: Record<number, string[]> = {
  0: [
    "Not sure where to start{n}? Pick the one that bothers you most.",
    "You can choose more than one. We'll sort out the rest.",
    "Take your time. Tap a card that sounds like your skin.",
  ],
  1: [
    "Nothing else? That's fine, you can skip ahead.",
    "Anything else bothering you{n}? Tap to add it.",
    "The more we know, the more precise your formula.",
  ],
  2: [
    "Think about how your skin feels by midday.",
    "Not sure of your skin type? Pick \"Not sure yet\" and we'll help.",
    "Tap the one that sounds most like you.",
  ],
  3: [
    "A rough guess is fine. It still helps us a lot.",
    "Not sure? \"Not sure yet\" is a perfectly good answer.",
    "How long has it been around? Pick one.",
  ],
  4: [
    "1 is barely sensitive, 5 is very sensitive.",
    "Does your skin sting or redden easily? Lean higher.",
    "Not sure? There's an option for that too.",
  ],
  5: [
    "Tried anything{n}? Even a simple cleanser counts.",
    "Pick everything that applies, or \"None of the above\".",
    "Knowing what didn't work saves you time.",
  ],
  6: [
    "Three quick Yes/No questions. They keep your formula safe.",
    "Answer for what you know. Take your time, this one matters.",
    "Nearly there{n}. Just tap Yes or No on each.",
  ],
  8: [
    "Last one{n}! How did you find us?",
    "Pick the closest option. It takes a second.",
  ],
};

const nudgeText = (step: number, index: number, first: string): string => {
  const list = NUDGES[step] ?? [];
  if (!list.length) return "";
  return list[index % list.length].replace("{n}", first ? `, ${first}` : "");
};

const settledMessage = (step: number, a: AssessmentAnswers, subject: string): ReactNode => {
  const all = [...a.concerns, ...a.otherConcerns].map((v) => labelFor(ALL_CONCERNS, v));
  const primary = all[0];
  const first = a.firstName.trim().split(/\s+/)[0];

  switch (step) {
    case 0:
      return a.concerns.length
        ? <>Preparing your <S>{subject}</S> formula</>
        : "Tell us what's bothering your skin. Our team is standing by.";
    case 1:
      return a.otherConcerns.length
        ? <>Adding <S>{subject}</S> to your {primary ? <S>{primary}</S> : "skin"} plan</>
        : "Anything else? We'll build it into your formula.";
    case 2:
      return a.skinType
        ? <>Balancing your formula for <S>{subject.toLowerCase()}</S></>
        : <>Choosing the right base for your {primary ? <S>{primary}</S> : "skin"} formula</>;
    case 3:
      return a.duration
        ? <><S>{subject}</S>, noted. Setting how strong to go</>
        : "Timing matters. It shapes how strong your formula needs to be.";
    case 4:
      if (a.sensitivity === null) return "Working out how gentle your formula should be.";
      return a.sensitivity === "not-sure"
        ? "No worries, we'll start gentle and adjust."
        : <>Dosing your actives for sensitivity <S>{subject}</S></>;
    case 5:
      if (!a.productsUsed.length) return "Learning what hasn't worked so we can skip it.";
      return a.productsUsed.includes("none")
        ? "A fresh start. Nothing to work around."
        : <>Noted: <S>{subject}</S>. We&apos;ll work around those</>;
    case 6: {
      const answers = [a.onMedication, a.hasAllergy, a.pregnantOrBreastfeeding];
      if (answers.some((v) => v === "yes")) {
        return "Thank you for telling us. Our dermatologist will look at this closely.";
      }
      return answers.every((v) => v === "no")
        ? "All clear. Your formula is nearly ready."
        : "Running your safety check so your formula stays safe for you.";
    }
    case 7:
      return <>Almost there{first ? <>, <S>{first}</S></> : ""}. Finalising your {primary ? <S>{primary}</S> : "skin"} formula</>;
    default:
      return "Last step. Sealing your personalised formula.";
  }
};

const transientMessage = (subject: string, isChange: boolean): ReactNode =>
  isChange
    ? <>Oops, <S>{subject}</S> instead? Okay, recalibrating</>
    : <>Noted: <S>{subject}</S>. Calibrating</>;

const Dots = () => (
  <span aria-hidden className="ml-0.5 inline-flex">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
      >
        .
      </motion.span>
    ))}
  </span>
);

const AssessmentStatus = ({ step, answers }: { step: number; answers: AssessmentAnswers }) => {
  const { key, subject } = selectionFor(step, answers);
  const pending = isPending(step, answers);
  const first = answers.firstName.trim().split(/\s+/)[0];

  // Adjust state while rendering (the React-endorsed alternative to an effect)
  // so we can tell "first pick" from "changed their mind" per step.
  const [snap, setSnap] = useState({ step, key, pending });
  const [transient, setTransient] = useState<ReactNode | null>(null);
  const [nudge, setNudge] = useState<number | null>(null);
  if (snap.step !== step) {
    setSnap({ step, key, pending });
    setTransient(null);
    setNudge(null);
  } else if (snap.key !== key || snap.pending !== pending) {
    setSnap({ step, key, pending });
    if (snap.key !== key) setTransient(key ? transientMessage(subject, snap.key !== "") : null);
    setNudge(null);
  }

  useEffect(() => {
    if (!transient) return;
    const id = setTimeout(() => setTransient(null), TRANSIENT_MS);
    return () => clearTimeout(id);
  }, [transient]);

  // Idle nudges: first after 5s without a pick, then a new one every 3s.
  useEffect(() => {
    if (!pending || !NUDGES[step]) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setNudge(0);
      interval = setInterval(() => setNudge((n) => (n ?? 0) + 1), IDLE_NEXT_MS);
    }, IDLE_FIRST_MS);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [pending, step]);

  const busy = transient !== null;
  const nudging = !busy && pending && nudge !== null;
  const content = busy
    ? transient
    : nudging
      ? nudgeText(step, nudge, first)
      : settledMessage(step, answers, subject);
  const messageId = busy
    ? `t-${step}-${key}`
    : nudging
      ? `n-${step}-${nudge}`
      : `s-${step}-${key}`;

  return (
    <div className="mb-3 flex justify-center" aria-live="polite">
      <div className="flex max-w-full items-center gap-3 py-2 pr-6 pl-2 text-primary ">
        <Image
          src="/assets/calibrate-sm.gif"
          alt=""
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 shrink-0 rounded-full"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={messageId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-left text-sm leading-snug font-medium sm:text-base"
          >
            {content}
            {busy && <Dots />}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentStatus;
