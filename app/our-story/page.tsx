import Hero from "@/components/OurStory/Hero";
import InnovativeFormula from "@/components/OurStory/InnovativeFormula";
import GlobalExpertise from "@/components/OurStory/GlobalExpertise";
import TeamSpotlight from "@/components/OurStory/TeamSpotlight";
import SkincareComparison from "@/components/OurStory/SkincareComparison";
import InstagramCTA from "@/components/OurStory/InstagramCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Story",
  description: "Meet the dermatologists and formulation experts behind Formial Labs, and the science behind personalized skincare.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <div>
      <Hero />
      <InnovativeFormula />
      <GlobalExpertise />
      <TeamSpotlight />
      <SkincareComparison />
      <InstagramCTA />
    </div>
  );
}
