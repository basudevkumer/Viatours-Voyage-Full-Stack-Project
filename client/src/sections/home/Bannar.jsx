import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";
import React from "react";

const Bannar = () => {
  const { banner, map } = allImages;

  return (
    <section
      style={{ backgroundImage: `url(${banner.src ?? banner})` }}
      className="w-full bg-cover bg-center bg-no-repeat min-h-[500px] sm:min-h-[650px] lg:min-h-[854px]"
    >
      {/* Dark overlay for text readability on mobile */}
      <div className="w-full h-full min-h-[500px] sm:min-h-[650px] lg:min-h-[854px] bg-dark/30 lg:bg-transparent">
        <Container>
          <div className="pt-[120px] pb-10 sm:pt-[200px] sm:pb-12 lg:py-[350px] flex flex-col lg:grid lg:grid-cols-2 lg:gap-[50px]">

            {/* ─── Left: Text Content ─── */}
            <div>
              <p className="title4 sm:title3 text-white">Starting at $978</p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[120%] tracking-[-0.1px] text-white max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] pt-3 sm:pt-4 lg:pt-5 pb-4 sm:pb-5 lg:pb-6">
                Iceland's Legendary Golden Circle
              </h1>

              <p className="body4 sm:title4 text-white mb-5 sm:mb-6 max-w-[300px] sm:max-w-[380px] lg:max-w-[425px]">
                Enjoy a full-day bus tour of Iceland's legendary Golden Circle.
                Soak in the warm thermal waters of the Secret Lagoon.
              </p>

              <Button childern={"View Tour"} />
            </div>

            {/* ─── Right: Map Card ─── */}
            <div className="mt-8 sm:mt-10 lg:mt-0 lg:justify-self-end">
              <div className="max-w-[280px] sm:max-w-[340px] lg:w-[700px] bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20">

                <div className="mb-3">
                  <p className="body5 text-white/70">Day 1</p>
                  <p className="title4 text-white mt-1">Secret Lagoon</p>
                </div>

                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={map}
                    alt="Tour route map"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <div className="text-right">
                    <p className="body5 text-white/70">Day 5</p>
                    <p className="title4 text-white mt-1">Secret Lagoon</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
};

export default Bannar;