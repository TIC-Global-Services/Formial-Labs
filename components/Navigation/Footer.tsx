"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import ContainerLayout from "../Reusable/ContainerLayout";
import { FooterLinks } from "./constants/links";

const socialIcons: Record<string, IconType> = {
  Twitter: FaXTwitter,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
};

const wordmarkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const wordmarkSrc = "/assets/logo/logo_wordmark.png";
const textMain = "text-primary";
const textMuted = "text-primary/70";
const textSubtle = "text-primary/50";
const borderColor = "border-primary/20";
const featurePolicyText = "text-primary md:text-primary/70";

const Footer = () => {
  const year = new Date().getFullYear();
  const phone = FooterLinks.Contact.find((item) => item.name === "Phone");

  return (
    <footer className="bg-linear-to-b from-white to-[#B5CBC9]">
      <div>
        <ContainerLayout py={false} className="flex items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={wordmarkVariants}
            className="w-full max-w-6xl"
          >
            <Image
              src={wordmarkSrc}
              alt="Formial Labs"
              width={4020}
              height={579}
              className="h-auto w-full py-10 "
            />
          </motion.div>
        </ContainerLayout>
      </div>

      <ContainerLayout pt={false} >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
          className={`grid grid-cols-2  gap-y-10 border-t ${borderColor} ${textMain} text-center sm:text-left sm:gap-x-8 lg:grid-cols-4 lg:gap-10 py-6`}
        >
          {/* Features */}
          <motion.div
            variants={columnVariants}
            className={`order-1 border-b border-r ${borderColor} pb-6 pr-6 lg:order-0 lg:col-start-2 lg:row-start-1 lg:border-0 lg:pb-0 lg:pr-0`}
          >
            <h3 className={`mb-4 font-obviously text-lg uppercase tracking-wide ${featurePolicyText}`}>
              Features
            </h3>
            <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-6 md:flex-row md:gap-10">
              <ul className={`space-y-2 ${featurePolicyText}`}>
                {FooterLinks.Features.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className={`space-y-2 ${featurePolicyText}`}>
                {FooterLinks.Features.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Policies */}
          <motion.div
            variants={columnVariants}
            className={`order-2 border-b ${borderColor} pb-6 pl-6 lg:order-0 lg:col-start-4 lg:row-start-1 lg:border-0 lg:pb-0 lg:pl-0`}
          >
            <h3 className={`mb-4 font-obviously text-lg uppercase tracking-wide ${featurePolicyText}`}>
              Policies
            </h3>
            <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-6 md:flex-row md:gap-10">
              <ul className={`space-y-2 ${featurePolicyText}`}>
                {FooterLinks.Policies.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className={`space-y-2 ${featurePolicyText}`}>
                {FooterLinks.Policies.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-opacity hover:opacity-70">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            variants={columnVariants}
            className="order-3 col-span-2 sm:col-span-1 lg:order-0 lg:col-start-3 lg:row-start-1"
          >
            <h3 className="mb-4 font-obviously text-lg uppercase tracking-wide">
              Connect
            </h3>
            <p className={`mb-4 ${textMuted}`}>
              Day or night, we love to hear you talk!
            </p>
            <div className="mb-4 flex justify-center gap-3 sm:justify-start">
              {FooterLinks.Socials.map((social) => {
                const Icon = socialIcons[social.name];
                if (!Icon) return null;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition-opacity hover:opacity-80"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            {phone && (
              <a
                href={phone.href}
                className={`${textMain} transition-opacity hover:opacity-70`}
              >
                {phone.value}
              </a>
            )}
          </motion.div>

          {/* Tagline / Copyright / Designed by */}
          <motion.div
            variants={columnVariants}
            className="order-4 col-span-2 flex flex-col items-center gap-4 sm:col-span-1 sm:items-start lg:order-0 lg:col-start-1"
          >
            <p className={`order-1 sm:order-2 text-lg leading-relaxed ${textMain}`}>
              India&apos;s first
              <br />
              custom-made prescription
              <br />
              skincare brand
            </p>
            <p className={`order-2 sm:order-1 ${textMuted}`}>
              &copy; {year} <span className={`font-semibold ${textMain}`}>Formial Labs</span>.
              All Rights Reserved.
            </p>
            <p className={`order-3 text-sm ${textSubtle}`}>
              Designed &amp; Developed by{" "}
              <Link href="https://theinternetcompany.one" className="hover:underline">
                TIC Global Services
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </ContainerLayout>
    </footer>
  );
};

export default Footer;
