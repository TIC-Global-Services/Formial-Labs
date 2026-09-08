import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Telehealth Consent",
  description:
    "Terms of consent for receiving dermatologist-led telehealth consultations and personalized formulations through Formial Labs.",
  path: "/telehealth-consent",
});

const sections = [
  {
    title: "1. Purpose of This Consent",
    body: "Formial Labs connects you with licensed, independent dermatology providers through a telehealth platform. Before any consultation or formulation, you must review and agree to the terms below, which explain how telehealth works, its risks and benefits, and your rights as a patient.",
  },
  {
    title: "2. Nature of Telehealth Services",
    body: "Telehealth involves the use of photographs, questionnaire responses, messaging, and/or video to allow a provider to evaluate, diagnose, and recommend treatment for your skin concerns without an in-person physical examination. Your provider will review the information you submit in your skin assessment to determine whether a personalized formulation is appropriate, and may request additional information or an in-person referral if needed.",
  },
  {
    title: "3. Benefits and Risks",
    body: "Telehealth allows convenient access to dermatology guidance without needing to visit a clinic. As with any remote consultation, there are limitations: images or descriptions may not capture every detail an in-person exam would, technical issues may interrupt communication, and in rare cases a condition may require in-person care that your provider will advise you to seek.",
  },
  {
    title: "4. Your Responsibilities",
    body: "You agree to provide accurate, complete, and current information about your skin, medical history, medications, and allergies. Withholding or misrepresenting information may affect the safety or suitability of any formulation recommended to you.",
  },
  {
    title: "5. Confidentiality",
    body: "Information you share, including photos and assessment answers, is used solely to provide your consultation and formulation, and is handled in line with our Privacy Policy. Your information will not be shared outside the company except as required to deliver your care or as required by law.",
  },
  {
    title: "6. Emergency Care",
    body: "Telehealth through Formial Labs is not intended for medical emergencies. If you are experiencing a medical emergency, please contact local emergency services or visit the nearest emergency room immediately.",
  },
  {
    title: "7. Right to Withdraw",
    body: "Your consent to telehealth services is voluntary. You may withdraw consent at any point before a formulation is dispensed, without affecting your right to future care, by contacting our support team.",
  },
  {
    title: "8. Consent",
    body: "By checking the consent box and proceeding with your skin assessment, you acknowledge that you have read and understood this Telehealth Consent, agree to receive care through telehealth, and confirm that the information you provide is accurate to the best of your knowledge.",
  },
];

const TelehealthConsentPage = () => {
  return (
    <ContainerLayout as="main" className="mx-auto max-w-3xl pt-28 pb-20 md:pt-32">
      <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
        Legal
      </span>
      <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        Telehealth Consent
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#525252]">
        This consent applies to all dermatologist-led consultations and
        personalized formulations offered through Formial Labs&apos; telehealth
        platform.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-aeonik text-lg text-primary sm:text-xl">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#525252]">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs leading-relaxed text-[#525252]">
        Questions about this consent? Reach us at{" "}
        <a href="mailto:info@formial.com" className="font-semibold text-primary underline">
          info@formial.com
        </a>
        .
      </p>
    </ContainerLayout>
  );
};

export default TelehealthConsentPage;
