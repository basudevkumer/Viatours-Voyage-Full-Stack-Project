import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import RatingStars from "@/components/ui/RatingStars";
import WishlistButton from "@/components/shared/WishlistButton";
import DealCard from "@/components/shared/DealCard";
import { FiArrowRight, FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function FeaturedDeals({ featuredData }) {
  if (!featuredData || !featuredData.primary) {
    return null;
  }

  const { primary, highlights = [] } = featuredData;

  return (
    <section className="bg-bg-alt py-12 sm:py-16 lg:py-20" id="featured-deals">
      <Container>
        <SectionHeading
          eyebrow="TOP AUDITED SAVINGS"
          title="Biggest rate reductions this season"
          text="These verified departures carry our highest confirmed price differences against standard rates. No artificial markup — strictly limited partner allocations."
        />

        {/* Primary Featured Deal (Large) */}
        <div className="overflow-hidden rounded-3xl border border-gray6 bg-white shadow-md transition-shadow hover:shadow-xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            {/* Media side */}
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px]">
              <Image
                src={primary.image}
                alt={`${primary.title} in ${primary.location}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent lg:hidden"
              />

              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
                <Badge variant="accent" className="font-semibold shadow-md">
                  Save ${primary.savingsAmount} (-{primary.savingsPercent}%)
                </Badge>
                {primary.dealLabel && (
                  <Badge variant="dark" className="bg-dark/85 text-white backdrop-blur-xs">
                    {primary.dealLabel}
                  </Badge>
                )}
              </div>

              <WishlistButton
                itemId={primary.itemId}
                itemType={primary.itemType}
                label={primary.title}
                className="absolute right-4 top-4 bg-white/95 shadow-md sm:right-6 sm:top-6"
              />
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="caption uppercase tracking-wider text-accent font-semibold">
                    {primary.category} • {primary.itemType === "tour" ? "Multi-day Tour" : "Experience"}
                  </span>
                  <span className="body5 flex items-center gap-1.5 text-text-secondary">
                    <FiClock aria-hidden="true" /> {primary.duration}
                  </span>
                </div>

                <h3 className="heading mt-3 text-2xl font-bold text-dark sm:text-3xl">
                  <Link
                    href={primary.href}
                    className="hover:text-accent transition-colors"
                  >
                    {primary.title}
                  </Link>
                </h3>

                <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary">
                  <FiMapPin aria-hidden="true" className="text-accent shrink-0" />
                  {primary.location}
                </p>

                <p className="body3 mt-4 line-clamp-3 text-text-secondary">
                  {primary.description}
                </p>

                {primary.validUntil && (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2.5 text-xs text-amber-900 sm:text-sm">
                    <span className="font-semibold">Promotional departure window:</span>{" "}
                    Book by {formatDate(primary.validUntil)} to lock in this negotiated tariff.
                  </div>
                )}

                {primary.terms && primary.terms.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-xs text-text-secondary sm:text-sm">
                    {primary.terms.slice(0, 2).map((term, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FiCheckCircle className="text-success shrink-0" aria-hidden="true" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-8 border-t border-gray6 pt-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <RatingStars
                    rating={primary.rating}
                    reviewsCount={primary.reviews}
                    showCount
                    size="md"
                  />
                  <span className="caption text-text-secondary">{primary.group}</span>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="caption block uppercase tracking-wider text-text-secondary">
                      Negotiated package rate
                    </span>
                    <PriceTag
                      price={primary.price}
                      originalPrice={primary.originalPrice}
                      currency={primary.currency}
                      size="lg"
                    />
                  </div>

                  <Button
                    href={primary.href}
                    size="md"
                    rightIcon={<FiArrowRight />}
                    data-analytics-id="featured-deal-view-primary"
                    className="hover:!bg-white hover:!text-accent"
                  >
                    View deal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Highlight Deals */}
        {highlights.length > 0 && (
          <div className="mt-8">
            <h4 className="title3 mb-5 text-dark">More high-saving offers</h4>
            <div className="grid gap-6 sm:grid-cols-2">
              {highlights.map((deal) => (
                <DealCard key={deal.dealId} deal={deal} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
