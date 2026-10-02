import PageHeader from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo";
import Button from "@/components/ui/Button";

export const metadata = createMetadata({ title: "About | Viatours Voyage", description: "Learn about Viatours Voyage and our approach to trip planning.", path: "/about" });
export default function AboutPage() {
  return <><PageHeader title="About Viatours Voyage" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]} /><main className="mx-auto max-w-[900px] px-4 py-10 sm:py-16"><h2 className="title1 text-dark">A more considered way to plan a trip</h2><p className="body3 mt-4 text-text-secondary">Viatours Voyage brings destinations, tours and local experiences together so travelers can explore options and plan at their own pace.</p><p className="body3 mt-4 text-text-secondary">Have a question about planning? Our team is available at <a className="text-accent hover:underline" href="mailto:hi@viatours.com">hi@viatours.com</a>.</p><Button href="/contact" className="mt-6">Contact us</Button></main></>;
}
