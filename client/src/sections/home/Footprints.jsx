import allImages from "@/components/helper/imageProvider";
import Image from "next/image";

const Footprints = () => {
  const { footprints } = allImages;

  return (
    <section className="bg-bg-cream py-14 sm:py-16 lg:py-[120px] mt-10 sm:mt-14 lg:mt-[105px] mb-10 sm:mb-14 lg:mb-[115px]">
      <div className="max-w-[1270px] mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h2 className="heading !text-2xl sm:!text-3xl lg:!text-4xl text-dark text-center mb-8 sm:mb-10 lg:mb-[50px]">
          Our Footprints
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {footprints.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[20px] p-4 sm:p-6 lg:p-0"
            >
              {/* Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]">
                <Image
                  src={item.icon}
                  fill
                  className="object-contain"
                  alt={item.label}
                />
              </div>

              {/* Value + Label */}
              <div className="flex flex-col items-center gap-1 sm:gap-[6px]">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[120%] text-dark">
                  {item.value}
                </span>
                <span className="body5 sm:body4 text-text-secondary text-center">
                  {item.label}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Footprints;