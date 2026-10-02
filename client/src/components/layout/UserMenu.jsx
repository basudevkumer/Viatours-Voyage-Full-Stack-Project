"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/routes";

export default function UserMenu() {
  const { user, logout, status } = useAuth();
  return <details className="group relative">
    <summary aria-label="User menu" className="flex h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">{user ? <Avatar src={user.avatar} name={user.name || user.email} size="sm" /> : <FiUser aria-hidden="true" />}</summary>
    <div className="absolute right-0 top-full z-[60] mt-2 min-w-48 rounded-xl border border-gray5 bg-white p-2 text-dark shadow-xl">{user ? <><Link className="title4 block rounded-lg px-3 py-2 hover:bg-bg-field" href={ROUTES.bookings}>Bookings</Link><Link className="title4 block rounded-lg px-3 py-2 hover:bg-bg-field" href={ROUTES.profile}>Profile</Link><Link className="title4 block rounded-lg px-3 py-2 hover:bg-bg-field" href={ROUTES.wishlist}>Wishlist</Link><button type="button" disabled={status === "loading"} onClick={logout} className="title4 min-h-11 w-full rounded-lg px-3 py-2 text-left hover:bg-bg-field">Log out</button></> : <><Link className="title4 block rounded-lg px-3 py-2 hover:bg-bg-field" href={ROUTES.login}>Log in</Link><Link className="title4 block rounded-lg px-3 py-2 hover:bg-bg-field" href={ROUTES.signup}>Sign up</Link></>}</div>
  </details>;
}
