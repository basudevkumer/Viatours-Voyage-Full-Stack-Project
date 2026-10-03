import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getDestinationBySlug, getDestinations } from "@/services/destinationService";
import { getTours } from "@/services/tourService";
import { getExperiences } from "@/services/experienceService";
import { destinationsData } from "@/sections/destinations/data";
import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import ExperienceCard from "@/components/shared/ExperienceCard";
import DestinationCard from "@/components/shared/DestinationCard";
import DestinationInquiry from "@/sections/destinations/DestinationInquiry";
import DestinationFAQ from "@/sections/destinations/DestinationFAQ";
import DestinationTravelGuides from "@/sections/destinations/DestinationTravelGuides";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  FiMapPin,
  FiCalendar,
  FiCompass,
  FiClock,
  FiGlobe,
  FiDollarSign,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

export async function generateStaticParams() {
  return destinationsData.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getDestinationBySlug(slug);

  if (!result.success || !result.data) {
    return createMetadata({
      title: "Destination Not Found | Viatours",
      description: "The requested destination could not be located.",
      robots: { index: false, follow: false },
    });
  }

  const dest = result.data;
  return createMetadata({
    title: `${dest.name}, ${dest.country} Travel Guide & Handcrafted Tours | Viatours`,
    description: `Plan your trip to ${dest.name}: ${dest.tagline}. Discover verified guided tours, seasonal climates, boutique itineraries, and local expert advice.`,
    path: `/destinations/${dest.slug}`,
  });
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const result = await getDestinationBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const destination = result.data;

  // Fetch tours & experiences
  const [toursRes, expRes, allDestRes] = await Promise.all([
    getTours(),
    getExperiences(),
    getDestinations(),
  ]);

  const allTours = toursRes.success ? toursRes.data : [];
  const allExperiences = expRes.success ? expRes.data : [];
  const allDestinations = allDestRes.success ? allDestRes.data : [];

  // Filter tours matching destination name
  const destinationTours = allTours.filter(
    (tour) =>
      tour.location.toLowerCase().includes(destination.name.toLowerCase()) ||
      tour.location.toLowerCase().includes(destination.city.toLowerCase()) ||
      tour.title.toLowerCase().includes(destination.name.toLowerCase())
  );

  // Filter experiences matching destination name
  const destinationExperiences = allExperiences.filter(
    (exp) =>
      (exp.destination && exp.destination.toLowerCase() === destination.name.toLowerCase()) ||
      exp.location.toLowerCase().includes(destination.name.toLowerCase())
  );

  // Related destinations in the same region or sharing travel styles
  const relatedDestinations = allDestinations
    .filter(
      (d) =>
        d.slug !== destination.slug &&
        (d.region === destination.region ||
          d.travelStyles.some((s) => destination.travelStyles.includes(s)))
    )
    .slice(0, 4);

  // JSON-LD schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://viatours.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: "https://viatours.com/destinations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `https://viatours.com/destinations/${destination.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="relative h-[380px] w-full sm:h-[480px] lg:h-[540px]">
          <Image
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30"
            aria-hidden="true"
          />

          <Container className="relative z-10 flex h-full flex-col justify-end pb-10 sm:pb-14">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/destinations" className="hover:text-white hover:underline">
                    Destinations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-white" aria-current="page">
                  {destination.name}
                </li>
              </ol>
            </nav>

            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" className="text-xs uppercase tracking-wider">
                {destination.region}
              </Badge>
              <span className="caption flex items-center gap-1 text-white/90">
                <FiMapPin aria-hidden="true" className="text-accent" />
                {destination.country}
              </span>
            </div>

            <h1 className="heading mb-3 text-white max-w-3xl">
              {destination.name}
            </h1>

            <p className="body2 mb-6 max-w-2xl text-white/90 sm:body1">
              {destination.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                href="#tours-in-destination"
                variant="primary"
                size="md"
                data-analytics-id={`hero-view-${destination.slug}-tours`}
                rightIcon={<FiArrowRight aria-hidden="true" />}
              >
                View {destination.name} tours
              </Button>
              <Button
                href="#plan-my-trip"
                variant="outline"
                size="md"
                className="border-white/40 text-white hover:bg-white/10"
                data-analytics-id={`hero-plan-${destination.slug}-trip`}
              >
                Plan custom trip
              </Button>
            </div>
          </Container>
        </div>
      </section>

      {/* ─── Quick Facts Strip ─── */}
      <section className="border-b border-gray6 bg-white py-6" aria-label="Quick travel facts">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-gray6">
            <div className="flex items-start gap-3">
              <FiGlobe className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Country & Region</span>
                <span className="title4 font-semibold text-dark">
                  {destination.country}, {destination.region}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:pl-4">
              <FiCalendar className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Best Months</span>
                <span className="title4 font-semibold text-dark">
                  {destination.bestMonths.join(", ")}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:pl-4">
              <FiClock className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Ideal Duration</span>
                <span className="title4 font-semibold text-dark">
                  {destination.goodToKnow?.idealStay || "4–7 days"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:pl-4">
              <FiCompass className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Travel Style</span>
                <span className="title4 font-semibold text-dark truncate max-w-[130px] block">
                  {destination.travelStyles.slice(0, 2).join(", ")}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:pl-4">
              <FiDollarSign className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Starting Rate</span>
                <span className="title4 font-semibold text-accent">
                  From ${destination.startingPrice}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:pl-4">
              <FiCheckCircle className="mt-0.5 text-accent shrink-0" size={18} aria-hidden="true" />
              <div>
                <span className="caption block text-text-secondary">Local Currency</span>
                <span className="title4 font-semibold text-dark">
                  {destination.goodToKnow?.currency || "Local Currency"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Overview & Curated Highlights ─── */}
      <Section bg="white" spacing="md" id="overview">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <span className="caption mb-2 inline-block font-semibold uppercase tracking-wider text-accent">
              DESTINATION PROFILE
            </span>
            <h2 className="title1 mb-4 text-dark">
              About traveling in {destination.name}
            </h2>
            <p className="body2 mb-6 text-text-secondary leading-relaxed">
              {destination.overview}
            </p>

            {destination.highlights && (
              <div className="mt-6">
                <h3 className="title3 mb-3 text-dark">Curated local highlights</h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 body4 text-dark">
                      <FiCheckCircle className="mt-1 text-accent shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray6 bg-gray7/50 p-6 lg:col-span-5">
            <h3 className="title3 mb-4 text-dark">Good to know</h3>
            <div className="space-y-4">
              <div>
                <span className="caption block text-text-secondary">Official Language</span>
                <p className="body4 font-medium text-dark">{destination.goodToKnow?.language || "English"}</p>
              </div>
              <div className="border-t border-gray6 pt-3">
                <span className="caption block text-text-secondary">Climate Profile</span>
                <p className="body4 font-medium text-dark">{destination.goodToKnow?.climate || "Seasonal mild to warm"}</p>
              </div>
              <div className="border-t border-gray6 pt-3">
                <span className="caption block text-text-secondary">Booking Advice</span>
                <p className="body5 text-text-secondary">
                  Peak seasonal months fill early. We recommend reserving timed-entry monument tours at least 3 weeks ahead.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray6">
              <Button
                href="#plan-my-trip"
                variant="primary"
                size="sm"
                fullWidth
                data-analytics-id={`sidebar-plan-${destination.slug}-trip`}
              >
                Inquire about custom {destination.name} trip
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Top Tours in Destination ─── */}
      <Section bg="grey" spacing="md" id="tours-in-destination">
        <SectionHeading
          eyebrow="HANDPICKED ITINERARIES"
          title={`Featured tours in ${destination.name}`}
          text={`Explore our highest-rated guided journeys, walking safaris, and day trips in ${destination.name}.`}
          action={
            destinationTours.length > 0 && (
              <Button
                href={`/tours?location=${encodeURIComponent(destination.name)}`}
                variant="outline"
                size="sm"
                data-analytics-id={`view-all-${destination.slug}-tours-btn`}
                rightIcon={<FiArrowRight aria-hidden="true" />}
              >
                View all {destination.name} tours
              </Button>
            )
          }
        />

        {destinationTours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinationTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray6 bg-white p-8">
            <EmptyState
              title={`No scheduled group tours in ${destination.name} right now`}
              text={`We operate bespoke private trips and custom routes across ${destination.country}. Share your dates and our team will craft a tailored proposal.`}
              action={
                <Button href="#plan-my-trip" variant="primary" data-analytics-id="empty-tour-plan-trip">
                  Request custom {destination.name} itinerary
                </Button>
              }
            />
          </div>
        )}
      </Section>

      {/* ─── Top Activities & Experiences in Destination ─── */}
      {destinationExperiences.length > 0 && (
        <Section bg="white" spacing="md" id="activities-in-destination">
          <SectionHeading
            eyebrow="LOCAL ACTIVITIES"
            title={`Top experiences in ${destination.name}`}
            text={`Half-day excursions, culinary tastings, and skip-the-line activities hosted by verified local guides.`}
            action={
              <Button
                href="/activities"
                variant="outline"
                size="sm"
                data-analytics-id={`view-all-activities-${destination.slug}`}
                rightIcon={<FiArrowRight aria-hidden="true" />}
              >
                View all experiences
              </Button>
            }
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinationExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </Section>
      )}

      {/* ─── Related Regional Destinations ─── */}
      {relatedDestinations.length > 0 && (
        <Section bg="grey" spacing="md" id="related-destinations">
          <SectionHeading
            eyebrow="EXPLORE NEARBY"
            title={`Other inspiring destinations in ${destination.region}`}
            text="Consider combining your journey with nearby cultural centers and island retreats."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {relatedDestinations.map((rel) => (
              <DestinationCard
                key={rel.id}
                image={rel.image}
                name={rel.name}
                tours={`${rel.toursCount} tours`}
                href={`/destinations/${rel.slug}`}
                data-analytics-id={`related-dest-${rel.slug}`}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ─── Lead Capture: Preselected Destination Form ─── */}
      <DestinationInquiry
        type="trip"
        preselectedDestination={destination.name}
        title={`Plan your custom journey to ${destination.name}`}
        subtitle={`Tell us your rough travel dates, group size, and must-see sights in ${destination.name}. Our regional coordinators will build a personalized itinerary with zero obligation.`}
        id="plan-my-trip"
      />

      {/* ─── Destination FAQs with FAQPage JSON-LD ─── */}
      <DestinationFAQ
        faqs={destination.faqs}
        eyebrow="PRACTICAL TRAVEL GUIDANCE"
        title={`Frequently asked questions about ${destination.name}`}
        text={`Key information on seasonal crowds, local transportation, and booking recommendations for ${destination.name}.`}
      />

      {/* ─── Travel Guides ─── */}
      <DestinationTravelGuides />

      {/* ─── Final CTA ─── */}
      <CTABanner
        variant="dark"
        layout="centered"
        eyebrow={`EXPERIENCE ${destination.name.toUpperCase()}`}
        title={`Ready to explore ${destination.name}?`}
        text="Whether you prefer small group departures or an exclusively private journey, we'll ensure every detail is impeccably arranged."
        primaryAction={
          <Button
            href="#plan-my-trip"
            variant="primary"
            size="md"
            data-analytics-id={`final-cta-plan-${destination.slug}`}
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Plan your {destination.name} trip
          </Button>
        }
        secondaryAction={
          <Button
            href="/destinations"
            variant="outline"
            size="md"
            className="border-white/30 text-white hover:bg-white/10"
            data-analytics-id={`final-cta-all-destinations`}
          >
            Explore all destinations
          </Button>
        }
      />
    </article>
  );
}
