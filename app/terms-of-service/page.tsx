import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service and Privacy Policy for the Formial.in website and all telemedicine / prescription skincare services.",
  path: "/terms-of-service",
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

const PartLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-16 mb-6 font-obviously text-xs font-bold uppercase tracking-widest text-primary/60 first:mt-0">
    {children}
  </p>
);

const TermsConditionsPage = () => {
  return (
    <ContainerLayout as="main" className="mx-auto max-w-3xl pt-28 pb-20 md:pt-32">
      <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
        Legal
      </span>
      <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-[#525252]">
        Effective Date: April 1, 2026 &nbsp;|&nbsp; Last Updated: June 10, 2026
        <br />
        Applicable to: Formial.in website and all telemedicine / prescription
        skincare services
      </p>

      {/* PART A — PRIVACY POLICY */}
      <PartLabel>Part A &mdash; Privacy Policy</PartLabel>
      <div className="space-y-10">
        <div>
          <H2>1. About Formial and This Privacy Policy</H2>
          <P>
            FORMADYNE THERAPEUTICS PRIVATE LIMITED (&ldquo;Formial&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the
            website formial.in and the Formial web application (collectively,
            the &ldquo;Platform&rdquo;), providing telemedicine consultations,
            prescription skincare services, and ancillary health and wellness
            offerings.
          </P>
          <P>
            This Privacy Policy describes how we collect, use, store,
            disclose, and protect your personal data when you access or use
            the Platform. It applies to all visitors, registered users, and
            patients of Formial.
          </P>
          <P>
            By using the Platform, you consent to the practices described in
            this Privacy Policy. If you do not agree, please discontinue use
            immediately.
          </P>
          <P>This Policy is published in compliance with:</P>
          <UL>
            <li>The Digital Personal Data Protection Act, 2023 (DPDPA 2023)</li>
            <li>The Information Technology Act, 2000 and IT (Amendment) Act, 2008</li>
            <li>
              The IT (Reasonable Security Practices and Procedures and
              Sensitive Personal Data or Information) Rules, 2011
            </li>
            <li>The Telemedicine Practice Guidelines, 2020 (MCI / NMC)</li>
            <li>The Drugs and Cosmetics Act, 1940 and Rules thereunder</li>
          </UL>
        </div>

        <div>
          <H2>2. Information We Collect</H2>
          <P>
            Depending on whether you are a Visitor, Registered User, or
            Patient, we may collect the following categories of information:
          </P>

          <H3>2.1 Identity &amp; Contact Information</H3>
          <UL>
            <li>Full name, date of birth, gender</li>
            <li>Mobile number, email address, residential address</li>
            <li>Government-issued ID (where required for prescription verification)</li>
          </UL>

          <H3>2.2 Health &amp; Medical Information</H3>
          <UL>
            <li>Skin condition history, photographs submitted for dermatology assessment</li>
            <li>Current medications, allergies, and relevant medical history</li>
            <li>Prescription details issued by Formial-empanelled registered medical practitioners</li>
            <li>Treatment responses and follow-up notes</li>
          </UL>

          <H3>2.3 Payment Information</H3>
          <UL>
            <li>Transaction details, payment method type (we do not store full card numbers)</li>
            <li>Billing address and order history</li>
          </UL>

          <H3>2.4 Device &amp; Usage Information</H3>
          <UL>
            <li>IP address, device type, operating system, browser type</li>
            <li>Pages visited, session duration, clickstream data</li>
            <li>Log data, crash reports</li>
          </UL>

          <H3>2.5 Communications</H3>
          <UL>
            <li>
              Messages sent through in-app communication channels (including
              WhatsApp and Instagram), email, or customer support platforms
            </li>
            <li>Feedback, survey responses, and reviews</li>
          </UL>
        </div>

        <div>
          <H2>3. How We Use Your Information</H2>
          <P>We use the information we collect for the following purposes:</P>
          <UL>
            <li>To create and manage your account and verify your identity</li>
            <li>
              To facilitate telemedicine consultations with licensed doctors
              empanelled on the Platform
            </li>
            <li>
              To formulate, dispense, and deliver personalised prescription
              skincare products through Formial-associated pharmacies
            </li>
            <li>To process payments, manage subscriptions, and address billing queries</li>
            <li>
              To communicate with you regarding appointments, treatment
              updates, prescription renewals, and promotional offers (with
              your consent)
            </li>
            <li>To improve, personalise, and develop the Platform and our services</li>
            <li>
              To comply with applicable laws, regulatory requirements, and
              judicial or governmental orders
            </li>
            <li>To detect, prevent, and investigate fraud, abuse, or violations of our Terms</li>
            <li>To conduct internal research, analytics, and quality assurance</li>
          </UL>
          <P>
            We will not use your health or medical information for
            advertising, profiling, or sale to third parties.
          </P>
        </div>

        <div>
          <H2>4. Sharing of Information</H2>
          <P>
            We do not sell your personal data. We may share your information
            only in the following circumstances:
          </P>

          <H3>4.1 Licensed Medical Practitioners</H3>
          <P>
            Your health data is shared with Formial-empanelled registered
            medical practitioners solely for the purpose of providing
            telemedicine consultations and issuing prescriptions, as mandated
            by the Telemedicine Practice Guidelines 2020.
          </P>

          <H3>4.2 Formial Pharmacy (Compounding)</H3>
          <P>
            Prescription and delivery information is shared with licensed
            pharmacies for dispensation and fulfilment of personalised
            skincare products in compliance with the Drugs and Cosmetics Act,
            1940.
          </P>

          <H3>4.3 Technology &amp; Service Providers</H3>
          <P>
            We may engage third-party service providers (e.g., cloud
            hosting, payment gateways, SMS/email services, analytics) who
            process data on our behalf under binding data processing
            agreements.
          </P>

          <H3>4.4 Legal &amp; Regulatory Authorities</H3>
          <P>
            We may disclose information to government authorities, law
            enforcement, or courts as required by applicable law, regulatory
            order, or to protect the rights and safety of Formial or its
            users.
          </P>

          <H3>4.5 Business Transfers</H3>
          <P>
            In the event of a merger, acquisition, or asset sale, personal
            data may be transferred to the successor entity, subject to
            equivalent data protection obligations.
          </P>
        </div>

        <div>
          <H2>5. Cookies and Tracking Technologies</H2>
          <P>
            We use cookies and similar tracking technologies (pixels,
            session tokens, analytics SDKs) on the Platform for the
            following purposes:
          </P>
          <UL>
            <li>
              Essential / Strictly Necessary Cookies &mdash; required for
              Platform functionality and secure login sessions
            </li>
            <li>
              Functional / Preference Cookies &mdash; to remember your
              language, location, and usage preferences
            </li>
            <li>
              Performance / Analytics Cookies &mdash; to understand how users
              navigate the Platform and improve it
            </li>
            <li>
              Marketing / Targeting Cookies &mdash; to show relevant content
              (only with your explicit consent)
            </li>
          </UL>
          <P>
            You may manage your cookie preferences via the cookie banner on
            first visit or via your browser settings. Disabling essential
            cookies may impair Platform functionality.
          </P>
        </div>

        <div>
          <H2>6. Data Retention</H2>
          <P>
            We retain your personal data for as long as is necessary to
            fulfil the purposes outlined in this Policy, or as required by
            law:
          </P>
          <UL>
            <li>
              Medical records and prescription data: minimum 7 years from
              last consultation, or as mandated by applicable medical
              record-keeping regulations
            </li>
            <li>Account data: for the duration of your account, plus a reasonable period thereafter</li>
            <li>
              Transaction records: as required under GST, tax, and financial
              regulations (typically 7 years)
            </li>
          </UL>
          <P>
            Upon expiry of the retention period, data will be securely
            deleted or anonymised.
          </P>
        </div>

        <div>
          <H2>7. Data Security</H2>
          <P>
            Formial implements industry-standard technical and
            organisational security measures, including:
          </P>
          <UL>
            <li>SSL / TLS 128-bit encryption for all data in transit</li>
            <li>Encrypted storage for sensitive personal and health data at rest</li>
            <li>
              Role-based access controls limiting employee access to
              personal data on a need-to-know basis
            </li>
            <li>Regular security audits, penetration testing, and vulnerability assessments</li>
          </UL>
          <P>
            Notwithstanding the foregoing, no system is entirely immune to
            breaches. You acknowledge that transmission of data over the
            internet carries inherent risks. In the event of a data breach
            affecting your rights and interests, we will notify you as
            required under applicable law.
          </P>
          <P>
            You are responsible for maintaining the confidentiality of your
            account credentials. Report any suspected unauthorised access to{" "}
            <a href="mailto:privacy@formial.in" className="font-semibold text-primary underline">
              privacy@formial.in
            </a>{" "}
            immediately.
          </P>
        </div>

        <div>
          <H2>8. Your Rights Under DPDPA 2023</H2>
          <P>
            As a Data Principal under the Digital Personal Data Protection
            Act, 2023, you have the following rights:
          </P>
          <UL>
            <li>Right to Access &mdash; request a summary of personal data processed by us</li>
            <li>Right to Correction &mdash; request correction of inaccurate or incomplete data</li>
            <li>
              Right to Erasure &mdash; request the deletion of your personal
              data. We will comply with such requests unless we are required
              to retain certain information to meet legal, regulatory, or
              legitimate business obligations
            </li>
            <li>Right to Grievance Redressal &mdash; raise complaints with our Grievance Officer</li>
            <li>
              Right to Nominate &mdash; nominate a person to exercise rights
              on your behalf in the event of death or incapacity
            </li>
            <li>
              Right to Withdraw Consent &mdash; withdraw consent for
              non-essential processing at any time (withdrawal does not
              affect lawfulness of prior processing)
            </li>
          </UL>
          <P>
            To exercise any of these rights, write to our Grievance Officer
            at{" "}
            <a href="mailto:privacy@formial.in" className="font-semibold text-primary underline">
              privacy@formial.in
            </a>
            . We will respond within 30 days.
          </P>
        </div>

        <div>
          <H2>9. Children&apos;s Privacy</H2>
          <P>
            The Platform is not intended for use by persons under the age of
            18. We do not knowingly collect personal data from minors. If a
            minor requires telemedicine services, a parent or legal guardian
            must register and provide informed consent on their behalf.
          </P>
          <P>
            If you believe we have collected data from a minor without
            appropriate authorisation, contact us immediately at{" "}
            <a href="mailto:privacy@formial.in" className="font-semibold text-primary underline">
              privacy@formial.in
            </a>{" "}
            and we will take prompt corrective action.
          </P>
        </div>

        <div>
          <H2>10. Changes to This Privacy Policy</H2>
          <P>
            We may update this Privacy Policy periodically. Material changes
            will be communicated via email or a prominent notice on the
            Platform at least 15 days prior to coming into effect. Your
            continued use of the Platform after the effective date
            constitutes acceptance of the revised Policy.
          </P>
          <P>The current version will always be accessible at formial.in/privacy-policy.</P>
        </div>
      </div>

      {/* PART B — TERMS AND CONDITIONS */}
      <PartLabel>Part B &mdash; Terms and Conditions</PartLabel>
      <div className="space-y-10">
        <div>
          <H2>11. Agreement to Terms</H2>
          <P>
            These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a
            legally binding agreement between you (&ldquo;User&rdquo;,
            &ldquo;You&rdquo;) and FORMADYNE THERAPEUTICS PRIVATE LIMITED
            (&ldquo;Formial&rdquo;, &ldquo;We&rdquo;). By accessing,
            browsing, or transacting on the Platform (formial.in and
            associated applications), you agree to be bound by these Terms
            and our Privacy Policy.
          </P>
          <P>If you do not agree to these Terms, you must not use the Platform.</P>
          <P>
            We reserve the right to modify these Terms at any time. Changes
            will be posted on the Platform and, for material changes,
            communicated via email at least 15 days prior to taking effect.
            Continued use after the effective date constitutes acceptance.
          </P>
        </div>

        <div>
          <H2>12. Eligibility &amp; Account Registration</H2>
          <UL>
            <li>
              You must be at least 18 years of age to register
              independently. Minors may access services only with the
              express consent and supervision of a parent or legal guardian.
            </li>
            <li>You warrant that all information provided during registration is accurate, current, and complete.</li>
            <li>
              You are responsible for maintaining the confidentiality of
              your account credentials and for all activities under your
              account.
            </li>
            <li>
              Formial reserves the right to suspend or terminate accounts
              found to contain false, misleading, or fraudulent information.
            </li>
            <li>
              One account per person. Creating multiple accounts to
              circumvent restrictions is prohibited.
            </li>
          </UL>
        </div>

        <div>
          <H2>13. Telemedicine &amp; Prescription Services</H2>
          <P>
            Formial facilitates telemedicine consultations between Users and
            registered medical practitioners (&ldquo;Registered
            Practitioners&rdquo;) empanelled with Formial, in accordance
            with the Telemedicine Practice Guidelines, 2020 issued by the
            National Medical Commission.
          </P>

          <H3>13.1 Nature of Service</H3>
          <P>
            Formial is an integrated telemedicine and compounding pharmacy
            platform. It connects patients with licensed doctors and,
            through Formial Pharmacy, formulates and dispenses personalized
            prescription skincare products.
          </P>
          <P>
            Consultations conducted via the Platform constitute telemedicine
            services and are subject to the limitations inherent in remote
            assessment (no physical examination).
          </P>
          <P>
            Registered Practitioners empanelled with Formial are independent
            professionals. Formial is not vicariously liable for the medical
            advice, diagnosis, or treatment recommendations they provide.
          </P>

          <H3>13.2 Jurisdictions Served</H3>
          <P>
            Formial provides telemedicine and compounding pharmacy services
            to patients across all states and Union Territories of India.
            Services are available only to patients physically located
            within India at the time of consultation.
          </P>
          <P>
            Delivery of dispensed products is subject to pin-code-level
            serviceability by our logistics partner; in rare instances where
            a specific address is temporarily unserviceable, alternate
            delivery arrangements may be required.
          </P>
          <P>
            Formial does not provide medical consultation, prescription, or
            dispensing services to individuals located outside India.
          </P>

          <H3>13.3 Prescriptions</H3>
          <P>
            Prescriptions issued via the Platform are valid only for
            conditions amenable to telemedicine diagnosis under applicable
            guidelines.
          </P>
          <P>
            Prescriptions for Schedule H, H1, and X drugs will only be
            issued where clinically appropriate and in compliance with the
            Drugs and Cosmetics Act, 1940 and Drugs and Cosmetics Rules,
            1945. Habit-forming and Schedule X drugs are not processed.
          </P>
          <P>
            It is your responsibility to provide accurate and complete
            medical history, current medications, and allergy information
            before the consultation.
          </P>

          <H3>13.4 Emergency Care</H3>
          <P>
            Telemedicine services are NOT suitable for medical emergencies.
            If you are experiencing a medical emergency, call 112 or proceed
            to the nearest hospital immediately. Formial bears no
            responsibility for outcomes arising from use of the Platform in
            emergency situations.
          </P>
        </div>

        <div>
          <H2>14. Prescription Skincare &mdash; Specific Terms</H2>
          <P>
            Formial&apos;s core service includes the formulation,
            dispensation, and delivery of personalised prescription
            skincare products by Formial Pharmacy (a licensed compounding
            pharmacy operated by FORMADYNE THERAPEUTICS PRIVATE LIMITED).
            The following terms apply:
          </P>
          <UL>
            <li>
              Personalised skincare formulations are based on your
              consultation and are dispensed only against a valid
              prescription issued by a Formial-empanelled doctor.
            </li>
            <li>
              Formulations contain prescription-only active ingredients
              (e.g., tretinoin, hydroquinone, clindamycin) and must be used
              strictly as directed.
            </li>
            <li>
              You must disclose pregnancy, breastfeeding, or plans to
              conceive prior to consultation. Certain actives are
              contraindicated in pregnancy.
            </li>
            <li>
              For isotretinoin or other high-risk actives, additional
              consent, baseline investigations, and adherence to
              Formial&apos;s Isotretinoin SOP may be required before
              dispensation.
            </li>
            <li>
              Results vary between individuals. Formial does not guarantee
              specific cosmetic outcomes.
            </li>
            <li>
              Photograph submission for skin assessment constitutes your
              consent to the use of those images by Formial&apos;s medical
              team for diagnosis, treatment planning and internal research
              and analytics only.
            </li>
          </UL>
        </div>

        <div>
          <H2>15. Permitted &amp; Prohibited Use</H2>
          <H3>15.1 Permitted Use</H3>
          <P>
            You may use the Platform solely for lawful personal healthcare
            and wellness purposes as intended by Formial.
          </P>

          <H3>15.2 Prohibited Use</H3>
          <P>You must not:</P>
          <UL>
            <li>Use the Platform for any unlawful purpose or in violation of applicable Indian law</li>
            <li>Submit false, misleading, or fraudulent medical information</li>
            <li>Attempt to obtain prescriptions for substances for non-therapeutic or recreational use</li>
            <li>Reverse-engineer, scrape, or reproduce any portion of the Platform without express written consent</li>
            <li>Interfere with the Platform&apos;s security, servers, or networks</li>
            <li>Impersonate another person or misrepresent your identity</li>
            <li>Share account credentials or allow third parties to access your account</li>
          </UL>
          <P>
            Formial reserves the right to suspend or terminate access and,
            where warranted, report violations to relevant authorities.
          </P>
        </div>

        <div>
          <H2>16. Payments, Cancellations &amp; Refunds</H2>
          <H3>16.1 Payments</H3>
          <P>
            All consultation fees, product charges, and subscription fees
            are displayed in Indian Rupees (INR) inclusive of applicable
            GST. Payments are processed through secure third-party payment
            gateways.
          </P>

          <H3>16.2 Returns &amp; Refunds &mdash; Products</H3>
          <P>
            Given the personalised and prescription nature of Formial&apos;s
            skincare products, returns and refunds are governed as follows:
          </P>
          <UL>
            <li>
              Products damaged in transit or delivered incorrectly: eligible
              for replacement or full refund upon photographic evidence
              submitted within 48 hours of delivery
            </li>
            <li>
              Personalised prescription formulations: not eligible for
              return once dispensed, except in the event of a manufacturing
              defect or incorrect formulation
            </li>
          </UL>
        </div>

        <div>
          <H2>17. Medical Disclaimer</H2>
          <H3>17.1 Disclaimer</H3>
          <P>
            The information available on the Platform &mdash; including
            articles, blogs, product descriptions, and AI-generated
            suggestions &mdash; is for general informational and
            educational purposes only. It does not constitute medical
            advice and must not be used as a substitute for consultation
            with a qualified healthcare professional.
          </P>
          <P>
            Formial does not guarantee the accuracy, completeness, or
            suitability of any health information on the Platform for any
            individual&apos;s specific medical condition. Always consult a
            Registered Practitioner before starting, changing, or stopping
            any treatment.
          </P>

          <H3>17.2 Practitioner Credentials and Verification</H3>
          <P>
            Formial engages only licensed Registered Medical Practitioners
            (&ldquo;RMPs&rdquo;) holding valid registrations with the
            National Medical Commission (&ldquo;NMC&rdquo;) and/or the
            applicable State Medical Council.
          </P>
          <P>
            The consulting practitioner&apos;s name, qualifications, and
            registration number are provided during the consultation and/or
            on the prescription. In addition, the credentials of
            Formial&apos;s consulting dermatologists are published on the
            Platform&apos;s Meet the Team page.
          </P>
          <P>
            Patients may independently verify a practitioner&apos;s
            registration using the relevant State Medical Council register
            or the NMC&apos;s public practitioner database. For further
            assistance, patients may contact{" "}
            <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
              care@formial.in
            </a>
          </P>
        </div>

        <div>
          <H2>18. Limitation of Liability</H2>
          <P>To the maximum extent permitted by applicable law:</P>
          <UL>
            <li>
              Formial&apos;s total aggregate liability to you for any claims
              arising out of or in connection with the Platform shall not
              exceed the amount paid by you to Formial in the three (3)
              months immediately preceding the event giving rise to the
              claim.
            </li>
            <li>
              Formial shall not be liable for indirect, incidental,
              consequential, special, or punitive damages, including loss of
              data, loss of revenue, or medical complications arising from
              reliance on Platform content or services.
            </li>
            <li>
              Formial is not liable for acts or omissions of third-party
              service providers, independent medical practitioners, or
              pharmacies, except to the extent required by mandatory
              applicable law.
            </li>
            <li>
              Nothing in these Terms limits Formial&apos;s liability for
              death or personal injury caused by gross negligence or wilful
              misconduct, or for fraud.
            </li>
          </UL>
        </div>

        <div>
          <H2>19. Intellectual Property</H2>
          <P>
            All content on the Platform &mdash; including text, graphics,
            logos, user interface design, software, trademarks, and
            formulation methodologies &mdash; is the exclusive property of
            FORMADYNE THERAPEUTICS PRIVATE LIMITED or its licensors and is
            protected under Indian intellectual property laws.
          </P>
          <P>
            You are granted a limited, non-exclusive, non-transferable
            licence to access and use the Platform for personal,
            non-commercial purposes. You must not reproduce, distribute,
            modify, or create derivative works from any Platform content
            without Formial&apos;s prior written consent.
          </P>
        </div>

        <div>
          <H2>20. Governing Law &amp; Dispute Resolution</H2>
          <P>
            These Terms shall be governed by and construed in accordance
            with the laws of the Republic of India.
          </P>
          <P>
            In the event of any dispute or claim arising out of or relating
            to these Terms or the use of the Platform, the parties shall
            first attempt to resolve the matter through good-faith
            negotiation within 30 days of written notice.
          </P>
          <P>
            If unresolved, disputes shall be subject to binding arbitration
            under the Arbitration and Conciliation Act, 1996, with the seat
            of arbitration in Bengaluru, Karnataka. The arbitration shall be
            conducted in English before a sole arbitrator agreed upon by
            both parties.
          </P>
          <P>
            Nothing herein prevents either party from seeking urgent
            injunctive relief from competent courts in Bengaluru,
            Karnataka.
          </P>
        </div>

        <div>
          <H2>21. Grievance Redressal</H2>
          <P>
            In accordance with the Information Technology Act, 2000, Rule
            5(9) of the IT (Intermediary Guidelines and Digital Media Ethics
            Code) Rules, 2021, and the DPDPA 2023, Formial has appointed a
            Grievance Officer:
          </P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <p>
              <span className="font-semibold text-primary">Grievance Officer:</span> Dr Jeet Patel
            </p>
            <p>
              <span className="font-semibold text-primary">Email:</span>{" "}
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </p>
            <p>
              <span className="font-semibold text-primary">Registered Address:</span> No 181, K.B.A.R
              Road, Austin Town, Bengaluru, Karnataka, India
            </p>
            <p>
              <span className="font-semibold text-primary">Response Time:</span> Within 30 days of
              receipt of complaint
            </p>
          </div>
        </div>

        <div>
          <H2>22. Contact Us</H2>
          <P>For general inquiries, support, or feedback:</P>
          <div className="mt-3 space-y-1 text-sm text-[#525252]">
            <p className="font-semibold text-primary">FORMADYNE THERAPEUTICS PRIVATE LIMITED</p>
            <p>Website: formial.in</p>
            <p>
              Email:{" "}
              <a href="mailto:admin@formial.in" className="font-semibold text-primary underline">
                admin@formial.in
              </a>
            </p>
            <p>
              Support:{" "}
              <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
                care@formial.in
              </a>
            </p>
            <p>Address: No 181, K.B.A.R Road, Austin Town, Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-primary/10 pt-6 text-xs text-[#525252]">
        <p>&copy; 2026 FORMADYNE THERAPEUTICS PRIVATE LIMITED. All rights reserved.</p>
        <p className="mt-1">
          This document was last reviewed on 10 June 2026. Formial reserves the
          right to update these policies periodically.
        </p>
      </div>
    </ContainerLayout>
  );
};

export default TermsConditionsPage;
