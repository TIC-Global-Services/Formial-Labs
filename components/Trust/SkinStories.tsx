import ContainerLayout from "@/components/Reusable/ContainerLayout";
import Flipbook, { FlipbookSpread } from "./Flipbook";

const TOTAL_SPREADS = 5;

const spreads: FlipbookSpread[] = Array.from({ length: TOTAL_SPREADS }, (_, i) => ({
  left: `/assets/trust/flipbook/left-${i + 1}.png`,
  right: `/assets/trust/flipbook/right-${i + 1}.png`,
  alt: `Customer progress notes, spread ${i + 1}`,
}));

const gridBackground = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,71,99,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,99,0.08) 1px, transparent 1px)",
  backgroundSize: "150px 150px",
};

const SkinStories = () => (
  <section className="relative w-full bg-background py-20 lg:py-28" style={gridBackground}>
    <ContainerLayout>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-aeonik text-5xl tracking-tight text-primary sm:text-7xl">
            Skin Stories
          </h2>
          <p className="mt-1 font-aeonik text-xl text-primary/90 sm:text-4xl">
            Results that keep up with your skin.
          </p>
        </div>
        <p className="max-w-xl text-sm text-primary/70 sm:text-base lg:text-lg">
          Every skin journey is different. From years of trying products that didn&apos;t work to
          finally finding a routine that feels right, our customers share their real experiences,
          challenges, and progress. Explore their stories and see how personalised skincare can
          make the journey simpler, more effective, and easier to understand.
        </p>
      </div>

      <div className="mt-14 lg:mt-20">
        <Flipbook spreads={spreads} />
      </div>
    </ContainerLayout>
  </section>
);

export default SkinStories;
