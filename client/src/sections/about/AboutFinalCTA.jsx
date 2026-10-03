import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { contactUrl } from "@/lib/routes";


export default function AboutFinalCTA() {
  return (
    <div id="about-final-cta">
      {/* Newsletter Block */}
      <section className="border-t border-gray6 bg-bg-card py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <SectionHeading
              eyebrow="MONTHLY DISPATCH"
              title="Travel stories and seasonal insights"
              text="Subscribe to our monthly newsletter for quiet travel inspiration, regional planning guides, and behind-the-scenes operator stories."
              align="center"
              className="mb-6"
            />
            <NewsletterForm
              layout="stacked"
              buttonLabel="Subscribe to dispatch"
              className="mx-auto max-w-md"
            />
          </div>
        </Container>
      </section>

      {/* Final CTABanner */}
      <CTABanner
        eyebrow="READY TO EXPLORE?"
        title="Experience travel planned with integrity"
        text="Whether you choose a handcrafted multi-day route or an intimate day experience, travel with transparent pricing and 24/7 coordinator support."
        variant="dark"
        layout="centered"
        primaryAction={
          <Button
            href="/tours"
            size="lg"
            data-analytics-id="about-final-explore-tours"
            className="hover:!bg-white hover:!text-accent"
          >
            Explore all tours
          </Button>
        }
        secondaryAction={
          <Button
            href={contactUrl({ type: "trip", source: "about-final-cta" })}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="about-final-contact"
          >
            Contact our desk
          </Button>
        }

      />
    </div>
  );
}
