import allImages from "@/components/helper/imageProvider";
const destinations = allImages.trendingDestinations;
// TODO(api): Replace this mock with apiRequest('/destinations').
export async function getDestinations() { return { success: true, message: "Destinations loaded.", data: destinations }; }
export async function getDestinationById(id) { const item = destinations.find((entry) => String(entry.id) === String(id) || entry.city.toLowerCase() === String(id).toLowerCase()); return item ? { success: true, message: "Destination loaded.", data: item } : { success: false, message: "Destination not found.", errors: [] }; }
