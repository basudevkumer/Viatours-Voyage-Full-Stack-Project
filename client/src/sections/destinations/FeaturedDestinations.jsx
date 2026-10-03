import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import PriceTag from "@/components/ui/PriceTag";
import { destinationsData } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedDestinations() {
  const featured = destinationsData.filter((d) => d.featured);
  const spotlight = featured[0] || destinationsData[0];
  const compact = featured.slice(1, 4);

  return (
    <Section bg="white" spacing="md" id="featured-destinations">
      <SectionHeading
        eyebrow="EDITORIAL SPOTLIGHT"
        title="Featured destinations"
        text="Handcrafted routes with verified native guides, exceptional local culinary culture, and flexible booking."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 1 Large Spotlight Destination (7 cols on lg) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray6 bg-dark text-white shadow-md transition-shadow hover:shadow-xl lg:col-span-7">
          <div className="relative min-h-[300px] w-full flex-1 overflow-hidden sm:min-h-[360px] lg:min-h-[420px]">
            <Image
              src={spotlight.image}
              alt={`${spotlight.name}, ${spotlight.country}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent"
            />

            <Badge variant="accent" className="absolute left-5 top-5 shadow-lg">
              Spotlight Pick
            </Badge>

            <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 body5 font-medium text-white backdrop-blur-md">
              {spotlight.toursCount} Curated Tours
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8">
            <p className="caption text-white/70">{spotlight.region} · {spotlight.country}</p>
            <h3 className="heading mt-2 !text-2xl sm:!text-3xl text-white">
              {spotlight.name}
            </h3>
            <p className="body3 mt-2 line-clamp-2 max-w-xl text-white/80">
              {spotlight.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
              <PriceTag
                price={spotlight.startingPrice}
                tone="dark"
                prefix="Tours from"
                suffix="/ person"
                size="md"
              />

              <Button
                href={`/destinations/${spotlight.slug}`}
                variant="white"
                size="md"
                data-analytics-id={`featured-spotlight-${spotlight.slug}`}
                rightIcon={<FiArrowRight aria-hidden="true" />}
              >
                Explore {spotlight.name}
              </Button>
            </div>
          </div>
        </div>

        {/* 3 Compact Cards (5 cols on lg) */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {compact.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray6 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36">
                <Image
                  src={item.image}
                  alt={`${item.name}, ${item.country}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 150px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge variant="light" className="absolute left-2 top-2 shadow-xs !text-[11px] !px-2 !py-0.5">
                  {item.toursCount} tours
                </Badge>
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-between sm:mt-0">
                <div>
                  <p className="body5 text-text-secondary">{item.country} · {item.region}</p>
                  <h4 className="title2 mt-0.5 text-dark group-hover:text-accent transition-colors">
                    {item.name}
                  </h4>
                  <p className="body5 mt-1 line-clamp-1 text-text-secondary">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray6 pt-2.5">
                  <PriceTag price={item.startingPrice} size="sm" prefix="From" suffix="" />
                  <Link
                    href={`/destinations/${item.slug}`}
                    data-analytics-id={`featured-compact-${item.slug}`}
                    className="title4 inline-flex items-center gap-1 text-accent hover:text-dark transition-colors"
                  >
                    <span>View</span>
                    <FiArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
