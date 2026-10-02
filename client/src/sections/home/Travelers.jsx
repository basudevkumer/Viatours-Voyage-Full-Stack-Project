import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import allImages from "@/components/helper/imageProvider";

export default function Travelers() {
  return <section className="mt-10 bg-text-dark py-12 sm:mt-14 sm:py-16 lg:mt-[105px] lg:py-[75px]"><Container><div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"><SectionHeading eyebrow="TRAVEL INSPIRATION" title="See the world from a new perspective." text="Find ideas for the places and experiences waiting beyond your next horizon." tone="light" className="mb-0" /><div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl"><Image src={allImages.travelersImages} width={520} height={342} alt="Travel inspiration" className="h-auto w-full object-cover" /></div></div></Container></section>;
}
