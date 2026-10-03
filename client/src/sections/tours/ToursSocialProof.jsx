import StatsBar from "@/components/shared/StatsBar";
import { tourStats } from "./data";

export default function ToursSocialProof() {
  // Factual operational statistics; zero fabricated reviews per strict CRO guidelines
  return <StatsBar items={tourStats} className="border-t border-b border-gray6 bg-white" />;
}
