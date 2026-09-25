"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import Toast from "@/components/Reusable/Toast";
import { submitAssessment } from "@/lib/assessmentApi";
import AssessmentIntro from "./AssessmentIntro";
import AssessmentStatus from "./AssessmentStatus";
import ProgressBar from "./ProgressBar";
import StepHeading from "./StepHeading";
import AssessmentNav from "./AssessmentNav";
import TestimonialFloat from "./TestimonialFloat";
import {
  AssessmentAnswers,
  CONCERN_OPTIONS,
  DURATION_OPTIONS,
  emptyAnswers,
  GENDER_OPTIONS,
  HEAR_ABOUT_OPTIONS,
  labelFor,
  OTHER_CONCERN_OPTIONS,
  PRODUCTS_USED_OPTIONS,
  SKIN_TYPE_OPTIONS,
} from "./assessmentData";
import {
  ImageOptionGrid,
  PhoneField,
  PillOptionGroup,
  SegmentedOptions,
  SensitivityScale,
  TextField,
  YesNoGroup,
} from "./AssessmentControls";

const TOTAL_STEPS = 9;

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const AssessmentForm = () => {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const closeToast = useCallback(() => setSaveError(null), []);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(emptyAnswers);

  const update = <K extends keyof AssessmentAnswers>(
    key: K,
    value: AssessmentAnswers[K],
  ) => setAnswers((prev) => ({ ...prev, [key]: value }));

  const firstNameOnly = answers.firstName.trim().split(/\s+/)[0] ?? "";

  const toggleInList = (
    key: "concerns" | "otherConcerns" | "productsUsed",
    value: string,
  ) => {
    setAnswers((prev) => {
      const current = prev[key];

      if (key === "productsUsed") {
        if (value === "none") {
          return {
            ...prev,
            productsUsed: current.includes("none") ? [] : ["none"],
          };
        }
        const withoutNone = current.filter((v) => v !== "none");
        const next = withoutNone.includes(value)
          ? withoutNone.filter((v) => v !== value)
          : [...withoutNone, value];
        return { ...prev, productsUsed: next };
      }

      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const otherConcernOptions = useMemo(
    () =>
      OTHER_CONCERN_OPTIONS.filter((o) => !answers.concerns.includes(o.value)),
    [answers.concerns],
  );

  const selectedConcernLabels = answers.concerns.map((v) =>
    labelFor(CONCERN_OPTIONS, v),
  );
  const allConcernLabels = [...answers.concerns, ...answers.otherConcerns].map(
    (v) => labelFor([...CONCERN_OPTIONS, ...OTHER_CONCERN_OPTIONS], v),
  );
  const primaryConcernLabel = allConcernLabels[0] ?? "your skin";
  const skinTypeLabel = answers.skinType
    ? labelFor(SKIN_TYPE_OPTIONS, answers.skinType)
    : "";

  const canContinue = (() => {
    switch (step) {
      case 0:
        return answers.concerns.length > 0;
      case 1:
        return true;
      case 2:
        return answers.duration !== "";
      case 3:
        return answers.skinType !== "";
      case 4:
        return answers.sensitivity !== null;
      case 5:
        return answers.productsUsed.length > 0;
      case 6:
        return (
          answers.onMedication !== null &&
          (answers.onMedication !== "yes" || answers.medicationDetails.trim() !== "") &&
          answers.hasAllergy !== null &&
          (answers.hasAllergy !== "yes" || answers.allergyDetails.trim() !== "") &&
          answers.pregnantOrBreastfeeding !== null
        );
      case 7:
        return (
          answers.firstName.trim() !== "" &&
          answers.lastName.trim() !== "" &&
          answers.age.trim() !== "" &&
          answers.gender !== "" &&
          answers.phone.trim().length >= 7 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())
        );
      case 8:
        return answers.hearAboutUs !== "";
      default:
        return false;
    }
  })();

  const goNext = async () => {
    if (!canContinue || submitting) return;
    if (step === TOTAL_STEPS - 1) {
      setSubmitting(true);
      setSaveError(null);
      try {
        const submissionId = await submitAssessment(answers);
        if (!submissionId) throw new Error("No submissionId returned");
        sessionStorage.setItem("formial_assessment", JSON.stringify(answers));
        router.push(`/skin-assesment-result?submissionId=${encodeURIComponent(submissionId)}`);
      } catch (err) {
        console.error("Assessment save failed", err);
        setSaveError(
          "We couldn't save your answers. Please check your connection and press Submit again."
        );
        setSubmitting(false);
      }
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const canStart = agreed && answers.firstName.trim() !== "";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.isComposing) return;
      // Links, Back and free-text areas keep their native Enter behaviour.
      // Option buttons are fine to hijack: preventDefault below stops their click.
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, textarea, select, button[aria-label="Back"]'))
        return;
      e.preventDefault();
      if (!started) {
        if (canStart) setStarted(true);
        return;
      }
      goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!started) {
    return (
      <section className="min-h-screen  bg-brand-gradient   flex items-center justify-center py-16 lg:py-24">
        <AssessmentIntro
          name={answers.firstName}
          onNameChange={(v) => update("firstName", v)}
          agreed={agreed}
          onAgreedChange={setAgreed}
          onStart={() => setStarted(true)}
        />
      </section>
    );
  }

  return (
    <section className="min-h-screen  bg-brand-gradient pt-[20%] pb-[10%] lg:pt-[5%] lg:pb-[5%]">
      <ContainerLayout px py={false} className="mx-auto max-w-4xl">
        <AssessmentStatus step={step} answers={answers} />
        <ProgressBar step={step} total={TOTAL_STEPS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className=" mt-5 md:mt-10"
          >
            {step === 0 && (
              <div>
                <StepHeading
                  title={`${firstNameOnly || "Hey"}, what best describes your skin concerns?`}
                  subtitle="We address multiple skin concerns, but lets start with the one that matters most to you?"
                />
                <div className="mt-8">
                  <ImageOptionGrid
                    options={CONCERN_OPTIONS}
                    selected={answers.concerns}
                    onToggle={(v) => toggleInList("concerns", v)}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <StepHeading
                  // eyebrow={`You picked ${summarizeList(selectedConcernLabels)}`}
                  title="Anything else? The more we know, the more precise your formula."
                  subtitle="You can select multiple issues, we will create the formulation keeping this also in mind."
                  required={false}
                />
                <div className="mt-8">
                  <ImageOptionGrid
                    options={otherConcernOptions}
                    selected={answers.otherConcerns}
                    onToggle={(v) => toggleInList("otherConcerns", v)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <StepHeading
                  title={
                    <>
                      Hey {firstNameOnly || "there"}, how long has{" "}
                      <span className="font-minion-pro italic text-[28px] md:text-[42px]">
                        {primaryConcernLabel}
                      </span>{" "}
                      been an issue?
                    </>
                  }
                  subtitle="The longer it's lingered, the more targeted your formula needs to be."
                />
                <div className="mt-8">
                  <PillOptionGroup
                    options={DURATION_OPTIONS}
                    selected={[answers.duration]}
                    onToggle={(v) => update("duration", v)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <StepHeading
                  // eyebrow={`Let's treat your ${primaryConcernLabel}`}
                  title={
                    <>
                      Since{" "}
                      <span className="font-minion-pro italic  text-[28px] md:text-[42px]">
                        {primaryConcernLabel}
                      </span>{" "}
                      is your main concern what&apos;s your skin type?
                    </>
                  }
                  subtitle="This helps us balance your formula so it works with your skin, not against it."
                />
                <div className="mt-8">
                  <ImageOptionGrid
                    options={SKIN_TYPE_OPTIONS}
                    selected={[answers.skinType]}
                    onToggle={(v) => update("skinType", v)}
                    contain
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <StepHeading
                  title={
                    skinTypeLabel ? (
                      <>
                        Got it,{" "}
                        <span className="font-minion-pro italic text-[28px] md:text-[42px]">
                          {skinTypeLabel.toLowerCase()}
                        </span>{" "}
                        skin. On a scale of 1-5, how sensitive is it?
                      </>
                    ) : (
                      "On a scale of 1-5 how sensitive is your skin?"
                    )
                  }
                  subtitle="This tells our dermatologist exactly how to dose
  your formula — too strong and it won't work, too weak and it won't either."
                />
                <div className="mt-8">
                  <SensitivityScale
                    value={answers.sensitivity}
                    onChange={(v) => update("sensitivity", v)}
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <StepHeading
                  title={
                    <>
                      {firstNameOnly || "Hey"}, can you please tell us what products are already in
                      your routine?
                    </>
                  }
                  subtitle="We'll build around what's working and swap what isn't."
                />
                <div className="mt-8">
                  <PillOptionGroup
                    options={PRODUCTS_USED_OPTIONS}
                    selected={answers.productsUsed}
                    onToggle={(v) => toggleInList("productsUsed", v)}
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <StepHeading
                  wide
                  title={
                    <>
                      {firstNameOnly || "Hey"}, this is a real prescription, not
                      a pre-made bottle so we ask what a regular skincare brand wouldn&apos;t
                    </>
                  }
                />
                <div className="mt-8 space-y-8">
                  <div>
                    <span className="mb-3 block text-base text-primary">
                      Are you currently on any medications?
                    </span>
                    <YesNoGroup
                      value={answers.onMedication}
                      onChange={(v) => update("onMedication", v)}
                    />
                    {answers.onMedication === "yes" && (
                      <div className="mt-4">
                        <TextField
                          label="Which medications?"
                          value={answers.medicationDetails}
                          onChange={(v) => update("medicationDetails", v)}
                          placeholder="Tell us the medication names"
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="mb-3 block text-base text-primary">
                      Are you allergic to any medications?
                    </span>
                    <YesNoGroup
                      value={answers.hasAllergy}
                      onChange={(v) => update("hasAllergy", v)}
                    />
                    {answers.hasAllergy === "yes" && (
                      <div className="mt-4">
                        <TextField
                          label="What are you allergic to?"
                          value={answers.allergyDetails}
                          onChange={(v) => update("allergyDetails", v)}
                          placeholder="Tell us the medication and the reaction"
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="mb-3 block text-base text-primary">
                      Are you pregnant or breastfeeding?
                    </span>
                    <YesNoGroup
                      value={answers.pregnantOrBreastfeeding}
                      onChange={(v) => update("pregnantOrBreastfeeding", v)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <StepHeading
                  // eyebrow={`Your ${primaryConcernLabel} formula is almost ready`}
                  title="Claim your Formula"
                  subtitle="We need some details in order to ensure the formula is made precisely for you"
                />
                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <TextField
                    label="Legal First Name"
                    value={answers.firstName}
                    onChange={(v) => update("firstName", v)}
                    placeholder="Enter your legal first name"
                    required
                  />
                  <TextField
                    label="Legal Last Name"
                    value={answers.lastName}
                    onChange={(v) => update("lastName", v)}
                    placeholder="Enter your legal last name"
                    required
                  />
                  <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row">
                    <div className="w-full sm:w-28 sm:shrink-0">
                      <TextField
                        label="Age"
                        type="number"
                        value={answers.age}
                        onChange={(v) => update("age", v)}
                        placeholder="Age"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <span className="mb-2 block text-lg font-medium text-primary">
                        Gender *
                      </span>
                      <SegmentedOptions
                        options={GENDER_OPTIONS}
                        selected={[answers.gender]}
                        onToggle={(v) => update("gender", v)}
                      />
                    </div>
                  </div>
                  <TextField
                    label="Email Address"
                    type="email"
                    value={answers.email}
                    onChange={(v) => update("email", v)}
                    placeholder="Enter your Email"
                    required
                  />
                  <PhoneField
                    label="Phone Number"
                    value={answers.phone}
                    onChange={(v) => update("phone", v)}
                    countryDial={answers.countryDial}
                    onCountryChange={(v) => update("countryDial", v)}
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>
              </div>
            )}

            {step === 8 && (
              <div>
                <StepHeading
                  title={`Last one, ${firstNameOnly || "friend"}! How did you find us?`}
                />
                <div className="mt-8">
                  <ImageOptionGrid
                    options={HEAR_ABOUT_OPTIONS}
                    selected={[answers.hearAboutUs]}
                    onToggle={(v) => update("hearAboutUs", v)}
                    contain
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AssessmentNav
          onBack={goBack}
          onNext={goNext}
          backDisabled={step === 0}
          nextDisabled={!canContinue || submitting}
          nextLabel={step === TOTAL_STEPS - 1 ? (submitting ? "Submitting..." : "Submit") : "Next"}
        />

        <TestimonialFloat step={step} />
        <Toast message={saveError} onClose={closeToast} />
      </ContainerLayout>
    </section>
  );
};

export default AssessmentForm;
