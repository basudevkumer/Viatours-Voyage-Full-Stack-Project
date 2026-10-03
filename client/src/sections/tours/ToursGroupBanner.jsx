import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiUsers, FiArrowRight } from "react-icons/fi";

export default function ToursGroupBanner() {
  return (
    <CTABanner
      variant="dark"
      layout="split"
      eyebrow="PRIVATE & GROUP DEPARTURES"
      title="Planning a private departure or group tour of 8+?"
      text="From family reunions and wedding guests to corporate team summits and alumni clubs. Enjoy private motorcoach transfers, custom itineraries, dedicated tour directors, and flexible tiered payment schedules."
      primaryAction={
        <Button
          href="#custom-trip-request"
          variant="primary"
          size="md"
          data-analytics-id="tours-group-quote-cta"
          rightIcon={<FiArrowRight aria-hidden="true" />}
        >
          Request a group quote
        </Button>
      }
      secondaryAction={
        <Button
          href="/contact"
          variant="outline"
          size="md"
          className="border-white/30 text-white hover:bg-white/10"
          data-analytics-id="tours-group-contact-cta"
          leftIcon={<FiUsers aria-hidden="true" />}
        >
          Contact group desk
        </Button>
      }
      className="border-t border-b border-gray6"
    />
  );
}
