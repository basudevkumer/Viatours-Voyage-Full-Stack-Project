import { tours } from "@/sections/tours/data";

// TODO(api): Replace in-memory queries with apiRequest('/tours', { params }).

export async function getTours(filters = {}, sort = "recommended", page = 1, limit = 50) {
  let list = tours.map((t) => ({
    ...t,
    price: Number(t.price),
    originalPrice: t.originalPrice ? Number(t.originalPrice) : null,
  }));

  // Search filter
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  // Destination filter
  if (filters.destination && filters.destination !== "all") {
    const d = filters.destination.toLowerCase().trim();
    list = list.filter(
      (t) =>
        t.destination.toLowerCase() === d ||
        t.location.toLowerCase().includes(d)
    );
  }

  // Category / Travel style filter
  if (filters.category && filters.category !== "all") {
    const cat = filters.category.toLowerCase().trim();
    list = list.filter(
      (t) =>
        t.category.toLowerCase() === cat ||
        (t.travelStyles && t.travelStyles.some((s) => s.toLowerCase() === cat))
    );
  }

  // Duration filter (e.g. "1", "2-5", "6+")
  if (filters.duration && filters.duration !== "all") {
    if (filters.duration === "1") {
      list = list.filter((t) => t.days <= 1);
    } else if (filters.duration === "2-5") {
      list = list.filter((t) => t.days >= 2 && t.days <= 5);
    } else if (filters.duration === "6+") {
      list = list.filter((t) => t.days >= 6);
    }
  }

  // Price range filters
  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (!Number.isNaN(max)) {
      list = list.filter((t) => t.price <= max);
    }
  }

  if (filters.minPrice) {
    const min = Number(filters.minPrice);
    if (!Number.isNaN(min)) {
      list = list.filter((t) => t.price >= min);
    }
  }

  // Rating filter (e.g. 4.5, 4.8)
  if (filters.minRating) {
    const r = Number(filters.minRating);
    if (!Number.isNaN(r)) {
      list = list.filter((t) => t.rating >= r);
    }
  }

  // Group type filter
  if (filters.groupType && filters.groupType !== "all") {
    list = list.filter(
      (t) => t.groupType.toLowerCase() === filters.groupType.toLowerCase()
    );
  }

  // Free cancellation filter
  if (filters.freeCancellation) {
    list = list.filter(
      (t) => t.cancellationPolicy && t.cancellationPolicy.toLowerCase().includes("free")
    );
  }

  // Sorting
  if (sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  } else if (sort === "duration") {
    list.sort((a, b) => a.days - b.days);
  } else {
    // Default recommended: featured/popular first, then highest rating
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }

  const total = list.length;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message: "Tours loaded successfully.",
    data: paginated,
    total,
    page,
    limit,
  };
}

export async function getTourById(id) {
  if (!id) return { success: false, message: "Missing tour identifier.", errors: [] };
  const strId = String(id).toLowerCase().trim();
  const tour = tours.find(
    (item) =>
      String(item.id).toLowerCase() === strId ||
      (item.slug && item.slug.toLowerCase() === strId)
  );

  return tour
    ? {
        success: true,
        message: "Tour loaded.",
        data: {
          ...tour,
          price: Number(tour.price),
          originalPrice: tour.originalPrice ? Number(tour.originalPrice) : null,
        },
      }
    : { success: false, message: `Tour not found for '${id}'.`, errors: [] };
}

export async function getFeaturedTours() {
  const featured = tours.filter((t) => t.featured || t.popular);
  return {
    success: true,
    message: "Featured tours loaded.",
    data: featured.slice(0, 4).map((t) => ({
      ...t,
      price: Number(t.price),
      originalPrice: t.originalPrice ? Number(t.originalPrice) : null,
    })),
  };
}

export async function getDealTours() {
  // Only tours that actually have an honest, un-fabricated discounted rate
  const deals = tours.filter(
    (t) => t.originalPrice && Number(t.originalPrice) > Number(t.price)
  );
  return {
    success: true,
    message: "Deal tours loaded.",
    data: deals.map((t) => ({
      ...t,
      price: Number(t.price),
      originalPrice: Number(t.originalPrice),
    })),
  };
}

export async function getRelatedTours(id) {
  const currentRes = await getTourById(id);
  if (!currentRes.success) return { success: true, data: [] };
  const current = currentRes.data;

  const related = tours
    .filter(
      (t) =>
        String(t.id) !== String(current.id) &&
        (t.destination === current.destination ||
          t.country === current.country ||
          t.category === current.category)
    )
    .slice(0, 3)
    .map((t) => ({
      ...t,
      price: Number(t.price),
      originalPrice: t.originalPrice ? Number(t.originalPrice) : null,
    }));

  return {
    success: true,
    message: "Related tours loaded.",
    data: related,
  };
}

export async function getToursByDestination(destinationName) {
  if (!destinationName) return { success: true, data: [] };
  const target = destinationName.toLowerCase().trim();
  const list = tours
    .filter(
      (t) =>
        t.destination.toLowerCase() === target ||
        t.location.toLowerCase().includes(target)
    )
    .map((t) => ({
      ...t,
      price: Number(t.price),
      originalPrice: t.originalPrice ? Number(t.originalPrice) : null,
    }));

  return {
    success: true,
    message: `Tours for ${destinationName} loaded.`,
    data: list,
  };
}
