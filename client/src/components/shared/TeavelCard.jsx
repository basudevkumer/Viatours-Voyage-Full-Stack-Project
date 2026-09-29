import Image from "next/image";

const TravelCard = ({ item }) => {
  const { image, category, date, author, title } = item;

  return (
    <div className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group w-full">

      {/* Image */}
      <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
        <Image
          src={image}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={title ?? "Travel article"}
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white rounded-full px-2.5 sm:px-3 py-1 body5 text-dark font-medium shadow-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">

        {/* Date & Author */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <span className="caption !text-xs sm:!text-sm text-text-secondary">
            {date}
          </span>
          <span className="hidden sm:inline caption text-text-secondary">•</span>
          <span className="caption !text-xs sm:!text-sm text-text-secondary">
            By {author}
          </span>
        </div>

        {/* Title */}
        <h3 className="title4 sm:title3 text-dark line-clamp-2">
          {title}
        </h3>

      </div>
    </div>
  );
};

export default TravelCard;