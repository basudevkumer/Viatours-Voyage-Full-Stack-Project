import allImages from "@/components/helper/imageProvider";

// TODO(api): Experience prices, review totals, ratings, counts, and descriptions below are mock data pending verified API records.

const { popularThings, trendingDestinations } = allImages;

export const experiences = [
  { id: "city-tours", title: "Old town stories and city highlights", location: "Paris, France", destination: "Paris", category: "Sightseeing", image: popularThings[0].image, duration: "3 hours", rating: 4.8, reviews: 184, price: 42, group: "Small group", features: ["Free cancellation", "Local guide"] },
  { id: "culture-cappadocia", title: "Cappadocia valleys and local culture", location: "Cappadocia, Turkey", destination: "Cappadocia", category: "Culture", image: popularThings[1].image, duration: "5 hours", rating: 4.9, reviews: 214, price: 68, group: "Small group", features: ["Hotel pickup", "Instant confirmation"] },
  { id: "phuket-cruise", title: "Island hopping and turquoise water", location: "Phuket, Thailand", destination: "Phuket", category: "Water", image: popularThings[2].image, duration: "Full day", rating: 4.7, reviews: 156, price: 76, group: "Shared boat", features: ["Free cancellation", "Mobile ticket"] },
  { id: "london-walk", title: "Royal landmarks and hidden London", location: "London, UK", destination: "London", category: "History", image: popularThings[3].image, duration: "3.5 hours", rating: 4.8, reviews: 129, price: 39, group: "Walking tour", features: ["Local guide"] },
  { id: "dubai-desert", title: "Desert sunset, dinner and stars", location: "Dubai, UAE", destination: "Dubai", category: "Adventure", image: popularThings[4].image, duration: "6 hours", rating: 4.9, reviews: 302, price: 84, group: "Small group", features: ["Hotel pickup", "Free cancellation"] },
  { id: "santorini-food", title: "Sunset food walk through Santorini", location: "Santorini, Greece", destination: "Santorini", category: "Food", image: popularThings[5].image, duration: "3 hours", rating: 4.8, reviews: 98, price: 55, group: "Small group", features: ["Local guide", "Mobile ticket"] },
  { id: "barcelona-art", title: "Gaudi, galleries and the Gothic Quarter", location: "Barcelona, Spain", destination: "Barcelona", category: "Culture", image: popularThings[6].image, duration: "4 hours", rating: 4.7, reviews: 143, price: 48, group: "Walking tour", features: ["Instant confirmation"] },
  { id: "maldives-snorkel", title: "Coral gardens and a quiet island escape", location: "Maldives", destination: "Maldives", category: "Nature", image: popularThings[7].image, duration: "Half day", rating: 4.9, reviews: 176, price: 92, group: "Small group", features: ["Free cancellation", "Mobile ticket"] },
];

export const categories = [
  { title: "Adventure", description: "Active days and stories worth telling.", image: popularThings[4].image, count: "84 experiences" },
  { title: "Food & culinary", description: "Taste a destination through local flavors.", image: popularThings[5].image, count: "128 experiences" },
  { title: "Culture & history", description: "Understand the place beyond the postcard.", image: popularThings[1].image, count: "96 experiences" },
  { title: "Nature & wildlife", description: "Go closer to the world around you.", image: popularThings[7].image, count: "72 experiences" },
  { title: "Water activities", description: "Make a day of the sea, lakes and rivers.", image: popularThings[2].image, count: "64 experiences" },
  { title: "Sightseeing", description: "See the landmarks and local favorites.", image: popularThings[0].image, count: "145 experiences" },
];

export const collections = [
  { title: "First time in Bali", text: "The essential experiences for your first visit.", image: trendingDestinations[4].image },
  { title: "Weekend experiences", text: "Short activities that fit into a limited itinerary.", image: trendingDestinations[2].image },
  { title: "Local & authentic", text: "Go beyond the usual tourist route.", image: trendingDestinations[7].image },
  { title: "After dark", text: "Food walks, night tours and evening stories.", image: trendingDestinations[15].image },
];

export const faqs = [
  ["How far in advance should I book?", "Popular experiences can fill up quickly, especially during peak travel dates. Booking ahead gives you the widest choice of dates."],
  ["Can I cancel an experience?", "Cancellation terms are shown on each experience before you book. Look for the cancellation information in the card and details."],
  ["What should I bring?", "Your confirmation will include practical details. Comfortable shoes, a charged phone and weather-appropriate clothing are good starting points."],
  ["Is transportation included?", "Transport varies by experience. Hotel pickup or meeting-point details are clearly listed on each experience."],
  ["Can I book a private experience?", "Some experiences offer private options. Use the experience details or contact the team to check availability."],
];
