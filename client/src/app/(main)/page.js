import Bannar from "@/sections/home/Bannar";
import TrustBar from "@/sections/home/TrustBar";
import TrendingDestinations from "@/sections/home/TrendingDestinations";
import FeaturedTours from "@/sections/home/FeaturedTours";
import TravelStyles from "@/sections/home/TravelStyles";
import SpecialDeals from "@/sections/home/SpecialDeals";
import WhyChooseUs from "@/sections/home/WhyChooseUs";
import SocialProof from "@/sections/home/SocialProof";
import HowItWorks from "@/sections/home/HowItWorks";
import TripInquiry from "@/sections/home/TripInquiry";
import GroupTravel from "@/sections/home/GroupTravel";
import PartnerBanner from "@/sections/home/PartnerBanner";
import TravelGuides from "@/sections/home/TravelGuides";
import HomeFAQ from "@/sections/home/HomeFAQ";
import Newsletter from "@/sections/home/Newsletter";
import FinalCTA from "@/sections/home/FinalCTA";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import HomeMotion from "@/components/animation/HomeMotion";
import { getTours } from "@/services/tourService";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Viatours Voyage | Handcrafted Tours, Local Guides & Global Journeys",
  description:
    "Explore curated tours, verified local guides, and flexible booking across 50+ global destinations. Experience travel planned with certainty and zero hidden fees.",
  path: "/",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Viatours Voyage",
  url: "https://viatours.com",
  description:
    "Curated modern travel platform providing handcrafted small-group tours, verified local native guides, and flexible booking policies.",
  telephone: "1-800-453-6744",
  email: "hi@viatours.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "328 Queensberry Street",
    addressLocality: "North Melbourne",
    addressRegion: "VIC",
    postalCode: "3051",
    addressCountry: "AU",
  },
};

export default async function Home() {
  const toursResult = await getTours();
  const initialTours = toursResult.data || [];

  return (
    <>
      {/* TravelAgency Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeMotion>
        {/* 1. Hero — Search, value promise, and quiet destinations link */}
        <Bannar />

        {/* 2. Trust bar — Factual strip: guides, flexibility, 24/7 care, payment methods */}
        <TrustBar />

        {/* 3. Trending destinations — Intent discovery entry point */}
        <TrendingDestinations />

        {/* 4. Featured tours — Best-converting products with style filters */}
        <FeaturedTours initialTours={initialTours} />

        {/* 5. Travel styles / experiences — Pick your kind of journey */}
        <TravelStyles />

        {/* 6. Special deals — Strict originalPrice > price verified savings */}
        <SpecialDeals />

        {/* 7. Why book with us — 4 concrete value pillars */}
        <WhyChooseUs />

        {/* 8. Social proof — Platform metrics + authentic ReviewCard carousel */}
        <SocialProof />

        {/* 9. How it works — 3 steps with reassurance points & primary CTA */}
        <HowItWorks />

        {/* 10. NEW — Bespoke trip planning & qualified lead capture */}
        <TripInquiry />

        {/* 11. NEW — Private groups & corporate retreats */}
        <GroupTravel />

        {/* 12. NEW — Supply growth: Partner with us / local guides */}
        <PartnerBanner />

        {/* 13. Travel guides — SEO inspiration & editorial guides */}
        <TravelGuides />

        {/* 14. Frequently Asked Questions — Real objection handling + JSON-LD */}
        <HomeFAQ />

        {/* 15. Newsletter — Value-led copy with explicit privacy reassurance */}
        <Newsletter />

        {/* 16. Final CTA — Split banner with primary action & direct support hotline */}
        <FinalCTA />
      </HomeMotion>

      {/* Global Sticky Mobile Action Bar (appears after hero scroll) */}
      <StickyMobileBar />
    </>
  );
}
