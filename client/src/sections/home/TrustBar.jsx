import Container from "@/components/shared/Container";
import Marquee from "@/components/shared/Marquee";
import PaymentMethods from "@/components/shared/PaymentMethods";
import { trustBarItems } from "./data";
import { FiCheckCircle, FiShield, FiHeadphones, FiAward } from "react-icons/fi";

const icons = [FiAward, FiShield, FiHeadphones, FiCheckCircle, FiShield];

const TrustBar = () => (
  <aside aria-label="Booking trust indicators" className="border-y border-gray6 bg-white py-4.5 sm:py-5">
    <Container>
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-8">
        {/* Animated marquee of core commitments */}
        <div className="w-full min-w-0 flex-1 overflow-hidden">
          <Marquee
            items={trustBarItems}
            label="Key traveler assurances"
            className="[&_.trust-marquee]:gap-8 sm:[&_.trust-marquee]:gap-12"
            renderItem={(item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div className="flex items-center gap-2.5 px-3 py-1">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon aria-hidden="true" size={14} />
                  </div>
                  <div>
                    <span className="title4 block font-semibold text-dark">{item.label}</span>
                    <span className="body5 block text-text-secondary">{item.desc}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Verified payment methods badge */}
        <div className="flex shrink-0 items-center gap-3 border-t border-gray6 pt-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <span className="body5 font-medium uppercase tracking-[1px] text-text-secondary whitespace-nowrap">
            Secure checkout:
          </span>
          <PaymentMethods imageClassName="h-[50px] w-[50px] sm:h-[50px] sm:w-[60px]" />
        </div>
      </div>
    </Container>
  </aside>
);

export default TrustBar;
