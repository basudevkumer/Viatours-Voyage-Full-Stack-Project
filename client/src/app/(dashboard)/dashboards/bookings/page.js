import React from 'react'
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Bookings | Viatours Voyage", description: "View your travel bookings.", path: "/dashboards/bookings", robots: { index: false, follow: false } });

const Bookings = () => {
  return (
    <div>This is  Bookings page</div>
  )
}

export default Bookings
