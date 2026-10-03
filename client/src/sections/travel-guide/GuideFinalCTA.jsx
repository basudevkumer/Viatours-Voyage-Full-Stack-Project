import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function GuideFinalCTA() {
  return (
    <CTABanner
      variant="dark"
      layout="centered"
      eyebrow="READY TO EXPLORE?"
      title="Turn inspiration into your next journey"
      text="Browse our archive of field notes, choose a destination, or connect with our coordinators for a custom private itinerary."
      primaryAction={
        <Button
          href="#guides"
          variant="primary"
          size="lg"
          rightIcon={<FiArrowRight aria-hidden="true" />}
          data-analytics-id="guide-final-browse-cta"
        >
          Explore all travel guides
        </Button>
      }
      secondaryAction={
        <Button
          href="/tours"
          variant="outline"
          size="lg"
          className="!border-white/35 !text-white hover:!bg-white hover:!text-dark"
          data-analytics-id="guide-final-tours-cta"
        >
          Browse multi-day tours
        </Button>
      }
    />
  );
}
