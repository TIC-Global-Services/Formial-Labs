"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { AssessmentAnswers, emptyAnswers } from "./assessmentData";
import ResultFAQ from "./ResultFAQ";
import ResultGuarantee from "./ResultGuarantee";
import ResultHero from "./ResultHero";
import ResultIngredients from "./ResultIngredients";
import ResultPlan from "./ResultPlan";
import ResultReviews from "./ResultReviews";
import ResultTeam from "./ResultTeam";
import SkinTransformationGallery from "../Home/SkinTransformationGallery";

const ResultView = () => {
  const [answers, setAnswers] = useState<AssessmentAnswers | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // sessionStorage and the URL are both browser-only, unavailable during
    // SSR, so this can only be read after mount.
    const raw = sessionStorage.getItem("formial_assessment");
    if (raw) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(JSON.parse(raw) as AssessmentAnswers);
      return;
    }

    // No session on this device — this is likely a link someone shared.
    // Rebuild a lightweight, read-only view from the URL instead.
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (!name) return;
    const concern = params.get("concern");
    setAnswers({
      ...emptyAnswers,
      firstName: name,
      concerns: concern ? [concern] : [],
    });
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Formial Labs formula", url });
      } catch {
        // user dismissed the share sheet
      }
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Clipboard API unavailable (older browser or insecure context) —
        // fall back to the legacy hidden-textarea copy trick.
        const input = document.createElement("textarea");
        input.value = url;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied — nothing more we can do silently
    }
  };

  if (!answers) {
    return (
      <section className="bg-white py-24">
        <ContainerLayout className="mx-auto max-w-xl text-center">
          <h1 className="font-aeonik text-2xl text-primary sm:text-3xl">
            We couldn&apos;t find your results.
          </h1>
          <p className="mt-3 text-sm leading-tight text-[#525252]">
            Take the skin assessment to get your personalized formula.
          </p>
          <Link
            href="/free-skin-assesment"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-obviously text-sm font-bold uppercase tracking-widest text-white"
          >
            Start Assessment
          </Link>
        </ContainerLayout>
      </section>
    );
  }

  return (
    <>
      <ResultHero firstName={answers.firstName || "there"} copied={copied} onShare={handleShare} />
      <ResultPlan answers={answers} />
      <ResultIngredients />
      <ResultGuarantee />
      <ResultTeam />
      <ResultReviews />
      <ResultFAQ />
      <SkinTransformationGallery />
    </>
  );
};

export default ResultView;
