import Link from "next/link";
import { FiCompass, FiMapPin, FiCalendar, FiBookOpen, FiArrowRight } from "react-icons/fi";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const resources = [
  {
    icon: FiCompass,
    title: "Browse tours",
    description: "Multi-day itineraries with guaranteed departures, confirmed hotel tiers, and transparent inclusions.",
    href: "/tours",
    cta: "Explore tours",
  },
  {
    icon: FiMapPin,
    title: "Explore destinations",
    description: "Regional highlights across Europe, Asia, Americas, Oceania, and the Middle East.",
    href: "/destinations",
    cta: "Browse destinations",
  },
  {
    icon: FiCalendar,
    title: "Find experiences",
    description: "Curated day activities, culinary tastings, and cultural walks hosted by vetted locals.",
    href: "/activities",
    cta: "Discover experiences",
  },
  {
    icon: FiBookOpen,
    title: "Read travel guides",
    description: "Practical packing advice, transit options, and seasonal breakdowns written by specialists.",
    href: "/travel-guide",
    cta: "Open travel guides",
  },
];

export default function ContactQuickHelp() {
  return (
    <section className="bg-bg-field py-12 sm:py-16 lg:py-20" aria-label="Self-service resources">
      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="SELF-SERVICE EXPLORATION"
            title="Looking for instant travel answers?"
            text="If you want to check itineraries, live dates, or destination advice immediately, explore our live catalogs."
            align="center"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="title3 mt-4 text-dark">{item.title}</h3>
                    <p className="body5 mt-2 text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-gray6 pt-4">
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>{item.cta}</span>
                      <FiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
