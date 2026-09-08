"use client";

import { Star } from "lucide-react";
import { CustomerResults } from "@/components/Constants/CustomerResults";

const UNIQUE_TESTIMONIALS = CustomerResults.filter(
  (t, i, arr) => arr.findIndex((o) => o.name === t.name) === i,
);

const TestimonialFloat = ({ step }: { step: number }) => {
  const testimonial = UNIQUE_TESTIMONIALS[step % UNIQUE_TESTIMONIALS.length];

  return (
    <div className="mt-16 flex items-center justify-center gap-4">
      <div className="max-w-xl rounded-3xl lg:rounded-full bg-linear-to-r from-[#7A949080] to-white px-4 lg:px-8 py-5 text-[12px] text-[#525252] ">
        &ldquo;{testimonial.desc}&rdquo; &mdash;{" "}
        <span className="font-semibold text-primary">{testimonial.name}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 rounded-3xl lg:rounded-full bg-linear-to-br from-[#d8dfe0] to-white p-2 h-20 w-20">
        <img
          src="/assets/common/trustpilot_black.png"
          alt="Trustpilot"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
};

export default TestimonialFloat;
