import CustomerReviews from "@/components/Home/CustomerReviews";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import MedicalExpertise from "@/components/Home/MedicalExpertise";
import PersonalisedExperience from "@/components/Home/PersonalisedExperience";
import PoweredByEvidence from "@/components/Home/PoweredByEvidence";
import SkinTransformationGallery from "@/components/Home/SkinTransformationGallery";
import { buildMetadata } from "@/lib/seo";

// No `title` passed — the homepage inherits the layout's default title as-is.
export const metadata = buildMetadata({ path: "/" });

export default function Home() {
  return (
    <div>
      <Hero />
      <CustomerReviews />
      <HowItWorks />
      <PersonalisedExperience />
      <PoweredByEvidence />
      <MedicalExpertise />
      <SkinTransformationGallery />
    </div>
  );
}
