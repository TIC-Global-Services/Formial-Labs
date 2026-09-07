"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerLayout from "../Reusable/ContainerLayout";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADING = "Global expertise brought to India";

const PARAGRAPH =
  "We Bring World-Class Dermatological Expertise To India With A Personalised Approach That Evolves With You. Because Your Skin Is Never Static, Neither Should Your Formula Be. We Continuously Refine, Rebuild, And Rebalance Your Treatment Based On How Your Skin Changes, With Every Fresh Formula Prepared In The Lab To Meet What Your Skin Needs Next.";

const words = PARAGRAPH.split(" ");

const GlobalExpertise = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!paragraphRef.current) return;
      const wordEls =
        paragraphRef.current.querySelectorAll<HTMLSpanElement>(".reveal-word");

      gsap.to(wordEls, {
        color: "#141414",
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full items-center bg-white py-20 lg:py-32"
    >
      <ContainerLayout className="w-full">
        <h2 className="font-aeonik text-4xl leading-tight tracking-tighter text-primary sm:text-6xl lg:text-7xl">
          {HEADING}
        </h2>
        <p
          ref={paragraphRef}
          className="mt-10 max-w-5xl text-xl leading-snug font-medium sm:text-2xl lg:text-4xl"
        >
          {words.map((word, i) => (
            <span key={i} className="reveal-word text-[#d5d9dc]">
              {word}{" "}
            </span>
          ))}
        </p>
      </ContainerLayout>
    </section>
  );
};

export default GlobalExpertise;
