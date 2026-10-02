import React from 'react'
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Destinations | Viatours Voyage", description: "Browse destinations and start planning your next journey.", path: "/destinations" });
const Destinations = () => {
  return (
    <div className=''>This is Destinations pages</div>
  )
};
export default Destinations
