import allImages from "@/components/helper/imageProvider";

// TODO(api): Tour prices, review totals, ratings, and curated text below are mock data pending verified API records.

const { featuredTrips, trendingDestinations } = allImages;

export const tours = featuredTrips.map((tour, index) => ({
  ...tour,
  category: ["City Breaks", "Cultural", "Beach Escapes", "Adventure", "Nature", "Beach Escapes", "Cultural", "Adventure"][index % 8],
  group: index % 3 === 0 ? "Small group" : "Private experience",
  originalPrice: index % 3 === 0 ? Number(tour.price) + 45 : null,
}));

// TODO(api): These are mock figures and must not be presented as verified claims.
export const trustItems = [
  ["10K+", "Happy travelers"],
  ["500+", "Curated tours"],
  ["50+", "Destinations"],
  ["4.9/5", "Average rating"],
];

export const travelStyles = [
  { title: "Adventure", text: "Build a trip around the places that make you feel alive.", image: trendingDestinations[7].image },
  { title: "Beach escapes", text: "Trade busy days for warm sand, clear water and slow mornings.", image: trendingDestinations[14].image },
  { title: "Cultural journeys", text: "Meet the stories, food and people that make a place unique.", image: trendingDestinations[2].image },
  { title: "Family trips", text: "Easy-going experiences made for making memories together.", image: trendingDestinations[4].image },
  { title: "Luxury experiences", text: "Thoughtful stays and extraordinary moments, beautifully paced.", image: trendingDestinations[15].image },
  { title: "Nature & wildlife", text: "Go further out and closer to the world around you.", image: trendingDestinations[12].image },
];

export const benefits = [
  ["Curated experiences", "Handpicked tours built around the moments you will remember."],
  ["Trusted local guides", "Travel with people who know their destination from the inside."],
  ["Secure booking", "Clear information and a simple booking journey from start to finish."],
  ["Support when you need it", "Helpful humans are here before, during and after your trip."],
];

export const faqs = [
  ["How do I book a tour?", "Choose a tour, review the details, select your preferred date and follow the secure booking steps. Our team is here if you need a hand."],
  ["Can I cancel my booking?", "Cancellation terms vary by tour and are shown clearly before you book. Look for the flexibility details on each tour card and detail page."],
  ["Are the tours suitable for families?", "Many of our experiences are family-friendly. Use the tour details or contact us and we will help you find the right pace."],
  ["What is included in the tour price?", "Each tour lists its inclusions, exclusions, duration and meeting point so you can compare with confidence before booking."],
  ["Are local guides included?", "Most experiences include a knowledgeable local guide. The individual tour page always confirms what is included."],
];

export { featuredTrips, trendingDestinations };
