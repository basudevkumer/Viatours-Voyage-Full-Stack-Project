import BuildYourDay from "@/sections/activities/BuildYourDay";
import DestinationCrossSell from "@/sections/activities/DestinationCrossSell";
import ExperienceCategories from "@/sections/activities/ExperienceCategories";
import ExperienceCollections from "@/sections/activities/ExperienceCollections";
import ExperienceDiscovery from "@/sections/activities/ExperienceDiscovery";
import ExperienceFAQ from "@/sections/activities/ExperienceFAQ";
import ExperiencesCTA from "@/sections/activities/ExperiencesCTA";
import ExperiencesHero from "@/sections/activities/ExperiencesHero";
import LocalExperiences from "@/sections/activities/LocalExperiences";
import PopularExperiences from "@/sections/activities/PopularExperiences";

const Activities = () => <main className="bg-bg-grey">
  <ExperiencesHero />
  <ExperienceCategories />
  <ExperienceDiscovery />
  <PopularExperiences />
  <ExperienceCollections />
  <DestinationCrossSell />
  <BuildYourDay />
  <LocalExperiences />
  <ExperienceFAQ />
  <ExperiencesCTA />
</main>;

export default Activities;
