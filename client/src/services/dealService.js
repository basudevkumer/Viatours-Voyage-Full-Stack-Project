import { getTours } from "./tourService";
import { getExperiences } from "./experienceService";
import { destinationsData } from "@/sections/destinations/data";

// TODO(api): Replace aggregated in-memory queries with apiRequest('/deals', { params }).

/**
 * Transforms an item into a standardized Deal model.
 * A discount is only valid when originalPrice is strictly greater than price.
 */
function createDealModel(item, itemType) {
  const price = Number(item.price);
  const originalPrice = Number(item.originalPrice);

  if (!originalPrice || originalPrice <= price) {
    return null;
  }

  const savingsAmount = Math.round((originalPrice - price) * 100) / 100;
  const savingsPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  const freeCancellation = Boolean(
    item.cancellationPolicy?.toLowerCase().includes("free") ||
    item.features?.includes("freeCancellation")
  );

  return {
    dealId: `${itemType}-${item.id}`,
    itemType, // "tour" | "experience"
    itemId: item.id,
    slug: item.slug || `${itemType}-${item.id}`,
    title: item.title,
    description: item.description,
    destination: item.destination,
    country: item.country,
    location: item.location,
    category: item.category,
    price,
    originalPrice,
    currency: item.currency || "USD",
    savingsAmount,
    savingsPercent: savingsPercent >= 1 ? savingsPercent : 0,
    dealLabel: item.dealLabel || (savingsPercent >= 20 ? "Major saving" : "Seasonal offer"),
    validFrom: item.validFrom || null,
    validUntil: item.validUntil || null,
    travelWindow: item.travelWindow || (item.validUntil ? `Valid until ${formatDate(item.validUntil)}` : null),
    conditions: Array.isArray(item.terms) ? item.terms : [item.cancellationPolicy || "Standard terms apply"],
    terms: Array.isArray(item.terms) ? item.terms : [item.cancellationPolicy || "Standard terms apply"],
    freeCancellation,
    featured: Boolean(item.featured),
    rating: Number(item.rating || 0),
    reviews: Number(item.reviews || 0),
    duration: item.duration || (item.days ? `${item.days} days` : ""),
    days: item.days || null,
    group: item.group || item.groupType || "Small group",
    image: item.image,
    gallery: item.gallery || item.images || [item.image],
    href: itemType === "tour" ? `/tours/${item.id}` : `/activities/${item.id}`,
    rawItem: item,
  };
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

/**
 * Fetch all verified deals across tours and experiences.
 */
async function getAllVerifiedDeals() {
  const [toursRes, expRes] = await Promise.all([
    getTours({}, "recommended", 1, 100),
    getExperiences({}, "recommended", 1, 100),
  ]);

  const toursList = (toursRes?.data || [])
    .map((t) => createDealModel(t, "tour"))
    .filter(Boolean);

  const expList = (expRes?.data || [])
    .map((e) => createDealModel(e, "experience"))
    .filter(Boolean);

  return [...toursList, ...expList];
}

/**
 * Main explorer service for deals with filtering, sorting, and pagination.
 */
export async function getDeals({
  type = "all",
  destination,
  category,
  minSavings,
  maxPrice,
  month,
  freeCancellation,
  sort = "savings",
  page = 1,
  pageSize = 9,
} = {}) {
  const allDeals = await getAllVerifiedDeals();

  const totalAll = allDeals.length;
  const totalTours = allDeals.filter((d) => d.itemType === "tour").length;
  const totalExperiences = allDeals.filter((d) => d.itemType === "experience").length;

  let filtered = [...allDeals];

  // 1. Type filter
  if (type === "tours" || type === "tour") {
    filtered = filtered.filter((d) => d.itemType === "tour");
  } else if (type === "experiences" || type === "experience") {
    filtered = filtered.filter((d) => d.itemType === "experience");
  }

  // 2. Destination filter
  if (destination && destination !== "all") {
    const dTarget = destination.toLowerCase().trim();
    filtered = filtered.filter(
      (d) =>
        d.destination.toLowerCase() === dTarget ||
        d.location.toLowerCase().includes(dTarget)
    );
  }

  // 3. Category filter
  if (category && category !== "all") {
    const cTarget = category.toLowerCase().trim();
    filtered = filtered.filter((d) => d.category.toLowerCase() === cTarget);
  }

  // 4. Min savings filter
  if (minSavings != null && minSavings !== "" && minSavings !== "all") {
    const min = Number(minSavings);
    if (!Number.isNaN(min)) {
      filtered = filtered.filter((d) => d.savingsAmount >= min);
    }
  }

  // 5. Max price filter
  if (maxPrice != null && maxPrice !== "" && maxPrice !== "all") {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      filtered = filtered.filter((d) => d.price <= max);
    }
  }

  // 6. Free cancellation filter
  if (freeCancellation === true || freeCancellation === "true") {
    filtered = filtered.filter((d) => d.freeCancellation);
  }

  // 7. Travel month filter
  if (month && month !== "all") {
    const mTarget = month.toLowerCase().trim();
    filtered = filtered.filter((d) => {
      if (!d.validUntil) return true;
      const validDate = new Date(d.validUntil);
      const validMonth = validDate.toLocaleString("en-US", { month: "short" }).toLowerCase();
      return validMonth.includes(mTarget) || d.validUntil.includes(mTarget);
    });
  }

  // Sort
  if (sort === "savings" || sort === "biggest-saving") {
    filtered.sort((a, b) => b.savingsAmount - a.savingsAmount);
  } else if (sort === "savings-percent") {
    filtered.sort((a, b) => b.savingsPercent - a.savingsPercent);
  } else if (sort === "price-asc" || sort === "lowest-price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "rating" || sort === "highest-rated") {
    filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  } else if (sort === "ending-soon" || sort === "ending-soonest") {
    filtered.sort((a, b) => {
      if (!a.validUntil && !b.validUntil) return 0;
      if (!a.validUntil) return 1;
      if (!b.validUntil) return -1;
      return new Date(a.validUntil) - new Date(b.validUntil);
    });
  }

  const total = filtered.length;
  const parsedPage = Math.max(1, Number(page) || 1);
  const parsedPageSize = Math.max(1, Number(pageSize) || 9);
  const totalPages = Math.ceil(total / parsedPageSize) || 1;
  const startIndex = (parsedPage - 1) * parsedPageSize;
  const paginated = filtered.slice(startIndex, startIndex + parsedPageSize);

  return {
    success: true,
    message: "Deals loaded successfully.",
    data: paginated,
    total,
    totalPages,
    page: parsedPage,
    pageSize: parsedPageSize,
    counts: {
      all: totalAll,
      tours: totalTours,
      experiences: totalExperiences,
    },
  };
}

