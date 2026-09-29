import Image from "next/image";

const PopularCard = ({ title, num, img }) => {
  return (
    <div className="relative overflow-hidden rounded-[12px] w-full h-[160px] sm:h-[185px] lg:h-[220px] cursor-pointer group">

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#05073C]/70 from-10% via-[#05073C]/50 via-40% to-transparent" />

      {/* Image */}
      <Image
        src={img}
        alt={title ?? "Popular activity"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Text */}
      <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 text-center w-full px-2">
        <p className="title4 sm:title3 lg:title2 text-white whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </p>
        <p className="mt-0.5 sm:mt-1 body5 sm:title4 text-white/80">
          {num}
        </p>
      </div>

    </div>
  );
};

export default PopularCard;