import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import RatingStars from "@/components/ui/RatingStars";
import Card from "@/components/shared/Card";
import CardBody from "@/components/shared/CardBody";

export default function ReviewCard({ avatar, name, rating, date, text, tourTitle, source, className }) {
  return <Card className={className}><CardBody><div className="flex items-center gap-3"><Avatar src={avatar} name={name} alt={`${name}'s avatar`} /><div className="min-w-0"><h3 className="title3 truncate text-dark">{name}</h3>{date && <time className="body5 text-text-secondary">{date}</time>}</div><Badge variant="light" className="ml-auto shrink-0">{source}</Badge></div><div className="mt-4"><RatingStars rating={rating} size="sm" /></div><blockquote className="body3 mt-4 text-text-secondary">{text}</blockquote>{tourTitle && <p className="body5 mt-4 text-dark">Experience: {tourTitle}</p>}</CardBody></Card>;
}
