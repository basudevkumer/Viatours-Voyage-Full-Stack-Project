import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import BookingWidget from "@/components/shared/BookingWidget";
import ImageGallery from "@/components/shared/ImageGallery";
import InclusionsList from "@/components/shared/InclusionsList";
import Itinerary from "@/components/shared/Itinerary";
import MapEmbed from "@/components/shared/MapEmbed";
import PolicyBlock from "@/components/shared/PolicyBlock";
import ShareButton from "@/components/shared/ShareButton";
import WishlistButton from "@/components/shared/WishlistButton";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import ExperienceCard from "@/components/shared/ExperienceCard";
import Badge from "@/components/ui/Badge";
import RatingStars from "@/components/ui/RatingStars";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import {
  FiClock,
  FiUsers,
  FiGlobe,
  FiMapPin,
  FiCheckCircle,
  FiActivity,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";

export default function DetailPageContent({ item, itemType = "tour", relatedItems = [] }) {
  if (!item) return null;

  const isExperience = itemType === "experience";
  const listingPath = isExperience ? "/activities" : "/tours";
  const listingLabel = isExperience ? "Experiences" : "Tours";

  // Build robust image array for gallery
  const galleryImages = (
    item.gallery?.length ? item.gallery : item.images?.length ? item.images : [item.image]
  )
    .filter(Boolean)
    .map((src, index) => ({
      src,
      alt: item.imageAlts?.[index] || `${item.title} photo ${index + 1}`,
    }));

  const included = item.included || item.inclusions || item.features || [];
  const excluded = item.excluded || item.exclusions || [];

  // Key facts - only render facts that exist in item
  const keyFacts = [
    item.duration || (item.days ? `${item.days} days` : null)
      ? {
          icon: FiClock,
          label: "Duration",
          value: item.duration || `${item.days} days`,
        }
      : null,
    item.timeOfDay
      ? {
          icon: FiClock,
          label: "Time of day",
          value:
            item.timeOfDay.charAt(0).toUpperCase() +
            item.timeOfDay.slice(1).replace("-", " "),
        }
      : null,
    item.groupType || item.group || (item.groupSizeMax ? `Max ${item.groupSizeMax} guests` : null)
      ? {
          icon: FiUsers,
          label: "Group type",
          value: item.groupType || item.group || `Max ${item.groupSizeMax} guests`,
        }
      : null,
    item.languages?.length
      ? {
          icon: FiGlobe,
          label: "Languages",
          value: item.languages.join(", "),
        }
      : null,
    item.ticketType || (item.features?.includes("mobileTicket") ? "Mobile ticket accepted" : null)
      ? {
          icon: FiCheckCircle,
          label: "Ticket type",
          value: item.ticketType || "Mobile ticket accepted",
        }
      : null,
    item.difficulty
      ? {
          icon: FiActivity,
          label: "Difficulty",
          value: item.difficulty,
        }
      : null,
    item.destination || item.location
      ? {
          icon: FiMapPin,
          label: "Location",
          value: item.destination || item.location,
        }
      : null,
  ].filter(Boolean);

  const destinationSlug = item.destination?.toLowerCase().replace(/\s+/g, "-") || "";

  // Tour-specific booking FAQs
  const bookingFaqs = [
    [
      "What happens after I submit a booking request?",
      "Our regional coordinator verifies current guide and accommodation availability for your chosen date. We email your confirmed reservation and final payment schedule within 2 hours.",
    ],
    [
      "Can I reschedule or cancel my tour?",
      item.cancellationPolicy ||
        "Free cancellation is available up to 48 hours before the tour start for a full refund.",
    ],
    [
      "Are child discounts available?",
      "Children under 12 receive discounted rates or complimentary permits on selected itineraries. Enter child counts in the booking widget to apply discounts.",
    ],
    [
      "What if weather disrupts outdoor activities?",
      "If adverse weather prevents scheduled excursions (such as boat cruises or balloon flights), our team will reschedule for the next available day or provide a full refund for that activity.",
    ],
  ];

  return (
    <>
      {/* ─── Breadcrumb & Title Bar ─── */}
      <PageHeader
        title={item.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: listingLabel, href: listingPath },
          ...(item.destination
            ? [{ label: item.destination, href: `/destinations/${destinationSlug}` }]
            : []),
          { label: item.title },
        ]}
        className="pb-4"
      />

      <main className="mx-auto max-w-[1320px] px-4 pb-28 lg:pb-20">
        {/* ─── Title & Meta Actions Block ─── */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray6 pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {item.category && (
                <Badge variant="accent" className="text-xs uppercase tracking-wider">
                  {item.category}
                </Badge>
              )}
              {item.groupType && (
                <Badge variant="light" className="text-xs">
                  {item.groupType}
                </Badge>
              )}
              {item.features?.includes("freeCancellation") && (
                <Badge variant="light" className="text-xs !text-success border-success/30">
                  Free cancellation
                </Badge>
              )}
              {item.features?.includes("instantConfirmation") && (
                <Badge variant="light" className="text-xs">
                  Instant confirmation
                </Badge>
              )}
              {item.features?.includes("hotelPickup") && (
                <Badge variant="light" className="text-xs">
                  Hotel pickup
                </Badge>
              )}
            </div>

            <h1 className="title1 text-dark sm:heading max-w-4xl">{item.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary pt-1">
              <span className="flex items-center gap-1.5 font-medium text-dark">
                <FiMapPin className="text-accent" aria-hidden="true" />
                {item.location}
              </span>

              {item.rating && (
                <span className="flex items-center gap-1.5">
                  <RatingStars rating={item.rating} size="sm" />
                  <span className="font-semibold text-dark">{item.rating}</span>
                  {item.reviews && (
                    <span className="caption text-text-secondary">({item.reviews} reviews // TODO(api))</span>
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <WishlistButton itemId={item.id} itemType={itemType} label={item.title} />
            <ShareButton title={item.title} />
          </div>
        </div>

        {/* ─── Two-Column Layout ─── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ─── Left Column: Content & Itinerary ─── */}
          <div className="min-w-0 space-y-10">
            {/* 1. Image Gallery */}
            <ImageGallery images={galleryImages} title={`${item.title} photos`} />

            {/* 2. Key Facts Strip */}
            {keyFacts.length > 0 && (
              <section className="rounded-2xl border border-gray6 bg-gray7/40 p-5 sm:p-6" aria-label="Key facts">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {keyFacts.map((fact, idx) => {
                    const Icon = fact.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon aria-hidden="true" size={18} />
                        </div>
                        <div>
                          <span className="caption block text-text-secondary">{fact.label}</span>
                          <span className="body4 font-semibold text-dark">{fact.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 3. Curated Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <section className="rounded-2xl border border-gray6 bg-white p-6 sm:p-8" aria-labelledby="tour-highlights-title">
                <h2 id="tour-highlights-title" className="title2 text-dark mb-4">
                  {isExperience ? "Experience highlights" : "Tour highlights"}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 body4 text-dark">
                      <FiCheckCircle className="mt-1 text-accent shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 4. Overview & Description */}
            {item.description && (
              <section className="rounded-2xl border border-gray6 bg-white p-6 sm:p-8" aria-labelledby="tour-overview-title">
                <h2 id="tour-overview-title" className="title2 text-dark mb-3">
                  {isExperience ? "Overview & details" : "Overview & experience"}
                </h2>
                <p className="body3 text-text-secondary leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </section>
            )}

            {/* 5. Day-by-Day Itinerary */}
            {item.itinerary && item.itinerary.length > 0 && (
              <Itinerary days={item.itinerary} />
            )}

            {/* 6. Inclusions & Exclusions */}
            {(included.length > 0 || excluded.length > 0) && (
              <InclusionsList included={included} excluded={excluded} />
            )}

            {/* 7. Meeting Point & Map */}
            {item.meetingPoint && (
              <section className="rounded-2xl border border-gray6 bg-white p-6 sm:p-8" aria-labelledby="meeting-point-title">
                <h2 id="meeting-point-title" className="title2 text-dark mb-3">
                  Meeting & departure point
                </h2>
                <p className="body4 text-dark font-medium mb-4 flex items-start gap-2">
                  <FiMapPin className="mt-1 text-accent shrink-0" aria-hidden="true" />
                  <span>{item.meetingPoint}</span>
                </p>
                <MapEmbed location={item.location || item.meetingPoint} />
              </section>
            )}

            {/* 8. Policies & What to Bring */}
            <PolicyBlock
              cancellation={item.cancellationPolicy}
              meetingPoint={item.meetingPoint}
              whatToBring={item.whatToBring}
            />

            {/* 9. Booking FAQs */}
            <section className="rounded-2xl border border-gray6 bg-white p-6 sm:p-8" aria-labelledby="tour-faqs-title">
              <h2 id="tour-faqs-title" className="title2 text-dark mb-4">
                Booking FAQs for this {isExperience ? "experience" : "tour"}
              </h2>
              <Accordion items={bookingFaqs} defaultOpen={0} />
            </section>
          </div>

          {/* ─── Right Column: Sticky Booking Widget ─── */}
          <div>
            <BookingWidget
              itemId={item.id}
              itemType={itemType}
              itemTitle={item.title}
              price={item.price}
              originalPrice={item.originalPrice}
              cancellation={item.cancellationPolicy}
            />
          </div>
        </div>

        {/* ─── Related Tours & Destination Deep Link ─── */}
        {relatedItems && relatedItems.length > 0 && (
          <section className="mt-16 border-t border-gray6 pt-12" aria-labelledby="related-tours-title">
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="caption block uppercase tracking-wider text-accent font-semibold mb-1">
                  MORE INSPIRATION
                </span>
                <h2 id="related-tours-title" className="title1 text-dark">
                  {isExperience ? "Other activities you might enjoy" : "Other journeys you might enjoy"}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {isExperience && item.destination && (
                  <Button
                    href={`/tours?destination=${encodeURIComponent(item.destination)}`}
                    variant="outline"
                    size="sm"
                    data-analytics-id="exp-detail-view-tours"
                  >
                    View {item.destination} tours
                  </Button>
                )}
                {item.destination && (
                  <Button
                    href={`/destinations/${destinationSlug}`}
                    variant="secondary"
                    size="sm"
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                    data-analytics-id="tour-detail-view-destination"
                  >
                    Explore all {item.destination} guides
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((rel) =>
                isExperience ? (
                  <ExperienceCard key={rel.id} experience={rel} />
                ) : (
                  <TourCard key={rel.id} tour={rel} />
                )
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
