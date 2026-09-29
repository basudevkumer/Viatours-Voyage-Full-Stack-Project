"use client";
import Container from "@/components/shared/Container";
import PopularCard from "@/components/shared/PopularCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import allImages from "@/components/helper/imageProvider";

const Popular = () => {
  const { popularThings } = allImages;

  return (
    <section className="py-10 sm:py-14 lg:py-[60px]">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-[45px]">
          <h4 className="heading !text-2xl sm:!text-[28px] lg:!text-[30px] text-dark">
            Popular things to do
          </h4>
          <button className="cursor-pointer title4 text-dark !font-normal hover:text-accent transition duration-300">
            See all
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          freeMode={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={12}
          slidesPerView={1.8}
          breakpoints={{
            400: { slidesPerView: 2.2, spaceBetween: 14 },
            540: { slidesPerView: 3,   spaceBetween: 16 },
            768: { slidesPerView: 4,   spaceBetween: 20 },
            1024: { slidesPerView: 5,  spaceBetween: 24 },
            1280: { slidesPerView: 6,  spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {popularThings.map((items, index) => (
            <SwiperSlide key={index}>
              <PopularCard
                img={items.image}
                title={items.title}
                num={items.count}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Popular;