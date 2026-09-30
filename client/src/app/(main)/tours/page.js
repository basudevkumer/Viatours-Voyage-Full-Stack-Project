import DestinationDiscovery from "@/sections/tours/DestinationDiscovery";
import FAQ from "@/sections/tours/FAQ";
import PopularTours from "@/sections/tours/PopularTours";
import TourDiscovery from "@/sections/tours/TourDiscovery";
import ToursFinalCTA from "@/sections/tours/ToursFinalCTA";
import ToursHero from "@/sections/tours/ToursHero";
import SpecialDeals from "@/sections/tours/SpecialDeals";
import TravelConfidence from "@/sections/tours/TravelConfidence";
import TravelInspiration from "@/sections/tours/TravelInspiration";
import TravelerReviews from "@/sections/tours/TravelerReviews";
import TravelStyles from "@/sections/tours/TravelStyles";
import TrustStats from "@/sections/tours/TrustStats";

const Tours = () => (
  <main className="bg-bg-grey">
    <ToursHero />
    <TrustStats />
    <TourDiscovery />
    <PopularTours />
    <TravelStyles />
    <DestinationDiscovery />
    <SpecialDeals />
    <TravelConfidence />
    <TravelerReviews />
    <TravelInspiration />
    <FAQ />
    <ToursFinalCTA />
  </main>
);

export default Tours;
