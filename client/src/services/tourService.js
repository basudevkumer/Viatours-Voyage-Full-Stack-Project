import { tours } from "@/sections/tours/data";
// TODO(api): Replace this mock with apiRequest('/tours').
export async function getTours() { return { success: true, message: "Tours loaded.", data: tours }; }
export async function getTourById(id) { const tour = tours.find((item) => String(item.id) === String(id)); return tour ? { success: true, message: "Tour loaded.", data: tour } : { success: false, message: "Tour not found.", errors: [] }; }
