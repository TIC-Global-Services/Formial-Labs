import type { AssessmentAnswers } from "@/components/SkinAssessment/assessmentData";

const APP_SCRIPT_URL = process.env.NEXT_PUBLIC_APP_SCRIPT_URL;

// text/plain keeps this a "simple" CORS request, so the browser skips the
// preflight that Apps Script Web Apps don't answer.
export const submitAssessment = async (
  answers: AssessmentAnswers,
): Promise<string | null> => {
  if (!APP_SCRIPT_URL) {
    console.error("NEXT_PUBLIC_APP_SCRIPT_URL is not set; assessment was not saved");
    return null;
  }
  const res = await fetch(APP_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(answers),
  });
  const data = await res.json();
  return data.ok && data.submissionId ? String(data.submissionId) : null;
};

export const fetchAssessment = async (
  submissionId: string,
): Promise<Partial<AssessmentAnswers> | null> => {
  if (!APP_SCRIPT_URL) return null;
  const url = new URL(APP_SCRIPT_URL);
  url.searchParams.set("submissionId", submissionId);
  const res = await fetch(url);
  const data = await res.json();
  return data.ok && data.answers ? data.answers : null;
};
