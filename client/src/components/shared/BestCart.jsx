import Image from "next/image";
import { IoMdStar } from "react-icons/io";


const BestCard = ({ item }) => {
  const { image, location, title, rating, reviews, days, price } = item;

  return (
    <div className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group w-full">

      {/* Image */}
      <div className="relative w-full h-[160px] sm:h-[190px] lg:h-[220px] overflow-hidden">
        <Image
          src={image}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={title ?? "Trip image"}
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">

        <p className="body5 text-text-secondary mb-1 truncate">{location}</p>

        <h3 className="title4 sm:title3 text-dark mb-1.5 sm:mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <span className="text-accent text-xs sm:text-sm"><IoMdStar/></span>
          <span className="body5 sm:body4 font-semibold text-dark">{rating}</span>
          <span className="body5 sm:body4 text-text-secondary">({reviews})</span>
        </div>

        {/* Footer */}
        <div className="border-t border-gray5 pt-2.5 sm:pt-3 flex items-center justify-between gap-2">
          <span className="body5 sm:body4 text-text-secondary whitespace-nowrap">
            {days} days
          </span>
          <span className="body5 sm:body4 text-text-secondary text-right">
            From{" "}
            <span className="title4 sm:title3 text-dark">${price}</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default BestCard;