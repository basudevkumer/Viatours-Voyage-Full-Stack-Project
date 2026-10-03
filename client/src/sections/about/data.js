import { SITE_CONFIG } from "@/lib/site";
import allImages from "@/components/helper/imageProvider";

const { trendingDestinations, popularThings } = allImages;

// TODO(content): All editorial copy below must be reviewed and confirmed by brand leadership prior to live launch.
// STRICT ANTI-FABRICATION RULE: Do not invent founders, team members, awards, founding years, or partner logos.

export const aboutPillars = [
  {
    id: "destinations",
    title: "Curated Destinations",
    tagline: "In-depth regional guides and seasonal intelligence",
    description:
      "Explore regional climates, neighborhood highlights, and optimal travel windows across our curated destination network. Every guide provides practical insight into local culture and logistics.",
    href: "/destinations",
    cta: "Explore destinations",
    image: trendingDestinations[0].image,
  },
  {
    id: "tours",
    title: "Handcrafted Multi-Day Tours",
    tagline: "Fully coordinated small-group and private itineraries",
    description:
      "Day-by-day itineraries mapped with experienced local coordinators. Meeting points, inclusions, difficulty levels, and cancellation terms are transparently displayed before you book.",
    href: "/tours",
    cta: "Browse tours",
    image: trendingDestinations[3].image,
  },
  {
    id: "experiences",
    title: "Boutique Day Experiences",
    tagline: "Immersive activities led by verified local hosts",
    description:
      "Connect directly with resident guides for culinary walks, marine safaris, historical walking tours, and cultural masterclasses with instant confirmation and mobile ticketing.",
    href: "/activities",
    cta: "Find experiences",
    image: popularThings[1].image,
  },
];

export const aboutPrinciples = [
  {
    id: "transparency",
    title: "Transparent pricing & inclusions",
    description:
      "Every tour and experience clearly itemizes inclusions, exclusions, and local fees upfront. You see total tariffs before checkout with zero surprise surcharges.",
  },
  {
    id: "honest-rates",
    title: "Honest, audited promotional rates",
    description:
      "Any discounted rate must reflect standard seasonal tariffs genuinely charged in the preceding 90 days. We strictly prohibit fake countdown timers and manufactured scarcity.",
  },
  {
    id: "small-groups",
    title: "Intimate group pacing",
    description:
      "Our multi-day and day itineraries prioritize small-group departures (typically 6 to 12 guests) to minimize environmental strain and encourage genuine cultural engagement.",
  },
  {
    id: "flexible-policies",
    title: "Clear, verified cancellation terms",
    description:
      "Refund windows (typically 24 to 48 hours prior to start) are displayed prominently on every voucher. If your plans change, refund terms are honoured without friction.",
  },
];

export const aboutProcessSteps = [
  {
    step: "01",
    title: "Discover & Compare",
    text: "Filter across destinations, travel styles, and departure windows with verified details and genuine ratings.",
    reassurance: "Exact inclusions, difficulty ratings, and group sizes visible upfront.",
  },
  {
    step: "02",
    title: "Confirm with Flexibility",
    text: "Reserve your spot online using encrypted payment, or request a customized itinerary tailored by our regional desk.",
    reassurance: "Free cancellation options clearly stated before payment.",
  },
  {
    step: "03",
    title: "Prepare with Expert Advice",
    text: "Receive synchronized digital vouchers, packing lists, meeting location coordinates, and local cultural etiquette tips.",
    reassurance: "Direct contact line with your local coordinator prior to departure.",
  },
  {
    step: "04",
    title: "Travel with 24/7 Care",
    text: "Explore alongside native guides with our support team available round the clock by phone and email.",
    reassurance: `Direct support desk available 24/7 at ${SITE_CONFIG.phoneDisplay}.`,
  },
];

export const aboutTrustGuarantees = [
  {
    title: "Verified Operator Network",
    description:
      "Every tour operator and guide is vetted for regional licensing, safety standards, and local knowledge.",
  },
  {
    title: "PCI-DSS Encrypted Payments",
    description:
      "Payments are securely processed via standard encrypted gateways with support for major cards and digital wallets.",
  },
  {
    title: "No Artificial Scarcity",
    description:
      "We never use ticking countdown clocks, fake viewer counters, or manufactured 'only 1 left' pressure tactics.",
  },
  {
    title: "Human Support Desk",
    description: `Reach an actual coordinator by phone at ${SITE_CONFIG.phoneDisplay} or via ${SITE_CONFIG.email} any day of the week.`,
  },
];

// TODO(content): Supply real executive leadership and coordinator profiles before launch.
// Keep empty array so the section is safely hidden from rendering until true data exists.
export const aboutTeam = [];

// TODO(content): Supply verified company milestone dates and founding history before launch.
// Keep empty array so the section is safely hidden until real corporate records exist.
export const aboutMilestones = [];

// TODO(content): Supply authentic customer testimonials linked to verifiable booking IDs.
// Keep empty array so the section is safely omitted until real reviews are connected.
export const aboutTestimonials = [];

export const aboutFaqs = [
  {
    question: `What is ${SITE_CONFIG.name}?`,
    answer: `${SITE_CONFIG.name} is a travel planning platform that unites curated global destinations, small-group multi-day tours, and authentic day experiences into an honest, easy-to-navigate catalogue.`,
  },
  {
    question: "How are tours and experiences curated?",
    answer:
      "We partner directly with certified local guides and boutique tour operators in each destination. Every itinerary is reviewed for transparent inclusions, sensible pacing, safety standards, and fair traveler pricing.",
  },
  {
    question: "How do cancellations and refunds work?",
    answer:
      "Cancellation terms are clearly displayed on every itinerary page before you book. Tours and experiences marked with 'Free cancellation' can be canceled up to 24 or 48 hours before departure for a 100% refund.",
  },
  {
    question: "How can local operators or tour guides partner with Viatours Voyage?",
    answer:
      "We welcome applications from licensed regional operators and expert guides. Submit an inquiry through our Partner with Us form on this page; our regional desk will review your details within 2 business days.",
  },
  {
    question: "How is traveler personal and payment information protected?",
    answer:
      "We utilize bank-level SSL encryption and industry-standard PCI-DSS payment gateways. We never store credit card numbers and strictly do not sell your personal details to third parties.",
  },
];
