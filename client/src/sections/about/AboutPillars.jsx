import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function AboutPillars({ pillars = [], stats = {} }) {
  if (!pillars.length) return null;

  const countLabels = {
    destinations: stats.destinationsCount
      ? `${stats.destinationsCount} destinations available`
      : null,
    tours: stats.toursCount
      ? `${stats.toursCount} curated itineraries`
      : null,
    experiences: stats.experiencesCount
      ? `${stats.experiencesCount} day experiences`
      : null,
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="what-we-do">
      <Container>
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="Three pillars of considered travel"
          text="We combine broad regional intelligence, fully coordinated multi-day routes, and focused small-group day excursions into one coherent platform."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-gray6 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Media banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray7">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {countLabels[pillar.id] && (
                  <span className="caption absolute bottom-3 left-3 rounded-full bg-dark/85 px-3 py-1 font-semibold text-white backdrop-blur-xs shadow-xs">
                    {countLabels[pillar.id]}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="heading text-xl font-bold text-dark sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="caption mt-1 font-semibold text-accent">
                    {pillar.tagline}
                  </p>
                  <p className="body4 mt-3 text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-gray6 pt-5">
                  <Button
                    href={pillar.href}
                    variant="outline"
                    size="sm"
                    fullWidth
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                    data-analytics-id={`about-pillar-${pillar.id}`}
                  >
                    {pillar.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
