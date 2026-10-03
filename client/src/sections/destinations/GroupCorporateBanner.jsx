import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiUsers, FiArrowRight } from "react-icons/fi";

export default function GroupCorporateBanner() {
  return (
    <CTABanner
      variant="dark"
      layout="split"
      eyebrow="GROUP & CORPORATE TRAVEL"
      title="Organizing a journey for 8 or more travelers?"
      text="From milestone family reunions and wedding guest logistics to corporate executive retreats. Enjoy dedicated trip coordinators, custom motorcoach transfers, group lodging concessions, and flexible deposit schedules."
      primaryAction={
        <Button
          href="#plan-my-trip"
          variant="primary"
          size="md"
          data-analytics-id="group-quote-cta"
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
          data-analytics-id="group-contact-cta"
          leftIcon={<FiUsers aria-hidden="true" />}
        >
          Contact group desk
        </Button>
      }
      className="border-t border-b border-gray6"
    />
  );
}
