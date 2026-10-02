import Image from "next/image";
import { cn } from "@/lib/cn";
import { isValidElement } from "react";
export default function FeatureItem({ icon: Icon, title, description, className }) {
  const imageIcon = typeof Icon === "string" || (typeof Icon === "object" && Icon?.src);
  return <div className={cn("rounded-2xl bg-white p-6 transition-shadow hover:shadow-md", className)}><span className="relative mb-4 flex h-10 w-10 items-center justify-center text-accent">{imageIcon ? <Image src={Icon} fill className="object-contain" alt="" /> : isValidElement(Icon) ? Icon : Icon && <Icon aria-hidden="true" size={22} />}</span><h3 className="title3 mb-2 text-dark">{title}</h3><p className="body4 max-w-[183px] text-text-secondary">{description}</p></div>;
}
