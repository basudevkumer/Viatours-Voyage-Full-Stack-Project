import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import ToursHero from "@/sections/tours/ToursHero";
import ToursQuickChips from "@/sections/tours/ToursQuickChips";
import TourDiscovery from "@/sections/tours/TourDiscovery";
import PopularTours from "@/sections/tours/PopularTours";
import TravelStyles from "@/sections/tours/TravelStyles";
import DestinationDiscovery from "@/sections/tours/DestinationDiscovery";
import SpecialDeals from "@/sections/tours/SpecialDeals";
import TravelConfidence from "@/sections/tours/TravelConfidence";
import ToursSocialProof from "@/sections/tours/ToursSocialProof";
import ToursCustomTripRequest from "@/sections/tours/ToursCustomTripRequest";
import ToursGroupBanner from "@/sections/tours/ToursGroupBanner";
import ToursExpertBlock from "@/sections/tours/ToursExpertBlock";
import TravelInspiration from "@/sections/tours/TravelInspiration";
import FAQ from "@/sections/tours/FAQ";
import ToursFinalCTA from "@/sections/tours/ToursFinalCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Skeleton from "@/components/ui/Skeleton";
import Reveal from "@/components/animation/Reveal";

export const metadata = createMetadata({
  title: "Explore Handcrafted Guided Tours & Small Group Adventures | Viatours",
  description:
    "Browse 16 curated global tours across Europe, Asia, Americas, and Oceania. Transparent pricing, verified native guides, free cancellation, and custom private itinerary options.",
  path: "/tours",
});

function TourDiscoverySkeleton() {
  return (
    <section className="bg-gray7/40 py-14">
      <div className="mx-auto max-w-[1320px] px-4">
        <Skeleton className="mb-6 h-12 w-64 rounded-xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ToursPage() {
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
        name: "Tours",
        item: "https://viatours.com/tours",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-grey">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Reveal as="div" selector="main > div > section">
        {/* 1. Hero with SearchBar & Factual Reassurance */}
        <ToursHero />

        {/* 2. Quick Filter Chips Row */}
        <ToursQuickChips />

        {/* 3. Core Tour Discovery Engine (Search, Filter, Sort, Grid) */}
        <Suspense fallback={<TourDiscoverySkeleton />}>
          <TourDiscovery />
        </Suspense>

        {/* 4. Popular Tours (Travelers' Favourites) */}
        <PopularTours />

        {/* 5. Travel Styles Filter Cards */}
        <TravelStyles />

        {/* 6. Destination Discovery */}
        <DestinationDiscovery />

        {/* 7. Special Deals (Honest Savings, Auto-hides if empty) */}
        <SpecialDeals />

        {/* 8. Travel Confidence (Factual Operational Standards) */}
        <TravelConfidence />

        {/* 9. Social Proof (Operational Metrics) */}
        <ToursSocialProof />

        {/* 10. Client Hunting Step 1: Custom Trip Request */}
        <ToursCustomTripRequest />

        {/* 11. Client Hunting Step 2: Private & Group Departures */}
        <ToursGroupBanner />

        {/* 12. Talk to a Travel Expert */}
        <ToursExpertBlock />

        {/* 13. Travel Inspiration (Blog Guides) */}
        <TravelInspiration />

        {/* 14. Frequently Asked Questions with JSON-LD Schema */}
        <FAQ />

        {/* 15. Newsletter & Final Conversion CTA */}
        <ToursFinalCTA />
      </Reveal>

      {/* Global Sticky Mobile Action Bar */}
      <StickyMobileBar searchHref="#discover" planHref="#custom-trip-request" />
    </main>
  );
}
