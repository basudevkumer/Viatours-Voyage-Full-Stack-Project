import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Timeline from "@/components/shared/Timeline";

/**
 * Data-driven Milestones section.
 * Renders ONLY when real verified corporate milestones exist.
 * Safely omitted otherwise per anti-fabrication rules.
 */
export default function AboutMilestones({ milestones = [] }) {
  if (!milestones || !milestones.length) {
    return null;
  }

  return (
    <section className="border-t border-gray6 bg-gray7/40 py-12 sm:py-16 lg:py-20" id="milestones">
      <Container>
        <SectionHeading
          eyebrow="OUR JOURNEY"
          title="Company milestones"
          text="Key moments in our development and network expansion."
        />

        <div className="max-w-2xl">
          <Timeline items={milestones} />
        </div>
      </Container>
    </section>
  );
}
