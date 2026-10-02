import Image from "next/image";
import { cn } from "@/lib/cn";
export default function CardMedia({ src, alt = "", aspect = "aspect-[1.35]", sizes, className, imageClassName, overlay, badge, children, priority = false }) {
  return <div className={cn("relative overflow-hidden", aspect, className)}><Image src={src} alt={alt} fill sizes={sizes || "(max-width: 768px) 100vw, 50vw"} priority={priority} className={cn("object-cover transition-transform duration-500 group-hover:scale-105", imageClassName)} />{overlay}{badge}{children}</div>;
}
