import DestinationCard from "@/components/shared/DestinationCard";

export default function PopularCard({ title, num, img, href = "/activities", className }) {
  return <DestinationCard image={img} name={title} tours={num} href={href} className={className} />;
}
