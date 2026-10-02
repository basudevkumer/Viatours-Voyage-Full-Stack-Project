import Link from "next/link";
import { cn } from "@/lib/cn";

export default function BookingListItem({ booking, className }) {
  const title = booking.title || booking.tourTitle || "Trip booking";
  return <article className={cn("flex flex-col justify-between gap-4 rounded-2xl border border-gray6 bg-white p-5 sm:flex-row sm:items-center", className)}><div><h2 className="title3 text-dark">{title}</h2><p className="body4 mt-1 text-text-secondary">{booking.date ? `Travel date: ${booking.date}` : "Date to be confirmed"}</p>{booking.status && <p className="body5 mt-2 text-text-secondary">Status: {booking.status}</p>}</div>{booking.href && <Link href={booking.href} className="title4 inline-flex min-h-11 items-center text-accent hover:underline">View details</Link>}</article>;
}
