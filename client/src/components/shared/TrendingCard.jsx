import DestinationCard from "@/components/shared/DestinationCard";

export default function TrendingCard({ image, city, tours, href = "/destinations", className }) {
  return <DestinationCard image={image} name={city} tours={tours} href={href} className={className} />;
}
