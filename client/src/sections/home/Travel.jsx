"use client";
import Container from "@/components/shared/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import TravelCard from "@/components/shared/TravelCard";
import allImages from "@/components/helper/imageProvider";

const Travel = () => {
  const { traveItems } = allImages;

  return (
    <section className="py-12 sm:py-16 lg:py-[115px] px-0 sm:px-6 lg:px-[105px]">
      <Container>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-[45px]">
          <h4 className="heading !text-2xl sm:!text-[28px] lg:!text-[30px] text-dark">
            Travel Articles
          </h4>
          <button className="cursor-pointer title4 text-dark !font-normal hover:text-accent transition duration-300">
            See all
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          freeMode={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={12}
          slidesPerView={1.1}
          breakpoints={{
            400: { slidesPerView: 1.3, spaceBetween: 14 },
            540: { slidesPerView: 1.8, spaceBetween: 16 },
            768: { slidesPerView: 2,   spaceBetween: 20 },
            1024: { slidesPerView: 2.5, spaceBetween: 24 },
            1280: { slidesPerView: 3,  spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {traveItems.map((items, index) => (
            <SwiperSlide key={index}>
              <TravelCard item={items} />
            </SwiperSlide>
          ))}
        </Swiper>

      </Container>
    </section>
  );
};

export default Travel;
