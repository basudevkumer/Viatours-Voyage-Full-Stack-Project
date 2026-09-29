import Image from "next/image";

const TrendingCard = ({ image, city, tours }) => {
  return (
    <div className="flex items-center gap-5 bg-white border border-gray5 rounded-2xl px-4 py-3 cursor-pointer hover:shadow-md transition-shadow">
      {/* Circle Image */}
      <div className="w-[110px] h-[110px] rounded-full overflow-hidden shrink-0">
        <Image
          src={image}
          alt={city}
          width={110}
          height={110}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text */}
      <div>
        <p className="title3 mb-[6px] text-text-dark">{city}</p>
        <p className="body5 text-text-secondary">{tours}</p>
      </div>
    </div>
  );
};

export default TrendingCard;
