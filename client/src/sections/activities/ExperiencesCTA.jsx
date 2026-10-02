import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function ExperiencesCTA() {
  return <CTABanner eyebrow="TURN YOUR DESTINATION INTO AN EXPERIENCE" title="Find something memorable to do." text="From local food and culture to adventure, nature and everything in between." primaryAction={<Button href="#discover" size="lg" rightIcon={<FiArrowRight />} data-analytics-id="experiences-final-cta">Explore experiences</Button>} secondaryAction={<Button href="/tours" variant="outline" size="lg" className="!border-white/35 !text-white hover:!bg-white hover:!text-dark">Browse tours</Button>} />;
}
