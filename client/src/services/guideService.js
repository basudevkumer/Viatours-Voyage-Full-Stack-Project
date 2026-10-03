import { guides, GUIDE_CATEGORIES } from "@/sections/travel-guide/data";

// TODO(api): Replace in-memory guide queries with apiRequest('/guides', { params }).

/**
 * Calculate reading time in minutes based on body content words
 */
function calculateReadingTime(guide) {
  if (!guide.body || !Array.isArray(guide.body)) return "3 min read";
  const textContent = guide.body
    .map((block) => {
      if (block.text) return block.text;
      if (block.items) return block.items.join(" ");
      return "";
    })
    .join(" ");
  const wordCount = (guide.excerpt + " " + textContent).trim().split(/\s+/).length;
  const minutes = Math.max(2, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function normalizeGuide(g) {
  return {
    ...g,
    readingTime: calculateReadingTime(g),
  };
}

export async function getGuides(params = {}) {
  const {
    q = "",
    category = "all",
    destination = "all",
    sort = "newest",
    page = 1,
    pageSize = 12,
  } = params;

  let list = guides.map(normalizeGuide);

  // Search filter
  if (q && q.trim()) {
    const searchLower = q.toLowerCase().trim();
    list = list.filter(
      (g) =>
        g.title.toLowerCase().includes(searchLower) ||
        g.excerpt.toLowerCase().includes(searchLower) ||
        g.destination?.name.toLowerCase().includes(searchLower) ||
        g.tags?.some((t) => t.toLowerCase().includes(searchLower)) ||
        g.category.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (category && category !== "all") {
    const catLower = category.toLowerCase().trim();
    list = list.filter((g) => g.category.toLowerCase() === catLower);
  }

  // Destination filter
  if (destination && destination !== "all") {
    const destLower = destination.toLowerCase().trim();
    list = list.filter(
      (g) =>
        g.destination?.slug.toLowerCase() === destLower ||
        g.destination?.name.toLowerCase().includes(destLower)
    );
  }

  // Sorting
  list.sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.publishedAt) - new Date(b.publishedAt);
    }
    if (sort === "title-asc" || sort === "a-z") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "title-desc" || sort === "z-a") {
      return b.title.localeCompare(a.title);
    }
    // Default newest
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const total = list.length;
  const startIndex = (page - 1) * pageSize;
  const paginated = list.slice(startIndex, startIndex + pageSize);

  return {
    success: true,
    data: paginated,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    message: "Guides loaded successfully",
  };
}

export async function getGuideBySlug(slug) {
  if (!slug) {
    return { success: false, data: null, message: "Guide slug or id is required" };
  }

  const cleanSlug = String(slug).toLowerCase();
  const guide = guides.find(
    (g) => g.slug.toLowerCase() === cleanSlug || String(g.id) === cleanSlug
  );

  if (!guide) {
    return { success: false, data: null, message: "Guide not found" };
  }

  return {
    success: true,
    data: normalizeGuide(guide),
    message: "Guide retrieved successfully",
  };
}

export async function getFeaturedGuides() {
  const featured = guides.filter((g) => g.featured).map(normalizeGuide);
  const editors = guides.filter((g) => g.editorsPick && !g.featured).map(normalizeGuide);

  return {
    success: true,
    data: {
      featured: featured[0] || normalizeGuide(guides[0]),
      editorsPicks: editors.slice(0, 3),
    },
    message: "Featured guides retrieved successfully",
  };
}

export async function getRelatedGuides(slug, limit = 3) {
  const current = guides.find(
    (g) => g.slug.toLowerCase() === String(slug).toLowerCase() || String(g.id) === String(slug)
  );

  let related = [];
  if (current) {
    // Priority: same destination or same category
    related = guides
      .filter((g) => g.id !== current.id)
      .sort((a, b) => {
        const aMatch =
          (a.destination?.slug === current.destination?.slug ? 2 : 0) +
          (a.category === current.category ? 1 : 0);
        const bMatch =
          (b.destination?.slug === current.destination?.slug ? 2 : 0) +
          (b.category === current.category ? 1 : 0);
        return bMatch - aMatch;
      });
  } else {
    related = guides;
  }

  return {
    success: true,
    data: related.slice(0, limit).map(normalizeGuide),
    message: "Related guides retrieved successfully",
  };
}

export async function getGuideCategories() {
  const categoriesWithCounts = GUIDE_CATEGORIES.map((cat) => {
    const count = guides.filter((g) => g.category.toLowerCase() === cat.toLowerCase()).length;
    return {
      title: cat,
      count,
    };
  });

  return {
    success: true,
    data: [
      { title: "All", count: guides.length },
      ...categoriesWithCounts,
    ],
    message: "Categories computed successfully",
  };
}

export async function getGuidesByDestination(slug) {
  if (!slug) return { success: true, data: [] };
  const clean = slug.toLowerCase();
  const list = guides
    .filter(
      (g) =>
        g.destination?.slug.toLowerCase() === clean ||
        g.destination?.name.toLowerCase().includes(clean)
    )
    .map(normalizeGuide);

  return {
    success: true,
    data: list,
    message: "Destination guides retrieved",
  };
}

export async function getAdjacentGuides(slug) {
  const index = guides.findIndex(
    (g) => g.slug.toLowerCase() === String(slug).toLowerCase() || String(g.id) === String(slug)
  );

  if (index === -1) {
    return { success: true, data: { prev: null, next: null } };
  }

  const prev = index > 0 ? normalizeGuide(guides[index - 1]) : null;
  const next = index < guides.length - 1 ? normalizeGuide(guides[index + 1]) : null;

  return {
    success: true,
    data: { prev, next },
    message: "Adjacent guides retrieved",
  };
}
