import allImages from "@/components/helper/imageProvider";
import { FiCompass, FiShield, FiUsers, FiHeadphones, FiCheckCircle } from "react-icons/fi";

// TODO(api): Content, statistics, and reviews below are mock data pending integration with production APIs.

const { trendingDestinations, popularThings } = allImages;

export const heroReassurance = [
  { id: "cancel", icon: FiCheckCircle, text: "Free cancellation on selected tours" },
  { id: "support", icon: FiHeadphones, text: "24/7 dedicated traveler support" },
  { id: "secure", icon: FiShield, text: "100% secure payment processing" },
];

export const trustBarItems = [
  { id: "guides", label: "Certified local guides", desc: "Native experts on every trail" },
  { id: "flexibility", label: "Flexible cancellation", desc: "Refundable booking options" },
  { id: "support", label: "24/7 human care", desc: "Direct hotline and WhatsApp" },
  { id: "pricing", label: "Zero hidden fees", desc: "Transparent pricing upfront" },
  { id: "security", label: "Secure transactions", desc: "Encrypted payments" },
];

export const travelStyles = [
  {
    id: "adventure",
    title: "Adventure & Outdoors",
    description: "Active treks, rugged coastlines, and open horizons.",
    count: "48 tours",
    image: trendingDestinations[7]?.image || trendingDestinations[0]?.image,
    href: "/tours?category=Adventure",
  },
  {
    id: "beach",
    title: "Beach & Coastal",
    description: "Unwind on turquoise coves and slow island afternoons.",
    count: "36 tours",
    image: trendingDestinations[14]?.image || trendingDestinations[1]?.image,
    href: "/tours?category=Beach+Escapes",
  },
  {
    id: "culture",
    title: "Cultural & Heritage",
    description: "Centuries of history, architectural marvels, and native cuisine.",
    count: "62 tours",
    image: trendingDestinations[2]?.image || trendingDestinations[2]?.image,
    href: "/tours?category=Cultural",
  },
  {
    id: "family",
    title: "Family Friendly",
    description: "Comfortable pacing and memorable activities for all generations.",
    count: "29 tours",
    image: trendingDestinations[4]?.image || trendingDestinations[3]?.image,
    href: "/tours?category=City+Breaks",
  },
  {
    id: "luxury",
    title: "Luxury & Private",
    description: "Curated boutique stays, private escorts, and tailored pacing.",
    count: "24 tours",
    image: trendingDestinations[15]?.image || trendingDestinations[4]?.image,
    href: "/tours?category=Luxury",
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    description: "National parks, marine reserves, and protected sanctuaries.",
    count: "41 tours",
    image: trendingDestinations[12]?.image || trendingDestinations[5]?.image,
    href: "/tours?category=Nature",
  },
];

export const valueProps = [
  {
    icon: FiCompass,
    title: "Curated with intent",
    description: "Every itinerary is tested and vetted by travel editors to guarantee exceptional pacing and authenticity.",
  },
  {
    icon: FiUsers,
    title: "Certified local guides",
    description: "Connect with passionate native storytellers who bring heritage, cuisine, and secret spots to life.",
  },
  {
    icon: FiShield,
    title: "Transparent pricing",
    description: "Clear inclusions, locked-in rates, and zero hidden checkout fees. What you see is what you pay.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 traveler care",
    description: "Real humans are available before, during, and after your journey via phone, email, and live messaging.",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Discover your journey",
    text: "Browse verified itineraries filtered by travel style, budget, and destination.",
    reassurance: "Detailed day-by-day schedules and inclusions visible before booking.",
  },
  {
    step: "02",
    title: "Reserve with flexibility",
    text: "Choose your dates and complete a quick, encrypted booking with transparent terms.",
    reassurance: "Free cancellation options available on qualifying trips.",
  },
  {
    step: "03",
    title: "Explore with full support",
    text: "Access digital vouchers and travel with round-the-clock coordinator assistance.",
    reassurance: "Emergency helpline and local host contacts in your pocket.",
  },
];

// TODO(api): Replace with live stats from platform database.
export const platformMetrics = [
  { value: "500+", label: "Vetted itineraries", helper: "Across 4 continents" },
  { value: "50+", label: "Global destinations", helper: "Cities and wilderness" },
  { value: "4.9/5", label: "Average rating", helper: "From verified travelers" },
  { value: "24/7", label: "Human support", helper: "Average response < 15 min" },
];

// TODO(api): Replace with verified reviews fetched from reviewService.
export const sampleReviews = [
  {
    id: "rev-1",
    name: "Elena Rostova",
    rating: 5,
    date: "Verified trip in September 2026",
    text: "The Dolomites trek was seamlessly organized. Our local guide Marco knew every quiet viewpoint away from the crowds. Clear communication from day one.",
    tourTitle: "Alpine Peaks & Valleys Trek",
    source: "Verified traveler",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rev-2",
    name: "Marcus Vance",
    rating: 5,
    date: "Verified trip in August 2026",
    text: "Traveling with three generations is usually stressful, but the Kyoto cultural package struck the perfect rhythm. Transparent pricing with zero surprise charges.",
    tourTitle: "Kyoto Heritage & Culinary Walk",
    source: "Verified traveler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "rev-3",
    name: "Sophia Lindqvist",
    rating: 5,
    date: "Verified trip in July 2026",
    text: "The flexibility gave us total peace of mind. When our flight was delayed by 6 hours, support rearranged our private transfer without an extra dime.",
    tourTitle: "Santorini Sunset & Wine Discovery",
    source: "Verified traveler",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
];

export const homeFaqs = [
  {
    question: "How do I book a tour or travel experience?",
    answer: "Browse our curated listings, select your preferred travel date, traveler count, and optional preferences. You can reserve instantly online through our secure checkout or submit a customized inquiry if you require tailored dates.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer: "Every tour card and detail page clearly outlines its specific cancellation terms before you book. Many of our experiences feature flexible cancellation up to 48 hours prior to start. If an unexpected event occurs, our 24/7 team assists immediately.",
  },
  {
    question: "What is included in the published tour price?",
    answer: "We uphold 100% transparent pricing. Each tour page provides an explicit 'What is Included' and 'What is Excluded' list, detailing transportation, entrance fees, local guide fees, and meal accommodations so you never face hidden surprises.",
  },
  {
    question: "Can you arrange custom trips for private or corporate groups?",
    answer: "Yes. Our bespoke travel desk coordinates private groups, corporate offsites, and multi-family journeys. You can use our 'Plan My Trip' form or email groups@viatours.com for dedicated itinerary design and group rate quotes.",
  },
  {
    question: "Are the tours led by certified local guides?",
    answer: "All guided experiences partner exclusively with licensed, background-checked local guides and boutique operators who have extensive knowledge of local culture, safety regulations, and history.",
  },
  {
    question: "How can I contact traveler support during my trip?",
    answer: "Our support operations run 24 hours a day, 7 days a week. Upon booking confirmation, you receive a dedicated emergency phone number, WhatsApp contact, and direct coordinator email for real-time assistance on the road.",
  },
];
