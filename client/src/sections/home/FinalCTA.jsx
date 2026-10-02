import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";

const FinalCTA = () => (
  <section data-home-final-cta className="px-3 py-14 sm:px-4 sm:py-20 lg:px-8 lg:py-28">
    <div className="overflow-hidden rounded-[24px] bg-primary">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 py-12 sm:py-16 lg:flex-row lg:items-center lg:py-20">
          <div><p className="caption text-white/75">READY WHEN YOU ARE</p><h2 className="heading mt-3 max-w-[650px] text-white">Your next adventure starts here.</h2><p className="body1 mt-4 max-w-[560px] text-white/80">Tell us what you are dreaming about. We will help you turn it into a trip worth remembering.</p></div>
          <Button href="/contact" variant="white" size="lg" data-analytics-id="homepage-final-cta" className="shrink-0">PLAN YOUR TRIP <span aria-hidden="true">→</span></Button>
        </div>
      </Container>
    </div>
  </section>
);

export default FinalCTA;
