import RatingStars from "@/components/ui/RatingStars";
import PriceTag from "@/components/ui/PriceTag";
import Card from "@/components/shared/Card";
import CardBody from "@/components/shared/CardBody";
import CardMedia from "@/components/shared/CardMedia";
import Badge from "@/components/ui/Badge";

const TripCard = ({ image, days, location, title, rating, reviews, price }) => {
  return (
    <Card className="relative h-[320px] w-full cursor-pointer transition-shadow duration-300 hover:shadow-xl sm:h-[380px] lg:h-[450px]">
      <CardMedia src={image} alt={title ?? "Trip image"} aspect="absolute inset-0" overlay={<div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark/75 from-20% via-dark/20 to-transparent" />} badge={<Badge variant="light" className="absolute left-3 top-3 bg-white/20 text-white backdrop-blur-sm sm:left-4 sm:top-4">{days} days</Badge>} imageClassName="group-hover:scale-105" />
      <CardBody className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 lg:p-5">
        <p className="body5 text-white/70 mb-1">{location}</p>
        <h3 className="title4 sm:title3 text-white mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Rating & Price */}
        <div className="flex items-end justify-between">
          <RatingStars rating={rating} reviewsCount={reviews} showCount size="sm" className="text-white [&>span:nth-child(2)]:!text-white [&>span:nth-child(3)]:!text-white" />
          <PriceTag price={price} tone="dark" suffix="" size="md" className="justify-end text-right" />
        </div>
      </CardBody>
    </Card>
  );
};

export default TripCard;
