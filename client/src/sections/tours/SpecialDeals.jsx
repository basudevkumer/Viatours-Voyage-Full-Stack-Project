import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Button from "@/components/ui/Button";
import { getDealTours } from "@/services/tourService";
import { FiArrowRight, FiTag } from "react-icons/fi";

export default async function SpecialDeals() {
  const dealsRes = await getDealTours();
  const deals = dealsRes.success ? dealsRes.data : [];

  // Hide the section entirely if no genuine deals exist
  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-20 bg-gray7/40 border-t border-b border-gray6" id="deals">
      <Container>
        <SectionHeading
          eyebrow="SEASONAL SAVINGS"
          title="Special rate departures, transparently priced"
          text="Verified early-bird and off-peak seasonal rates. Honest price reductions with zero artificial countdowns or fabricated scarcity."
          action={
            <Button
              href="#discover"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="tours-deals-view-all"
            >
              See all tours
            </Button>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.slice(0, 3).map((tour) => (
            <div key={tour.id} className="relative flex flex-col">
              <TourCard tour={tour} />
              <div className="mt-2 flex items-center justify-between px-2 caption text-text-secondary">
                <span className="flex items-center gap-1 text-success font-medium">
                  <FiTag aria-hidden="true" />
                  Save ${tour.originalPrice - tour.price} on select dates
                </span>
                <span>Verified seasonal rate</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
