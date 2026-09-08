"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Droplet, ShieldCheck } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import {
  AssessmentAnswers,
  getConcernLabels,
  joinWithAnd,
  needsDermReview,
  PLAN,
  PLAN_SAVINGS,
} from "./assessmentData";

const HOW_IT_WORKS = [
  {
    title: "Your First Custom Formula",
    desc: "Our dermatologists build your formula from your skin assessment and ship it within days.",
  },
  {
    title: "Unlimited Dermatologist Support",
    desc: "Message your derm anytime with questions about your routine or results.",
  },
  {
    title: "Month 2: Your Formula Evolves",
    desc: "We refine your formula based on how your skin responds in month one.",
  },
  {
    title: "Free Reformulation",
    desc: "Not loving it? We adjust your formula again at no extra cost.",
  },
  {
    title: "Visible Progress",
    desc: "Track changes with guided check-ins built around your timeline.",
  },
];

const HOW_TO_GET_IT = [
  {
    title: "Complete Your Assessment",
    desc: "Already done — your answers are with our dermatology team.",
  },
  {
    title: "Dermatologist Review",
    desc: "A licensed dermatologist reviews your profile within 24-48 hours.",
  },
  {
    title: "Formula Is Crafted",
    desc: "Your formula is compounded specifically for your skin.",
  },
  {
    title: "Shipped To Your Door",
    desc: "Delivered fresh and ready to use, usually within a week.",
  },
  {
    title: "Ongoing Adjustments",
    desc: "We keep tuning it with you, month after month.",
  },
];

const HOW_CARDS = [
  { title: "How Does It Work?", items: HOW_IT_WORKS },
  { title: "How To Get Your Custom Formula?", items: HOW_TO_GET_IT },
];

const ResultPlan = ({ answers }: { answers: AssessmentAnswers }) => {
  const concernLabels = getConcernLabels(answers);
  const concernSummary = joinWithAnd(concernLabels);
  const [openCard, setOpenCard] = useState(0);

  return (
    <section
      id="plan"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,71,99,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,99,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <ContainerLayout
        px
        py={false}
        className="relative mx-auto max-w-6xl text-center"
      >
        <h2 className="font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
          Your skincare routine
        </h2>
        <p className="mt-1 font-aeonik text-2xl leading-tight text-primary sm:text-3xl">
          now made to order
        </p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-3xl bg-[#B5CBC9] p-6 text-left shadow-xl sm:p-10"
        >
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <span className="rounded-full bg-white px-5 py-2.5 text-center text-xs font-semibold text-primary sm:text-sm">
              Your Journey To Visible Results Starts In 6&ndash;8 Weeks
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-2">
              <Image
                src="/assets/logo/logo_dark.svg"
                alt=""
                width={24}
                height={12}
                className="h-auto w-full object-contain"
              />
            </span>
          </div>

          <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-2xl bg-white">
            <Image
              src={PLAN.image}
              alt={PLAN.name}
              width={140}
              height={210}
              className="h-32 w-auto object-contain"
            />
          </div>

          <div className="mt-6 text-center">
            {concernLabels.length > 0 && (
              <p className="text-xs leading-tight font-semibold uppercase tracking-widest text-white/80">
                Curated for {concernSummary}
              </p>
            )}
            <h3 className="mt-1 font-aeonik text-2xl font-bold text-primary sm:text-3xl">
              {PLAN.name}
            </h3>
            <p className="mt-1 text-sm leading-tight text-white/90">{PLAN.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <span className="font-obviously text-2xl font-bold text-white">
                Rs.{PLAN.price}
              </span>
              <span className="text-base text-white/60 line-through">
                Rs.{PLAN.originalPrice}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                Save Rs. {PLAN_SAVINGS}
              </span>
            </div>
            <p className="mt-2 text-xs leading-tight text-white/70">
              All Incl. of taxes. Free Shipping on Both Months
            </p>
          </div>

          {/* Desktop / tablet: both cards fully expanded side by side */}
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2">
            {HOW_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl bg-white p-6">
                <h4 className="font-aeonik text-lg font-bold text-primary">{card.title}</h4>
                <ul className="mt-4 space-y-4">
                  {card.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Droplet
                        size={16}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-primary">
                          {item.title}
                        </span>
                        <span className="block text-xs text-[#525252]">{item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: dropdown accordion, only one card open at a time */}
          <div className="mt-8 flex flex-col gap-4 sm:hidden">
            {HOW_CARDS.map((card, index) => {
              const isOpen = index === openCard;
              return (
                <div key={card.title} className="overflow-hidden rounded-2xl bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenCard(isOpen ? -1 : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left"
                  >
                    <h4 className="font-aeonik text-lg font-bold text-primary">{card.title}</h4>
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      className={`shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-4 px-6 pb-6">
                          {card.items.map((item) => (
                            <li key={item.title} className="flex items-start gap-3">
                              <Droplet
                                size={16}
                                strokeWidth={1.75}
                                className="mt-0.5 shrink-0 text-primary"
                              />
                              <span>
                                <span className="block text-sm font-semibold text-primary">
                                  {item.title}
                                </span>
                                <span className="block text-xs text-[#525252]">
                                  {item.desc}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <Link
              href="/payments"
              className="mx-auto mt-8 block w-fit rounded-full bg-[#7A9490] px-16 py-4 text-center font-obviously text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Purchase Now
            </Link>

            <p className="mt-4 text-center text-xs leading-tight font-semibold uppercase tracking-widest text-white/80">
              3890+ Formulations Delivered In Last 12 Months
            </p>
          </div>
        </motion.div>

        {needsDermReview(answers) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary/20 p-5 text-left"
          >
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-sm leading-tight text-primary">
              Based on your answers, one of our dermatologists will review your
              formula before it&apos;s finalized to make sure it&apos;s safe for
              you.
            </p>
          </motion.div>
        )}
      </ContainerLayout>
    </section>
  );
};

export default ResultPlan;
