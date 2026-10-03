import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function ToursFinalCTA() {
  return (
    <div>
      {/* Newsletter Block */}
      <section className="bg-white py-14 sm:py-20 border-t border-gray6" id="newsletter">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray6 bg-gray7/60 p-6 sm:p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiMail size={24} aria-hidden="true" />
            </div>
            <SectionHeading
              eyebrow="STAY INSPIRED"
              title="Get seasonal tour releases & travel alerts"
              text="Curated route launches, seasonal weather updates, and early-bird departure notifications. No spam, ever."
              align="center"
              className="mb-6"
            />
            <div className="mx-auto max-w-md">
              <NewsletterForm layout="stacked" submitLabel="Subscribe to tour updates" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Conversion CTABanner */}
      <CTABanner
        variant="dark"
        layout="centered"
        eyebrow="START PLANNING TODAY"
        title="Ready to find a tour that feels like yours?"
        text="Choose your preferred travel style, explore our vetted departures, or let our specialists craft a custom private itinerary."
        primaryAction={
          <Button
            href="#discover"
            variant="primary"
            size="md"
            data-analytics-id="tours-final-explore-cta"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Explore all tours
          </Button>
        }
        secondaryAction={
          <Button
            href="#custom-trip-request"
            variant="outline"
            size="md"
            className="border-white/30 text-white hover:bg-white/10"
            data-analytics-id="tours-final-plan-cta"
          >
            Plan custom trip
          </Button>
        }
      />
    </div>
  );
}
