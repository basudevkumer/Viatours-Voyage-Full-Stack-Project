import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TeamMemberCard from "@/components/shared/TeamMemberCard";

/**
 * Data-driven Team section.
 * Renders ONLY when real, verified team data is provided.
 * Safely omitted otherwise (zero placeholder names or stock photos).
 */
export default function AboutTeam({ team = [] }) {
  if (!team || !team.length) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="team">
      <Container>
        <SectionHeading
          eyebrow="OUR LEADERSHIP"
          title="The team behind the journeys"
          text="Meet our destination specialists, itinerary designers, and traveler coordinators."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
