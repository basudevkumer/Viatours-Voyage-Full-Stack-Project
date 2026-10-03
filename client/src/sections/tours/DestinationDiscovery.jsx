import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import DestinationCard from "@/components/shared/DestinationCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { trendingDestinations } from "./data";
import { FiArrowRight } from "react-icons/fi";

const destinationSlugs = [
  { name: "Paris", slug: "paris", image: trendingDestinations[0].image, count: "6 tours" },
  { name: "Rome", slug: "rome", image: trendingDestinations[2].image, count: "6 tours" },
  { name: "Bali", slug: "bali", image: trendingDestinations[4].image, count: "7 tours" },
  { name: "Tokyo", slug: "tokyo", image: trendingDestinations[6].image, count: "8 tours" },
  { name: "Cappadocia", slug: "cappadocia", image: trendingDestinations[7].image, count: "4 tours" },
  { name: "Dubai", slug: "dubai", image: trendingDestinations[8].image, count: "5 tours" },
  { name: "Barcelona", slug: "barcelona", image: trendingDestinations[9].image, count: "6 tours" },
  { name: "Santorini", slug: "santorini", image: trendingDestinations[15].image, count: "6 tours" },
];

export default function DestinationDiscovery() {
  return (
    <section className="bg-white py-14 sm:py-20" id="destinations">
      <Container>
        <SectionHeading
          eyebrow="GLOBAL HUBS"
          title="Explore tours by iconic destination"
          text="Browse handcrafted departures across world capitals, island archipelagos, and ancient trade routes."
          action={
            <Button
              href="/destinations"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="tours-explore-all-destinations"
            >
              All destinations
            </Button>
          }
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {destinationSlugs.map((dest) => (
            <div key={dest.slug} className="group flex flex-col">
              <DestinationCard
                image={dest.image}
                name={dest.name}
                tours={dest.count}
                href={`/destinations/${dest.slug}`}
                className="shadow-xs hover:shadow-md"
              />
              <div className="mt-2 text-center">
                <Link
                  href={`/tours?destination=${encodeURIComponent(dest.name)}#discover`}
                  className="caption text-accent hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  data-analytics-id={`tours-dest-filter-${dest.slug}`}
                >
                  View {dest.name} tours <FiArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
