import Bannar from "@/sections/home/Bannar";
import BestPlace from "@/sections/home/BestPlace";
import ChooseTour from "@/sections/home/ChooseTour";
import Footprints from "@/sections/home/Footprints";
import Popular from "@/sections/home/Popular";
import Travel from "@/sections/home/Travel";
import Travelers from "@/sections/home/Travelers";
import Trending from "@/sections/home/Trending";
import Trip from "@/sections/home/Trip";
import React from "react";

const Home = () => {
  return (
    <>
      <Bannar />
      <Trending />
      <Trip />
      <ChooseTour />
      <Popular />
      <Footprints />
      <BestPlace/>
      <Travelers/>
      <Travel/>
    </>
  );
};

export default Home;
