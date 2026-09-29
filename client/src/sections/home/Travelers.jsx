"use client";

import Container from "@/components/shared/Container";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import allImages from "@/components/helper/imageProvider";

const Travelers = () => {
  const { travelersImages, travelerArr } = allImages;

  return (
    <section className="pt-12 sm:pt-16 lg:pt-[75px] pb-14 sm:pb-16 lg:pb-[90px] bg-text-dark mt-10 sm:mt-14 lg:mt-[105px]">
      <Container>

        {/* ── Top: Heading + Swiper ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-[200px] overflow-hidden">

          {/* Left: Text */}
          <div>
            <h4 className="heading !text-2xl sm:!text-[28px] lg:!text-[30px] text-bg-white max-w-full lg:max-w-[277px]">
              What our Travelers are saying
            </h4>

            <div className="mt-6 sm:mt-8 lg:mt-[33px] flex gap-6 sm:gap-8 lg:gap-5">
              {/* Rating */}
              <div>
                <h4 className="heading !text-3xl sm:!text-[38px] text-bg-white">
                  4.8
                </h4>
                <p className="title4 mt-1.5 sm:mt-2 text-bg-white max-w-[180px] sm:max-w-[208px]">
                  1000+ reviews on TripAdvisor. Certificate of Excellence
                </p>
              </div>

              {/* Customers */}
              <div>
                <h4 className="heading !text-3xl sm:!text-[38px] text-bg-white">
                  16M
                </h4>
                <p className="title4 mt-1.5 sm:mt-2 text-bg-white">
                  Happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Right: Swiper */}
          <div className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] mx-auto lg:mx-0">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {[...new Array(10)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={travelersImages}
                    width={520}
                    height={342}
                    alt={`Traveler experience ${index + 1}`}
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>

        {/* ── Bottom: Trusted brands ── */}
        <div className="mt-14 sm:mt-16 lg:mt-[160px]">
          <p className="title4 text-bg-white text-center">
            Trusted by all the largest travel brands
          </p>

          {/* Brand logos */}
          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center lg:justify-between items-center gap-4 sm:gap-6 lg:gap-0">
            {travelerArr.map((items) => (
              <Image
                key={items.id}
                width={100}
                height={30}
                alt={items.alt ?? "Travel brand logo"}
                src={items.img}
                className="w-[70px] sm:w-[85px] lg:w-[100px] h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};

export default Travelers;