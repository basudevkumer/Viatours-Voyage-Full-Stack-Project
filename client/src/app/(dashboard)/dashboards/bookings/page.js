import { createMetadata } from "@/lib/seo";
import { getBookings } from "@/services/bookingService";
import BookingListItem from "@/components/shared/BookingListItem";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";
export const metadata = createMetadata({ title: "Bookings | Viatours Voyage", description: "View your travel bookings.", path: "/dashboards/bookings", robots: { index: false, follow: false } });

export default async function Bookings() {
  const result = await getBookings();
  return <section><h1 className="heading mb-6 text-dark">Bookings</h1>{!result.success ? <ErrorState text={result.message} /> : result.data.length ? <div className="grid gap-4">{result.data.map((booking) => <BookingListItem key={booking.id} booking={booking} />)}</div> : <EmptyState title="No bookings yet" text="When you book a tour, its details will appear here." action={<Button href="/tours">Explore tours</Button>} />}</section>;
}
