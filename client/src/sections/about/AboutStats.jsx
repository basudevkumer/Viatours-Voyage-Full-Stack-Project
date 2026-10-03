import Container from "@/components/shared/Container";
import StatsBar from "@/components/shared/StatsBar";

export default function AboutStats({ statsList = [] }) {
  if (!statsList.length) return null;

  return (
    <section className="border-b border-gray6 bg-white py-4" aria-label="Catalog statistics">
      <Container>
        <div className="py-4 text-center sm:py-6">
          <span className="caption uppercase tracking-wider text-accent font-semibold">
            LIVE CATALOG COUNTS
          </span>
          <h2 className="title2 mt-1 text-dark sm:title1">
            Curated scale across our active destinations
          </h2>
          <p className="body4 mx-auto mt-2 max-w-xl text-text-secondary">
            Every itinerary and host experience on Viatours Voyage is individually inspected. All numbers below are computed directly from our active catalog.
          </p>
        </div>
      </Container>
      <StatsBar items={statsList} className="border-t border-gray6" />
    </section>
  );
}
