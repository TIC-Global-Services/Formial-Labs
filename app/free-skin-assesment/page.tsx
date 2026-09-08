import AssessmentForm from "@/components/SkinAssessment/AssessmentForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Skin Assessment",
  description:
    "Answer a few questions about your skin and get a formula made specifically for you.",
  path: "/free-skin-assesment",
});

const FreeSkinAssessmentPage = () => {
  return <AssessmentForm />;
};

export default FreeSkinAssessmentPage;
