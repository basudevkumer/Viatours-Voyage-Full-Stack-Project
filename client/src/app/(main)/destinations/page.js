import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import DestinationsHero from "@/sections/destinations/DestinationsHero";
import QuickChipsRow from "@/sections/destinations/QuickChipsRow";
import FeaturedDestinations from "@/sections/destinations/FeaturedDestinations";
import DestinationExplorer from "@/sections/destinations/DestinationExplorer";
import BrowseByRegion from "@/sections/destinations/BrowseByRegion";
import BestTimeToTravel from "@/sections/destinations/BestTimeToTravel";
import TravelStylePicks from "@/sections/destinations/TravelStylePicks";
import DestinationToursCrossSell from "@/sections/destinations/DestinationToursCrossSell";
import DestinationPlanner from "@/sections/destinations/DestinationPlanner";
import DestinationInquiry from "@/sections/destinations/DestinationInquiry";
import GroupCorporateBanner from "@/sections/destinations/GroupCorporateBanner";
import TravelExpertBlock from "@/sections/destinations/TravelExpertBlock";
import WhyPlanWithUs from "@/sections/destinations/WhyPlanWithUs";
import DestinationSocialProof from "@/sections/destinations/DestinationSocialProof";
import DestinationTravelGuides from "@/sections/destinations/DestinationTravelGuides";
import DestinationFAQ from "@/sections/destinations/DestinationFAQ";
import DestinationNewsletterCTA from "@/sections/destinations/DestinationNewsletterCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = createMetadata({
  title: "Explore Global Destinations | Handcrafted Tours & Custom Trips | Viatours",
  description:
    "Discover 16 vetted travel destinations across Europe, Asia, Americas, and Oceania. Compare seasonal climates, book guided tours, or request a custom itinerary from local experts.",
  path: "/destinations",
});

function ExplorerSkeleton() {
  return (
    <section className="bg-gray7/40 py-12">
      <div className="mx-auto max-w-[1320px] px-4">
        <Skeleton className="mb-6 h-12 w-64 rounded-xl" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DestinationsPage() {
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
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Hero with SearchBar & Factual Reassurance */}
      <DestinationsHero />

      {/* 2. Quick Filter Chips Row */}
      <QuickChipsRow />

      {/* 3. Featured Destinations Spotlight */}
      <FeaturedDestinations />

      {/* 4. Core Destination Explorer (Search, Filter, Sort, Grid) */}
      <Suspense fallback={<ExplorerSkeleton />}>
        <DestinationExplorer />
      </Suspense>

      {/* 5. Browse By Region Cards */}
      <BrowseByRegion />

      {/* 6. Where to Go By Month (Best Time To Travel) */}
      <BestTimeToTravel />

      {/* 7. Travel-Style Picks */}
      <TravelStylePicks />

      {/* 8. Popular Tours in Top Destinations (Cross-sell) */}
      <DestinationToursCrossSell />

      {/* 9. Not Sure Where to Go? 3-Question Mini Planner */}
      <DestinationPlanner />

      {/* 10. Main Lead Capture: Plan My Trip */}
      <DestinationInquiry type="trip" id="plan-my-trip" />

      {/* 11. Group & Corporate Travel Banner */}
      <GroupCorporateBanner />

      {/* 12. Talk to a Travel Expert */}
      <TravelExpertBlock />

      {/* 13. Why Plan with Viatours */}
      <WhyPlanWithUs />

      {/* 14. Social Proof & Factual Operational Stats */}
      <DestinationSocialProof />

      {/* 15. Travel Guides & Articles */}
      <DestinationTravelGuides />

      {/* 16. Comprehensive FAQs with JSON-LD Schema */}
      <DestinationFAQ />

      {/* 17. Newsletter & Final Conversion CTA */}
      <DestinationNewsletterCTA />

      {/* Global Sticky Mobile Action Bar */}
      <StickyMobileBar searchHref="#explorer" planHref="#plan-my-trip" />
    </main>
  );
}
