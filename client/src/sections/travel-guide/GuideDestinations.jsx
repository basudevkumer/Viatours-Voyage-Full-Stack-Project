import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import DestinationCard from "@/components/shared/DestinationCard";
import Button from "@/components/ui/Button";
import { getFeaturedDestinations } from "@/services/destinationService";
import { FiArrowRight } from "react-icons/fi";

export default async function GuideDestinations() {
  const result = await getFeaturedDestinations();
  const destinations = result.success ? result.data.slice(0, 6) : [];

  return (
    <section className="bg-white py-14 sm:py-20" id="guide-destinations">
      <Container>
        <SectionHeading
          eyebrow="DESTINATION DIRECTORY"
          title="Browse field notes by destination"
          text="Deepen your trip planning with dedicated regional guides, curated packing notes, and local seasonal timing."
          action={
            <Button
              href="/destinations"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="guide-all-destinations-cta"
            >
              All destination guides
            </Button>
          }
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {destinations.map((dest) => (
            <div key={dest.id || dest.slug} className="group flex flex-col">
              <DestinationCard
                image={dest.image}
                name={dest.name || dest.city}
                tours={`${dest.toursCount || "100+"} tours`}
                href={`/destinations/${dest.slug}`}
                className="shadow-xs"
              />
              <a
                href={`/travel-guide?destination=${encodeURIComponent(dest.slug)}#guides`}
                className="mt-2 text-center caption font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent py-1"
                data-analytics-id={`guide-dest-filter-${dest.slug}`}
              >
                Read {dest.name || dest.city} guides
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
