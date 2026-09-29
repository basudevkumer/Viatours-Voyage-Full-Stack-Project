import Container from "@/components/shared/Container";
import TrendingCard from "@/components/shared/TrendingCard";
import allImages from "@/components/helper/imageProvider";
import React from "react";

const Trending = () => {
  const { trendingDestinations } = allImages;
  return (
    <section className="pt-[115px] pb-[100px]">
      <Container>
        <div>
          <div className="flex justify-between mb-[45px]">
            <h4 className="heading !text-[30px] text-dark">
              Trending destinations
            </h4>
            <button className=" cursor-pointer title4 text-dark !font-normal">
              see all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {trendingDestinations.map((items, index) => {
              return (
                <TrendingCard
                  image={items.image.src}
                  key={index}
                  tours={items.tours}
                  city={items.city}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Trending;
