import PageHero from "@/components/shared/PageHero";
import Button from "@/components/ui/Button";
import allImages from "@/components/helper/imageProvider";
import { FiCheckCircle, FiShield, FiTag, FiClock } from "react-icons/fi";

const { trendingDestinations } = allImages;

export default function DealsHero() {
  const reassuranceItems = [
    {
      icon: <FiTag className="text-accent" aria-hidden="true" />,
      text: "Audited seasonal rates",
    },
    {
      icon: <FiShield className="text-success" aria-hidden="true" />,
      text: "Free cancellation on select dates",
    },
    {
      icon: <FiCheckCircle className="text-accent" aria-hidden="true" />,
      text: "Transparent upfront pricing",
    },
    {
      icon: <FiClock className="text-accent" aria-hidden="true" />,
      text: "No fake countdown clocks",
    },
  ];

  return (
    <PageHero
      eyebrow="VERIFIED SEASONAL SAVINGS & OPERATOR PROMOTIONS"
      title="Travel deals worth planning around"
      text="Hand-negotiated rate reductions across boutique tours and small-group experiences. Honest strikethrough pricing verified against standard seasonal tariffs — with zero artificial countdowns or manufactured urgency."
      actions={
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Button
            href="#deals"
            size="lg"
            data-analytics-id="deals-hero-primary"
            className="hover:!bg-white hover:!text-accent"
          >
            See current deals
          </Button>
          <Button
            href="#deal-alerts"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="deals-hero-alerts"
          >
            Get deal alerts
          </Button>
        </div>
      }
      media={{
        src: trendingDestinations[0].image,
        alt: "Curated seasonal travel itineraries with verified rate reductions",
        aspect: "aspect-[4/3]",
      }}
    >
      <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:flex sm:flex-wrap sm:gap-6">
        {reassuranceItems.map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            <span className="shrink-0 text-base sm:text-lg">{item.icon}</span>
            <span className="caption font-medium text-white/85 sm:body5 sm:text-white/90">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
