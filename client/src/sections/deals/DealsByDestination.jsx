import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import DestinationCard from "@/components/shared/DestinationCard";

export default function DealsByDestination({ destinations = [] }) {
  // Hide destinations with zero deals per requirement
  const activeDestinations = destinations.filter((d) => d.count > 0);

  if (!activeDestinations.length) {
    return null;
  }

  return (
    <section className="border-t border-gray6 bg-gray7/40 py-12 sm:py-16 lg:py-20" id="deals-by-destination">
      <Container>
        <SectionHeading
          eyebrow="SAVINGS BY REGION"
          title="Destinations with active seasonal offers"
          text="Explore destinations where our local tour operators and guides have opened verified promotional allocations."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {activeDestinations.map((dest) => (
            <div key={dest.name} className="flex flex-col">
              <DestinationCard
                name={dest.name}
                image={dest.image}
                tours={dest.tours}
                href={`/deals?destination=${encodeURIComponent(dest.name)}#deals`}
                className="h-[180px] sm:h-[210px] lg:h-[240px]"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
