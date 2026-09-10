"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Maximize2, ChevronsRight } from "lucide-react";
import ContainerLayout from "@/components/Reusable/ContainerLayout";

const INFO = [
  {
    label: "Address",
    lines: ["Formial Healthcare Pvt. Ltd.", "Chennai, India."],
  },
  {
    label: "Hours",
    lines: ["Monday – Friday", "9:00 AM – 6:00 PM IST"],
  },
  {
    label: "E-Mail",
    lines: ["hello@formialskincare.in"],
  },
];

const MAP_QUERY = "Chennai, India";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const inputClass =
  "w-full border-b border-white/30 bg-transparent py-2 text-lg text-white placeholder:text-white/70 outline-none transition-colors duration-200 ease-in-out focus:border-white/70";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-brand-gradient w-full">
      <ContainerLayout pt={false} className="pt-24 md:pt-28">
        <div className="flex flex-col gap-6 lg:gap-10 lg:flex-row lg:items-center lg:justify-center">
          <h1 className="font-aeonik text-5xl leading-14 text-right tracking-tighter text-primary sm:text-6xl lg:text-7xl">
            Let&apos;s start
            <br />
            a conversation
          </h1>

          <div className="flex flex-col gap-6 rounded-3xl border border-black/40  p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-black/40 ">
            {INFO.map((item) => (
              <div key={item.label} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <p className="font-aeonik text-xl text-primary">{item.label}</p>
                {item.lines.map((line) => (
                  <p key={line} className="text-base text-primary/70">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 pb-20 lg:grid-cols-2 lg:pb-28">
          <div className="relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#4d5f61] to-[#E6E6E6] p-8 sm:p-10">
            <div>
              <h2 className="font-aeonik text-2xl text-white sm:text-3xl">
                Have a Question?
                <br />
                We&apos;d Love to Hear From You.
              </h2>

              {submitted ? (
                <p className="mt-10 text-base text-white/90">
                  Thanks for reaching out — we&apos;ll get back to you shortly.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <input type="text" required placeholder="First Name" className={inputClass} />
                  <input type="tel" placeholder="Phone Number" className={inputClass} />
                  <input type="text" required placeholder="Last Name" className={inputClass} />
                  <textarea
                    placeholder="Message"
                    rows={3}
                    className={`${inputClass} resize-none sm:row-span-2`}
                  />
                  <input type="email" required placeholder="Email Address" className={inputClass} />

                  <button
                    type="submit"
                    className="mt-4 flex w-fit items-center gap-3 self-start rounded-full border-t border-b border-white/80 bg-white/10 py-1.5 pr-6 pl-1.5 cursor-pointer text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/20 sm:col-span-2 sm:mt-6 sm:ml-auto"
                  >
                    <Image
                      src="/assets/common/button-bottle.png"
                      alt=""
                      width={80}
                      height={80}
                      className="h-10 w-10 shrink-0 rounded-full"
                    />
                    <span className="font-obviously text-xs font-bold uppercase text-primary tracking-wide">
                      Send Message
                    </span>
                    <ChevronsRight className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-3xl border border-primary/10 lg:min-h-0">
            <iframe
              title="Formial Labs location"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Google Maps"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm backdrop-blur-sm transition-colors duration-200 ease-in-out hover:bg-white"
            >
              <Maximize2 className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default ContactSection;
