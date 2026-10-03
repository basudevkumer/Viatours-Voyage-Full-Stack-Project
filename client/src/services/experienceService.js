import { experiences, collections, popularThings } from "@/sections/activities/data";

// TODO(api): Replace in-memory queries with apiRequest('/experiences', { params }).

export async function getExperiences(filters = {}, sort = "recommended", page = 1, limit = 50) {
  let list = experiences.map((e) => ({
    ...e,
    price: Number(e.price),
    originalPrice: e.originalPrice ? Number(e.originalPrice) : null,
  }));

  // Search filter
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.destination.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }

  // Destination filter
  if (filters.destination && filters.destination !== "all") {
    const d = filters.destination.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.destination.toLowerCase() === d ||
        e.location.toLowerCase().includes(d)
    );
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    const cat = filters.category.toLowerCase().trim();
    list = list.filter((e) => e.category.toLowerCase() === cat);
  }

  // Time of Day filter ("morning", "afternoon", "evening", "full-day")
  if (filters.timeOfDay && filters.timeOfDay !== "all") {
    const time = filters.timeOfDay.toLowerCase().trim();
    list = list.filter((e) => e.timeOfDay.toLowerCase() === time);
  }

  // Duration filter
  if (filters.duration && filters.duration !== "all") {
    if (filters.duration === "short") {
      list = list.filter((e) => e.durationHours <= 3.5);
    } else if (filters.duration === "medium") {
      list = list.filter((e) => e.durationHours > 3.5 && e.durationHours <= 6);
    } else if (filters.duration === "full-day") {
      list = list.filter((e) => e.durationHours > 6);
    }
  }

  // Max price filter
  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (!Number.isNaN(max)) {
      list = list.filter((e) => e.price <= max);
    }
  }

  // Min rating filter
  if (filters.minRating) {
    const r = Number(filters.minRating);
    if (!Number.isNaN(r)) {
      list = list.filter((e) => e.rating >= r);
    }
  }

  // Feature filters (e.g. freeCancellation, hotelPickup, instantConfirmation, mobileTicket)
  if (filters.freeCancellation === "true" || filters.feature === "freeCancellation") {
    list = list.filter((e) => e.features?.includes("freeCancellation"));
  }
  if (filters.hotelPickup === "true" || filters.feature === "hotelPickup") {
    list = list.filter((e) => e.features?.includes("hotelPickup"));
  }
  if (filters.instantConfirmation === "true" || filters.feature === "instantConfirmation") {
    list = list.filter((e) => e.features?.includes("instantConfirmation"));
  }

  // Sorting
  if (sort === "price-low" || sort === "price") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  } else if (sort === "duration") {
    list.sort((a, b) => a.durationHours - b.durationHours);
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
    message: "Experiences loaded successfully.",
    data: paginated,
    total,
    page,
    limit,
  };
}

export async function getExperienceById(id) {
  if (!id) return { success: false, message: "Missing experience identifier.", errors: [] };
  const strId = String(id).toLowerCase().trim();
  const item = experiences.find(
    (entry) =>
      String(entry.id).toLowerCase() === strId ||
      (entry.slug && entry.slug.toLowerCase() === strId)
  );

  return item
    ? {
        success: true,
        message: "Experience loaded.",
        data: {
          ...item,
          price: Number(item.price),
          originalPrice: item.originalPrice ? Number(item.originalPrice) : null,
        },
      }
    : { success: false, message: `Experience not found for '${id}'.`, errors: [] };
}

export async function getFeaturedExperiences() {
  const featured = experiences.filter((e) => e.featured || e.popular);
  return {
    success: true,
    message: "Featured experiences loaded.",
    data: featured.slice(0, 4).map((e) => ({
      ...e,
      price: Number(e.price),
      originalPrice: e.originalPrice ? Number(e.originalPrice) : null,
    })),
  };
}

export async function getExperienceCategories() {
  const categoryDefs = [
    { title: "Sightseeing", description: "City viewpoints, historic quarters, and iconic landmarks.", image: popularThings[0].image },
    { title: "Culture", description: "Living traditions, craft masterclasses, and temple visits.", image: popularThings[1].image },
    { title: "Water", description: "Island cruising, sea cave paddling, and marine sanctuaries.", image: popularThings[2].image },
    { title: "History", description: "Underground chambers, royal palaces, and ancient ruins.", image: popularThings[3].image },
    { title: "Adventure", description: "Volcanic dune safaris, canyon walks, and off-road trips.", image: popularThings[4].image },
    { title: "Food", description: "Twilight market tours, volcanic wine walks, and tastings.", image: popularThings[5].image },
    { title: "Nature", description: "Jungle waterfall treks, coral reefs, and wildlife safaris.", image: popularThings[7].image },
  ];

  // Strictly compute counts from the actual experiences data
  const computed = categoryDefs.map((cat) => {
    const matchingCount = experiences.filter(
      (e) => e.category.toLowerCase() === cat.title.toLowerCase()
    ).length;
    return {
      ...cat,
      count: matchingCount === 1 ? "1 experience" : `${matchingCount} experiences`,
      countNum: matchingCount,
    };
  });

  return {
    success: true,
    message: "Categories loaded.",
    data: computed,
  };
}

export async function getCollections() {
  return {
    success: true,
    message: "Collections loaded.",
    data: collections,
  };
}

export async function getRelatedExperiences(id) {
  const currentRes = await getExperienceById(id);
  if (!currentRes.success) return { success: true, data: [] };
  const current = currentRes.data;

  const related = experiences
    .filter(
      (e) =>
        String(e.id) !== String(current.id) &&
        (e.destination === current.destination ||
          e.country === current.country ||
          e.category === current.category)
    )
    .slice(0, 3)
    .map((e) => ({
      ...e,
      price: Number(e.price),
      originalPrice: e.originalPrice ? Number(e.originalPrice) : null,
    }));

  return {
    success: true,
    message: "Related experiences loaded.",
    data: related,
  };
}

export async function getExperiencesByDestination(destinationName) {
  if (!destinationName) return { success: true, data: [] };
  const target = destinationName.toLowerCase().trim();
  const list = experiences
    .filter(
      (e) =>
        e.destination.toLowerCase() === target ||
        e.location.toLowerCase().includes(target)
    )
    .map((e) => ({
      ...e,
      price: Number(e.price),
      originalPrice: e.originalPrice ? Number(e.originalPrice) : null,
    }));

  return {
    success: true,
    message: `Experiences for ${destinationName} loaded.`,
    data: list,
  };
}
