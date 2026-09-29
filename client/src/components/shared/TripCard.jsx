import Image from "next/image";

const TripCard = ({ image, days, location, title, rating, reviews, price }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 w-full h-[320px] sm:h-[380px] lg:h-[450px]">

      {/* Background Image */}
      <Image
        src={image}
        alt={title ?? "Trip image"}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05073C]/75 from-20% via-[#05073C]/20 to-transparent" />

      {/* Days Badge */}
      <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/20 backdrop-blur-sm text-white body5 px-2.5 sm:px-3 py-1 rounded-full">
        {days} days
      </span>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 lg:p-5">
        <p className="body5 text-white/70 mb-1">{location}</p>
        <h3 className="title4 sm:title3 text-white mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Rating & Price */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs sm:text-sm">★</span>
            <span className="body5 text-white font-medium">{rating}</span>
            <span className="body5 text-white/60">({reviews})</span>
          </div>
          <div className="text-right">
            <p className="body5 text-white/60">From</p>
            <p className="title3 sm:title2 text-white">${price}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TripCard;