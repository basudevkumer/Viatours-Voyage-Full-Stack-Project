"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCalendar, FiHeart, FiUser } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/routes";

const links = [{ href: ROUTES.bookings, label: "Bookings", icon: FiCalendar }, { href: ROUTES.profile, label: "Profile", icon: FiUser }, { href: ROUTES.wishlist, label: "Wishlist", icon: FiHeart }];
export default function DashboardSidebar({ className }) {
  const pathname = usePathname();
  return <nav aria-label="Account navigation" className={cn("rounded-2xl border border-gray6 bg-white p-3", className)}><ul className="grid gap-1">{links.map(({ href, label, icon: Icon }) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined} className={cn("title4 flex min-h-11 items-center gap-3 rounded-xl px-3 text-dark transition-colors hover:bg-bg-field", pathname === href && "bg-bg-field text-accent")}><Icon aria-hidden="true" />{label}</Link></li>)}</ul></nav>;
}
