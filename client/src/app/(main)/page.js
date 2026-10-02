import Bannar from "@/sections/home/Bannar";
import HomeMotion from "@/components/animation/HomeMotion";
import BestPlace from "@/sections/home/BestPlace";
import Experiences from "@/sections/home/Experiences";
import FinalCTA from "@/sections/home/FinalCTA";
import HowItWorks from "@/sections/home/HowItWorks";
import Newsletter from "@/sections/home/Newsletter";
import SpecialDeals from "@/sections/home/SpecialDeals";
import TrustBar from "@/sections/home/TrustBar";
import Travel from "@/sections/home/Travel";
import Travelers from "@/sections/home/Travelers";
import Trending from "@/sections/home/Trending";
import Trip from "@/sections/home/Trip";
import WhyChooseUs from "@/sections/home/WhyChooseUs";
import React from "react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Viatours Voyage | Find Your Next Journey", description: "Explore curated tours, destinations, and local experiences for your next trip.", path: "/" });

const Home = () => {
  return (
    <HomeMotion>
      <Bannar />
      <TrustBar />
      <Trending />
      <Trip />
      <Experiences />
      <BestPlace />
      <SpecialDeals />
      <WhyChooseUs />
      <HowItWorks />
      <Travelers />
      <Travel />
      <Newsletter />
      <FinalCTA />
    </HomeMotion>
  );
};

export default Home;
