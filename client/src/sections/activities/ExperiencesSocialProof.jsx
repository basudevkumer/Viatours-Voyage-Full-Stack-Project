import StatsBar from "@/components/shared/StatsBar";
import { experienceStats } from "./data";

export default function ExperiencesSocialProof() {
  return (
    <div id="experience-guarantees" aria-label="Experience guarantees and operational standards">
      <StatsBar items={experienceStats} className="bg-white border-y border-gray6" />
    </div>
  );
}