/**
 * Returns featured deals with largest verified dollar savings.
 */
export async function getFeaturedDeals() {
  const allDeals = await getAllVerifiedDeals();
  if (!allDeals.length) {
    return { success: true, message: "No active deals.", data: null };
  }

  // Sort strictly by largest verified savings
  const sorted = [...allDeals].sort((a, b) => b.savingsAmount - a.savingsAmount);

  return {
    success: true,
    message: "Featured deals loaded.",
    data: {
      primary: sorted[0] || null,
      highlights: sorted.slice(1, 3),
      allFeatured: sorted.slice(0, 3),
    },
  };
}

/**
 * Computes deal count per destination directly from live deal data.
 * Hides destinations with zero deals.
 */
export async function getDealDestinations() {
  const allDeals = await getAllVerifiedDeals();

  const countsMap = new Map();
  for (const deal of allDeals) {
    const key = deal.destination;
    countsMap.set(key, (countsMap.get(key) || 0) + 1);
  }

  const destinations = [];
  for (const [name, count] of countsMap.entries()) {
    const meta = destinationsData.find(
      (d) => d.name.toLowerCase() === name.toLowerCase()
    );

    destinations.push({
      name,
      slug: meta?.slug || name.toLowerCase().replace(/\s+/g, "-"),
      count,
      tours: count === 1 ? "1 live deal" : `${count} live deals`,
      image: meta?.image || allDeals.find((d) => d.destination === name)?.image,
      country: meta?.country || allDeals.find((d) => d.destination === name)?.country || "",
    });
  }

  // Sort by highest deal count
  destinations.sort((a, b) => b.count - a.count);

  return {
    success: true,
    message: "Deal destinations loaded.",
    data: destinations,
  };
}

/**
 * Computes categories directly from live deal data.
 */
export async function getDealCategories() {
  const allDeals = await getAllVerifiedDeals();

  const categoryMap = new Map();
  for (const deal of allDeals) {
    const cat = deal.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  }

  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  categories.sort((a, b) => b.count - a.count);

  return {
    success: true,
    message: "Deal categories loaded.",
    data: categories,
  };
}

/**
 * Real consumer-protection trust terms.
 */
export async function getDealTerms() {
  return {
    success: true,
    message: "Deal terms loaded.",
    data: [
      {
        title: "How our 'Was' prices are calculated",
        description:
          "Every strikethrough price reflects genuine seasonal standard tariffs charged within the last 90 days. We never artificially inflate prices before discounting.",
      },
      {
        title: "Transparent, all-inclusive pricing",
        description:
          "Local park fees, equipment hire, and scheduled tastings stated in each itinerary are included. Taxes and booking fees are shown upfront before payment.",
      },
      {
        title: "Verified cancellation windows",
        description:
          "Eligible deals retain full refund rights up to 24 or 48 hours before departure. Terms are locked at the moment of booking with no penalty surprises.",
      },
      {
        title: "Real dates, zero fake countdowns",
        description:
          "Promotional departures reflect partner allocations and seasonal shoulder periods. When a date closes, the rate simply reverts to standard seasonal pricing.",
      },
    ],
  };
}
