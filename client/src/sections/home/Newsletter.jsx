import Container from "@/components/shared/Container";
import NewsletterForm from "@/components/shared/NewsletterForm";
import SectionHeading from "@/components/shared/SectionHeading";

const Newsletter = () => (
  <section className="bg-bg-grey py-14 sm:py-16 lg:py-20">
    <Container>
      <div className="flex flex-col gap-6 rounded-[24px] bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <SectionHeading eyebrow="TRAVEL INSPIRATION" title="Get ideas for your next adventure." text="A little inspiration, useful guides and new ways to see the world — sent occasionally." className="mb-0" />
        <NewsletterForm layout="inline" className="w-full max-w-[470px]" submitLabel="Get travel ideas" />
      </div>
    </Container>
  </section>
);

export default Newsletter;
