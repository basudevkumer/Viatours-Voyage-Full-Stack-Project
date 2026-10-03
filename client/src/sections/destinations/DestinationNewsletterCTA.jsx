import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function DestinationNewsletterCTA() {
  return (
    <div>
      {/* Newsletter Block */}
      <section className="bg-white py-16 sm:py-20 border-t border-gray6" id="newsletter">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray6 bg-gray7/60 p-6 sm:p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiMail size={24} aria-hidden="true" />
            </div>
            <SectionHeading
              eyebrow="DESTINATION DISPATCH"
              title="Get seasonal guides & destination alerts"
              text="Curated travel advice, secret viewpoints, and new itinerary releases delivered straight to your inbox. No spam, ever."
              align="center"
              className="mb-6"
            />
            <div className="mx-auto max-w-md">
              <NewsletterForm layout="stacked" submitLabel="Subscribe to updates" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Conversion CTABanner */}
      <CTABanner
        variant="dark"
        layout="centered"
        eyebrow="START YOUR JOURNEY"
        title="Ready to turn your travel vision into an itinerary?"
        text="Whether you're ready to book handcrafted day tours or want our coordinators to design a multi-city route, we're here to guide every step."
        primaryAction={
          <Button
            href="#plan-my-trip"
            variant="primary"
            size="md"
            data-analytics-id="final-plan-trip-cta"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Plan your trip
          </Button>
        }
        secondaryAction={
          <Button
            href="/tours"
            variant="outline"
            size="md"
            className="border-white/30 text-white hover:bg-white/10"
            data-analytics-id="final-browse-tours-cta"
          >
            Browse all tours
          </Button>
        }
      />
    </div>
  );
}
