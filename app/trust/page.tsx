import TrustStories from "@/components/Trust/TrustStories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voices of Trust",
  description:
    "Real skin, real stories, real results — verified customer transformations across acne, hyperpigmentation, anti-aging, scarring, and skin-glow.",
  path: "/trust",
});

export default function VoicesOfTrustPage() {
  return <TrustStories />;
}
