import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import DealsHero from "@/sections/deals/DealsHero";
import DealTypeTabs from "@/sections/deals/DealTypeTabs";
import FeaturedDeals from "@/sections/deals/FeaturedDeals";
import DealsDiscovery from "@/sections/deals/DealsDiscovery";
import DealsByDestination from "@/sections/deals/DealsByDestination";
import HowDealsWork from "@/sections/deals/HowDealsWork";
import DealAlertForm from "@/sections/deals/DealAlertForm";
import DealsGroupBanner from "@/sections/deals/DealsGroupBanner";
import DealsExpertBlock from "@/sections/deals/DealsExpertBlock";
import DealsInspiration from "@/sections/deals/DealsInspiration";
import DealsFAQ from "@/sections/deals/DealsFAQ";
import DealsFinalCTA from "@/sections/deals/DealsFinalCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Skeleton from "@/components/ui/Skeleton";
import Reveal from "@/components/animation/Reveal";
import {
  getDeals,
  getFeaturedDeals,
  getDealDestinations,
  getDealCategories,
  getDealTerms,
} from "@/services/dealService";
import { getGuides } from "@/services/guideService";

export const metadata = createMetadata({
  title: "Travel Deals & Verified Special Offers | Viatours Voyage",
  description:
    "Explore handpicked travel deals with verified rate reductions across boutique tours and small-group experiences. Honest strikethrough pricing, genuine departure windows, and zero fake countdown timers.",
  path: "/deals",
});

function DealsDiscoverySkeleton() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1320px] px-4">
        <Skeleton className="mb-6 h-10 w-64 rounded-xl" />
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Skeleton className="hidden h-96 w-full rounded-2xl lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function DealsPage() {
  // Fetch initial SSR data concurrently
  const [
    featuredRes,
    destinationsRes,
    categoriesRes,
    termsRes,
    dealsRes,
    guidesRes,
  ] = await Promise.all([
    getFeaturedDeals(),
    getDealDestinations(),
    getDealCategories(),
    getDealTerms(),
    getDeals({ pageSize: 50 }),
    getGuides({ pageSize: 3 }),
  ]);

  const featuredData = featuredRes?.data || null;
  const destinations = destinationsRes?.data || [];
  const categories = categoriesRes?.data || [];
  const terms = termsRes?.data || [];
  const dealsData = dealsRes?.data || [];
  const counts = dealsRes?.counts || { all: 0, tours: 0, experiences: 0 };
  const guides = guidesRes?.data || [];

  // BreadcrumbList Schema
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
        name: "Deals",
        item: "https://viatours.com/deals",
      },
    ],
  };

  // ItemList Schema of verified deals
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified Travel Deals & Seasonal Offers",
    description: "Curated collection of verified travel rate reductions without manufactured urgency.",
    numberOfItems: dealsData.length,
    itemListElement: dealsData.map((deal, index) => {
      const itemOffer = {
        "@type": "Offer",
        price: deal.price,
        priceCurrency: deal.currency || "USD",
        availability: "https://schema.org/InStock",
        url: `https://viatours.com${deal.href}`,
      };

      // Only include priceValidUntil when explicit real date is present in data
      if (deal.validUntil) {
        itemOffer.priceValidUntil = deal.validUntil;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": deal.itemType === "tour" ? "TouristTrip" : "TouristAttraction",
          name: deal.title,
          description: deal.description,
          image: typeof deal.image === "object" ? deal.image.src : deal.image,
          url: `https://viatours.com${deal.href}`,
          offers: itemOffer,
        },
      };
    }),
  };

  return (
    <main className="min-h-screen bg-bg-grey">
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Reveal as="div" selector="main > div > section">
        {/* 1. Hero with Honest Subline, Reassurance Badges & CTAs */}
        <DealsHero />

        {/* 2. Deal Type Tabs (All / Tours / Experiences with Live Counts) */}
        <Suspense fallback={<div className="h-14 bg-white" />}>
          <DealTypeTabs counts={counts} />
        </Suspense>

        {/* 3. Featured Deal (Large) + 2 Highlights */}
        <FeaturedDeals featuredData={featuredData} />

        {/* 4. Deals Explorer (FilterPanel + ResultsHeader + Cards + Pagination + Dual EmptyState) */}
        <Suspense fallback={<DealsDiscoverySkeleton />}>
          <DealsDiscovery
            initialDestinations={destinations}
            initialCategories={categories}
          />
        </Suspense>

        {/* 5. Deals by Destination (DestinationCards with Computed Deal Counts) */}
        <DealsByDestination destinations={destinations} />

        {/* 6. How Our Deals Work (Trust & Consumer Protection Standards) */}
        <HowDealsWork terms={terms} />

        {/* 7. Deal Alerts (Main Client Hunting Block) */}
        <DealAlertForm />

        {/* 8. Group & Corporate Savings Quote Banner */}
        <DealsGroupBanner />

        {/* 9. Talk to a Travel Expert Consultation Block */}
        <DealsExpertBlock />

        {/* 10. Destination Timing & Travel Guide Inspiration */}
        <DealsInspiration guides={guides} />

        {/* 11. Frequently Asked Questions & FAQPage Schema */}
        <DealsFAQ />

        {/* 12. Newsletter Form & Final CTABanner */}
        <DealsFinalCTA />
      </Reveal>

      {/* Persistent Dismissible Mobile Sticky CTA Bar */}
      <StickyMobileBar
        searchHref="#deals"
        searchLabel="See deals"
        planHref="#deal-alerts"
        planLabel="Get deal alerts"
      />
    </main>
  );
}
