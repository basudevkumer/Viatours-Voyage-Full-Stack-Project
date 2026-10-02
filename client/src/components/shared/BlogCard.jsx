import Badge from "@/components/ui/Badge";
import Card from "@/components/shared/Card";
import CardBody from "@/components/shared/CardBody";
import CardMedia from "@/components/shared/CardMedia";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function BlogCard({ category, date, author, title, href = "/pages", image, excerpt, className }) {
  return <Card as="div" className={cn("w-full transition-shadow hover:shadow-lg", className)}><Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
    <CardMedia src={image} alt={title} aspect="h-[180px] sm:h-[200px] lg:h-[220px]" badge={category && <Badge variant="light" className="absolute left-3 top-3 shadow-sm">{category}</Badge>} />
    <CardBody className="p-3 sm:p-4"><div className="mb-2 flex flex-wrap items-center gap-1.5 sm:mb-3 sm:gap-2">{date && <time className="caption !text-xs text-text-secondary sm:!text-sm">{date}</time>}{date && author && <span aria-hidden="true" className="hidden caption text-text-secondary sm:inline">•</span>}{author && <span className="caption !text-xs text-text-secondary sm:!text-sm">By {author}</span>}</div><h3 className="title4 line-clamp-2 text-dark sm:title3">{title}</h3>{excerpt && <p className="body4 mt-2 line-clamp-3 text-text-secondary">{excerpt}</p>}</CardBody>
  </Link></Card>;
}
