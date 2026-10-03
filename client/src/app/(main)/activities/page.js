import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import ExperiencesHero from "@/sections/activities/ExperiencesHero";
import ExperiencesQuickChips from "@/sections/activities/ExperiencesQuickChips";
import ExperienceCategories from "@/sections/activities/ExperienceCategories";
import ExperienceDiscovery from "@/sections/activities/ExperienceDiscovery";
import PopularExperiences from "@/sections/activities/PopularExperiences";
import ExperienceCollections from "@/sections/activities/ExperienceCollections";
import DestinationCrossSell from "@/sections/activities/DestinationCrossSell";
import BuildYourDay from "@/sections/activities/BuildYourDay";
import DayPlanInquiry from "@/sections/activities/DayPlanInquiry";
import ExperiencesGroupBanner from "@/sections/activities/ExperiencesGroupBanner";
import ExperiencesExpertBlock from "@/sections/activities/ExperiencesExpertBlock";
import LocalExperiences from "@/sections/activities/LocalExperiences";
import ExperiencesSocialProof from "@/sections/activities/ExperiencesSocialProof";
import ExperiencePartnerBlock from "@/sections/activities/ExperiencePartnerBlock";
import ExperienceFAQ from "@/sections/activities/ExperienceFAQ";
import ExperiencesCTA from "@/sections/activities/ExperiencesCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Skeleton from "@/components/ui/Skeleton";
import Reveal from "@/components/animation/Reveal";

export const metadata = createMetadata({
  title: "Handcrafted Local Experiences & Activities | Viatours Voyage",
  description:
    "Discover curated half-day experiences, guided cultural walks, food tours, and secret excursions hosted by verified native guides worldwide.",
  path: "/activities",
});

function ExperienceDiscoverySkeleton() {
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

export default function ActivitiesPage() {
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
        name: "Experiences",
        item: "https://viatours.com/activities",
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
        {/* 1. Hero (PageHero + SearchBar with real DatePicker + Reassurance badges) */}
        <ExperiencesHero />

        {/* 2. Quick filter chips row (time of day, duration, cancellation, pickup, instant confirm, budget) */}
        <ExperiencesQuickChips />

        {/* 3. Categories by interest (cards applying category filter with real computed counts) */}
        <ExperienceCategories />

        {/* 4. Experience discovery (FilterPanel + ResultsHeader + ExperienceCard grid + URL sync) */}
        <Suspense fallback={<ExperienceDiscoverySkeleton />}>
          <ExperienceDiscovery />
        </Suspense>

        {/* 5. Most popular experiences (Carousel on mobile, grid on desktop) */}
        <PopularExperiences />

        {/* 6. Collections (each card applies a real filter rule) */}
        <ExperienceCollections />

        {/* 7. Destination cross-sell (data-driven tabs + link to tours & destinations) */}
        <DestinationCrossSell />

        {/* 8. Build your perfect day (Client hunting step 1: interactive day planner) */}
        <BuildYourDay />

        {/* 9. Lead capture form (Day plan submission / bespoke custom activities) */}
        <DayPlanInquiry />

        {/* 10. Private & group buyouts CTABanner */}
        <ExperiencesGroupBanner />

        {/* 11. Talk to a travel expert (factual contact info + free suggestion CTA) */}
        <ExperiencesExpertBlock />

        {/* 12. Local experiences (editorial spotlight of real experiences) */}
        <LocalExperiences />

        {/* 13. Social proof & operational guarantees StatsBar */}
        <ExperiencesSocialProof />

        {/* 14. Partner with us (supply-side host recruitment) */}
        <ExperiencePartnerBlock />

        {/* 15. FAQ with FAQPage JSON-LD schema */}
        <ExperienceFAQ />

        {/* 16. Newsletter form + final conversion CTABanner */}
        <ExperiencesCTA />
      </Reveal>

      {/* Global Sticky Mobile Action Bar */}
      <StickyMobileBar
        searchHref="#discover"
        searchLabel="Find experiences"
        planHref="#build-your-day"
        planLabel="Plan my day"
      />
    </main>
  );
}
