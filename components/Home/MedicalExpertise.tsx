"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerLayout from "../Reusable/ContainerLayout";
import { Ipad } from "../Reusable/Ipad";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MedicalExpertise = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const tabletRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!tabletRef.current || !contentRef.current) return;

      gsap.set(tabletRef.current, {
        opacity: 0,
        y: 260,
        rotate: -22,
        rotateX: 40,
        transformPerspective: 900,
        transformOrigin: "10% 100%",
      });
      gsap.set(contentRef.current, { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tabletRef.current,
          start: "top 95%",
          end: "top 15%",
          scrub: 0.8,
        },
      });

      tl.to(tabletRef.current, {
        opacity: 1,
        y: 0,
        rotate: 0,
        rotateX: 0,
        ease: "power2.out",
        duration: 0.7,
      }).to(
        contentRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: "power1.out",
          duration: 0.4,
        },
        "<0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-16 lg:min-h-screen"
    >
      <ContainerLayout className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="mx-auto w-full perspective-[900px] sm:max-w-md md:max-w-xl lg:max-w-7xl">
          <div ref={tabletRef} className="relative w-full">
            <Ipad width={520} height={400} className="h-auto w-full" />
            <div
              ref={contentRef}
              className="absolute top-[7.1%] right-[6.03%] bottom-[7.15%] left-[6.03%] overflow-hidden rounded-2xl"
            >
              <Image
                src="/assets/home/tab-image.png"
                alt="Medical Expertise"
                fill
                sizes="(min-width: 1024px) 1000px, (min-width: 640px) 700px, 500px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 px-[6%] pb-[8%] text-center">
                <div>
                  <p className="font-aeonik text-[3vw] leading-tight text-white/90 sm:text-lg lg:text-4xl">
                    Skincare Guided by
                  </p>
                  <h2 className="font-aeonik text-[6vw] leading-tight tracking-tighter text-white sm:text-4xl lg:text-6xl">
                    Medical Expertise
                  </h2>
                </div>
                <p className=" max-w-lg text-[2.2vw] text-white leading-tight sm:text-sm lg:text-lg">
                  Every formulation is guided by experienced professionals,
                  combining clinical expertise with a personalized approach to
                  your skin.
                </p>
                <a
                  href="#"
                  className="mt-2 font-obviously text-[1.8vw] font-medium uppercase  text-white sm:text-xs lg:text-sm hover:text-[#b5e7ff] transform transition duration-300"
                >
                  + Explore Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default MedicalExpertise;
