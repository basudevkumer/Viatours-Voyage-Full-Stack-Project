import { destinationsData } from "@/sections/destinations/data";

// TODO(api): Replace these in-memory mock queries with apiRequest('/destinations', { params }).

export async function getDestinations(filters = {}) {
  let list = [...destinationsData];

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q)
    );
  }

  if (filters.region && filters.region !== "all") {
    list = list.filter((d) => d.region.toLowerCase() === filters.region.toLowerCase());
  }

  if (filters.travelStyle && filters.travelStyle !== "all") {
    list = list.filter((d) =>
      d.travelStyles.some((s) => s.toLowerCase() === filters.travelStyle.toLowerCase())
    );
  }

  if (filters.bestMonth && filters.bestMonth !== "all") {
    list = list.filter((d) =>
      d.bestMonths.some((m) => m.toLowerCase() === filters.bestMonth.toLowerCase())
    );
  }

  if (filters.maxBudget) {
    const max = Number(filters.maxBudget);
    if (!Number.isNaN(max)) {
      list = list.filter((d) => d.startingPrice <= max);
    }
  }

  if (filters.sort) {
    if (filters.sort === "alpha") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "tours") {
      list.sort((a, b) => b.toursCount - a.toursCount);
    } else if (filters.sort === "price-low") {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (filters.sort === "price-high") {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    }
  }

  return {
    success: true,
    message: "Destinations loaded.",
    data: list,
    total: list.length,
  };
}

export async function getDestinationBySlug(slug) {
  if (!slug) return { success: false, message: "Missing destination slug.", errors: [] };
  const normalized = String(slug).toLowerCase().trim().replaceAll("-", " ");
  const item = destinationsData.find(
    (d) =>
      d.slug.toLowerCase() === String(slug).toLowerCase() ||
      d.id.toLowerCase() === String(slug).toLowerCase() ||
      d.city.toLowerCase() === normalized ||
      d.name.toLowerCase() === normalized
  );

  return item
    ? { success: true, message: "Destination loaded.", data: item }
    : { success: false, message: `Destination not found for slug '${slug}'.`, errors: [] };
}

export async function getFeaturedDestinations() {
  const featured = destinationsData.filter((d) => d.featured);
  return {
    success: true,
    message: "Featured destinations loaded.",
    data: featured.length ? featured : destinationsData.slice(0, 4),
  };
}

export async function getDestinationById(id) {
  return getDestinationBySlug(id);
}
