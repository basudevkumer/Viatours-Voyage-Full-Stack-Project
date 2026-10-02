import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import {
  FiArrowDown,
  FiArrowRight,
  FiCoffee,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const moments = [
  [FiCoffee, "Morning", "Start with local breakfast and a neighborhood story."],
  [FiSun, "Afternoon", "Choose a hands-on activity, boat day or city walk."],
  [
    FiMoon,
    "Evening",
    "End with sunset views, a food walk or a cultural performance.",
  ],
];
const BuildYourDay = () => (
  <section className="py-14 sm:py-20">
    <Container>
      <div className="mx-auto max-w-[900px] text-center">
        <SectionHeading align="center" eyebrow="PLAN THE FEELING" title="Build your perfect day" text="A lightweight way to imagine your itinerary before you choose the details." className="mb-0" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {moments.map(([Icon, time, text], index) => (
            <div
              key={time}
              className="relative rounded-2xl border border-gray6 bg-white p-6 text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-commonbg text-xl text-accent">
                <Icon />
              </span>
              <p className="caption mt-5 text-accent">{time}</p>
              <p className="body3 mt-2 text-dark">{text}</p>
              {index < 2 && (
                <FiArrowDown className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 text-accent md:-right-6 md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-[-90deg]" />
              )}
            </div>
          ))}
        </div>
        <Button
          href="#discover"
          variant="secondary"
          size="lg"
          rightIcon={<FiArrowRight />}
          className="mt-8"
        >
          Explore experiences
        </Button>
      </div>
    </Container>
  </section>
);
export default BuildYourDay;
