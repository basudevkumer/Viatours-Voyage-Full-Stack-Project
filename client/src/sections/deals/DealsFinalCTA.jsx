import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";

export default function DealsFinalCTA() {
  return (
    <div id="deals-final-cta">
      {/* Newsletter Block */}
      <section className="border-t border-gray6 bg-bg-card py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <SectionHeading
              eyebrow="STAY INFORMED"
              title="Verified deals delivered monthly"
              text="Get our curated monthly dispatch with verified seasonal operator rates and destination timing guides. No marketing noise, no spam."
              align="center"
              className="mb-6"
            />
            <NewsletterForm
              layout="stacked"
              buttonLabel="Subscribe for alerts"
              className="mx-auto max-w-md"
            />
          </div>
        </Container>
      </section>

      {/* Final CTABanner */}
      <CTABanner
        eyebrow="START PLANNING"
        title="Find an itinerary worth remembering"
        text="Whether you choose a featured promotional departure or a classic boutique route, experience travel with verified quality and 24/7 care."
        variant="dark"
        layout="centered"
        primaryAction={
          <Button
            href="/tours"
            size="lg"
            data-analytics-id="deals-final-cta-primary"
            className="hover:!bg-white hover:!text-accent"
          >
            Explore all tours
          </Button>
        }
        secondaryAction={
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="deals-final-cta-secondary"
          >
            Speak to our team
          </Button>
        }
      />
    </div>
  );
}
