"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
export default function Avatar({ src, alt = "", name = "", size = "md", className }) {
  const [failed, setFailed] = useState(false);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
  const dimension = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  return <span className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-field font-medium text-dark", sizes[size] || sizes.md, className)}>{src && !failed ? <Image src={src} alt={alt || name} width={dimension} height={dimension} unoptimized onError={() => setFailed(true)} className="h-full w-full object-cover" /> : <span role="img" aria-label={alt || name || "Avatar"}>{initials}</span>}</span>;
}
