import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Button from "@/components/ui/Button";
import { getTours } from "@/services/tourService";
import { FiArrowRight } from "react-icons/fi";

export default async function SpecialDeals() {
  const result = await getTours();
  const allTours = result.data || [];

  // Strictly filter only tours that have verified originalPrice > price
  const deals = allTours.filter(
    (tour) => tour.originalPrice && Number(tour.originalPrice) > Number(tour.price)
  ).slice(0, 4);

  // Per CRO rule: Hide the entire section if no authentic deals exist
  if (!deals.length) return null;

  return (
    <Section bg="dark" spacing="md" id="special-deals">
      <SectionHeading
        eyebrow="VERIFIED SEASONAL SAVINGS"
        title="Featured limited offers"
        text="Handpicked itineraries with confirmed rate reductions. Honest discounts without artificial urgency or hidden booking conditions."
        tone="light"
        action={
          <Button
            href="/tours"
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="special-deals-view-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            See all deals
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {deals.map((tour) => (
          <TourCard key={tour.id || tour.title} tour={tour} />
        ))}
      </div>
    </Section>
  );
}
