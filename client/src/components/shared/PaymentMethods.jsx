import Image from "next/image";
import allImages from "@/components/helper/imageProvider";
import { cn } from "@/lib/cn";

export default function PaymentMethods({ className, imageClassName }) {
  return <ul aria-label="Accepted payment methods" className={cn("flex flex-wrap items-center justify-center gap-1", className)}>{allImages.paymentArry.map((item) => <li key={item.id}><Image src={item.img} alt={item.alt || "Payment method"} width={80} height={25} className={cn("h-[22px] w-[60px] object-contain sm:h-[25px] sm:w-[70px] lg:w-[80px]", imageClassName)} /></li>)}</ul>;
}
