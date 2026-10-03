import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function ExperiencesCTA() {
  return (
    <div>
      {/* Newsletter Block */}
      <section className="bg-white py-14 sm:py-20 border-t border-gray6" id="experience-newsletter">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray6 bg-gray7/60 p-6 sm:p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiMail size={24} aria-hidden="true" />
            </div>
            <SectionHeading
              eyebrow="LOCAL SECRETS IN YOUR INBOX"
              title="Get secret spots & seasonal activity drops"
              text="Curated food stops, new artisan workshops, and seasonal excursion alerts sent twice monthly. Never spam."
              align="center"
              className="mb-6"
            />
            <div className="mx-auto max-w-md">
              <NewsletterForm layout="stacked" submitLabel="Subscribe to activity drops" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Conversion CTABanner */}
      <CTABanner
        variant="dark"
        layout="centered"
        eyebrow="TURN YOUR DESTINATION INTO AN EXPERIENCE"
        title="Find something memorable to do today"
        text="From artisan food walks and secret caves to evening monuments and immersive workshops."
        primaryAction={
          <Button
            href="#discover"
            variant="primary"
            size="lg"
            rightIcon={<FiArrowRight aria-hidden="true" />}
            data-analytics-id="experiences-final-cta"
          >
            Explore experiences
          </Button>
        }
        secondaryAction={
          <Button
            href="/tours"
            variant="outline"
            size="lg"
            className="!border-white/35 !text-white hover:!bg-white hover:!text-dark"
            data-analytics-id="experiences-final-tours-cta"
          >
            Browse multi-day tours
          </Button>
        }
      />
    </div>
  );
}
