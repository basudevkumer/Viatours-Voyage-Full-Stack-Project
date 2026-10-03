import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";

const FinalCTA = () => (
  <div data-home-final-cta id="final-cta">
    <CTABanner
      variant="gradient"
      layout="split"
      eyebrow="READY WHEN YOU ARE"
      title="Your next extraordinary journey begins here."
      text="Tell us what you have in mind, or explore our handpicked itineraries with full booking flexibility and 24/7 care."
      primaryAction={
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Button
            href="/contact"
            variant="white"
            size="lg"
            data-analytics-id="final-cta-start-planning"
            rightIcon={<FiArrowRight aria-hidden="true" />}
            className="shrink-0 shadow-lg"
          >
            Start planning your trip
          </Button>

          <p className="body5 flex items-center gap-1.5 text-white/90">
            <FiPhoneCall aria-hidden="true" className="shrink-0" />
            Prefer to talk? Call our specialists at{" "}
            <a href="tel:18004536744" className="font-semibold underline underline-offset-2 hover:text-white">
              1-800-453-6744
            </a>
          </p>
        </div>
      }
    />
  </div>
);

export default FinalCTA;
