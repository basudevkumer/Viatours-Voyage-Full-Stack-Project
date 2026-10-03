import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { getGuideCategories } from "@/services/guideService";
import TravelGuideHero from "@/sections/travel-guide/TravelGuideHero";
import FeaturedGuides from "@/sections/travel-guide/FeaturedGuides";
import GuideCategories from "@/sections/travel-guide/GuideCategories";
import GuideDiscovery from "@/sections/travel-guide/GuideDiscovery";
import GuideDestinations from "@/sections/travel-guide/GuideDestinations";
import GuidePlanConfidence from "@/sections/travel-guide/GuidePlanConfidence";
import GuideNewsletter from "@/sections/travel-guide/GuideNewsletter";
import GuidePlanTripForm from "@/sections/travel-guide/GuidePlanTripForm";
import GuideExpertBlock from "@/sections/travel-guide/GuideExpertBlock";
import GuideContributorBlock from "@/sections/travel-guide/GuideContributorBlock";
import GuideFAQ from "@/sections/travel-guide/GuideFAQ";
import GuideFinalCTA from "@/sections/travel-guide/GuideFinalCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Skeleton from "@/components/ui/Skeleton";
import Reveal from "@/components/animation/Reveal";

export const metadata = createMetadata({
  title: "Travel Guides, Insider Tips & Field Notes | Viatours Voyage",
  description:
    "Discover curated travel guides, hidden neighborhood routes, street food walks, transit advice, and seasonal planning tips written by destination specialists.",
  path: "/travel-guide",
});

function GuideDiscoverySkeleton() {
  return (
    <section className="bg-gray7/40 py-14">
      <div className="mx-auto max-w-[1320px] px-4">
        <Skeleton className="mb-6 h-12 w-64 rounded-xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TravelGuidePage() {
  const catRes = await getGuideCategories();
  const categories = catRes.success ? catRes.data : [];

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
        name: "Travel Guides",
        item: "https://viatours.com/travel-guide",
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Viatours Travel Guides & Destination Field Notes",
    description:
      "Curated travel advice, cultural etiquette, neighborhood routes, and transit tips written by verified destination coordinators.",
    url: "https://viatours.com/travel-guide",
  };

  return (
    <main className="min-h-screen bg-bg-grey">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Reveal as="div" selector="main > div > section">
        {/* 1. Hero with SearchBar & Topic Chips */}
        <TravelGuideHero />

        {/* 2. Featured Lead Guide & Editor's Picks */}
        <FeaturedGuides />

        {/* 3. Category Navigation with Computed Counts */}
        <GuideCategories categories={categories} />

        {/* 4. Core Guide Discovery (Filters + Sort + Card Grid + Empty State) */}
        <Suspense fallback={<GuideDiscoverySkeleton />}>
          <GuideDiscovery />
        </Suspense>

        {/* 5. Browse by Destination */}
        <GuideDestinations />

        {/* 6. Plan with Confidence (Funnel block to tours, activities, destinations) */}
        <GuidePlanConfidence />

        {/* 7. Newsletter Lead Magnet */}
        <GuideNewsletter />

        {/* 8. Plan My Trip Lead Capture Form (type="guide-trip") */}
        <GuidePlanTripForm />

        {/* 9. Talk to a Travel Expert (phone + email + consultation) */}
        <GuideExpertBlock />

        {/* 10. Contribute a Guide (supply side writer recruitment) */}
        <GuideContributorBlock />

        {/* 11. Travel Planning FAQ with JSON-LD Schema */}
        <GuideFAQ />

        {/* 12. Final Conversion CTABanner */}
        <GuideFinalCTA />
      </Reveal>

      {/* Global Sticky Mobile Action Bar */}
      <StickyMobileBar
        searchHref="#guides"
        searchLabel="Browse guides"
        planHref="#plan-my-trip"
        planLabel="Plan my trip"
      />
    </main>
  );
}
