import Container from "@/components/shared/Container";
import { FiArrowUpRight, FiMap, FiSliders, FiSmile } from "react-icons/fi";

const steps = [
  ["01", "Choose your destination", FiMap],
  ["02", "Select your experience", FiSliders],
  ["03", "Plan your trip", FiArrowUpRight],
  ["04", "Travel and enjoy", FiSmile],
];

const HowItWorks = () => (
  <section className="py-16 sm:py-20 lg:py-28">
    <Container>
      <div className="mx-auto max-w-[680px] text-center">
        <p className="caption text-accent">THE SIMPLE PART</p>
        <h2 className="heading mt-3 text-dark">
          From “where next?” to “we’re here.”
        </h2>
        <p className="body1 mt-4 text-text-secondary">
          A clear path keeps the excitement in travel planning and the guesswork
          out.
        </p>
      </div>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {steps.map(([number, title, Icon]) => (
          <li
            key={number}
            className="rounded-2xl border border-gray5 bg-white p-5 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="caption text-accent">{number}</span>
              <Icon aria-hidden="true" className="text-dark" size={21} />
            </div>
            <h3 className="title2 mt-12 max-w-[170px] text-dark">{title}</h3>
          </li>
        ))}
      </ol>
    </Container>
  </section>
);

export default HowItWorks;
