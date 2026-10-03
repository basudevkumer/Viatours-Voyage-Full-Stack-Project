import { createMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site";
import AboutHero from "@/sections/about/AboutHero";
import AboutPillars from "@/sections/about/AboutPillars";
import AboutPrinciples from "@/sections/about/AboutPrinciples";
import AboutStats from "@/sections/about/AboutStats";
import AboutHowItWorks from "@/sections/about/AboutHowItWorks";
import AboutTrust from "@/sections/about/AboutTrust";
import AboutTeam from "@/sections/about/AboutTeam";
import AboutMilestones from "@/sections/about/AboutMilestones";
import AboutReviews from "@/sections/about/AboutReviews";
import AboutPlanTrip from "@/sections/about/AboutPlanTrip";
import AboutGroupBanner from "@/sections/about/AboutGroupBanner";
import AboutPartnerBlock from "@/sections/about/AboutPartnerBlock";
import AboutContactVisit from "@/sections/about/AboutContactVisit";
import AboutFAQ from "@/sections/about/AboutFAQ";
import AboutFinalCTA from "@/sections/about/AboutFinalCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import Reveal from "@/components/animation/Reveal";
import { getAboutStats, getAboutContent } from "@/services/aboutService";

export const metadata = createMetadata({
  title: `About Us | ${SITE_CONFIG.name}`,
  description:
    `Learn about ${SITE_CONFIG.name}, our considered approach to global trip planning, transparent pricing, verified local guides, and 24/7 dedicated traveler support.`,
  path: "/about",
});

export default async function AboutPage() {
  const [statsRes, contentRes] = await Promise.all([
    getAboutStats(),
    getAboutContent(),
  ]);

  const stats = statsRes?.data || {};
  const content = contentRes?.data || {};

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_CONFIG.url}/about`,
      },
    ],
  };

  // TravelAgency / Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phoneTel,
    description: SITE_CONFIG.mission,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address?.street,
      addressLocality: SITE_CONFIG.address?.city,
      addressRegion: SITE_CONFIG.address?.state,
      postalCode: SITE_CONFIG.address?.postalCode,
      addressCountry: SITE_CONFIG.address?.countryCode,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Reveal as="div" selector="main > div > section">
        {/* 1. Hero with Brand Identity, Value Props & Direct Actions */}
        <AboutHero />

        {/* 2. What We Do — 3 Pillars (Destinations, Tours, Experiences) */}
        <AboutPillars pillars={content.pillars} stats={stats} />

        {/* 3. How We Help You Plan (4 Operating Principles) */}
        <AboutPrinciples principles={content.principles} />

        {/* 4. By the Numbers (Live Catalog Counts) */}
        <AboutStats statsList={stats.statsList} />

        {/* 5. How It Works (4-Step Booking Journey) */}
        <AboutHowItWorks processSteps={content.processSteps} />

        {/* 6. Trust & Transparency (Policies, Payments, Support) */}
        <AboutTrust trustGuarantees={content.trustGuarantees} />

        {/* 7. Our Team (Hidden until verified team data exists) */}
        <AboutTeam team={content.team} />

        {/* 8. Our Story / Milestones (Hidden until verified milestone data exists) */}
        <AboutMilestones milestones={content.milestones} />

        {/* 9. Traveler Feedback (Hidden until verified review data exists) */}
        <AboutReviews reviews={content.testimonials} />

        {/* 10. Plan My Trip (Client Hunting Lead Block) */}
        <AboutPlanTrip />

        {/* 11. Groups & Corporate Travel (Revenue Quote Banner) */}
        <AboutGroupBanner />

        {/* 12. Partner with Us (Local Guides & Trade Collaborations) */}
        <AboutPartnerBlock />

        {/* 13. Contact & Visit (Factual Contact Info & Office Location) */}
        <AboutContactVisit />

        {/* 14. Company FAQ & FAQPage Schema */}
        <AboutFAQ />

        {/* 15. Newsletter & Closing CTABanner */}
        <AboutFinalCTA />
      </Reveal>

      {/* Persistent Dismissible Mobile Sticky CTA Bar */}
      <StickyMobileBar
        searchHref="#plan"
        searchLabel="Plan my trip"
        planHref="/tours"
        planLabel="Explore tours"
      />
    </main>
  );
}
