// TODO(api): Return only authentic, source-attributed reviews from the API.
export async function getReviews() { return { success: true, message: "No reviews are available yet.", data: [] }; }
export async function getReviewsForItem() { return getReviews(); }
