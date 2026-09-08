"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Review = { name: string; quote: string; initials: string };

const LEFT_REVIEWS: Review[] = [
  {
    name: "Michael Chen",
    quote:
      "I had tried so many products without really understanding what my skin needed. Formial made the process simple, and my routine finally feels intentional.",
    initials: "MC",
  },
  {
    name: "Priya Nair",
    quote:
      "The dermatologist consult actually felt personal — not a generic quiz. Three months in and my skin has never been calmer.",
    initials: "PN",
  },
];

const RIGHT_REVIEWS: Review[] = [
  {
    name: "Arjun Verma",
    quote:
      "My acne marks faded faster than anything I'd tried before. Having an actual derm behind the formula makes a real difference.",
    initials: "AV",
  },
  {
    name: "Sneha Kapoor",
    quote:
      "Simple routine, real results. The reformulation after month one showed they were actually paying attention to my skin.",
    initials: "SK",
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="w-[280px] rounded-2xl border-t border-b border-white/80 bg-white/40 p-6 shadow-[inset_-1px_-1px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-md sm:w-[340px]">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} strokeWidth={0} className="fill-amber-400" />
      ))}
    </div>
    <p className="mt-4 text-sm leading-tight text-primary sm:text-base">
      &ldquo;{review.quote}&rdquo;
    </p>
    <div className="mt-5 flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-obviously text-xs font-bold text-white">
        {review.initials}
      </span>
      <span className="font-obviously text-xs font-bold uppercase tracking-wide text-primary sm:text-sm">
        {review.name}
      </span>
    </div>
  </div>
);

const ResultReviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      const staggerDelay = isMobile ? 0.8 : 0.7;
      const startY = isMobile ? "90vh" : "110vh";
      const endY = isMobile ? "-90vh" : "-110vh";

      const leftCards = gsap.utils.toArray<HTMLElement>(".review-card-left");
      const rightCards = gsap.utils.toArray<HTMLElement>(".review-card-right");

      gsap.set(leftCards, { y: startY });
      gsap.set(rightCards, { y: startY });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=3000" : "+=4500",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      const pairCount = Math.max(leftCards.length, rightCards.length);
      for (let i = 0; i < pairCount; i++) {
        const delay = i * staggerDelay;
        if (leftCards[i]) {
          tl.to(leftCards[i], { y: endY, duration: 2.2, ease: "none" }, delay);
        }
        if (rightCards[i]) {
          tl.to(rightCards[i], { y: endY, duration: 2.2, ease: "none" }, delay);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative z-20 isolate h-screen w-full overflow-hidden bg-white select-none"
      >
        <div className="absolute inset-0 z-0 flex flex-col gap-6 items-center justify-center px-4 text-center">
          <h2 className="font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-6xl lg:text-7xl">
            Experiences
            <br />
            That Speak for Themselves
          </h2>
          <div className="flex flex-col  items-center justify-center gap-3 text-left sm:flex-row sm:gap-4">
            <Image
              src="/assets/common/trustpilot_black.png"
              alt="Trustpilot"
              width={160}
              height={32}
              className="h-6 w-auto object-contain sm:h-7"
            />
            <span className="hidden h-8 w-px bg-primary/20 sm:block" />
            <p className="text-base leading-tight text-[#525252] sm:text-lg max-w-xs">
              <span className="font-bold text-primary">4.7</span> Stars from
              Verified Reviews
              <br className="sm:hidden" /> That Speak for Themselves
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full justify-between px-2 sm:px-6">
          <div className="relative h-full w-1/2">
            {LEFT_REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="review-card-left absolute inset-0 -mt-[30vh] flex items-center justify-start pl-2 sm:pl-6 lg:-mt-[20vh] lg:justify-end lg:pr-10 lg:pl-0"
                style={{ zIndex: i }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <div className="relative h-full w-1/2">
            {RIGHT_REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="review-card-right absolute inset-0 mt-[30vh] flex items-center justify-end pr-2 sm:pr-6 lg:mt-[20vh] lg:justify-start lg:pr-0 lg:pl-10"
                style={{ zIndex: i }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResultReviews;
