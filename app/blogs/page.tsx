import UnderConstruction from "@/components/Reusable/UnderConstruction";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blogs",
  description: "Skincare science, ingredient deep-dives, and dermatologist insights from the Formial Labs team.",
  path: "/blogs",
});

export default function BlogsPage() {
  return <UnderConstruction title="Blogs" />;
}
