import { getDestinations } from "./destinationService";
import { getTours } from "./tourService";
import { getExperiences } from "./experienceService";
import { getGuides } from "./guideService";
import {
  aboutPillars,
  aboutPrinciples,
  aboutProcessSteps,
  aboutTrustGuarantees,
  aboutTeam,
  aboutMilestones,
  aboutTestimonials,
  aboutFaqs,
} from "@/sections/about/data";

// TODO(api): Replace in-memory queries with apiRequest('/about', { params }) once backend service exists.

/**
 * Returns strictly COMPUTED catalog counts from live services.
 * Never invents marketing numbers.
 */
export async function getAboutStats() {
  const [destRes, toursRes, expRes, guidesRes] = await Promise.all([
    getDestinations(),
    getTours({}, "recommended", 1, 100),
    getExperiences({}, "recommended", 1, 100),
    getGuides({ pageSize: 100 }),
  ]);

  const destinationsCount = destRes?.data?.length || 0;
  const toursCount = toursRes?.data?.length || 0;
  const experiencesCount = expRes?.data?.length || 0;
  const guidesCount = guidesRes?.data?.length || 0;

  return {
    success: true,
    message: "About catalog statistics loaded.",
    data: {
      destinationsCount,
      toursCount,
      experiencesCount,
      guidesCount,
      statsList: [
        {
          value: String(destinationsCount),
          label: "Destinations available",
          helper: "With dedicated travel intelligence",
        },
        {
          value: String(toursCount),
          label: "Curated multi-day tours",
          helper: "Handcrafted small-group routes",
        },
        {
          value: String(experiencesCount),
          label: "Boutique day experiences",
          helper: "Led by certified local hosts",
        },
        {
          value: String(guidesCount),
          label: "Destination guides",
          helper: "Practical timing & seasonal insights",
        },
      ],
    },
  };
}

/**
 * Returns content structure for the About page.
 */
export async function getAboutContent() {
  return {
    success: true,
    message: "About content loaded.",
    data: {
      pillars: aboutPillars,
      principles: aboutPrinciples,
      processSteps: aboutProcessSteps,
      trustGuarantees: aboutTrustGuarantees,
      team: aboutTeam, // Empty array until real data is provided
      milestones: aboutMilestones, // Empty array until real data is provided
      testimonials: aboutTestimonials, // Empty array until real data is provided
      faqs: aboutFaqs,
    },
  };
}
