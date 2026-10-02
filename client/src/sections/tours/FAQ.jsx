import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "./data";

export default function FAQ() {
  return <section className="py-14 sm:py-20"><Container><div className="mx-auto max-w-[820px]"><SectionHeading eyebrow="NEED TO KNOW" title="Frequently asked questions" text="A few quick answers before you start planning." /><Accordion items={faqs} defaultOpen={0} /></div></Container></section>;
}
