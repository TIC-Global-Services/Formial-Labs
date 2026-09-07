"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import ContainerLayout from "../Reusable/ContainerLayout";

const doctors = [
  {
    name: "Dr. Jeet Patel",
    title: "Founder, Formial Labs - MBBS MRCGP (UK)",
    subtitle: "FRACGP (Aus) MMed (Skin Cancer)",
    image: "/assets/team/dr-jeet.png",
    bio: "Dr. Jeet Patel is a visionary in dermatology, dedicated to revolutionizing skincare through cutting-edge technology and personalized treatments. He completed his undergraduate medical training at the prestigious Christian Medical College, Vellore and post graduate training in England. With a Master's degree specializing in skin cancer from the University of Queensland in Australia, he combines scientific expertise with innovation to create bespoke skincare solutions for common skin conditions.",
    socials: [
      { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
      { Icon: FaFacebookF, href: "#", label: "Facebook" },
      { Icon: FaXTwitter, href: "#", label: "X" },
    ] as { Icon: IconType; href: string; label: string }[],
  },
  {
    name: "Vidha Saad",
    title: "Pharmacist & Formulation Expert",
    subtitle: "",
    image: "/assets/team/dr-jeet.png",
    bio: "Vidha Saad is a dedicated pharmacist at Formial Labs, specializing in personalized skincare formulations. With a deep understanding of pharmaceutical science, he plays a key role in developing high-quality, effective skincare solutions tailored to individual needs.",
    socials: [
      { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
      { Icon: FaFacebookF, href: "#", label: "Facebook" },
      { Icon: FaXTwitter, href: "#", label: "X" },
    ] as { Icon: IconType; href: string; label: string }[],
  },
  {
    name: "Dr. Neha Fogla",
    title: "MD Dermatologist & Research Enthusiast",
    subtitle: "Reg No. 2021054683",
    image: "/assets/team/dr-jeet.png",
    bio: "Dr. Neha Fogla is a skilled dermatologist with a strong academic and clinical background, dedicated to advancing dermatological research and innovative treatments. With multiple publications in national and international journals and contributions to dermatology book chapters, she brings a research-driven approach to patient care.",
    socials: [
      { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
      { Icon: FaFacebookF, href: "#", label: "Facebook" },
      { Icon: FaXTwitter, href: "#", label: "X" },
    ] as { Icon: IconType; href: string; label: string }[],
  },
  {
    name: "Dr. Tanumay Raychaudhury",
    title: "Consultant Dermatologist & Advisor",
    subtitle: "",
    image: "/assets/team/dr-jeet.png",
    bio: "Dr. Tanumay Raychaudhury is a leading consultant dermatologist in Sydney, Australia and the Principal Dermatologist at Blacktown Dermatology. With extensive experience in clinical practice, research, and education, he has served as a consultant at the Skin and Cancer Foundation, Westmead and Darlinghurst, and is faculty at Westmead Clinical School under The University of Sydney. He also teaches for Dermatology Australasia, the GP training arm of the Australasian College of Dermatologists.",
    socials: [
      { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
      { Icon: FaFacebookF, href: "#", label: "Facebook" },
      { Icon: FaXTwitter, href: "#", label: "X" },
    ] as { Icon: IconType; href: string; label: string }[],
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 48 : -48 }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -48 : 48,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const TeamSpotlight = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const doctor = doctors[activeIndex];

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % doctors.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };
  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* decorative grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #E5E7EB 0, #E5E7EB 1px, transparent 1px, transparent 20%), repeating-linear-gradient(to bottom, #E5E7EB 0, #E5E7EB 1px, transparent 1px, transparent 25%)",
        }}
      />

      <ContainerLayout className="relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          variants={headingVariants}
          className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start md:justify-between lg:text-left mx-auto"
        >
          <h2 className="font-aeonik text-4xl leading-tight tracking-tighter  text-primary sm:text-5xl">
            The Visionaries
            <br />
            Behind Our Team
          </h2>

          <div className="max-w-2xl lg:text-right">
            <p className="text-base leading-relaxed text-black sm:text-lg">
              Behind our mission is a whole team of Derma-Coaches,
              dermatologists, lab experts and researchers armed with degrees and
              a slightly obsessive commitment to results.
            </p>
            <Link
              href="/solutions"
              className="mt-6 hidden rounded-full bg-[url('/assets/common/button-bg.png')] bg-cover bg-center px-8 py-3 font-obviously text-xs font-bold tracking-wide text-primary uppercase shadow-md transition-transform duration-300 hover:scale-105 md:inline-block "
            >
              Let&rsquo;s Start With A DocTalk
            </Link>
          </div>
        </motion.div> 

        <div className="relative mt-16 lg:mt-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={cardVariants}
              className="relative flex flex-col gap-6 md:flex-row md:items-stretch"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-gray-200 sm:aspect-1/1 md:aspect-square md:w-[34%]">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(min-width: 768px) 34vw, 100vw"
                  className="object-cover pt-6"
                />
              </div>

              <div className="relative md:w-[58%] lg:w-[60%]">
                <div className="flex h-full flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#7A9490] to-[#E6E6E6] p-6 md:p-8">
                  <div>
                    <h3 className="font-aeonik text-3xl text-white sm:text-4xl lg:text-5xl">
                      {doctor.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/90 sm:text-base lg:text-xl">
                      {doctor.title}
                      <br />
                      {doctor.subtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      {doctor.socials.map(({ Icon, href, label }) => (
                        <Link
                          key={label}
                          href={href}
                          aria-label={label}
                          className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-primary transition-colors duration-300 hover:bg-white/80"
                        >
                          <Icon size={16} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="relative w-full rounded-3xl bg-white p-6">
                    <p className="text-sm leading-relaxed text-[#333] sm:text-base lg:text-lg">
                      {doctor.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tablet / desktop: nav arrows */}
              {doctors.length > 1 && (
                <div className="absolute top-0 right-0 hidden flex-col gap-3 md:flex">
                  <motion.button
                    type="button"
                    aria-label="Next doctor"
                    onClick={goNext}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="cursor-pointer rounded-2xl bg-[#E6E6E6] p-3 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
                  >
                    <ChevronsRight size={20} />
                  </motion.button>
                  <motion.button
                    type="button"
                    aria-label="Previous doctor"
                    onClick={goPrev}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="cursor-pointer rounded-2xl bg-[#E6E6E6] p-3 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
                  >
                    <ChevronsLeft size={20} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: pagination + CTA */}
        <div className="mt-16 flex flex-col items-center gap-6 md:hidden">
          {doctors.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to doctor ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full bg-primary transition-all duration-300 ${
                    index === activeIndex
                      ? "w-10 opacity-100"
                      : "w-4 opacity-30"
                  }`}
                />
              ))}
            </div>
          )}

          <Link
            href="/solutions"
            className="inline-block rounded-full bg-[url('/assets/common/button-bg.png')] bg-cover bg-center px-8 py-3 font-obviously text-xs font-bold tracking-wide text-primary uppercase shadow-md transition-transform duration-300 hover:scale-105"
          >
            Let&rsquo;s Start With A DocTalk
          </Link>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default TeamSpotlight;
