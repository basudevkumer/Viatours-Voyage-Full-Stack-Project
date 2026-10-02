import { experiences } from "@/sections/activities/data";
// TODO(api): Replace this mock with apiRequest('/experiences').
export async function getExperiences() { return { success: true, message: "Experiences loaded.", data: experiences }; }
export async function getExperienceById(id) { const item = experiences.find((entry) => String(entry.id) === String(id)); return item ? { success: true, message: "Experience loaded.", data: item } : { success: false, message: "Experience not found.", errors: [] }; }
