import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/ui/Button";

const FinalCTA = () => <div data-home-final-cta><CTABanner variant="gradient" layout="split" eyebrow="READY WHEN YOU ARE" title="Your next adventure starts here." text="Tell us what you are dreaming about. We will help you turn it into a trip worth remembering." primaryAction={<Button href="/contact" variant="white" size="lg" data-analytics-id="homepage-final-cta" className="shrink-0">PLAN YOUR TRIP <span aria-hidden="true">→</span></Button>} /></div>;

export default FinalCTA;
