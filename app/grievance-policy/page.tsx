import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grievance Redressal Policy",
  description:
    "How consumers of Formial Labs may raise, track, and resolve grievances relating to goods and services purchased or accessed via formial.in.",
  path: "/grievance-policy",
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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <p>
    <span className="font-semibold text-primary">{label}:</span> {children}
  </p>
);

const GrievancePolicyPage = () => {
  return (
    <ContainerLayout as="main" className="mx-auto max-w-3xl pt-28 pb-20 md:pt-32">
      <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
        Legal
      </span>
      <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        Grievance Redressal Policy
      </h1>
      <p className="mt-4 text-sm text-[#525252]">
        formial.in &mdash; Prescription Skincare Telemedicine Platform
        <br />
        Effective Date: December 2025 &nbsp;|&nbsp; Last Reviewed: June 2026
      </p>

      <div className="mt-10 space-y-10">
        <div>
          <H2>1. Company Details</H2>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <Field label="Legal Entity Name">Formial Labs Private Limited</Field>
            <Field label="Website">www.formial.in</Field>
            <Field label="Platform Description">
              Telemedicine &amp; Prescription Skincare E-Commerce Platform
            </Field>
            <Field label="Registered Office">
              No 181, K.B.A.R Road, Austin town, Bengaluru, Karnataka, India
            </Field>
            <Field label="Corporate Office">
              No 181, K.B.A.R Road, Austin town, Bengaluru, Karnataka, India
            </Field>
            <Field label="Customer Support Email">
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </Field>
          </div>
        </div>

        <div>
          <H2>2. Purpose of This Policy</H2>
          <P>
            This Grievance Redressal Policy (the &ldquo;Policy&rdquo;) sets
            out the mechanism through which consumers of Formadyne
            Therapeutics Pvt Ltd (&ldquo;Formial Labs&rdquo;,
            &ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;) may raise,
            track, and resolve grievances pertaining to goods and services
            purchased or accessed via www.formial.in (the
            &ldquo;Platform&rdquo;).
          </P>
          <P>
            The Policy is framed in compliance with the Consumer Protection
            Act, 2019, the Consumer Protection (E-Commerce) Rules, 2020, and
            the Telemedicine Practice Guidelines, 2020 issued by the Board
            of Governors of the Medical Council of India.
          </P>
          <P>
            Formial Labs is committed to ensuring that every consumer is
            treated fairly, courteously, and that all complaints are
            addressed promptly, transparently, and in a time-bound manner.
          </P>
        </div>

        <div>
          <H2>3. Scope and Applicability</H2>
          <P>This Policy applies to all consumers who:</P>
          <UL>
            <li>
              Access or use the Platform to purchase prescription skincare
              products, dermatology consultations, or any related services;
            </li>
            <li>
              Interact with Formial Labs&apos; registered medical
              practitioners via telemedicine channels;
            </li>
            <li>Avail pharmacy dispensing services facilitated through the Platform.</li>
          </UL>
          <P>
            For the purposes of this Policy, a &ldquo;Consumer&rdquo; means
            any individual who purchases or seeks to purchase goods or
            services through the Platform for personal use.
          </P>
        </div>

        <div>
          <H2>4. Definition of Grievance</H2>
          <P>
            A &ldquo;grievance&rdquo; or &ldquo;complaint&rdquo; for the
            purpose of this Policy means any communication from a Consumer
            expressing dissatisfaction in respect of products or services
            offered through the Platform and which seeks a remedial action.
          </P>
          <P>The following communications are NOT treated as grievances under this Policy:</P>
          <UL>
            <li>Communications that are vague, incomplete, or non-specific in nature;</li>
            <li>Communications in the nature of general suggestions or feedback;</li>
            <li>Communications seeking guidance, clarification, or general information;</li>
            <li>Communications relating to matters outside the scope of services provided by Formial Labs.</li>
          </UL>
        </div>

        <div>
          <H2>5. Grievance Redressal Mechanism</H2>
          <P>
            Formial Labs has established a three-tier grievance redressal
            mechanism to ensure that consumer concerns are resolved
            efficiently.
          </P>

          <H3>Tier 1 &mdash; Customer Support (First Point of Contact)</H3>
          <P>
            Consumers may first contact our Customer Support team for any
            queries, complaints, or issues relating to orders,
            consultations, prescriptions, or platform experience.
          </P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <Field label="Email">
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </Field>
            <Field label="Chat Support">
              <a href="tel:+918217816693" className="font-semibold text-primary underline">
                +91 82178 16693
              </a>
            </Field>
            <Field label="Availability">Monday to Saturday, 10:00 AM &ndash; 7:00 PM IST</Field>
            <Field label="Response target">Within 24 hours of receiving the complaint.</Field>
          </div>

          <H3>Tier 2 &mdash; Grievance Officer (Escalation)</H3>
          <P>
            If a Consumer&apos;s issue is not resolved at Tier 1, or if the
            Consumer is not satisfied with the Tier 1 response, the Consumer
            may escalate the complaint to the Grievance Officer. In
            accordance with the Consumer Protection (E-Commerce) Rules,
            2020, Formial Labs has designated a Grievance Officer for this
            purpose.
          </P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <Field label="Name">Dr. Jeet Patel</Field>
            <Field label="Designation">Grievance Officer</Field>
            <Field label="Email">
              <a href="mailto:admin@formial.in" className="font-semibold text-primary underline">
                admin@formial.in
              </a>
            </Field>
            <Field label="Availability">Monday to Saturday, 10:00 AM &ndash; 7:00 PM IST</Field>
            <Field label="Acknowledgment">Within 48 hours of receipt of the grievance.</Field>
            <Field label="Unique Tracking ID">
              Every grievance filed with the Grievance Officer will be
              assigned a unique complaint ID to enable tracking.
            </Field>
            <Field label="Resolution">
              The Grievance Officer shall endeavour to resolve all
              complaints within 1 (one) month from the date of receipt.
            </Field>
          </div>
        </div>

        <div>
          <H2>6. Closure of Grievances</H2>
          <P>
            A grievance shall be considered resolved and closed in any of
            the following circumstances:
          </P>
          <UL>
            <li>
              The Consumer has communicated acceptance of the response
              provided by the Grievance Officer or any other designated
              officer of Formial Labs;
            </li>
            <li>
              The Consumer has not responded within 30 (thirty) days of
              receipt of the written response from Formial Labs and has not
              raised any further grievance in respect of the same subject
              matter; or
            </li>
            <li>
              The complaint is found to be outside the scope of this Policy
              (e.g., vague, incomplete, or outside Formial Labs&apos;
              service scope).
            </li>
          </UL>
        </div>

        <div>
          <H2>7. Telemedicine &amp; Medical Consultation Grievances</H2>
          <P>
            Formial Labs provides telemedicine consultations facilitated
            through registered medical practitioners (RMPs) in compliance
            with the Telemedicine Practice Guidelines, 2020. Consumers who
            have a grievance relating to the quality, conduct, or outcome of
            a medical consultation may raise the same through the above
            mechanism.
          </P>
          <P>
            Formial Labs shall, upon receipt of a telemedicine-related
            grievance, coordinate with the concerned RMP and respond within
            the timelines specified in Section 5 above. Consumers are also
            informed that they may, independently of this Policy, approach
            the relevant State Medical Council for complaints against
            registered medical practitioners.
          </P>
        </div>

        <div>
          <H2>8. Prescription &amp; Pharmacy Grievances</H2>
          <P>
            Consumers with grievances relating to prescription dispensing,
            product quality, delivery, substitution, or any aspect of
            pharmacy operations are requested to contact Customer Support in
            the first instance. Formial Labs will investigate all
            pharmacy-related complaints in accordance with applicable
            provisions of the Drugs and Cosmetics Act, 1940 and rules
            thereunder.
          </P>
        </div>

        <div>
          <H2>9. Pre-Purchase Information Rights</H2>
          <P>
            Any person may, before purchasing any goods or services through
            the Platform, request the following information regarding the
            seller:
          </P>
          <UL>
            <li>Principal geographic address of headquarters and all branches;</li>
            <li>Name and details of the Platform;</li>
            <li>Email address and customer support contact details; and</li>
            <li>Any other information necessary for communication with the seller for effective dispute resolution.</li>
          </UL>
          <P>
            Such requests may be made via email to{" "}
            <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
              care@formial.in
            </a>{" "}
            and will be responded to within 2 (two) business days.
          </P>
        </div>

        <div>
          <H2>10. Data Privacy &amp; Confidentiality</H2>
          <P>
            All personal data collected in the course of grievance
            redressal shall be processed in accordance with Formial
            Labs&apos; Privacy Policy and the Digital Personal Data
            Protection Act, 2023. Consumer information shall be used solely
            for the purpose of resolving the complaint and shall not be
            shared with any third party except as required by law.
          </P>
        </div>

        <div>
          <H2>11. Regulatory Framework &amp; Compliance</H2>
          <P>
            This Policy is framed in compliance with, and should be read in
            conjunction with, the following regulatory instruments:
          </P>
          <UL>
            <li>
              Consumer Protection Act, 2019 &mdash; Overarching framework
              for consumer rights and grievance redressal.
            </li>
            <li>
              Consumer Protection (E-Commerce) Rules, 2020 &mdash; Mandates
              Grievance Officer and Nodal Officer appointments for
              e-commerce platforms.
            </li>
            <li>
              Telemedicine Practice Guidelines, 2020 &mdash; Governs the
              conduct of telemedicine consultations on the Platform.
            </li>
            <li>
              Drugs and Cosmetics Act, 1940 &mdash; Governs prescription
              dispensing and pharmacy operations.
            </li>
            <li>
              Digital Personal Data Protection Act, 2023 &mdash; Governs
              processing of personal data in grievance redressal.
            </li>
            <li>
              Information Technology Act, 2000 &mdash; Applicable to
              electronic records and digital communications.
            </li>
          </UL>
        </div>

        <div>
          <H2>12. Policy Review &amp; Updates</H2>
          <P>
            This Policy shall be reviewed at least once in every twelve
            months and updated as necessary to reflect any changes in
            applicable law, business operations, or regulatory guidance.
            The current version of this Policy will always be available on
            the Platform at www.formial.in/grievance-policy.
          </P>
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

export default GrievancePolicyPage;
