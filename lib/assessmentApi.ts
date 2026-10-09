import type { AssessmentAnswers } from "@/components/SkinAssessment/assessmentData";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
// Only for results links created before the backend took over (those ids live
// in the Google Sheet, not in Mongo).
const LEGACY_APP_SCRIPT_URL = process.env.NEXT_PUBLIC_APP_SCRIPT_URL;

// The backend stores the answers in Mongo, then forwards them to the Apps
// Script (sheet + emails) and SagePilot.
export const submitAssessment = async (
  answers: AssessmentAnswers,
): Promise<string | null> => {
  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not set; assessment was not saved");
    return null;
  }
  const res = await fetch(`${API_URL}/api/assessments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.success && data.submissionId ? String(data.submissionId) : null;
};

const fetchLegacyAssessment = async (
  submissionId: string,
): Promise<Partial<AssessmentAnswers> | null> => {
  if (!LEGACY_APP_SCRIPT_URL) return null;
  const url = new URL(LEGACY_APP_SCRIPT_URL);
  url.searchParams.set("submissionId", submissionId);
  const res = await fetch(url);
  const data = await res.json();
  return data.ok && data.answers ? data.answers : null;
};

export const fetchAssessment = async (
  submissionId: string,
): Promise<Partial<AssessmentAnswers> | null> => {
  if (API_URL) {
    try {
      const res = await fetch(
        `${API_URL}/api/assessments/${encodeURIComponent(submissionId)}`,
      );
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.answers) return data.answers;
      }
    } catch {
      // fall through to the legacy lookup
    }
  }
  return fetchLegacyAssessment(submissionId);
};
