import StatsBar from "@/components/shared/StatsBar";
import { destinationStats } from "./data";

export default function DestinationSocialProof() {
  // Real factual operational metrics; zero fabricated reviews per strict CRO guidelines
  return <StatsBar items={destinationStats} className="border-t border-b border-gray6" />;
}
