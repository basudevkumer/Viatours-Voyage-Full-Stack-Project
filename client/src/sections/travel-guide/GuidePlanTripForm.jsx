import DestinationInquiry from "@/sections/destinations/DestinationInquiry";

export default function GuidePlanTripForm({ preselectedDestination = "" }) {
  return (
    <DestinationInquiry
      type="guide-trip"
      id="plan-my-trip"
      preselectedDestination={preselectedDestination}
      title="Inspired by our field notes? Let us craft your itinerary"
      subtitle="Share your destination of interest, dates, and preferred style. Our local coordinators will design a balanced itinerary with verified native hosts—free with zero obligation."
    />
  );
}
