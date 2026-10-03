import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { FiDollarSign, FiShield, FiUsers, FiCheckCircle } from "react-icons/fi";

const principleIcons = {
  transparency: <FiDollarSign className="text-2xl text-accent" aria-hidden="true" />,
  "honest-rates": <FiShield className="text-2xl text-accent" aria-hidden="true" />,
  "small-groups": <FiUsers className="text-2xl text-accent" aria-hidden="true" />,
  "flexible-policies": <FiCheckCircle className="text-2xl text-success" aria-hidden="true" />,
};

export default function AboutPrinciples({ principles = [] }) {
  if (!principles.length) return null;

  return (
    <section className="border-t border-gray6 bg-gray7/40 py-12 sm:py-16 lg:py-20" id="principles">
      <Container>
        <SectionHeading
          eyebrow="HOW WE HELP YOU PLAN"
          title="Four core operating commitments"
          text="We replace industry ambiguity with plain facts. These principles guide every itinerary published on Viatours Voyage."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-field shadow-2xs">
                  {principleIcons[p.id] || <FiCheckCircle className="text-2xl text-accent" aria-hidden="true" />}
                </div>
                <h3 className="title2 text-dark">{p.title}</h3>
                <p className="body4 mt-2.5 text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
