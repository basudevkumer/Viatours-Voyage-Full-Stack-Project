import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function DestinationCard({ image, name, tours, href = "#", layout = "overlay", className }) {
  const horizontal = layout === "horizontal";
  return <Link href={href} className={cn(horizontal ? "flex items-center gap-5 rounded-2xl border border-gray5 bg-white px-4 py-3 transition-shadow hover:shadow-md" : "group relative block h-[160px] w-full cursor-pointer overflow-hidden rounded-xl sm:h-[185px] lg:h-[220px]", className)}>
    {horizontal ? <><span className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-full"><Image src={image} alt={name} fill sizes="110px" className="object-cover" /></span><span><span className="title3 mb-1.5 block text-dark">{name}</span><span className="body5 text-text-secondary">{tours}</span></span></> : <><Image src={image} alt={name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-dark/70 from-10% via-dark/50 via-40% to-transparent" /><span className="absolute bottom-4 left-1/2 z-20 w-full -translate-x-1/2 overflow-hidden px-2 text-center sm:bottom-5 lg:bottom-6"><span className="title4 block overflow-hidden text-ellipsis whitespace-nowrap text-white sm:title3 lg:title2">{name}</span>{tours && <span className="body5 mt-0.5 block text-white/80 sm:mt-1 sm:title4">{tours}</span>}</span></>}
  </Link>;
}
