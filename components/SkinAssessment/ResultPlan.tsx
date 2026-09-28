"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ShieldCheck, Star } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import {
  AssessmentAnswers,
  getConcernLabels,
  joinWithAnd,
  needsDermReview,
  PLAN,
  PLAN_SAVINGS,
} from "./assessmentData";
import CircularText from "../Reusable/CircularText";

const HOW_IT_WORKS = [
  {
    title: "Your First Custom Formula",
    desc: "Our dermatologists build your formula from your skin assessment and ship it within days.",
    icon: "/assets/icons/custom-formula.png",
  },
  {
    title: "Unlimited Dermatologist Support",
    desc: "Message your derm anytime with questions about your routine or results.",
    icon: "/assets/icons/derma-support.png",
  },
  {
    title: "Month 2: Your Formula Evolves",
    desc: "We refine your formula based on how your skin responds in month one.",
    icon: "/assets/icons/formula-evolves.png",
  },
  {
    title: "Free Reformulation",
    desc: "Not loving it? We adjust your formula again at no extra cost.",
    icon: "/assets/icons/reformulation.png",
  },
  {
    title: "Visible Progress",
    desc: "Track changes with guided check-ins built around your timeline.",
    icon: "/assets/icons/track-progress.png",
  },
];

// Must match the icon button's fixed size (h-24/w-24) and the row's gap-5,
// so the active button's calc()'d width never pushes the row past 100%.
const ICON_BOX = 112;
const GAP = 20;

const ResultPlan = ({ answers }: { answers: AssessmentAnswers }) => {
  const concernLabels = getConcernLabels(answers);
  const concernSummary = joinWithAnd(concernLabels);
  const firstName = answers.firstName.trim().split(/\s+/)[0] || "there";
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);

  return (
    <section
      id="plan"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 "
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
       <p className=" text-xl  md:text-2xl text-primary tracking-tighter pb-4 max-w-3xl mx-auto">Hey {firstName}, your personalized formula and skincare plan are created by our dermatology team after reviewing your quiz responses and photos—all through WhatsApp or your dashboard.</p>
        <p className="mt-1 font-aeonik text-lg md:text-xl tracking-tighter font-medium text-primary sm:text-3xl">
          Choose the 2-month plan
and start your skin journey today.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-3xl bg-linear-to-br from-[#7A9490] to-[#E6E6E6] p-6 text-left shadow-xl sm:p-10"
        >
          <div className="flex items-center  justify-end gap-3 ">
            <span className="rounded-full bg-white px-5 py-2.5 text-end text-[11px] font-semibold text-primary sm:text-sm">
              Your Journey To Visible Results Starts In 6&ndash;8 Weeks
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-2 ">
              <Image
                src="/assets/logo/logo_dark.svg"
                alt=""
                width={24}
                height={12}
                className="h-auto w-full object-contain"
              />

            </span>
          </div>

          <div className=" relative">

            <div className="mx-auto mt-18 flex h-40 w-40 items-center justify-center rounded-2xl bg-white relative ">
              <Image
                src={PLAN.image}
                alt={PLAN.name}
                width={140}
                height={210}
                className="h-32 w-auto object-contain"
              />

            </div>

            <div className=" absolute -top-[20%] left-[53%] ">
              <CircularText
                text="MONEY BACK GUARANTEE "
                onHover="pause"
                spinDuration={6}
                className=" text-black"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="mt-1 font-aeonik text-2xl font-bold text-primary sm:text-3xl">
              {PLAN.name}
            </h3>
            <p className="mt-1 leading-tight text-white text-xl font-medium">{PLAN.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <span className=" tracking-tighter text-4xl font-bold text-white">
                Rs.{PLAN.price}
              </span>
              <span className="text-base text-white line-through">
                Rs.{PLAN.originalPrice}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                Save Rs. {PLAN_SAVINGS}
              </span>
            </div>
            <p className="mt-2  leading-tight text-white font-medium text-lg">
              All Incl. of taxes. Free Shipping on Both Months
            </p>
          </div>

          {/* Desktop / tablet: five steps in a row. Inactive icons are a
              fixed size, so the active one's width is computed as exactly
              "whatever's left" (100% minus the 4 fixed icons and gaps) —
              it can never push the row wider than its container. */}
          <div className="my-12 hidden sm:block">
            <h4 className="text-center font-aeonik text-xl font-bold text-primary sm:text-2xl">
              How Does Your Custom Formula Work?
            </h4>

            <div className="mt-8 flex items-center gap-5">
              {HOW_IT_WORKS.map((item, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={item.title}
                    aria-pressed={isActive}
                    style={{
                      width: isActive
                        ? `calc(100% - ${(HOW_IT_WORKS.length - 1) * (ICON_BOX + GAP)}px)`
                        : `${ICON_BOX}px`,
                      height: ICON_BOX,
                    }}
                    className="flex shrink-0 cursor-pointer items-center gap-5 overflow-hidden text-left transition-[width] duration-500 ease-in-out"
                  >
                    <span
                      style={{ width: ICON_BOX, height: ICON_BOX }}
                      className="flex shrink-0 items-center justify-center rounded-2xl bg-white p-6"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={72}
                        height={72}
                        className="h-full w-full object-contain"
                      />
                    </span>

                    <span
                      className="block h-full min-w-0 overflow-hidden whitespace-nowrap transition-opacity duration-300 ease-in-out"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      <span className="flex h-full flex-col justify-center">
                        <span className="line-clamp-1 block font-aeonik text-2xl font-bold whitespace-normal text-primary">
                          {item.title}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-base leading-snug whitespace-normal text-white">
                          {item.desc}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: each step is its own accordion card */}
          <div className="mt-8 sm:hidden">
            <h4 className="text-center font-aeonik text-xl font-bold text-primary">
              How Does Your Custom Formula Work?
            </h4>

            <div className="mt-6 flex flex-col gap-3">
              {HOW_IT_WORKS.map((item, index) => {
                const isOpen = index === openMobile;
                return (
                  <div key={item.title} className="overflow-hidden rounded-2xl bg-[#7A9490]">
                    <button
                      type="button"
                      onClick={() => setOpenMobile(isOpen ? -1 : index)}
                      className="flex w-full cursor-pointer items-center gap-3 p-2 text-left"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white p-2 rounded-lg">
                        <Image
                          src={item.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="flex-1 font-aeonik text-sm font-bold text-white">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        className={`shrink-0 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                          <p className="px-4 pb-4 pl-15 text-xs leading-snug text-white/90">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <Link
              href="/payments"
              className="mx-auto mt-8 block w-fit rounded-full bg-[#7A9490] px-16 py-4 text-center font-obviously text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Purchase Now
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} size={16} strokeWidth={0} className="fill-primary text-primary" />
                ))}
                <span className="relative inline-block" style={{ width: 16, height: 16 }}>
                  <Star
                    size={16}
                    strokeWidth={0}
                    className="absolute inset-0 fill-primary/25 text-primary/25"
                  />
                  <span className="absolute inset-0 overflow-hidden" style={{ width: "55%" }}>
                    <Star size={16} strokeWidth={0} className="fill-primary text-primary" />
                  </span>
                </span>
              </div>
            </div>

            <p className=" text-center text-lg leading-tight font-semibold  tracking-tighter text-primary">
              9/10 people notice visible skin improvements
              within 6–8 weeks.
            </p>
            <p className=" mb-4 text-center text-lg leading-tight font-semibold  tracking-tighter text-primary">
              5,000+ Custom Formulations Delivered
              in the Last Month
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
