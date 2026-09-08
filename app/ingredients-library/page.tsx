import UnderConstruction from "@/components/Reusable/UnderConstruction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ingredients Library",
  description: "Explore the medical-grade active ingredients Formial Labs dermatologists compound into your personalized formula.",
  path: "/ingredients-library",
});

export default function IngredientsLibraryPage() {
  return <UnderConstruction title="Ingredients Library" />;
}
