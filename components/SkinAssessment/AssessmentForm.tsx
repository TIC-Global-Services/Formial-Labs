"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import AssessmentIntro from "./AssessmentIntro";
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
  summarizeList,
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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(emptyAnswers);

  const update = <K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleInList = (key: "concerns" | "otherConcerns" | "productsUsed", value: string) => {
    setAnswers((prev) => {
      const current = prev[key];

      if (key === "productsUsed") {
        if (value === "none") {
          return { ...prev, productsUsed: current.includes("none") ? [] : ["none"] };
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
    () => OTHER_CONCERN_OPTIONS.filter((o) => !answers.concerns.includes(o.value)),
    [answers.concerns]
  );

  const selectedConcernLabels = answers.concerns.map((v) => labelFor(CONCERN_OPTIONS, v));
  const allConcernLabels = [...answers.concerns, ...answers.otherConcerns].map((v) =>
    labelFor([...CONCERN_OPTIONS, ...OTHER_CONCERN_OPTIONS], v)
  );
  const primaryConcernLabel = allConcernLabels[0] ?? "your skin";
  const skinTypeLabel = answers.skinType ? labelFor(SKIN_TYPE_OPTIONS, answers.skinType) : "";

  const canContinue = (() => {
    switch (step) {
      case 0:
        return answers.concerns.length > 0;
      case 1:
        return true;
      case 2:
        return answers.skinType !== "";
      case 3:
        return answers.duration !== "";
      case 4:
        return answers.sensitivity !== null;
      case 5:
        return answers.productsUsed.length > 0;
      case 6:
        return (
          answers.onMedication !== null &&
          answers.hasAllergy !== null &&
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

  const goNext = () => {
    if (!canContinue) return;
    if (step === TOTAL_STEPS - 1) {
      sessionStorage.setItem("formial_assessment", JSON.stringify(answers));
      // Only non-sensitive fields go in the URL — this is what makes the
      // result page shareable without leaking phone/email/medical answers.
      const params = new URLSearchParams({ name: answers.firstName });
      if (answers.concerns[0]) params.set("concern", answers.concerns[0]);
      router.push(`/skin-assesment-result?${params.toString()}`);
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  if (!started) {
    return (
      <section className="min-h-screen  bg-brand-gradient   flex items-center justify-center py-16 lg:py-24">
        <AssessmentIntro
          agreed={agreed}
          onAgreedChange={setAgreed}
          onStart={() => setStarted(true)}
        />
      </section>
    );
  }

  return (
    <section className="min-h-screen  bg-brand-gradient py-[20%] lg:py-[8%]">
      <ContainerLayout px py={false} className="mx-auto max-w-4xl">
        <ProgressBar step={step} total={TOTAL_STEPS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {step === 0 && (
              <div>
                <StepHeading
                  eyebrow="Let's build your formula"
                  title="What best describes your skin concerns?"
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
                  eyebrow={`You picked ${summarizeList(selectedConcernLabels)}`}
                  title="Anything else bothering you?"
                  subtitle="Pick any extra concerns that also apply — totally optional."
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
                  eyebrow={`Let's treat your ${primaryConcernLabel}`}
                  title="May we know your skin type?"
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

            {step === 3 && (
              <div>
                <StepHeading
                  eyebrow={`Dealing with ${
                    allConcernLabels.length > 0 ? summarizeList(allConcernLabels) : "this"
                  }`}
                  title="How long has this been going on?"
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

            {step === 4 && (
              <div>
                <StepHeading
                  eyebrow={
                    skinTypeLabel
                      ? `Good to know — you have ${skinTypeLabel.toLowerCase()} skin`
                      : "Let's talk sensitivity"
                  }
                  title="How sensitive is your skin, on a scale of 1-5?"
                  subtitle="This tells us how strong to make your actives."
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
                  eyebrow={`For your ${primaryConcernLabel}`}
                  title="Have you tried anything for it already?"
                  subtitle="So we know what hasn't worked yet — pick all that apply."
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
                  eyebrow="Just a quick safety check"
                  title="A few health questions"
                  subtitle="This helps our dermatologists keep your formula safe for you specifically."
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
                  </div>
                  <div>
                    <span className="mb-3 block text-base text-primary">
                      Are you allergic to any medications?
                    </span>
                    <YesNoGroup
                      value={answers.hasAllergy}
                      onChange={(v) => update("hasAllergy", v)}
                    />
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
                  eyebrow={`Your ${primaryConcernLabel} formula is almost ready`}
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
                      <span className="mb-2 block text-lg font-medium text-primary">Gender *</span>
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
                  eyebrow="One last thing"
                  title={`Hey ${answers.firstName || "there"}, where did you hear about us?`}
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
          nextDisabled={!canContinue}
          nextLabel={step === TOTAL_STEPS - 1 ? "Submit" : "Next"}
        />

        <TestimonialFloat step={step} />
      </ContainerLayout>
    </section>
  );
};

export default AssessmentForm;
