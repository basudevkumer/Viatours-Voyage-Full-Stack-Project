import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiUsers, FiArrowRight } from "react-icons/fi";
import { contactUrl } from "@/lib/routes";

export default function GroupTravel() {
  return (
    <div id="group-travel">
      <CTABanner
        variant="dark"
        layout="split"
        eyebrow="PRIVATE GROUPS & CORPORATE RETREATS"
        title="Traveling with a party of 8 or more?"
        text="Whether organizing a milestone family gathering, private club excursion, or executive offsite, our bespoke desk arranges dedicated motorcoaches, boutique buyouts, and personalized host managers."
        primaryAction={
          <Button
            href={contactUrl({ type: "group", source: "home-group-travel" })}
            variant="primary"
            size="lg"
            data-analytics-id="group-travel-quote-cta"
            leftIcon={<FiUsers aria-hidden="true" />}
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Request a group quote
          </Button>
        }

        secondaryAction={
          <Button
            href="#plan-my-trip"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="group-travel-inquiry-link"
          >
            Custom itinerary inquiry
          </Button>
        }
      />
    </div>
  );
}
