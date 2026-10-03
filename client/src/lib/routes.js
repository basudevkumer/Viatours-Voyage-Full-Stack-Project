export const ROUTES = Object.freeze({
  home: "/",
  tours: "/tours",
  activities: "/activities",
  destinations: "/destinations",
  deals: "/deals",
  travelGuide: "/travel-guide",
  about: "/about",
  contact: "/contact",
  login: "/auth/login",
  signup: "/auth/signup",
  bookings: "/dashboards/bookings",
  profile: "/dashboards/profile",
  wishlist: "/dashboards/wishlist",
});

/**
 * Builds a parameterized URL for the /contact lead hub with intent, origin, and prefill context.
 *
 * @param {Object} options
 * @param {string} [options.type="trip"] - Lead intent: 'trip' | 'group' | 'booking-support' | 'partner' | 'question' | 'call' | etc.
 * @param {string} [options.source=""] - Referring page or CTA origin identifier (e.g. 'navbar', 'home-final-cta')
 * @param {string} [options.item=""] - Prefilled tour, guide, or experience name
 * @param {string} [options.destination=""] - Prefilled destination name
 * @returns {string} Relative URL for Next.js navigation
 */
export function contactUrl({ type = "trip", source = "", item = "", destination = "" } = {}) {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (source) params.set("source", source);
  if (item) params.set("item", item);
  if (destination) params.set("destination", destination);
  const qs = params.toString();
  return qs ? `/contact?${qs}` : "/contact";
}

