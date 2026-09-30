import Container from "@/components/shared/Container";
import { trustItems } from "./data";

const TrustStats = () => (
  <section className="border-b border-gray6 bg-white">
    <Container><div className="grid grid-cols-2 divide-x divide-y divide-gray6 sm:grid-cols-4 sm:divide-y-0">
      {trustItems.map(([value, label]) => <div key={label} className="px-4 py-6 text-center first:pl-0 last:pr-0 sm:py-8"><p className="heading !text-2xl text-dark sm:!text-3xl">{value}</p><p className="body4 mt-1 text-text-secondary">{label}</p></div>)}
    </div></Container>
  </section>
);

export default TrustStats;
