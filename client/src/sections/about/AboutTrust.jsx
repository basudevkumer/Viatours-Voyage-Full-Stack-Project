import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import PaymentMethods from "@/components/shared/PaymentMethods";
import { SITE_CONFIG } from "@/lib/site";
import { FiCheckSquare, FiShield, FiLock, FiHeadphones } from "react-icons/fi";

export default function AboutTrust({ trustGuarantees = [] }) {
  const trustCards = [
    {
      icon: <FiCheckSquare className="text-2xl text-accent" aria-hidden="true" />,
      title: "Inclusions listed before payment",
      description:
        "Every tour and experience detail page lists exact inclusions (hotels, transport, entrance tickets, guide services) and exclusions before you proceed to checkout.",
    },
    {
      icon: <FiShield className="text-2xl text-success" aria-hidden="true" />,
      title: "Guaranteed cancellation terms",
      description:
        "Cancellation cutoff windows (typically 24 to 48 hours prior to start) are published on each voucher. Refund terms are locked at the moment of reservation.",
    },
    {
      icon: <FiLock className="text-2xl text-accent" aria-hidden="true" />,
      title: "Encrypted, compliant checkout",
      description:
        "Transactions are handled through PCI-DSS Level 1 compliant payment gateways. We never store raw payment card data on our servers.",
      extra: <PaymentMethods className="mt-4 justify-start" />,
    },
    {
      icon: <FiHeadphones className="text-2xl text-accent" aria-hidden="true" />,
      title: "Direct human assistance",
      description: `Need to verify a route or check logistics? Reach our travel support desk by telephone at ${SITE_CONFIG.phoneDisplay} or by email at ${SITE_CONFIG.email}.`,
    },
  ];

  return (
    <section className="border-t border-gray6 bg-gray7/40 py-12 sm:py-16 lg:py-20" id="trust">
      <Container>
        <SectionHeading
          eyebrow="TRANSPARENCY & INTEGRITY"
          title="Verifiable booking and security standards"
          text="We know that paying for travel in advance requires complete trust. Here are the concrete policies and protections built into every booking on our platform."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-field shadow-2xs">
                  {card.icon}
                </div>
                <h3 className="title3 text-dark">{card.title}</h3>
                <p className="body4 mt-2.5 text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.extra && <div className="mt-4 border-t border-gray6 pt-3">{card.extra}</div>}
            </div>
          ))}
        </div>

        {/* Privacy Approach Note */}
        <div className="mt-8 rounded-2xl border border-gray6 bg-white p-5 sm:p-6 text-xs sm:text-sm text-text-secondary">
          <p className="font-semibold text-dark">Our traveler privacy commitment:</p>
          <p className="mt-1 leading-relaxed">
            We collect personal details (name, email, phone) exclusively to confirm reservations, issue digital vouchers, and coordinate emergency support with your local tour operator. We do not sell traveler profiles or purchase history to third-party ad networks.
          </p>
        </div>
      </Container>
    </section>
  );
}
