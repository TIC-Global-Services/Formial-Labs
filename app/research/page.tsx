import UnderConstruction from "@/components/Reusable/UnderConstruction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Research",
  description: "The clinical research and evidence behind Formial Labs' personalized dermatology formulations.",
  path: "/research",
});

export default function ResearchPage() {
  return <UnderConstruction title="Research" />;
}
