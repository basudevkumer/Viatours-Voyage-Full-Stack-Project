"use client";

import Container from "@/components/shared/Container";
import React from "react";

// Import Swiper React components
import CardCarousel from "@/components/shared/CardCarousel";

// import required modules

// Import Swiper styles
import allImages from "@/components/helper/imageProvider";
import TripCard from "@/components/shared/TripCard";

const Trip = () => {
  const { featuredTrips } = allImages;

  return (
    <section>
      <Container>
        <h4 className="heading !text-[30px] text-dark mb-[40px]">
          Featured Trips
        </h4>
      </Container>
      <div>
        <CardCarousel
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          autoplay
           breakpoints={{
          '320': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '1024': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
          className="mySwiper"
          ariaLabel="Featured trips"
        >
          {featuredTrips.map((items, index) => {
            return (
              <React.Fragment key={index}>
                <TripCard
                  image={items.image.src}
                  price={items.price}
                  days={items.days}
                  location={items.location}
                  title={items.title}
                  rating={items.rating}
                  reviews={items.reviews}
                />
              </React.Fragment>
            );
          })}
        </CardCarousel>
      </div>
    </section>
  );
};

export default Trip;
