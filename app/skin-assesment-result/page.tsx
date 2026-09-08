import ResultView from "@/components/SkinAssessment/ResultView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Your Results",
  description: "Your personalized skincare formula, based on your assessment.",
  path: "/skin-assesment-result",
  // Personalized per visitor via query params — not a page worth indexing.
  noIndex: true,
});

const SkinAssessmentResultPage = () => {
  return <ResultView />;
};

export default SkinAssessmentResultPage;
