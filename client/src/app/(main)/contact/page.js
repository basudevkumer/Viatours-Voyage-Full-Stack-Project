import { createMetadata } from "@/lib/seo";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/shared/ContactForm";
import Accordion from "@/components/ui/Accordion";

export const metadata = createMetadata({ title: "Contact | Viatours Voyage", description: "Get in touch with the Viatours Voyage team.", path: "/contact" });
const contactFaqs = [["How can I ask about an existing booking?", "Email hi@viatours.com with your booking details so the team can help."], ["Can you help me plan a trip?", "Tell us where you are considering and what kind of trip you have in mind using the contact form."], ["What should I include in my message?", "Share your destination, travel dates, and booking reference if you have one."]];
export default function Contact() {
  return <><PageHeader title="Contact us" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><main className="mx-auto grid max-w-[1320px] gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] lg:py-16"><section className="rounded-2xl border border-gray6 bg-white p-5 sm:p-8"><h2 className="title1 mb-6 text-dark">Send us a message</h2><ContactForm /></section><aside className="grid content-start gap-8"><section><h2 className="title1 text-dark">Contact information</h2><p className="body4 mt-4 text-text-secondary">328 Queensberry Street, North Melbourne VIC 3051, Australia.</p><a className="title4 mt-3 inline-block text-accent hover:underline" href="mailto:hi@viatours.com">hi@viatours.com</a><a className="title4 mt-2 block text-accent hover:underline" href="tel:+18004536744">1-800-453-6744</a></section><section><h2 className="title1 mb-4 text-dark">Frequently asked questions</h2><Accordion items={contactFaqs} defaultOpen={-1} /></section></aside></main></>;
}
