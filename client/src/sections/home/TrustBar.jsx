import Container from "@/components/shared/Container";
import { FiHeadphones, FiMapPin, FiShield, FiStar } from "react-icons/fi";

const trustItems = [
  { icon: FiMapPin, label: "Curated destinations" },
  { icon: FiShield, label: "Flexible trip planning" },
  { icon: FiHeadphones, label: "Travel support" },
  { icon: FiStar, label: "Thoughtful experiences" },
];

const TrustBar = () => (
  <section aria-label="Viatours Voyage benefits" className="border-b border-gray6 bg-white py-4">
    <Container>
      <div className="overflow-hidden">
        <div className="trust-marquee flex min-w-max items-center justify-center gap-8 sm:gap-14 lg:gap-20">
          {[...trustItems, ...trustItems].map(({ icon: Icon, label }, index) => (
            <div key={`${label}-${index}`} className="flex items-center gap-2 text-text-secondary">
              <Icon aria-hidden="true" className="text-accent" size={18} />
              <span className="title4 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default TrustBar;
