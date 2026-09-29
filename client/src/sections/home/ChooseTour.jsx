import Container from "@/components/shared/Container";
import FeatureCard from "@/components/shared/FeatureCard";
import allImages from "@/components/helper/imageProvider";
import { tourfeature } from "@/components/helper/projectsData";
import Image from "next/image";

import React from "react";

const ChooseTour = () => {
  const { tourImages } = allImages;
  return (
    <>
      {/* for lg devices */}
      <section className=" hidden lg:block relative pt-[120px] pb-[115px] overflow-hidden">
        <div className=" absolute rounded-[24px] overflow-hidden w-[710px] h-[710px] top-[50%] translate-y-[-50%]">
          <Image
            src={tourImages}
            width={710}
            height={710}
            alt="choses-images"
          />
        </div>

        <div className="  relative rounded-[14px] ml-auto   bg-commonbg max-w-[1270px]  h-[816px]">
          <div className="flex gap-[30px] absolute top-1/2 left-[24%] translate-y-[-50%]">
            {tourfeature.map((items, index) => {
              return (
                <FeatureCard
                  key={index}
                  icon={items.img}
                  title={items.title}
                  description={items.description}
                />
              );
            })}
          </div>
          <div className="pt-[210px] flex  justify-center ">
            {" "}
            <div>
              <h4 className="heading !text-[30px] text-dark">
                Why choose Tour
              </h4>
              <p className="text-gray2 pt-1  title4">
                Most viewed and all-time top-selling services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* for small devices */}

      <section className="lg:hidden py-12 sm:py-16">
        <Container>
          {/* Image */}
          <div className="relative w-full max-w-[420px] mx-auto aspect-square rounded-2xl overflow-hidden mb-8">
            <Image
              src={tourImages}
              fill
              alt="Why choose tour"
              className="object-cover"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h4 className="heading !text-2xl sm:!text-[28px] text-dark">
              Why choose Tour
            </h4>
            <p className="text-gray2 pt-1 title4">
              Most viewed and all-time top-selling services
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tourfeature.map((items, index) => (
              <FeatureCard
                key={index}
                icon={items.img}
                title={items.title}
                description={items.description}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ChooseTour;
