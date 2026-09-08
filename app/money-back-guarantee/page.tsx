import Link from "next/link";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Money Back Guarantee",
  description:
    "Every full-price 3-month treatment plan at Formial Labs comes with a simple promise: if you don't see visible improvements, we'll give you your money back.",
  path: "/money-back-guarantee",
});

const STEPS = [
  {
    title: "Complete your 3-month treatment as prescribed.",
  },
  {
    title: "Stay engaged.",
    desc: "Share your skin updates and check-ins with our team.",
  },
  {
    title: "Raise a request if there's no visible change.",
    desc: "Within 15 days of finishing your plan.",
  },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-aeonik text-lg text-primary sm:text-xl">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 text-sm leading-relaxed text-[#525252]">{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#525252]">
    {children}
  </ul>
);

const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-[#525252]">
    {children}
  </ol>
);

const MoneyBackGuaranteePage = () => {
  return (
    <main>
      {/* Our promise — marketing intro */}
      <section className="bg-brand-gradient pt-28 pb-16 md:pt-32 lg:py-24">
        <ContainerLayout px py={false} className="mx-auto max-w-3xl text-center">
          <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
            Our Promise
          </span>
          <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
            Money Back Guarantee
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#525252]">
            We believe in the power of personalized dermatology. That&apos;s
            why every full-price 3-month treatment plan at Formial Labs
            comes with a simple promise: if you don&apos;t see visible
            improvements in your skin, we&apos;ll give you your money back.
          </p>

          <div className="mt-12 rounded-3xl bg-[#B5CBC9] p-6 text-left sm:p-10">
            <h2 className="text-center font-aeonik text-xl font-bold text-primary sm:text-2xl">
              How It Works
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="rounded-2xl bg-white p-6 text-left">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-obviously text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-sm font-semibold text-primary">{step.title}</p>
                  {step.desc && <p className="mt-1 text-sm text-[#525252]">{step.desc}</p>}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-primary/80">
              Our clinical team will carefully review your journey and, if
              all conditions are met, your refund will be processed.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="font-aeonik text-lg text-primary">A Fair Promise</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#525252]">
              This guarantee is for customers who give their treatment an
              honest try. If you&apos;ve been consistent and fully engaged
              but still don&apos;t see results, we&apos;ll stand by you
              &mdash; no questions asked.
            </p>
          </div>
        </ContainerLayout>
      </section>

      {/* Full terms & conditions */}
      <ContainerLayout as="section" className="mx-auto max-w-3xl py-16 md:py-20">
        <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
          Legal
        </span>
        <h2 className="mt-3 font-aeonik text-2xl leading-tight tracking-tighter text-primary sm:text-4xl">
          Money Back Guarantee &mdash; Terms &amp; Conditions
        </h2>
        <P>
          At Formial Labs, we are committed to delivering visible
          improvements in your skin health with our personalized
          dermatology-led treatments. We understand that everyone&apos;s
          skin responds differently, and in rare cases where expected
          results are not seen despite consistent engagement with your
          prescribed regimen, we offer a Money Back Guarantee.
        </P>
        <P>
          If no visible results* are seen after completing the defined
          eligibility period, you may apply for a refund by following the
          steps below.
        </P>
        <p className="mt-2 text-xs leading-relaxed text-[#525252] italic">
          *Results are defined as visible changes in your primary skin
          concern (e.g., reduction in acne breakouts, improvement in
          hyperpigmentation, softening of scars, or reduction in signs of
          aging) as assessed from your initial consultation and treatment
          goals.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <H2>Eligibility Criteria</H2>
            <P>To be eligible for the Money Back Guarantee, you must have:</P>
            <OL>
              <li>
                Purchased a full-price treatment plan or subscription
                directly from the Formial Labs website or app.
              </li>
              <li>Completed a minimum of 3 months of continuous treatment as prescribed by our dermatology team.</li>
              <li>Adhered to the prescribed regimen consistently during the 3-month period.</li>
              <li>
                Shared at least 3&ndash;4 clear, dated facial images (front,
                left, and right profiles) across the duration of treatment
                when we have reached out to you.
              </li>
              <li>Completed at least 2 check-ins each month with our clinical support team during the treatment period.</li>
              <li>Raised a money-back request within 15 days of completing the 3-month eligibility period.</li>
            </OL>
          </div>

          <div>
            <H2>Exclusions</H2>
            <P>You may not be eligible for the Money Back Guarantee if:</P>
            <UL>
              <li>You did not follow the prescribed treatment plan consistently.</li>
              <li>You failed to share progress updates or photographs as requested.</li>
              <li>You discontinued or irregularly used the treatment.</li>
              <li>
                You have pre-existing or concurrent skin/medical conditions
                (e.g., uncontrolled hormonal disorders, systemic illnesses,
                or medications that interfere with skin response) that
                impact treatment outcomes.
              </li>
              <li>You purchased products during promotions, discounts, or trial packs.</li>
            </UL>
          </div>

          <div>
            <H2>How to Apply</H2>
            <P>To request a refund, you must:</P>
            <UL>
              <li>
                Email us at{" "}
                <a href="mailto:help@formial.in" className="font-semibold text-primary underline">
                  help@formial.in
                </a>{" "}
                with your latest order number and registered details.
              </li>
            </UL>
            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-widest text-primary/50">
              OR
            </p>
            <UL>
              <li>
                Raise a ticket under &ldquo;Money Back Guarantee&rdquo; from
                the Help &amp; Support section of your Formial Labs chat.
              </li>
            </UL>
          </div>

          <div>
            <H2>Refund Process</H2>
            <OL>
              <li>Once your request is raised, our team will verify whether all eligibility conditions have been met.</li>
              <li>If eligible, our expert dermatology clinical team will review your treatment journey and progress.</li>
              <li>A final decision will be made after a consultation call with the assigned dermatologist.</li>
              <li>The decision of the clinical team will be final and binding.</li>
            </OL>
          </div>

          <div>
            <H2>Important Notes</H2>
            <UL>
              <li>
                The Money Back Guarantee applies only to the defined
                3-month eligibility period of your treatment plan. It does
                not cover future results or changes beyond this period.
              </li>
              <li>
                Refunds, if approved, will be processed to the original mode
                of payment within 14 working days.
              </li>
              <li>
                This policy is meant to provide fairness to genuinely
                compliant customers while maintaining accountability in
                treatment adherence.
              </li>
            </UL>
          </div>
        </div>

        <p className="mt-10 text-xs text-[#525252]">
          Questions about this guarantee? Reach us at{" "}
          <a href="mailto:help@formial.in" className="font-semibold text-primary underline">
            help@formial.in
          </a>
          , or see our{" "}
          <Link href="/refund-cancellations" className="font-semibold text-primary underline">
            Refund &amp; Cancellation Policy
          </Link>
          .
        </p>
      </ContainerLayout>
    </main>
  );
};

export default MoneyBackGuaranteePage;
