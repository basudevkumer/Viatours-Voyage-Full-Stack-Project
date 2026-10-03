import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiUsers, FiArrowRight } from "react-icons/fi";

export default function ExperiencesGroupBanner() {
  return (
    <CTABanner
      eyebrow="PRIVATE & GROUP BUYOUTS"
      title="Planning for a family, celebration, or corporate team?"
      text="Reserve private departures with dedicated local hosts, customized pacing, and group pricing for 6 or more travelers."
      primaryAction={
        <Button
          href="#day-plan-inquiry"
          size="lg"
          rightIcon={<FiArrowRight aria-hidden="true" />}
          data-analytics-id="group-exp-request-cta"
        >
          Request a private or group experience
        </Button>
      }
      secondaryAction={
        <Button
          href="tel:18004536744"
          variant="outline"
          size="lg"
          leftIcon={<FiUsers aria-hidden="true" />}
          className="!border-white/35 !text-white hover:!bg-white hover:!text-dark"
          data-analytics-id="group-exp-call-cta"
        >
          Call a group specialist
        </Button>
      }
    />
  );
}
