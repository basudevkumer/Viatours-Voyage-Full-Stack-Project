import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import { FiCompass, FiActivity, FiMap, FiArrowRight } from "react-icons/fi";

const funnelCards = [
  {
    icon: FiCompass,
    title: "Multi-Day Guided Tours",
    text: "Fully coordinated itineraries with vetted accommodations, private transport, and native hosts.",
    href: "/tours",
    actionLabel: "Find a tour",
    analyticsId: "guide-funnel-tours",
  },
  {
    icon: FiActivity,
    title: "Short Local Experiences",
    text: "Handcrafted 2-to-6 hour activities, skip-the-line monument entries, and artisan food walks.",
    href: "/activities",
    actionLabel: "Find an experience",
    analyticsId: "guide-funnel-activities",
  },
  {
    icon: FiMap,
    title: "Complete Destination Guides",
    text: "Seasonal climate insights, regional customs, and neighborhood breakdowns across 16 global hubs.",
    href: "/destinations",
    actionLabel: "Choose a destination",
    analyticsId: "guide-funnel-destinations",
  },
];

export default function GuidePlanConfidence() {
  return (
    <section className="bg-gray7/40 py-14 sm:py-20 border-b border-gray6" id="plan-with-confidence">
      <Container>
        <SectionHeading
          eyebrow="READY FOR THE NEXT STEP?"
          title="Turn your reading into a confirmed itinerary"
          text="Explore Viatours Voyage products tailored to the journey style that suits you best."
          align="center"
          className="mb-10"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {funnelCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 sm:p-8 transition-all hover:border-gray5 hover:shadow-lg"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="title2 text-dark mb-2">{card.title}</h3>
                  <p className="body4 text-text-secondary leading-relaxed mb-6">{card.text}</p>
                </div>

                <Button
                  href={card.href}
                  variant="outline"
                  size="md"
                  rightIcon={<FiArrowRight aria-hidden="true" />}
                  data-analytics-id={card.analyticsId}
                  className="w-full justify-between group-hover:border-accent group-hover:text-accent"
                >
                  {card.actionLabel}
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
