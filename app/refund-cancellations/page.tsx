import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "When and how you may be entitled to a refund, replacement, or cancellation for orders, subscriptions, and consultations purchased through Formial.",
  path: "/refund-cancellations",
});

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-aeonik text-lg text-primary sm:text-xl">{children}</h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-4 text-sm font-semibold text-primary">{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 text-sm leading-relaxed text-[#525252]">{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#525252]">
    {children}
  </ul>
);

const RefundCancellationsPage = () => {
  return (
    <ContainerLayout as="main" className="mx-auto max-w-3xl pt-28 pb-20 md:pt-32">
      <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
        Legal
      </span>
      <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        Refund &amp; Cancellation Policy
      </h1>
      <p className="mt-4 text-sm text-[#525252]">
        Formial (a brand of Formadyne Therapeutics Pvt. Ltd.)
        <br />
        Effective Date: April 2026 &nbsp;|&nbsp; Last Updated: August 2026
        <br />
        Applies To: Purchases made via the Formial website, app, and
        affiliated telemedicine platform
      </p>

      <div className="mt-10 space-y-10">
        <div>
          <H2>1. Overview</H2>
          <P>
            This Refund &amp; Cancellation Policy explains when and how you
            may be entitled to a refund, replacement, or cancellation for
            orders, subscriptions, and consultation services purchased
            through Formial. Because Formial dispenses personalized,
            compounded dermatological formulations prepared specifically for
            you after a clinical consultation, this policy differs in
            important ways from a typical retail return policy. Please read
            it carefully before placing an order.
          </P>
          <P>
            By placing an order or subscribing to a Formial plan, you agree
            to the terms set out below, in addition to our Terms &amp;
            Conditions and Privacy Policy.
          </P>
        </div>

        <div>
          <H2>2. Personalized &amp; Compounded Medications</H2>

          <H3>2.1 General Rule &mdash; Non-Returnable and Non-Refundable</H3>
          <P>
            All formulations dispensed by Formial are compounded
            specifically for the individual patient based on their
            consultation, prescription, and treatment plan. As these
            formulations are prepared specifically for an individual
            patient, they generally cannot be returned, restocked, or
            dispensed to another patient once prepared or dispensed.
            Accordingly:
          </P>
          <UL>
            <li>Compounded formulations are non-returnable once shipped, opened, or delivered.</li>
            <li>
              Refunds will not be issued on the basis of personal
              preference, change of mind, slow perceived results, or
              discontinuation of use for reasons unrelated to a genuine
              product or dispensing error.
            </li>
            <li>
              Unopened, unused products cannot be accepted back into
              inventory due to compounding safety and quality-control
              requirements.
            </li>
          </UL>

          <H3>2.2 Exceptions &mdash; When a Refund or Replacement Applies</H3>
          <P>
            You are entitled to a replacement or refund if any of the
            following apply, subject to verification by our clinical and
            quality team:
          </P>
          <UL>
            <li>
              Dispensing error &mdash; you received a formulation, strength,
              or product that does not match what was prescribed to you.
            </li>
            <li>
              Manufacturing/quality defect &mdash; the product is
              contaminated, degraded, or otherwise defective on arrival (not
              attributable to storage or handling after delivery).
            </li>
            <li>Damaged in transit &mdash; the packaging or product was visibly damaged during shipping.</li>
            <li>Order fulfilment error &mdash; you received the wrong item, wrong quantity, or an incomplete order.</li>
          </UL>
          <P>
            To be eligible under any exception above, you must report the
            issue within 48 hours of delivery, with clear photos/videos of
            the product, label, and packaging, through the channels listed
            in Section 5. Claims raised after this window may not be
            eligible for review.
          </P>
        </div>

        <div>
          <H2>3. Subscriptions &amp; Auto-Renewal Billing</H2>

          <H3>3.1 Cancelling a Subscription</H3>
          <P>
            You may cancel your active subscription at any time by
            contacting our support team. Cancellation will stop all future
            subscription renewals and prevent further charges from being
            made. Cancelling a subscription does not, by itself, result in
            a refund of any renewal charge that has already been processed.
          </P>

          <H3>3.2 Refunds for Subscription Charges</H3>
          <P>
            If a subscription renewal charge has already been processed,
            refund eligibility will depend on whether the corresponding
            refill has already entered the fulfilment process:
          </P>
          <UL>
            <li>
              Before fulfilment: If the renewal charge has been processed
              but fulfilment of the corresponding refill has not yet
              commenced, you may be eligible for a full refund.
            </li>
            <li>
              After fulfilment has commenced: If fulfilment of the
              corresponding refill has already commenced, the charge for
              that cycle is generally non-refundable, in accordance with
              Section 2. Future subscription renewals will nevertheless be
              cancelled.
            </li>
            <li>
              Billing or system errors: Accidental, duplicate, or otherwise
              erroneous charges caused by a billing or system error will be
              refunded once verified.
            </li>
          </UL>

          <H3>3.3 Auto-Renewal Reminders</H3>
          <P>
            Formial sends a reminder in advance of each auto-renewal charge.
            It is your responsibility to update or cancel your subscription
            before the renewal date if you no longer wish to continue
            treatment.
          </P>
        </div>

        <div>
          <H2>4. Shipping Issues, Damage &amp; Wrong Items</H2>
          <UL>
            <li>
              Lost in transit: If tracking shows no movement for an extended
              period or the courier confirms loss, you are eligible for a
              free replacement.
            </li>
            <li>Damaged on arrival: Report within 48 hours with photo/video evidence for a free replacement.</li>
            <li>
              Wrong item received: Report within 48 hours; Formial will
              arrange a correct replacement at no additional cost, and,
              where a replacement is not possible, a refund.
            </li>
            <li>
              Delayed delivery alone (without loss or damage) does not
              qualify for a refund, though we will proactively communicate
              significant delays.
            </li>
          </UL>
        </div>

        <div>
          <H2>5. How to Request a Refund or Replacement</H2>
          <P>
            To raise a request, please contact our support team with your
            order ID, a description of the issue, and supporting
            photos/videos where applicable:
          </P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <p>
              <span className="font-semibold text-primary">Email:</span>{" "}
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </p>
            <p>
              <span className="font-semibold text-primary">WhatsApp:</span>{" "}
              <a href="tel:+917411821717" className="font-semibold text-primary underline">
                +91 74118 21717
              </a>
            </p>
            <p>
              <span className="font-semibold text-primary">Support Hours:</span> 9AM &ndash; 9PM,
              Monday&ndash;Saturday
            </p>
          </div>
          <P>
            Our team will acknowledge your request within 24 hours and,
            where clinical review is needed, may involve our pharmacist or
            prescribing clinician before a decision is issued.
          </P>
        </div>

        <div>
          <H2>6. Refund Processing &amp; Timelines</H2>
          <UL>
            <li>Approved refunds are issued to the original payment method used at checkout.</li>
            <li>
              Refunds are typically processed within 7&ndash;10 business
              days of approval; actual credit timing may depend on your
              bank or payment provider.
            </li>
          </UL>
        </div>

        <div>
          <H2>7. Non-Refundable Circumstances</H2>
          <P>
            In addition to the general rule in Section 2, the following are
            not eligible for refund:
          </P>
          <UL>
            <li>Change of mind after a compounded product has been prepared or dispensed.</li>
            <li>
              Dissatisfaction with clinical outcomes where the product was
              correctly compounded and dispensed as prescribed.
            </li>
            <li>Products damaged due to improper storage, handling, or use after delivery.</li>
            <li>Requests raised outside the applicable reporting window set out in this policy.</li>
            <li>Promotional, discounted, or complimentary items provided at no charge.</li>
          </UL>
        </div>

        <div>
          <H2>8. Changes to This Policy</H2>
          <P>
            Formial may update this Refund &amp; Cancellation Policy from
            time to time to reflect changes in regulation, operations, or
            our services. The updated policy will be posted with a revised
            &ldquo;Last Updated&rdquo; date and will apply to orders placed
            after that date.
          </P>
        </div>

        <div>
          <H2>9. Contact Us</H2>
          <P>
            If you have questions about this policy or an existing order,
            please reach out to our support team using the details in
            Section 5, or write to us at:
          </P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <p className="font-semibold text-primary">
              Company: Formadyne Therapeutics Pvt. Ltd. (Formial Labs)
            </p>
            <p>Registered Address: No. 181, K. B. A. R Road, Austin Town, Bengaluru, Karnataka, India</p>
            <p>
              Email:{" "}
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-primary/10 pt-6 text-xs text-[#525252]">
        <p>
          Formial Labs Private Limited &nbsp;|&nbsp; www.formial.in
          &nbsp;|&nbsp; Bengaluru, India &nbsp;|&nbsp;{" "}
          <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
            care@formial.in
          </a>
        </p>
      </div>
    </ContainerLayout>
  );
};

export default RefundCancellationsPage;
