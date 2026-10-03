import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { regions } from "./data";
import { FiArrowRight, FiGlobe } from "react-icons/fi";

export default function BrowseByRegion() {
  const regionList = regions.filter((r) => r.id !== "all");

  return (
    <Section bg="white" spacing="md" id="regions">
      <SectionHeading
        eyebrow="GEOGRAPHICAL REGIONS"
        title="Browse by continent & region"
        text="Target your journey by geographic zone, each with distinct seasonality, culinary roots, and cultural heritage."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {regionList.map((region) => (
          <Link
            key={region.id}
            href={`/destinations?region=${encodeURIComponent(region.id)}#explorer`}
            data-analytics-id={`browse-region-${region.id.toLowerCase().replaceAll(" ", "-")}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gray5 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-commonbg text-accent">
                  <FiGlobe aria-hidden="true" size={20} />
                </span>
                <span className="rounded-full bg-bg-field px-3 py-1 body5 font-medium text-dark">
                  {region.count} {region.count === 1 ? "destination" : "destinations"}
                </span>
              </div>

              <h3 className="title2 mt-5 text-dark group-hover:text-accent transition-colors">
                {region.label}
              </h3>
              <p className="body4 mt-2 text-text-secondary">
                {region.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 title4 text-dark font-medium group-hover:text-accent border-t border-gray6 pt-4 transition-colors">
              <span>View destinations</span>
              <FiArrowRight aria-hidden="true" size={15} />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
