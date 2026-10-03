import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import { FiArrowRight, FiCompass, FiMapPin, FiCalendar } from "react-icons/fi";

export default function DealsInspiration({ guides = [] }) {
  if (!guides.length) return null;

  return (
    <section className="bg-gray7/40 py-12 sm:py-16 lg:py-20" id="deals-inspiration">
      <Container>
        <SectionHeading
          eyebrow="DESTINATION INTEL & TIMING"
          title="Plan around the best seasons"
          text="Deepen your trip planning with our curated guides on off-peak timing, shoulder-season weather, and cultural etiquette."
          action={
            <Button
              href="/travel-guide"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="deals-inspiration-view-all"
            >
              All travel guides
            </Button>
          }
        />

        {/* 3 Guide Articles */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 3).map((guide) => (
            <BlogCard
              key={guide.slug}
              title={guide.title}
              excerpt={guide.excerpt}
              category={guide.category}
              date={guide.date}
              author={guide.author?.name || guide.author}
              image={guide.image}
              href={`/travel-guide/${guide.slug}`}
            />
          ))}
        </div>

        {/* Cross-catalog Navigation Links */}
        <div className="mt-12 rounded-2xl border border-gray6 bg-white p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="title2 text-dark">Explore the wider Viatours catalog</h3>
              <p className="body4 mt-1 text-text-secondary">
                Compare over 500+ curated itineraries and bespoke small-group experiences.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href="/tours"
                variant="outline"
                size="sm"
                data-analytics-id="deals-crosslink-tours"
              >
                All tours
              </Button>
              <Button
                href="/activities"
                variant="outline"
                size="sm"
                data-analytics-id="deals-crosslink-experiences"
              >
                Experiences
              </Button>
              <Button
                href="/destinations"
                variant="outline"
                size="sm"
                data-analytics-id="deals-crosslink-destinations"
              >
                Destinations
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
