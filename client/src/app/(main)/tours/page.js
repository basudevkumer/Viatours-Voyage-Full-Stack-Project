import DestinationDiscovery from "@/sections/tours/DestinationDiscovery";
import FAQ from "@/sections/tours/FAQ";
import PopularTours from "@/sections/tours/PopularTours";
import TourDiscovery from "@/sections/tours/TourDiscovery";
import ToursFinalCTA from "@/sections/tours/ToursFinalCTA";
import ToursHero from "@/sections/tours/ToursHero";
import SpecialDeals from "@/sections/tours/SpecialDeals";
import TravelConfidence from "@/sections/tours/TravelConfidence";
import TravelInspiration from "@/sections/tours/TravelInspiration";
import TravelStyles from "@/sections/tours/TravelStyles";
import Reveal from "@/components/animation/Reveal";

const Tours = () => (
  <Reveal as="main" className="bg-bg-grey" selector="main > section">
    <ToursHero />
    <TourDiscovery />
    <PopularTours />
    <TravelStyles />
    <DestinationDiscovery />
    <SpecialDeals />
    <TravelConfidence />
    <TravelInspiration />
    <FAQ />
    <ToursFinalCTA />
  </Reveal>
);

export default Tours;
