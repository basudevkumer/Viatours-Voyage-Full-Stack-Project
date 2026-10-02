"use client";

import Container from "@/components/shared/Container";
import React from "react";
import CardCarousel from "@/components/shared/CardCarousel";
import allImages from "@/components/helper/imageProvider";
import BestCard from "@/components/shared/BestCard";

const BestPlace = () => {
  const { bestTrips } = allImages;

  return (
    <section className="py-10 sm:py-14 lg:py-[60px]">
      <Container>
        {/* Heading */}
        <h4 className="heading !text-2xl sm:!text-[28px] lg:!text-[30px] text-dark pb-6 sm:pb-8 lg:pb-12">
          Best of <span className="text-gray3">New York</span>
        </h4>

        {/* Swiper */}
        <CardCarousel
          freeMode={true}
          autoplay
          spaceBetween={12}
          slidesPerView={1.2}
          breakpoints={{
            400: { slidesPerView: 1.4, spaceBetween: 14 },
            540: { slidesPerView: 2,   spaceBetween: 16 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3,  spaceBetween: 24 },
            1280: { slidesPerView: 4,  spaceBetween: 30 },
          }}
          className="mySwiper"
          ariaLabel="Best of New York tours"
        >
          {bestTrips.map((items, index) => (
            <React.Fragment key={index}>
              <BestCard item={items} />
            </React.Fragment>
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
};

export default BestPlace;
