"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { AssessmentAnswers, emptyAnswers } from "./assessmentData";
import { fetchAssessment } from "@/lib/assessmentApi";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sessionStorage and the URL are both browser-only, unavailable during
    // SSR, so this can only be read after mount.
    const params = new URLSearchParams(window.location.search);
    const submissionId = params.get("submissionId");
    const name = params.get("name");
    const concern = params.get("concern");

    const fromSession = (): AssessmentAnswers | null => {
      try {
        const raw = sessionStorage.getItem("formial_assessment");
        return raw ? ({ ...emptyAnswers, ...JSON.parse(raw) } as AssessmentAnswers) : null;
      } catch {
        return null;
      }
    };

    // Lightweight, read-only view rebuilt from the URL alone.
    const fromUrl = (): AssessmentAnswers | null =>
      name
        ? { ...emptyAnswers, firstName: name, concerns: concern ? [concern] : [] }
        : null;

    // A submissionId in the link is the source of truth, so a stale session on
    // this device can't override it. Session/URL only back it up on failure.
    if (!submissionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(fromSession() ?? fromUrl());
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetchAssessment(submissionId)
      .then((data) => (data ? { ...emptyAnswers, ...data } : null))
      .catch(() => null)
      .then((fetched) => {
        if (cancelled) return;
        setAnswers(fetched ?? fromSession() ?? fromUrl());
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
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

  if (loading) return null;

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
      <ResultHero
        firstName={answers.firstName.trim().split(/\s+/)[0] || "there"}
        copied={copied}
        onShare={handleShare}
        answers={answers}
      />
      <ResultPlan answers={answers} />
      <ResultIngredients answers={answers} />
      <ResultGuarantee />
      <ResultTeam />
      <ResultReviews />
      <ResultFAQ />
      <SkinTransformationGallery />
    </>
  );
};

export default ResultView;
