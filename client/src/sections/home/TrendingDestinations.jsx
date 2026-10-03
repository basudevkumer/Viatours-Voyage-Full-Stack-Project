import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import DestinationCard from "@/components/shared/DestinationCard";
import Button from "@/components/ui/Button";
import { getDestinations } from "@/services/destinationService";
import { FiArrowRight } from "react-icons/fi";

export default async function TrendingDestinations() {
  const result = await getDestinations();
  const destinations = (result.data || []).slice(0, 8);

  return (
    <Section bg="grey" spacing="md" id="trending-destinations">
      <SectionHeading
        eyebrow="DESTINATION INSPIRATION"
        title="Trending destinations"
        text="Discover where curious travelers are heading next, from coastal sanctuaries to ancient mountain valleys."
        action={
          <Button
            href="/destinations"
            variant="outline"
            size="sm"
            data-analytics-id="trending-destinations-view-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            View all destinations
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {destinations.map((item) => (
          <DestinationCard
            key={item.id || item.city}
            image={item.image}
            name={item.city}
            tours={item.tours ? `${item.tours} tours` : "Curated tours"}
            href={`/destinations/${encodeURIComponent(item.city.toLowerCase().replaceAll(" ", "-"))}`}
            className="h-[170px] sm:h-[200px] lg:h-[230px]"
            data-analytics-id="destination-card-click"
          />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/destinations"
          data-analytics-id="trending-destinations-view-all-mobile"
          className="title4 inline-flex items-center gap-1.5 text-dark hover:text-accent"
        >
          View all destinations <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
