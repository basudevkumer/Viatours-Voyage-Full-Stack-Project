import RatingStars from "@/components/ui/RatingStars";
import PriceTag from "@/components/ui/PriceTag";
import Card from "@/components/shared/Card";
import CardBody from "@/components/shared/CardBody";
import CardMedia from "@/components/shared/CardMedia";


const BestCard = ({ item }) => {
  const { image, location, title, rating, reviews, days, price } = item;

  return (
    <Card className="w-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
      <CardMedia src={image} alt={title ?? "Trip image"} aspect="h-[160px] sm:h-[190px] lg:h-[220px]" />
      <CardBody className="p-3 sm:p-4">

        <p className="body5 text-text-secondary mb-1 truncate">{location}</p>

        <h3 className="title4 sm:title3 text-dark mb-1.5 sm:mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <RatingStars rating={rating} reviewsCount={reviews} showCount size="sm" />
        </div>

        {/* Footer */}
        <div className="border-t border-gray5 pt-2.5 sm:pt-3 flex items-center justify-between gap-2">
          <span className="body5 sm:body4 text-text-secondary whitespace-nowrap">
            {days} days
          </span>
          <PriceTag price={price} size="sm" suffix="" className="justify-end" />
        </div>

      </CardBody>
    </Card>
  );
};

export default BestCard;
