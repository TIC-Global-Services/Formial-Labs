import UnderConstruction from "@/components/Reusable/UnderConstruction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Join the Formial Labs team building personalized, dermatologist-led skincare.",
  path: "/careers",
});

export default function CareersPage() {
  return <UnderConstruction title="Careers" />;
}
