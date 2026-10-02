import Container from "@/components/shared/Container";
import { FiHeadphones, FiMapPin, FiShield, FiStar } from "react-icons/fi";
import Marquee from "@/components/shared/Marquee";

const trustItems = [
  { icon: FiMapPin, label: "Curated destinations" },
  { icon: FiShield, label: "Flexible trip planning" },
  { icon: FiHeadphones, label: "Travel support" },
  { icon: FiStar, label: "Thoughtful experiences" },
];

const TrustBar = () => (
  <section aria-label="Viatours Voyage benefits" className="border-b border-gray6 bg-white py-4">
    <Container>
      <Marquee items={trustItems} className="[&_.trust-marquee]:gap-8 sm:[&_.trust-marquee]:gap-14 lg:[&_.trust-marquee]:gap-20" renderItem={({ icon: Icon, label }) => (
            <div className="flex items-center gap-2 px-4 text-text-secondary">
              <Icon aria-hidden="true" className="text-accent" size={18} />
              <span className="title4 whitespace-nowrap">{label}</span>
            </div>
          )} />
    </Container>
  </section>
);

export default TrustBar;
