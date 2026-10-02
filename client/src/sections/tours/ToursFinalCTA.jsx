import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function ToursFinalCTA() {
  return <CTABanner eyebrow="YOUR NEXT ADVENTURE STARTS HERE" title="Find a journey that feels like yours." text="Choose your travel style, discover somewhere new and start planning a story worth remembering." primaryAction={<Button href="#discover" size="lg" rightIcon={<FiArrowRight />} data-analytics-id="tours-final-cta">Explore tours</Button>} secondaryAction={<Button href="/contact" variant="outline" size="lg" className="!border-white/35 !text-white hover:!bg-white hover:!text-dark">Contact us</Button>} />;
}
