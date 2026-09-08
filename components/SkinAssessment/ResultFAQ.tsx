"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const FAQS = [
  {
    question: "What Makes Formial Labs Skincare Different From Regular Products?",
    answer:
      "Our formulas are prescription-grade and tailored to your skin after a dermatologist's assessment, unlike generic off-the-shelf products.",
  },
  {
    question: "How Is My Skincare Formula Created?",
    answer:
      "A licensed dermatologist reviews your assessment and compounds a formula matched to your skin type, concerns, and sensitivity.",
  },
  {
    question: "What Skin Concerns Can Formial Labs Help With?",
    answer:
      "Acne, hyperpigmentation, melasma, fine lines, scarring, and general skin maintenance — our formulas adapt to what you're dealing with.",
  },
  {
    question: "Are The Ingredients Safe?",
    answer:
      "Every formula is reviewed by a dermatologist before it's dispensed, and adjusted if you're pregnant, breastfeeding, on medication, or have allergies.",
  },
  {
    question: "When Will I Start Seeing Results?",
    answer: "Most customers notice visible changes within 6–8 weeks of consistent use.",
  },
  {
    question: "Can I Use My Existing Skincare Products With Formial Labs Formulas?",
    answer:
      "Yes, though we recommend sharing your current routine during the assessment so your formula is built around it.",
  },
  {
    question: "Is This A One-Time Product Or A Subscription?",
    answer:
      "Your plan includes two months of formula and support, with the option to continue or adjust after that.",
  },
  {
    question: "What If My Skin Changes Over Time?",
    answer:
      "Your formula evolves with you — every follow-up lets your dermatologist reformulate as your skin's needs change.",
  },
];

const ResultFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <ContainerLayout px py={false} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#B5CBC9] p-6 sm:p-10"
        >
          <h2 className="text-center font-aeonik text-2xl font-bold leading-tight tracking-tighter text-primary sm:text-4xl">
            Everything You Need To Know
          </h2>

          <div className="mt-8 max-w-4xl mx-auto">
            {FAQS.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div key={faq.question} className="border-t border-primary/15 last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-lg font-medium sm:text-xl">
                      {faq.question}
                    </span>
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
                        <p className="pb-5 text-base leading-tight text-white sm:text-lg">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ResultFAQ;
